import { h, FunctionComponent, Fragment } from "preact"
import { useCallback, useMemo, useState } from "preact/hooks"
import { Helmet } from "@notwoods/preact-helmet"
import { Link } from 'preact-router/match';
import { newUTCTime, rand, timeFormat, useGlobalListener } from "../../tools"
import { SvgDefs } from "../../components/cards/svgDefs"
import GameBoard from "../../components/gameBoard"
import { FullDeck, keyMap, setCard, Split, splitsB, splitsE } from "../../components/gameHelper"
import LiveSplit from "../../components/livesplit"
import style from "./style.css"

const LIVESPLIT_SCREENSIZE_W_MIN = 1305
const LIVESPLIT_SCREENSIZE_H_MIN = 500


type fakeState = {
    gameInfo: {
        setsFound: [setCard, setCard, setCard][];
        cols: number;
        deck: setCard[];
        selectedCards: setCard[];
        hints: number;
        wrongs: number;
        won: boolean;
        board: setCard[]
    };
    speedrun: {
        timeStarted: Date;
        timeFin: Date | false;
        splits: {
            doneSplits: {[key:string]:number}
            CurSplitName: string,
            BeginnerSplits: Split[],
            ExpertSplits: Split[],
        },
        oldSplits: {
            doneSplits: {[key:string]:number}
            splits: Split[],
        } | false
        displayClock: boolean,
        /**
         * for if col > 5
         * H,T - It's hiding, it used to be true
         * H,F - It's hiding, it used to be false
         * NH - It's not hiding
         */
        oldDClock: "H,T" | "H,F" | "NH"
        timerMode: "Expert" | "Beginner"
    }
}

function findNeededCard(card1:setCard, card2:setCard):(setCard | false) {
    let charN = 0
    let needed = ''
    for (const char of card2) {
        if (char == card1[charN]) {
            needed += char
        } else {
            const test = (FullDeck.filter((val) => {
                return !([char, card1[charN]].includes(val[charN]))
            }))[0]
            if (!test) return false
            needed += test[charN]
        }
        if ([card1, card2].includes(needed as setCard)) return false
        charN++
    }
    return needed.length == 0 ? false : needed as setCard
}

function findSet(board:setCard[]):(false | [number, number, number]) {
    for (const card of board) {
        for (const card2 of board) {
            const needed = findNeededCard(card, card2)
            if (needed && board.includes(needed)) {
                return [board.indexOf(card), board.indexOf(card2), board.indexOf(needed)]
            }
        }
    }
    return false
}

function correctSet(set1:setCard, set2:setCard, set3:setCard) {
    // don't judge this, to me it looks to be fast, but looks terrible
    if (
        // set 1 and 2
        (set1[0] == set2[0] && set1[0] != set3[0]) ||
        (set1[1] == set2[1] && set1[1] != set3[1]) ||
        (set1[2] == set2[2] && set1[2] != set3[2]) ||
        (set1[3] == set2[3] && set1[3] != set3[3]) ||
        // set 2 and 3
        (set3[0] == set2[0] && set1[0] != set3[0]) ||
        (set3[1] == set2[1] && set1[1] != set3[1]) ||
        (set3[2] == set2[2] && set1[2] != set3[2]) ||
        (set3[3] == set2[3] && set1[3] != set3[3]) ||
        // set 1 and 3
        (set1[0] == set3[0] && set2[0] != set3[0]) ||
        (set1[1] == set3[1] && set2[1] != set3[1]) ||
        (set1[2] == set3[2] && set2[2] != set3[2]) ||
        (set1[3] == set3[3] && set2[3] != set3[3])
        ) {
        return false
    }
    return true
}

function addRow(board:setCard[], deck:setCard[], cols:number): {deck: setCard[], board: setCard[], cols: number} {
    cols++
    for (let i = 0; i < 3; i++) {
        const index = rand(0, deck.length - 1)
        board.splice((cols*(i+1)) - 1, 0, deck[index])
        deck.splice(index, 1)
    }
    return {
        deck,
        board,
        cols
    }
}



const SingleGame: FunctionComponent = ({}) => {
    const initer:() => fakeState = () => {
        let curDeck:setCard[] = []
        let board:setCard[] = []
        let cols = 4

        for (const i of FullDeck) {
            curDeck.push(i)
        }

        for (let i = 0; i < 12; i++) {
            const index = rand(0, curDeck.length - 1)
            board.push(curDeck[index])
            curDeck.splice(index, 1)
        }
        while (!findSet(board)) {
            const NewBoardData = addRow(board, curDeck, cols)
            curDeck = NewBoardData.deck
            board = NewBoardData.board
            cols = NewBoardData.cols
        }

        let BeginnerSplits:Split[]
        try {
            BeginnerSplits = JSON.parse(localStorage.getItem('BeginnerSplits') ?? JSON.stringify(splitsB))
        } catch {
            BeginnerSplits = splitsB
        }
        let ExpertSplits:Split[]
        try {
            ExpertSplits = JSON.parse(localStorage.getItem('ExpertSplits') ?? JSON.stringify(splitsE))
        } catch {
            ExpertSplits = splitsE
        }

        return {
            gameInfo: {
                deck: curDeck,
                board,
                cols,
                hints: 0,
                selectedCards: [],
                setsFound: [],
                won: false,
                wrongs: 0
            },
            speedrun: {
                timeStarted: newUTCTime(),
                timeFin: false,
                oldDClock: "NH",
                splits: {
                    BeginnerSplits,
                    ExpertSplits,
                    CurSplitName: splitsB[0].name,
                    doneSplits: {}
                },
                oldSplits: false,
                displayClock: (localStorage.getItem('displayClock') ?? "true") == "true",
                timerMode: localStorage.getItem('timerMode') == "Expert" ? "Expert" : "Beginner", //default to beginner
            },
        }
    }
    const initialInfo = useMemo(initer, [])
    const [gameInfo, setGameInfo] = useState<fakeState['gameInfo']>(initialInfo.gameInfo)
    const [speedrunInfo, setSpeedrunInfo] = useState<fakeState['speedrun']>(initialInfo.speedrun)
    const [bigLivesplit, setBigLivesplit] = useState<boolean>(window.innerWidth >= LIVESPLIT_SCREENSIZE_W_MIN && window.innerHeight >= LIVESPLIT_SCREENSIZE_H_MIN)
    const [hh, setHH] = useState<number>(window.innerHeight)
    const [ww, setWW] = useState<number>(window.innerWidth)
    const win = useCallback(() => {
        const time = newUTCTime()
        const totTime = time.getTime() - speedrunInfo.timeStarted.getTime()
        const timeTot = new Date(totTime).getTime()
        const nGame = gameInfo
        const nSpeedrun = speedrunInfo
        console.log(gameInfo.hints ? "Hints were used" : timeFormat(timeTot, true))
        const splits = speedrunInfo.splits
        splits.doneSplits["Game finished"] = timeTot
        console.log(splits.doneSplits)
        nGame.won = true
        if (!gameInfo.hints) {
            const mode = `${speedrunInfo.timerMode}Splits` as "BeginnerSplits" | "ExpertSplits"
            nSpeedrun.oldSplits = {
                splits: splits[mode],
                doneSplits: splits.doneSplits
            }
            splits[mode] = splits[mode].map((val: Split) => {
                return {
                    fin: val.fin,
                    name: val.name,
                    best: splits.doneSplits[val.name] < val.best ? splits.doneSplits[val.name] : val.best,
                }
            })
        }
        splits.doneSplits = {}
        nSpeedrun.splits = splits
        localStorage.setItem('BeginnerSplits', JSON.stringify(splits.BeginnerSplits))
        localStorage.setItem('ExpertSplits', JSON.stringify(splits.ExpertSplits))

        setGameInfo({...nGame})
        setSpeedrunInfo({...nSpeedrun})
    }, [gameInfo, speedrunInfo])

    const handleSetSelector = useCallback((card:setCard) => {
        const nSpeedrun = speedrunInfo
        const nGame = gameInfo
        // select the card
        if (nGame.selectedCards.includes(card)) nGame.selectedCards.splice(nGame.selectedCards.indexOf(card), 1)
        else nGame.selectedCards.push(card)

        // selected a 3 cards, try for a set
        if (nGame.selectedCards.length === 3) {
            if (correctSet(nGame.selectedCards[0], nGame.selectedCards[1], nGame.selectedCards[2])) {
                // the set is right
                nGame.setsFound.push([nGame.selectedCards[0], nGame.selectedCards[1], nGame.selectedCards[2]])

                if (nGame.board.length === 12) {
                    // if the board is normal sized
                    // just replace the selected cards
                    [0, 1, 2].forEach((i) => {
                        const newCard = rand(0, nGame.deck.length - 1)
                        nGame.board[nGame.board.indexOf(nGame.selectedCards[i])] = nGame.deck[newCard]
                        nGame.deck.splice(newCard, 1)
                    })
                } else {
                    // if the board is differently sized
                    // this means it's either too much, so we remove them
                    // or too little, the cause of which must be that theres not enought cards in the deck, we still have remove them
                    // we have to constantly get new indexes here cause we are splicing something we are getting the index of
                    nGame.board.splice(nGame.board.indexOf(nGame.selectedCards[0]), 1)
                    nGame.board.splice(nGame.board.indexOf(nGame.selectedCards[1]), 1)
                    nGame.board.splice(nGame.board.indexOf(nGame.selectedCards[2]), 1)
                    nGame.cols--
                }

                //
                // update the splits if needed
                //

                const neededSplits = nSpeedrun.splits[`${nSpeedrun.timerMode}Splits` as "ExpertSplits" | "BeginnerSplits"]
                const indexx:number = neededSplits.indexOf(neededSplits.filter((val) => val.name == nSpeedrun.splits.CurSplitName)[0])
                // check if we need to change splits
                if (nGame.setsFound.length == neededSplits[indexx].fin) {
                    const nextS:Split = neededSplits[indexx + 1]
                    if (nextS) {
                        // if there is a next split
                        const newT = newUTCTime()
                        nSpeedrun.splits.doneSplits[nSpeedrun.splits.CurSplitName] = newT.getTime() - nSpeedrun.timeStarted.getTime()
                        console.log(nSpeedrun.splits.doneSplits[nSpeedrun.splits.CurSplitName] = newT.getTime() - nSpeedrun.timeStarted.getTime())
                        nSpeedrun.splits.CurSplitName = nextS.name
                    }
                }
                // filter out the undefined
                nGame.board = nGame.board.filter((val) => val)

                //end game logic
                if (nGame.deck.length == 0) {
                    // if there is no set
                    if (!findSet(nGame.board)) {
                        win()
                        return
                    }
                    if (nGame.board.length < 12) nGame.cols--

                } else if (!findSet(nGame.board)) {
                    while (!findSet(nGame.board)) {
                        const NewBoardData = addRow(nGame.board, nGame.deck, nGame.cols)
                        nGame.deck = NewBoardData.deck
                        nGame.board = NewBoardData.board
                        nGame.cols = NewBoardData.cols
                    }

                    if (nGame.cols > 5) {
                        nSpeedrun.oldDClock = nSpeedrun.displayClock ? "H,T" : "H,F"
                        nSpeedrun.displayClock = false
                    } else if (nSpeedrun.oldDClock != "NH") nSpeedrun.displayClock = nSpeedrun.oldDClock == "H,T"
                }
                nGame.selectedCards = []
            } else {
                // the set is wrong
                nGame.wrongs++
                nGame.selectedCards = []
            }
        }
        setGameInfo({...nGame})
        setSpeedrunInfo({...nSpeedrun})
    }, [gameInfo, speedrunInfo, win])

    const initerCB = useCallback(() => {
        const stuff = initer()
        setGameInfo(stuff.gameInfo)
        setSpeedrunInfo(stuff.speedrun)
        return stuff
    }, [])

    useGlobalListener('keydown', (e) => {
        if (e.key == 'r' && !e.ctrlKey) {
            const stuff = initer()
            setGameInfo(stuff.gameInfo)
            setSpeedrunInfo(stuff.speedrun)
        } else if (Object.keys(keyMap).includes(e.key.toLowerCase())) {
            const item = keyMap[e.key.toLocaleLowerCase()]
            const card = gameInfo.board[item[0] * gameInfo.cols + item[1]]
            handleSetSelector(card)
        }
    })
    useGlobalListener('resize', () => {
        setBigLivesplit(window.innerWidth >= LIVESPLIT_SCREENSIZE_W_MIN && window.innerHeight >= LIVESPLIT_SCREENSIZE_H_MIN)
        setHH(window.innerHeight)
        setWW(window.innerWidth)
    })
    return (
        <div class={style.gameContainer}>
        <SvgDefs />
        <Helmet>
            <meta content="The set game, recreated by Shady Goat" property="og:title" />
            <meta content="This is the fun card game 'SET', but recreated as a website made with preact. " property="og:description" />
            <meta content="/" property="og:url" />
            <meta content="#6d10ff" data-react-helmet="true" name="theme-color" />
        </Helmet>
    {
        hh > ww ?
            gameInfo.won ?
            <div />
            : <div class={style.boardGameWrapper}>
            {/* <div class={style.extraCol}> */}
            <div style={{
                display: "flex",
                flexDirection: "column"
            }} class="w100">
                <h1 style={{
                    fontSize: "50px"
                }}>Set!</h1>
                <div>
                    <h2>Found sets: {gameInfo.setsFound.length}</h2>
                    <h2>Wrong Guesses: {gameInfo.wrongs}</h2>
                    <h2>Deck: {gameInfo.deck.length}</h2>
                    <h2 class={`${gameInfo.hints ? 'text-danger' : ''}`}>Hints used: {gameInfo.hints}</h2>
                </div>
                <div style={{
                    marginTop: "6%",
                    display: "flex",
                    flexDirection: "row"
                }}>
                    <button class="btn btn-d" style={{
                        width: "100%",
                        paddingTop: "2rem",
                        paddingBottom: "2rem"
                    }} onClick={(e) => {
                        if (e.button == 0) {
                            const info = initerCB()
                            setGameInfo(info.gameInfo)
                            setSpeedrunInfo(info.speedrun)
                        }
                    }} title="Restart the game (r)" >Restart</button>
                    <div
                        style={{
                            flex: "0 0 auto",
                            width: "2%"
                        }}
                    />
                    <button class="btn btn-p" style={{
                        width: "97%"
                    }} onClick={(e) => {
                        if (e.button == 0) {
                            const CHEATER_MODE = false
                            if (CHEATER_MODE) {
                                const adr = findSet(gameInfo.board)
                                if (!adr) {console.error('No sets found'); return}
                                handleSetSelector(gameInfo.board[adr[0]])
                                handleSetSelector(gameInfo.board[adr[1]])
                                handleSetSelector(gameInfo.board[adr[2]])
                            } else {
                                console.log("A hint was used!")
                                const adr = findSet(gameInfo.board)
                                if (!adr) {console.error('No sets found'); return}
                                let sel:setCard[] = []
                                sel = [gameInfo.board[adr[0]], gameInfo.board[adr[1]],]
                                const nGame = gameInfo
                                nGame.hints++
                                nGame.selectedCards = sel
                                setGameInfo({...nGame})
                            }
                        }
                    }} title="Hint (for weaklings)">Hint</button>
                </div>
            </div>
        </div>
        :
                gameInfo.won ?
                    <div class={style.winS}>
                        <div class={style.wCol}>
                            <div style={{display: "flex", flexDirection: "column"}}>
                                <h1>You did it! Congrats!</h1>
                                <h1>Hints used: {gameInfo.hints}</h1>
                                <h1>Wrong guesses: {gameInfo.wrongs}</h1>
                            </div>
                        </div>
                        {speedrunInfo.oldSplits ?
                        <LiveSplit
                            splitName={"donzo"}
                            splits={speedrunInfo.oldSplits.splits}
                            timeStarted={0}
                            done={speedrunInfo.oldSplits.doneSplits}
                        /> : <h1 style={{transform:"rotate(300deg) translate(-40px, 400px) scale(1.75)"}}>You used hints :(</h1>
                        }

                    </div>
                : <div class={style.boardGameWrapper}>
                        <div class={style.extraCol}>
                            <h1>Set!</h1>
                            {
                                hh >= 380 ?
                                    <Fragment>
                                        <h4>Found sets: {gameInfo.setsFound.length}</h4>
                                        <h4>Wrong Guesses: {gameInfo.wrongs}</h4>
                                        <h4>Deck: {gameInfo.deck.length}</h4>
                                        <h4 class={`${gameInfo.hints ? 'text-danger' : ''}`}>Hints used: {gameInfo.hints}</h4>
                                    </Fragment> :
                                <Fragment />
                            }
                            <button class={`btn btn-d`} onClick={(e) => {
                                if (e.button == 0) {
                                    const info = initerCB()
                                    setGameInfo(info.gameInfo)
                                    setSpeedrunInfo(info.speedrun)
                                }
                            }} title="Restart the game (r)" >Restart</button>
                            <button class="btn btn-p" onClick={(e) => {
                                if (e.button == 0) {
                                    const CHEATER_MODE = false
                                    if (CHEATER_MODE) {
                                        const adr = findSet(gameInfo.board)
                                        if (!adr) {console.error('No sets found'); return}
                                        handleSetSelector(gameInfo.board[adr[0]])
                                        handleSetSelector(gameInfo.board[adr[1]])
                                        handleSetSelector(gameInfo.board[adr[2]])
                                    } else {
                                        console.log("A hint was used!")
                                        const adr = findSet(gameInfo.board)
                                        if (!adr) {console.error('No sets found'); return}
                                        let sel:setCard[] = []
                                        sel = [gameInfo.board[adr[0]], gameInfo.board[adr[1]],]
                                        const nGame = gameInfo
                                        nGame.hints++
                                        nGame.selectedCards = sel
                                        setGameInfo({...nGame})
                                    }
                                }
                            }} title="Hint (for weaklings)">Hint</button>
                            {
                                bigLivesplit ? <Fragment>
                                    <button class="btn btn-p" onClick={(e) => {if (e.button != 0) return;
                                        const nSpeedrun = speedrunInfo
                                        nSpeedrun.displayClock = !nSpeedrun.displayClock
                                        setSpeedrunInfo({...nSpeedrun})
                                        localStorage.setItem('displayClock', nSpeedrun.displayClock ? "true" : "false");
                                    }}>Toggle Clock</button>
                                    <button class="btn btn-p" onClick={(e) => {if (e.button != 0) return;
                                        const nSpeedrun = speedrunInfo
                                        nSpeedrun.timerMode = nSpeedrun.timerMode == "Beginner" ? "Expert" : "Beginner"
                                        localStorage.setItem('timerMode', nSpeedrun.timerMode);
                                        setSpeedrunInfo({...nSpeedrun})
                                    }}>Change Type</button>
                                </Fragment> : <Fragment />
                            }
                            <Link href="/" class="btn btn-d" style={{textDecoration: "none", padding: 0, width: "9vw", height: "8vh", display: "flex", alignItems: "center", justifyContent: "center", margin: "auto auto", marginTop: "2vh"}}>
                                Home
                            </Link>
                        </div>
                        <div class={style.gameBoard}>
                            <GameBoard selectF={handleSetSelector} cols={gameInfo.cols} rawBoard={gameInfo.board} selectedCards={gameInfo.selectedCards} />
                        </div>
                        {
                            bigLivesplit ?
                            speedrunInfo.displayClock ?
                            <LiveSplit
                                splitName={speedrunInfo.splits.CurSplitName}
                                splits={speedrunInfo.splits[`${speedrunInfo.timerMode}Splits` as 'ExpertSplits' | "BeginnerSplits"]}
                                timeStarted={speedrunInfo.timeStarted.getTime()}
                                done={speedrunInfo.splits.doneSplits}
                            />
                            : <div />
                            : <div />
                        }
                </div>
            }
            </div>
        )
}

export default SingleGame
