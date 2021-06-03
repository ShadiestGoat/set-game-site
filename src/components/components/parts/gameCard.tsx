import {Component, h} from "preact"
import { arrayThing, colorMap, setBoard, setCard, Shape, transformations } from "../gameHelper";
import { Oval, Rhombus, Squigly } from "./partz/cards";

export class SetCard extends Component<{
    card:setCard,
}, {
    selected:boolean
}> {
    constructor(props:any) {
        super(props)
        this.state = {
            selected: false
        }
    }
    render() {
        // @ts-ignore
        const style = `fill:${this.props.card[3] == 's' ? `url(#p${this.props.card[2]})` : this.props.card[3] == 'e' ? 'transparent' : colorMap[this.props.card[2]]};stroke:${colorMap[this.props.card[2]]};stroke-width:2;`
        const transform = this.props.card[0] + this.props.card[1]

        return (
            <div className="game-card" onClick={(e) => {if (e.button == 0) this.setState({selected: !this.state.selected})}}>
                <div className="game-card-wrapper" id={this.props.card} style={{background: this.state.selected ? 'yellow' : 'wheat'}}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="100%"
                        viewBox="0 0 210 360">
                    {
                        arrayThing(this.props.card[0]).map((val) => {
                                return this.props.card[1] == "o" ?
                                // @ts-ignore
                                <Oval stylez={style} transform={transformations[transform + val]} />
                                : this.props.card[1] == "r" ?
                                // @ts-ignore
                                <Rhombus transform={transformations[transform + val]} stylez={style} /> :
                                // @ts-ignore
                                <Squigly stylez={style} transform={transformations[transform + val]} />
                            })
                    }
                    </svg>
                </div>
            </div>
        )
    }
}