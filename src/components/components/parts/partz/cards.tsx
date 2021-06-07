import {Component, h} from "preact"
import { Color, colorMap, Fill, setCard } from "../../gameHelper"

export class Squigly extends Component<{
    card:setCard
}, {}> {
    render() {
        return (
            this.props.card[0] == '1' ?
                <path
                    fill={fillGen(this.props.card[3], this.props.card[2])}
                    stroke={colorMap[this.props.card[2]]}
                    strokeWidth="2"
                    transform="translate(-115,-243) scale(2.1)"
                    d="m 119,174 c 7,0 12,-6 17,-9 7,-4 15,2 16,9 2,11 -6,22 -15,27 -11,6 -24,4 -36,0 -7,-3 -15,-2 -22,2 -4,2 -8,6 -12,6 -5,0 -8,-5 -9,-9 -2,-9 1,-19 6,-26.5 4,-5 11,-8 18,-8 9,0 18,4 26.6,7 3,1 7,2 10,2 z"
                />
            : this.props.card[0] == '2' ?
                <g>
                    <path
                        fill={fillGen(this.props.card[3], this.props.card[2])}
                        stroke={colorMap[this.props.card[2]]}
                        strokeWidth="2"
                        transform="translate(-115,-295) scale(2.1)"
                        d="m 119,174 c 7,0 12,-6 17,-9 7,-4 15,2 16,9 2,11 -6,22 -15,27 -11,6 -24,4 -36,0 -7,-3 -15,-2 -22,2 -4,2 -8,6 -12,6 -5,0 -8,-5 -9,-9 -2,-9 1,-19 6,-26.5 4,-5 11,-8 18,-8 9,0 18,4 26.6,7 3,1 7,2 10,2 z"
                    />
                    <path
                        fill={fillGen(this.props.card[3], this.props.card[2])}
                        stroke={colorMap[this.props.card[2]]}
                        strokeWidth="2"
                        transform="translate(-115,-195) scale(2.1)"
                        d="m 119,174 c 7,0 12,-6 17,-9 7,-4 15,2 16,9 2,11 -6,22 -15,27 -11,6 -24,4 -36,0 -7,-3 -15,-2 -22,2 -4,2 -8,6 -12,6 -5,0 -8,-5 -9,-9 -2,-9 1,-19 6,-26.5 4,-5 11,-8 18,-8 9,0 18,4 26.6,7 3,1 7,2 10,2 z"
                    />
                </g>
            :
            <g>
                <path
                    fill={fillGen(this.props.card[3], this.props.card[2])}
                    stroke={colorMap[this.props.card[2]]}
                    strokeWidth="2"
                    transform="translate(-115,-343) scale(2.1)"
                    d="m 119,174 c 7,0 12,-6 17,-9 7,-4 15,2 16,9 2,11 -6,22 -15,27 -11,6 -24,4 -36,0 -7,-3 -15,-2 -22,2 -4,2 -8,6 -12,6 -5,0 -8,-5 -9,-9 -2,-9 1,-19 6,-26.5 4,-5 11,-8 18,-8 9,0 18,4 26.6,7 3,1 7,2 10,2 z"
                />
                <path
                    fill={fillGen(this.props.card[3], this.props.card[2])}
                    stroke={colorMap[this.props.card[2]]}
                    strokeWidth="2"
                    transform="translate(-115,-243) scale(2.1)"
                    d="m 119,174 c 7,0 12,-6 17,-9 7,-4 15,2 16,9 2,11 -6,22 -15,27 -11,6 -24,4 -36,0 -7,-3 -15,-2 -22,2 -4,2 -8,6 -12,6 -5,0 -8,-5 -9,-9 -2,-9 1,-19 6,-26.5 4,-5 11,-8 18,-8 9,0 18,4 26.6,7 3,1 7,2 10,2 z"
                />
                <path
                    fill={fillGen(this.props.card[3], this.props.card[2])}
                    stroke={colorMap[this.props.card[2]]}
                    strokeWidth="2"
                    transform="translate(-115,-143) scale(2.1)"
                    d="m 119,174 c 7,0 12,-6 17,-9 7,-4 15,2 16,9 2,11 -6,22 -15,27 -11,6 -24,4 -36,0 -7,-3 -15,-2 -22,2 -4,2 -8,6 -12,6 -5,0 -8,-5 -9,-9 -2,-9 1,-19 6,-26.5 4,-5 11,-8 18,-8 9,0 18,4 26.6,7 3,1 7,2 10,2 z"
                />
            </g>
        )
    }
}

export class Oval extends Component<{
    card:setCard
}, {}> {
    render() {
        return (
            this.props.card[0] == '1' ?
                <rect
                    width="180" height="90"
                    rx="40" ry="100"
                    fill={fillGen(this.props.card[3], this.props.card[2])}
                    stroke={colorMap[this.props.card[2]]}
                    strokeWidth="4"
                    transform="translate(15,98)"
                />
            : this.props.card[0] == '2' ?
            <g>
                <rect
                    width="180" height="90"
                    rx="40" ry="100"
                    fill={fillGen(this.props.card[3], this.props.card[2])}
                    stroke={colorMap[this.props.card[2]]}
                    strokeWidth="4"
                    transform="translate(15,43)"
                />
                <rect
                    width="180" height="90"
                    rx="40" ry="100"
                    fill={fillGen(this.props.card[3], this.props.card[2])}
                    stroke={colorMap[this.props.card[2]]}
                    strokeWidth="4"
                    transform="translate(15,143)"
                />
            </g> :
            <g>
                <rect
                    width="180" height="90"
                    rx="40" ry="100"
                    fill={fillGen(this.props.card[3], this.props.card[2])}
                    stroke={colorMap[this.props.card[2]]}
                    strokeWidth="4"
                    transform="translate(15,2)"
                />
                <rect
                    width="180" height="90"
                    rx="40" ry="100"
                    fill={fillGen(this.props.card[3], this.props.card[2])}
                    stroke={colorMap[this.props.card[2]]}
                    strokeWidth="4"
                    transform="translate(15,98)"
                />
                <rect
                    width="180" height="90"
                    rx="40" ry="100"
                    fill={fillGen(this.props.card[3], this.props.card[2])}
                    stroke={colorMap[this.props.card[2]]}
                    strokeWidth="4"
                    transform="translate(15,194)"
                />
            </g>
        )
    }
}

function fillGen(type:string, color:string) {
    return type == 's' ?
            `url(#p${color})` :
            type == 'e' ?
            'transparent' :
            colorMap[color]
}

export class Rhombus extends Component<{
    card:setCard
}, {}> {
    render() {
        return (
            this.props.card[0] == '1' ?
                <polyline
                points="105,70 203,105 105,140 7,105 105,70"
                fill={fillGen(this.props.card[3], this.props.card[2])}
                stroke={colorMap[this.props.card[2]]}
                strokeWidth="2"
                transform="translate(0,40)" /> :
            this.props.card[0] == '2' ?
            <g>
                <polyline
                points="105,70 203,105 105,140 7,105 105,70"
                fill={fillGen(this.props.card[3], this.props.card[2])}
                stroke={colorMap[this.props.card[2]]}
                strokeWidth="2"
                transform="translate(0,-10)" />
                <polyline
                points="105,70 203,105 105,140 7,105 105,70"
                fill={fillGen(this.props.card[3], this.props.card[2])}
                stroke={colorMap[this.props.card[2]]}
                strokeWidth="2"
                transform="translate(0,90)" />
            </g>
            :
            <g>
                <polyline
                points="105,70 203,105 105,140 7,105 105,70"
                fill={fillGen(this.props.card[3], this.props.card[2])}
                stroke={colorMap[this.props.card[2]]}
                strokeWidth="2"
                transform="translate(0,-62)" />
                <polyline
                points="105,70 203,105 105,140 7,105 105,70"
                fill={fillGen(this.props.card[3], this.props.card[2])}
                stroke={colorMap[this.props.card[2]]}
                strokeWidth="2"
                transform="translate(0,40)" />
                <polyline
                points="105,70 203,105 105,140 7,105 105,70"
                fill={fillGen(this.props.card[3], this.props.card[2])}
                stroke={colorMap[this.props.card[2]]}
                strokeWidth="2"
                transform="translate(0,140)" />
            </g>
        )
    }
}