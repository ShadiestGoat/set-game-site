import {Component, h} from "preact"
import { Color, colorMap, Fill } from "../../gameHelper"

export class Squigly extends Component<{
    stylez:string,
    transform:string
}, {}> {
    render() {
        return (
            <path
            style={this.props.stylez}
            transform={this.props.transform}
            d="m 119,174 c 7,0 12,-6 17,-9 7,-4 15,2 16,9 2,11 -6,22 -15,27 -11,6 -24,4 -36,0 -7,-3 -15,-2 -22,2 -4,2 -8,6 -12,6 -5,0 -8,-5 -9,-9 -2,-9 1,-19 6,-26.5 4,-5 11,-8 18,-8 9,0 18,4 26.6,7 3,1 7,2 10,2 z"/>
        )
    }
}
export class Oval extends Component<{
    stylez:string,
    transform:string
}, {}> {
    render() {
        return (
            <rect
                width="180" height="90"
                rx="40" ry="100" style={this.props.stylez} transform={this.props.transform}
                />
        )
    }
}
export class Rhombus extends Component<{
    stylez:string,
    transform:string
}, {}> {
    render() {
        return (
            <polyline
            points="105,70 203,105 105,140 7,105 105,70"
            style={this.props.stylez} transform={this.props.transform} />
        )
    }
}