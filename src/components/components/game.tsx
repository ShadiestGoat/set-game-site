import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome } from "@fortawesome/free-solid-svg-icons"
import { Component, Fragment, h } from "preact"
import { rand, timeFormat } from "../../tools"
import { FullDeck, keyMap, setCard, Split, splitsB, splitsE } from "./gameHelper"
import { LiveSplit } from "./Livesplit"
import { SetCardGen } from "./parts/setcard"
import { SvgDefs } from "./svgDefs"


type State = {
    setsFound: [setCard, setCard, setCard][],
    cols: number,
    deck: setCard[],
    board: setCard[],
    selected: boolean[],
    selectedCards: setCard[],
    hintErr: string,
    timeStarted:Date,
    hints: number,
    wrongs: number,
    timeFin: Date | false,
    burner: number
    boardCache: JSX.Element
    won: boolean
    started: boolean
    splits: {
        doneSplits: {[key:string]:number}
        CurSplitName: string,
        BeginnerSplits: Split[],
        ExpertSplits: Split[],
        splitTimeS: number
    },
    displayClock: boolean,
    timerMode: "Expert" | "Beginner"
}

export class Game extends Component<{}, State> {
    constructor(props:any) {
        super(props)
        this.initer = this.initer.bind(this)
        this.findNeededCard = this.findNeededCard.bind(this)
        this.findSet = this.findSet.bind(this)
        this.correctSet = this.correctSet.bind(this)
        this.hint = this.hint.bind(this)
        this.state = {
            started: true,
            board: [],
            boardCache: this.genBoard(['1oge', '1oge', '1oge', '1oge',
                                        '1oge', '1oge', '1oge', '1oge',
                                    '1oge', '1oge', '1oge', '1oge'], 4, []),
            burner: 0,
            cols: 0,
            deck: [
            '1oge', '1oge', '1oge', '1oge',
            '1oge', '1oge', '1oge', '1oge',
            '1oge', '1oge', '1oge', '1oge',
            '1oge', '1oge', '1oge', '1oge',
            '1oge', '1oge', '1oge', '1oge',
            '1oge', '1oge', '1oge', '1oge',
            '1oge', '1oge', '1oge', '1oge',
            '1oge', '1oge', '1oge', '1oge',
            '1oge', '1oge', '1oge', '1oge',
            '1oge', '1oge', '1oge', '1oge',
            '1oge', '1oge', '1oge', '1oge',
            '1oge', '1oge', '1oge', '1oge',
            '1oge', '1oge', '1oge', '1oge',
            '1oge', '1oge', '1oge', '1oge',
            '1oge', '1oge', '1oge', '1oge',
            '1oge', '1oge', '1oge', '1oge',
            '1oge', '1oge', '1oge', '1oge', '1oge'
        ],
            hintErr: '',
            hints: 0,
            selected: [],
            selectedCards: [],
            setsFound: [],
            timeFin: false,
            timeStarted: new Date(),
            won: false,
            wrongs: 0,
            splits: {
                BeginnerSplits: splitsB,
                ExpertSplits: splitsE,
                CurSplitName: splitsB[0].name,
                doneSplits: {},
                splitTimeS: Date.now()
            },
            displayClock: true,
            timerMode: "Beginner"
        }
    }

    initer():State {
        let curDeck:setCard[] = []
        for (let i of FullDeck) {
            curDeck.push(i)
        }
        let rawBoards:setCard[] = []
        let selected:boolean[]  = []
        let cols = 4
        for (let i = 0; i < 12; i++) {
            const index = rand(0, curDeck.length - 1)
            rawBoards.push(curDeck[index])
            curDeck.splice(index, 1)
            selected.push(false)
        }

        if (!this.findSet(rawBoards)) {
            const NewBoardData = this.addRow(false, rawBoards, curDeck, 4)
            curDeck = NewBoardData.deck
            rawBoards = NewBoardData.board
            cols = NewBoardData.cols

            if (!this.findSet(rawBoards)) {
                const _NewBoardData = this.addRow(false, rawBoards, curDeck, 4)
                curDeck = _NewBoardData.deck
                rawBoards = _NewBoardData.board
                cols = _NewBoardData.cols
            }
        }
        return {
            deck: curDeck,
            board: rawBoards,
            cols: cols,
            setsFound: [],
            selected: selected,
            selectedCards: [],
            hintErr: '',
            timeStarted: new Date(),
            won: false,
            hints: 0,
            wrongs: 0,
            timeFin: false,
            burner: 0,
            started: true,
            boardCache: this.genBoard(rawBoards, cols, []),
            splits: {
                BeginnerSplits: this.state.splits.BeginnerSplits,
                ExpertSplits: this.state.splits.ExpertSplits,
                CurSplitName: splitsB[0].name,
                doneSplits: {},
                splitTimeS: Date.now()
            },
            displayClock: this.state.displayClock,
            timerMode: this.state.timerMode
        }
    }

    addRow(state:boolean = true, board:setCard[] = this.state.board, newDeck = this.state.deck, newCols:number = this.state.cols):{
        deck: setCard[],
        board: setCard[],
        cols: number
    } {
        if (newCols == 6) {
            return {
                deck: newDeck,
                board: board,
                cols: newCols
            }
        }
        newCols++
        for (let i = 0; i < 3; i++) {
            const index = rand(0, newDeck.length - 1)
            board.splice((newCols *(i+1)) - 1, 0, newDeck[index])
            newDeck.splice(index, 1)
        }

        if (state) {
            this.setState({
                deck: newDeck,
                board: board,
                cols: newCols
            })
        }
        return {
            deck: newDeck,
            board: board,
            cols: newCols
        }
    }

    parseDiff(start:Date, stop:Date, ms:boolean = true) {
        const totTime = stop.getTime() - start.getTime()
        const time = new Date(totTime)
        return timeFormat(time, ms)
    }

    findSet(raw:setCard[]):(false | [number, number, number]) {
        for (let card of raw) {
            for (let card2 of raw) {
                const needed = this.findNeededCard(card, card2)
                if (needed && raw.includes(needed)) {
                    let coords:[number, number, number] = [raw.indexOf(card), raw.indexOf(card2), raw.indexOf(needed)]
                    return coords
                } else {continue}
            }
        }
        return false
    }

    componentDidMount() {
        document.addEventListener('keydown', (e) => {
            if (e.key == 'r' && !e.ctrlKey) {
                this.setState(this.initer())
            } else if (Object.keys(keyMap).includes(e.key)) {
                const board = this.boardParser()
                const card = board[keyMap[e.key][0]][keyMap[e.key][1]]
                this.handleSetSelector(card)
            }
        })
        this.setState(this.initer())
    }

    findNeededCard(card1:setCard, card2:setCard):(setCard | false) {
        let charN = 0
        let needed = ''
        if (card1 && card2) {
            for (let char of card2) {
                if (char == card1[charN]) {
                    needed += char
                } else {
                    const test = (FullDeck.filter((val) => {
                        return !([char, card1[charN]].includes(val[charN]))
                    }))[0]
                    if (!test) {
                        if (this.state.deck.length != 0) console.log('diagnosis at findNeededCard():' + JSON.stringify(test) + ' ' + card1 + ' ' + card2 + ' ' + charN + ' ' + needed)
                        return false
                    }
                    needed += test[charN]
                }
                if ([card1, card2].includes(needed as setCard)) return false
                charN++
            }
        }
        return needed.length == 0 ? false : needed as setCard
    }

    correctSet(set1:setCard, set2:setCard, set3:setCard) {
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
        } else {
            return true
        }
    }

    hint() {
        console.log("A hint was used!")
        const adr = this.findSet(this.state.board)
        let newSel:boolean[] = []
        let sel:any[] = []
        for (let i = 0; i < this.state.cols * 3; i++) {
            newSel.push(false)
        }
        if (!adr) {this.setState({hintErr: "No sets????"}); return}
        newSel[adr[0]] = true
        newSel[adr[1]] = true
        sel = [this.state.board[adr[0]], this.state.board[adr[1]]]
        this.setState({selected: newSel, selectedCards: sel, hints: this.state.hints + 1, boardCache: this.genBoard(this.state.board, this.state.cols, sel)})
        // this.handleSetSelector(this.state.board[adr[0]])
        // this.handleSetSelector(this.state.board[adr[1]])
        // this.handleSetSelector(this.state.board[adr[2]])
    }

    win() {
        const time = new Date()
        console.log(this.state.hints ? "Hints were used" : this.parseDiff(this.state.timeStarted, time))
        let splits = this.state.splits
        splits.doneSplits["Game finished"] = time.getTime() - splits.splitTimeS
        console.log(splits.doneSplits)
        if (this.state.hints) {
            // @ts-ignore
            splits[`${this.state.timerMode}Splits`] = splits[`${this.state.timerMode}Splits`].map((val:Split) => {
                return {
                    fin: val.fin,
                    name: val.name,
                    best: splits.doneSplits[val.name] > val.best ? splits.doneSplits[val.name] : val.best,
                }
            })
        }
        splits.doneSplits = {}

        this.setState({
            won: true,
            timeFin: time,
            splits: splits
        })
    }

    handleSetSelector(card:setCard) {
        let newSel = this.state.selected
        const index = this.state.board.indexOf(card)
        newSel[index] = !newSel[index]
        let found = this.state.setsFound
        let selected = this.state.selectedCards
        let newDeck = this.state.deck
        let newCols = this.state.cols
        let splits = this.state.splits
        if (newSel[index]) {
            selected.push(card)
        } else {
            selected.splice(selected.indexOf(card), 1)
        }

        let board = this.state.board
        if (selected.length == 3) {
            const oldSel = selected
            selected = []
            let selll:boolean[] = []
            for (let item of newSel) selll.push(false)
            newSel = selll
            if (this.correctSet(this.state.selectedCards[0], this.state.selectedCards[1], card)) {
                found.push([this.state.selectedCards[0], this.state.selectedCards[1], card])
                let info:{
                    [key:string]: number
                } = {
                    card1: board.indexOf(card),
                }
                let typeatm = 'card2'
                for (let cardd of board) {
                    if (cardd == card) continue
                    if (oldSel.includes(cardd)) {
                        info[typeatm] = board.indexOf(cardd)
                        typeatm =  'card3'
                    }
                }
                if (board.length == 12) {
                    for (let i of [1, 2, 3]) {
                        const curCard = 'card' + i.toString()
                        const newCard = rand(0, newDeck.length - 1)
                        board[info[curCard]] = newDeck[newCard]
                        newDeck.splice(newCard, 1)
                    }
                } else {
                    board.splice(info.card1, 1)
                    board.splice(board.indexOf(oldSel[0]), 1)
                    board.splice(board.indexOf(oldSel[1]), 1)
                    newCols--
                }
                // splits[`${this.state.timerMode}Splits`]
                const typeTT = this.state.timerMode
                // @ts-ignore
                const indexx:number = splits[`${typeTT}Splits`].indexOf(splits[`${typeTT}Splits`].filter((val) => val.name == splits.CurSplitName)[0])
                // @ts-ignore
                if (found.length == splits[`${typeTT}Splits`][indexx].fin) {
                    // @ts-ignore
                    let nextS:Split = splits[`${typeTT}Splits`][indexx + 1]
                    if (nextS) {
                        splits.doneSplits[splits.CurSplitName] = Date.now() - splits.splitTimeS
                        console.log(splits.doneSplits[splits.CurSplitName] = Date.now() - splits.splitTimeS)
                        splits.splitTimeS = Date.now()
                        splits.CurSplitName = nextS.name
                    }
                }
                if (newDeck.length == 0) {
                    //end game logic
                    if (!this.findSet(board)) {
                        this.win()
                        return
                    }
                    board = board.filter((val) => val ? true : false)
                    if (board.length < 12) {
                        newCols--
                    }
                } else if (!this.findSet(board)) {
                    const add =this.addRow(false, board, newDeck, newCols)
                    board = add.board
                    newDeck = add.deck
                    newCols = add.cols
                    if (!this.findSet(board)) {
                        const _add =this.addRow(false, board, newDeck, newCols)
                        board = _add.board
                        newDeck = _add.deck
                        newCols = _add.cols
                    }
                }


            } else {
                this.setState({wrongs: this.state.wrongs + 1})
            }
        }
        this.setState({selected: newSel, selectedCards: selected, setsFound:found, deck:newDeck, board: board, cols: newCols, boardCache: this.genBoard(board, newCols, selected), splits: splits})
    }

    boardParser(raw:setCard[] = this.state.board, cols = this.state.cols):setCard[][] {
        let LastRow = 0
        let board:setCard[][] = []
        let row:setCard[] = []
        raw.forEach((card, index) => {
            let rowI = Math.floor(index / cols)
            if (rowI != LastRow) {
                board.push(row)
                row = []
            }
            row.push(card)
            LastRow = rowI
        })
        board.push(row)
        return board
    }

    genBoard(raw:setCard[] = this.state.board, cols: number = this.state.cols, selectedCards = this.state.selectedCards) {
        const board = this.boardParser(raw, cols)
        return <Fragment> {board.map((row) => {
                return (
                <div style={{order: board.indexOf(row)}}>
                    {row.map((card) => {if (!card) return
                        return (
                            <div style={{paddingLeft: "4px"}} className="card-wrapper">
                            <div className={`game-card ${(selectedCards).includes(card) ? 'card-selected' : ''}`} id={card} onClick={(e) => {
                                if (e.button == 0) this.handleSetSelector(card)}}>
                                <SetCardGen card={card} />
                            </div>
                            </div>
                        )
                    })}
                    </div>
                )
            })
        } </Fragment>
    }

    render() {
        return (
        <div className="scontainer game-container"
        ><SvgDefs />
            {
                this.state.won ?
                    <div className="win-s">
                        <div className="w-col">
                            <div style={{display: "flex", flexDirection: "column"}}>
                                <h1>You did it! Congrats!</h1>
                                <h1>Hints used: {this.state.hints}</h1>
                                <h1>Wrong guesses: {this.state.wrongs}</h1>
                            </div>
                        </div>
                        <div className="w-col-2">
                            {
                                Object.keys(this.state.splits.doneSplits).map((name) => {
                                    const time = this.state.splits.doneSplits[name]
                                    return (
                                        <div className="w-row">
                                            <div className="w-r-col" style={{width:"40%", textAlign: "left"}}>{timeFormat(time, true)}</div>
                                            <div className="w-r-col" style={{width:"60%", textAlign: "right"}}>{timeFormat(time, true)}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                : <div className="boardGameWrapper">
                    <div className="extra-col">
                    <h1 style={{color:"white", textAlign:"center", verticalAlign:"middle"}}>
                        Set!
                    </h1>
                    <p className="text-awhite">Found sets: {this.state.setsFound.length}</p>
                    <p className="text-awhite">Wrong Guesses: {this.state.wrongs}</p>
                    <p className="text-awhite">Deck: {this.state.deck.length}</p>
                    <p className={`${this.state.hints ? 'text-danger' : 'text-awhite'}`}>Hints used: {this.state.hints}</p>
                    <button className="btn btn-d" onClick={(e) => {
                        if (e.button == 0) {
                            this.setState(this.initer())
                        }
                    }} title="Restart the game (r)" >Restart</button>
                    <button className="btn btn-p" onClick={(e) => {
                        if (e.button == 0) {
                            this.hint()
                        }
                    }} title="Hint (for weaklings)">Hint</button>
                    {
                        this.state.hintErr ?
                        <p className="warning">{this.state.hintErr}</p> : <div/>
                    }
                    <button className="btn btn-p" onClick={(e) => {if (e.button != 0) return; this.setState({displayClock: !this.state.displayClock})}}>Toggle Clock</button>
                    <button className="btn btn-p" onClick={(e) => {if (e.button != 0) return; this.setState({timerMode: this.state.timerMode == "Beginner" ? "Expert" : "Beginner"})}}>Change Type</button>
                    <a href="/" className="btn btn-d" style={{borderRadius: "50%", padding: '0px', width: "6vw", height: "6vw", display: "flex", alignItems: "center", justifyContent: "center", margin: "auto auto", marginTop: "4vh"}}>
                        <FontAwesomeIcon style={{fontSize: '2.7vw'}} icon={faHome} /></a>

                    </div>
                    <div className="gameBoard">
                    {this.state.boardCache}
                    </div>
                    {
                        this.state.displayClock ?
                        <LiveSplit
                            curSplitTime={this.state.splits.splitTimeS}
                            splitName={this.state.splits.CurSplitName}
                            // @ts-ignore
                            splits={this.state.splits[`${this.state.timerMode}Splits`]}
                            totTime={this.state.timeStarted.getTime()}
                            done={this.state.splits.doneSplits}
                        />
                        : <div />
                    }
                </div>
            }
            </div>
        )
    }
}