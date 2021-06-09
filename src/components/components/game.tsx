import {Component, h, Fragment} from "preact"
import { rand } from "../../tools"
import { FullDeck, keyMap, setCard } from "./gameHelper"
import { Oval, Rhombus, Squigly } from "./parts/partz/cards"
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
            wrongs: 0
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
            boardCache: this.genBoard(rawBoards, cols, [])
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
        return `${time.getHours() -1 ? ((time.getHours() -1).toString().length == 1 ? `0:${time.getHours() -1}` : time.getHours() -1) + ':' : ''}${time.getMinutes() ? (time.getMinutes().toString().length == 1 ? `0${time.getMinutes()}` : time.getMinutes()) : '00'}:${time.getSeconds().toString().length == 1 ? `0${time.getSeconds()}` : time.getSeconds()}${ms ? ':' + time.getMilliseconds() : ''}`
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
        setInterval(() => {
            if (this.state.won) return
            this.setState({burner: this.state.burner + 1})
        }, 1000)
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
        // this.setState({selected: newSel, selectedCards: sel, hints: this.state.hints + 1, boardCache: this.genBoard(this.state.board, this.state.cols, sel)})
        this.handleSetSelector(this.state.board[adr[0]])
        this.handleSetSelector(this.state.board[adr[1]])
        this.handleSetSelector(this.state.board[adr[2]])
    }

    win() {
        this.setState({
            won: true,
            timeFin: new Date()
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
        this.setState({selected: newSel, selectedCards: selected, setsFound:found, deck:newDeck, board: board, cols: newCols, boardCache: this.genBoard(board, newCols, selected)})
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
                            <div className={`game-card ${(selectedCards).includes(card) ? 'card-selected' : ''}`} id={card} onClick={(e) => {if (e.button == 0) this.handleSetSelector(card)}}>
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
                this.state.started ?
                this.state.won ?
                    <div className="infoCol">
                        <h1>You did it! Congrats!</h1>
                        <h1>Time: {this.parseDiff(this.state.timeStarted, this.state.timeFin as Date)}</h1>
                        <h1>Hints used: {this.state.hints}</h1>
                        <h1>Wrong guesses: {this.state.wrongs}</h1>

                        <div className="yahhoo" style={{marginTop: 200}}>
                            <button className="btn btn-p" onClick={(e) => {
                            e.preventDefault()
                            e.button == 0 ? this.setState( this.initer() ) : {}
                            }}>Play again</button>
                            <button className="btn btn-p" onClick={(e) => {
                            e.preventDefault()
                            e.button == 0 ? this.setState( this.initer() ) : {}
                            }}>You have no choice</button>
                            <button className="btn btn-p" onClick={(e) => {
                            e.preventDefault()
                            e.button == 0 ? this.setState( this.initer() ) : {}
                            }}>No, but like you really have 0 choice here</button>
                            <button className="btn btn-p" onClick={(e) => {
                            e.preventDefault()
                            e.button == 0 ? this.setState( this.initer() ) : {}
                            }}>You will play again, I know it</button>
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
                    <p className="text-awhite">Time Used: {this.parseDiff(this.state.timeStarted, new Date, false)}</p>
                    <button className="btn btn-p" style={{width: '100%', marginBottom: '3vh', marginTop: '3vh'}} onClick={(e) => {
                        if (e.button == 0) {
                            this.hint()
                        }
                    }} title="Hint (for weaklings)">Hint</button>
                    <button className="btn btn-d" style={{marginBottom: "4vh", width: "100%"}} onClick={(e) => {
                        if (e.button == 0) {
                            this.setState(this.initer())
                        }
                    }} title="Restart the game (r)" >Restart</button>
                    <p className="warning">{this.state.hintErr}</p>
                    <div className="helperbtn-w" title="Help!" onClick={(e) => {
                        if (e.button != 0) return
                        this.setState({started: false})
                    }}>
                        <button className="btn help-btn btn-d">?</button>
                    </div>
                    </div>
                    <div className="gameBoard">
                    {this.state.boardCache}
                    </div>
                </div>
                : <div className="AccepterBby">
                    <h1>Hello and welcome to Set!</h1>
                    <h3>The rules are simple; You have to find all the sets, as fast as possible! <br />
                    A "set" is a group of 3 cards, which all follow a specific pattern. <br />
                    Each card has 4 properties: shape, color, number and fill type.<br />
                    The rule for a pattern is that if 2 cards share a property, <br />the other one must have that property too.</h3>
                    <button autofocus={true} className="btn btn-d center" onClick={(e) => {
                        if (e.button != 0) return
                        this.setState({started: true})
                    }}>Yessir!</button>
                </div>
            }
            </div>
        )
    }
}