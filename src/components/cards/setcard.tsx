import { FunctionComponent, h } from "preact"
import { colorMap, setCard } from "../gameHelper"
import style from "./style.css"

const stroke = "3.5"
function fillGen(type: string, color: string) {
    return (
        type == 's' ?
        `url(#p${color})` :
        type == 'e' ?
        'transparent' :
        colorMap[color]
    )
}

const Squigly: FunctionComponent<{card: setCard}> = ({card}) => {
    const d = "m 129,23.5 c 14.6,0 26,-13.6 36,-20 14.6,-8 31,4 33.4,19 4,23 -12.5,46 -31,56 -23,12.5 -50,8 -75,0 -14.6,-6 -31,-4 -46,4 -8,4 -17,12.5 -25,12.5 -10.4,0 -17,-10.4 -19,-19 C -2,58 4.4,37 15,21.4 23,11 38,5 52.4,5 c 19,0 37.5,8 55.5,14.6 6,2 14.6,4 21,4 z"
    return (
        card[0] == '1' ?
        <path
            fill={fillGen(card[3], card[2])}
            stroke={colorMap[card[2]]}
            strokeWidth={stroke}
            transform="translate(5, 100)"
            d={d}
        />
    : card[0] == '2' ?
        <g>
            <path
                fill={fillGen(card[3], card[2])}
                stroke={colorMap[card[2]]}
                strokeWidth={stroke}
                transform="translate(5, 41)"
                d={d}
            />
            <path
                fill={fillGen(card[3], card[2])}
                stroke={colorMap[card[2]]}
                strokeWidth={stroke}
                transform="translate(5, 153)"
                d={d}
            />
        </g>
    :
    <g>
        <path
            fill={fillGen(card[3], card[2])}
            stroke={colorMap[card[2]]}
            strokeWidth={stroke}
            transform="translate(5, 4)"
            d={d}
        />
        <path
            fill={fillGen(card[3], card[2])}
            stroke={colorMap[card[2]]}
            strokeWidth={stroke}
            transform="translate(5, 100)"
            d={d}
        />
        <path
            fill={fillGen(card[3], card[2])}
            stroke={colorMap[card[2]]}
            strokeWidth={stroke}
            transform="translate(5, 196)"
            d={d}
        />
    </g>
    )
}
const Oval: FunctionComponent<{card: setCard}> = ({card}) => (
    card[0] == '1' ?
        <rect
            width="180" height="90"
            rx="40" ry="100"
            fill={fillGen(card[3], card[2])}
            stroke={colorMap[card[2]]}
            strokeWidth={stroke}
            transform="translate(15,98)"
        />
    : card[0] == '2' ?
    <g>
        <rect
            width="180" height="90"
            rx="40" ry="100"
            fill={fillGen(card[3], card[2])}
            stroke={colorMap[card[2]]}
            strokeWidth={stroke}
            transform="translate(15,43)"
        />
        <rect
            width="180" height="90"
            rx="40" ry="100"
            fill={fillGen(card[3], card[2])}
            stroke={colorMap[card[2]]}
            strokeWidth={stroke}
            transform="translate(15,143)"
        />
    </g> :
    <g>
        <rect
            width="180" height="90"
            rx="40" ry="100"
            fill={fillGen(card[3], card[2])}
            stroke={colorMap[card[2]]}
            strokeWidth={stroke}
            transform="translate(15,2)"
        />
        <rect
            width="180" height="90"
            rx="40" ry="100"
            fill={fillGen(card[3], card[2])}
            stroke={colorMap[card[2]]}
            strokeWidth={stroke}
            transform="translate(15,98)"
        />
        <rect
            width="180" height="90"
            rx="40" ry="100"
            fill={fillGen(card[3], card[2])}
            stroke={colorMap[card[2]]}
            strokeWidth={stroke}
            transform="translate(15,194)"
        />
    </g>
)
const Rhombus: FunctionComponent<{card: setCard}> = ({ card }) => {
    const p = "105,70 200,105 105,140 10,105 105,70"
    return (
        card[0] == '1' ? <polyline
        points={p}
        fill={fillGen(card[3], card[2])}
        stroke={colorMap[card[2]]}
        strokeWidth={stroke}
        transform="translate(0,40)" /> :
        card[0] == '2' ? <g>
        <polyline
        points={p}
        fill={fillGen(card[3], card[2])}
        stroke={colorMap[card[2]]}
        strokeWidth={stroke}
        transform="translate(0,-10)" />
        <polyline
        points={p}
        fill={fillGen(card[3], card[2])}
        stroke={colorMap[card[2]]}
        strokeWidth={stroke}
        transform="translate(0,90)" />
        </g>:<g>
        <polyline
        points={p}
        fill={fillGen(card[3], card[2])}
        stroke={colorMap[card[2]]}
        strokeWidth={stroke}
        transform="translate(0,-62)" />
        <polyline
        points={p}
        fill={fillGen(card[3], card[2])}
        stroke={colorMap[card[2]]}
        strokeWidth={stroke}
        transform="translate(0,40)" />
        <polyline
        points={p}
        fill={fillGen(card[3], card[2])}
        stroke={colorMap[card[2]]}
        strokeWidth={stroke}
        transform="translate(0,140)" />
        </g>
    )
}
const SetCardGen: FunctionComponent<{card: setCard | "ghost", selected: boolean, onClick:(e:h.JSX.TargetedMouseEvent<HTMLDivElement>) => void}> = ({card, selected, onClick}) => {
    if (card == "ghost") {
        return (
            <div class={style.gameCard} />
        )
    }
    return (<div class={`${style.gameCard} ${style.gameCardNormal} ${selected ? style.cardSelected : ''}`} id={card} onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 210 300">{card[1] == 'o' ? <Oval card={card} /> : card[1] == 'r' ? <Rhombus card={card} /> : <Squigly card={card} />}</svg>
    </div>)
}

export default SetCardGen