import {Component, h} from "preact"
import { setCard } from "../gameHelper"
import { Oval, Rhombus, Squigly } from "./partz/cards"



export class SetCardGen extends Component<{
        card:setCard
    }> {
    render() {

        return <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 210 300">
        {
            this.props.card[1] == 'o' ?
            <Oval card={this.props.card} />
            : this.props.card[1] == 'r' ?
            <Rhombus card={this.props.card} />
            :
            <Squigly card={this.props.card} />
        }
    </svg>
    }
}