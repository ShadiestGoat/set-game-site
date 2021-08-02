import { Fragment, h, FunctionComponent } from "preact"
import SetCardGen from "../cards/setcard"
import { setCard } from "../gameHelper"
// todo for V1:
// - multiplayer
// - full mobile support (through using css, not device detect)

type PropsG = {
    cols: number,
    rawBoard: setCard[],
    selectedCards: setCard[],
    selectF: (card:setCard) => void | Promise<void>
}

const GameBoard:FunctionComponent<PropsG> = ({rawBoard, cols, selectedCards, selectF}) => {
    let LastRow = 0
    const board:setCard[][] = []
    let row:setCard[] = []
    rawBoard.forEach((card, index) => {
        const rowI = Math.floor(index / cols)
        if (rowI != LastRow) {
            board.push(row)
            row = []
        }
        row.push(card)
        LastRow = rowI
    })
    board.push(row)


    return <Fragment> {board.map((row) => {
        return (
            <div
                key={`row${row[0]}${row[1]}${row[2]}${row[3] ?? ''}${row[4] ?? ''}${row[5] ?? ''}`}
                style={{order: board.indexOf(row)}}>
                {row.map((card) => {if (!card) return
                    return <SetCardGen key={card} card={card} onClick={(e) => {if (e.button == 0) selectF(card)}} selected={selectedCards.includes(card)} />
                })}
                {row.length == 4 ? <SetCardGen onClick={() => {return}} card="ghost" selected={false} /> : <Fragment />}
                </div>
            )
        })
    } 
    </Fragment>
}

export default GameBoard