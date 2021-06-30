import { h, FunctionComponent } from "preact"
import { useCallback, useEffect, useRef, useState } from "preact/hooks"
import { isMobileOnly } from "react-device-detect"
import { Helmet } from "@notwoods/preact-helmet"
import { Link } from 'preact-router/match';
import { rand, timeFormat, useGlobalListener } from "../../tools"
import { SvgDefs } from "../cards/svgDefs"
import GameBoard from "./game"
import { FullDeck, keyMap, setCard, Split, splitsB, splitsE } from "./gameHelper"
import { LiveSplit } from "./Livesplit"

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
            splitTimeS: number
        },
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
    boardCache: JSX.Element,
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
        for (const i of FullDeck) {
            curDeck.push(i)
        }
        let board:setCard[] = []
        let cols = 4
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
                timeStarted: new Date(),
                timeFin: false,
                oldDClock: "NH",
                splits: {
                    BeginnerSplits: (speedrunInfo ?? {splits: {BeginnerSplits: splitsB}}).splits.BeginnerSplits,
                    ExpertSplits: (speedrunInfo ?? {splits: {ExpertSplits: splitsE}}).splits.ExpertSplits,
                    CurSplitName: splitsB[0].name,
                    doneSplits: {},
                    splitTimeS: Date.now()
                },
                displayClock: (speedrunInfo ?? {displayClock: true}).displayClock,
                timerMode: (speedrunInfo ?? {timerMode: "Beginner"}).timerMode,
            },
            boardCache: <GameBoard selectF={handleSetSelector} cols={cols} rawBoard={board} selectedCards={[]} />
        } as fakeState
    }
    const initialInfo = initer()
    const [gameInfo, setGameInfo] = useState<fakeState['gameInfo']>(initialInfo.gameInfo)
    const [speedrunInfo, setSpeedrunInfo] = useState<fakeState['speedrun']>(initialInfo.speedrun)
    const [boardCache, setBoardCache] = useState<fakeState['boardCache']>(initialInfo.boardCache)
    const win = useCallback(() => {
        const time = new Date()
        const totTime = speedrunInfo.timeStarted.getTime() - time.getTime()
        const timeTot = new Date(totTime)
        console.log(gameInfo.hints ? "Hints were used" : timeFormat(timeTot, true))
        const splits = speedrunInfo.splits
        splits.doneSplits["Game finished"] = time.getTime() - splits.splitTimeS
        console.log(splits.doneSplits)
        gameInfo.won = true
        if (gameInfo.hints) {
            splits[`${speedrunInfo.timerMode}Splits` as "BeginnerSplits" | "ExpertSplits"] = splits[`${speedrunInfo.timerMode}Splits` as "BeginnerSplits" | "ExpertSplits"].map((val: Split) => {
                return {
                    fin: val.fin,
                    name: val.name,
                    best: splits.doneSplits[val.name] > val.best ? splits.doneSplits[val.name] : val.best,
                }
            })
        }
        splits.doneSplits = {}
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
                        nSpeedrun.splits.doneSplits[nSpeedrun.splits.CurSplitName] = Date.now() - nSpeedrun.splits.splitTimeS
                        console.log(nSpeedrun.splits.doneSplits[nSpeedrun.splits.CurSplitName] = Date.now() - nSpeedrun.splits.splitTimeS)
                        nSpeedrun.splits.splitTimeS = Date.now()
                        nSpeedrun.splits.CurSplitName = nextS.name
                    }
                }

                //end game logic
                if (nGame.deck.length == 0) {
                    // if there is no set
                    if (!findSet(nGame.board)) {
                        win()
                        return
                    }
                    nGame.board = nGame.board.filter((val) => val)
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
        setGameInfo(nGame)
        setSpeedrunInfo(nSpeedrun)
        setBoardCache(<GameBoard rawBoard={nGame.board} selectF={handleSetSelector} cols={nGame.cols} selectedCards={nGame.selectedCards} />)
    }, [gameInfo, speedrunInfo, win])

    const initerCB:()=>fakeState = useCallback(initer,[handleSetSelector, speedrunInfo])

    useGlobalListener('keydown', (e) => {
        if (e.key == 'r' && !e.ctrlKey) {

            const stuff = initer()
            setGameInfo(stuff.gameInfo)
            setSpeedrunInfo(stuff.speedrun)
            setBoardCache(stuff.boardCache)

        } else if (Object.keys(keyMap).includes(e.key.toLowerCase())) {
            const item = keyMap[e.key.toLocaleLowerCase()]
            const card = gameInfo.board[item[0] * gameInfo.cols + item[1]]
            handleSetSelector(card)
        }
    })

    return (
        <div class="scontainer game-container"
        ><SvgDefs />
        <Helmet>
            <meta content="The set game, recreated by Shady Goat" property="og:title" />
            <meta content="This is the fun card game 'SET', but recreated as a website made with preact. " property="og:description" />
            <meta content="https://set.shadygoat.eu" property="og:url" />
            <meta content="#6d10ff" data-react-helmet="true" name="theme-color" />
        </Helmet>
    {
        isMobileOnly ? "Sorry, but mobile is currently not supported!" :
                gameInfo.won ?
                    <div class="win-s">
                        <div class="w-col">
                            <div style={{display: "flex", flexDirection: "column"}}>
                                <h1>You did it! Congrats!</h1>
                                <h1>Hints used: {gameInfo.hints}</h1>
                                <h1>Wrong guesses: {gameInfo.wrongs}</h1>
                            </div>
                        </div>
                        <div class="w-col-2">
                            {
                                Object.keys(speedrunInfo.splits.doneSplits).map((name) => {
                                    const time = speedrunInfo.splits.doneSplits[name]
                                    return (
                                        <div key={name} class="w-row">
                                            <div class="w-r-col" style={{width:"40%", textAlign: "left"}}>{timeFormat(time, true)}</div>
                                            <div class="w-r-col" style={{width:"60%", textAlign: "right"}}>{timeFormat(time, true)}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                : <div class="boardGameWrapper">
                    <div class="extra-col">
                    <h1 style={{color:"white", textAlign:"center", verticalAlign:"middle"}}>
                        Set!
                    </h1>
                    <p class="text-awhite">Found sets: {gameInfo.setsFound.length}</p>
                    <p class="text-awhite">Wrong Guesses: {gameInfo.wrongs}</p>
                    <p class="text-awhite">Deck: {gameInfo.deck.length}</p>
                    <p class={`${gameInfo.hints ? 'text-danger' : 'text-awhite'}`}>Hints used: {gameInfo.hints}</p>
                    <button class="btn btn-d" onClick={(e) => {
                        if (e.button == 0) {
                            const info = initerCB()
                            setGameInfo(info.gameInfo)
                            setBoardCache(info.boardCache)
                            setSpeedrunInfo(info.speedrun)
                        }
                    }} title="Restart the game (r)" >Restart</button>
                    <button class="btn btn-p" onClick={(e) => {
                        if (e.button == 0) {
                            console.log("A hint was used!")
                            const adr = findSet(gameInfo.board)
                            if (!adr) {console.error('No sets found'); return}
                            let sel:setCard[] = []
                            sel = [gameInfo.board[adr[0]], gameInfo.board[adr[1]]]
                            const nGame = gameInfo
                            nGame.hints++
                            nGame.selectedCards = sel
                            setGameInfo(nGame)
                            setBoardCache(<GameBoard selectF={handleSetSelector} rawBoard={nGame.board} cols={nGame.cols} selectedCards={nGame.selectedCards} />)
                        }
                    }} title="Hint (for weaklings)">Hint</button>
                    <button class="btn btn-p" onClick={(e) => {if (e.button != 0) return;
                        const nSpeedrun = speedrunInfo
                        nSpeedrun.displayClock = !nSpeedrun.displayClock
                        setSpeedrunInfo(nSpeedrun)
                        }}>Toggle Clock</button>
                    <button class="btn btn-p" onClick={(e) => {if (e.button != 0) return;
                        const nSpeedrun = speedrunInfo
                        nSpeedrun.timerMode == "Beginner" ? "Expert" : "Beginner"
                        setSpeedrunInfo(nSpeedrun)
                    }}>Change Type</button>
                    <Link href="/" class="btn btn-d" style={{textDecoration: "none", borderRadius: "50%", padding: '0px', width: "6vw", height: "6vw", display: "flex", alignItems: "center", justifyContent: "center", margin: "auto auto", marginTop: "4vh"}}>
                        Home
                    </Link>
                    </div>
                    <div class="gameBoard">
                    {boardCache}
                    </div>
                    {
                        speedrunInfo.displayClock ?
                        <LiveSplit
                            curSplitTime={speedrunInfo.splits.splitTimeS}
                            splitName={speedrunInfo.splits.CurSplitName}
                            splits={speedrunInfo.splits[`${speedrunInfo.timerMode}Splits` as 'ExpertSplits' | "BeginnerSplits"]}
                            totTime={speedrunInfo.timeStarted.getTime()}
                            done={speedrunInfo.splits.doneSplits}
                        />
                        : <div />
                    }
                </div>
            }
            </div>
        )
}


export default SingleGame