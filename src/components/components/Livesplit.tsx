import {Component, h} from "preact"
import { timeFormat } from "../../tools"
import { Split } from "./gameHelper"


// todo mac support thing

type Props = {
    splits: Split[]
    curSplitTime: number,
    splitName: string,
    done: {[key:string]: number}
    totTime: number
}

type State = {
    doneSplits: {[key:string]: number},
    splits: Split[],
    buildCache: {[key:string]: JSX.Element},
    curSet: 0
    burner: boolean
}

export class LiveSplit extends Component<Props, State> {
    interval?: NodeJS.Timeout
    timeFormat: typeof timeFormat
    constructor(props:Props) {
        super(props)
        let splits = this.props.splits
        this.state = {
            buildCache: {},
            doneSplits: {},
            splits: splits,
            curSet: 0,
            burner: false
        }
        this.timeFormat = timeFormat.bind(this)
    }
    componentDidMount() {
        this.interval = setInterval(() => {this.setState({burner: !this.state.burner})}, 9)
    }

    componentWillUnmount() {
        // @ts-ignore
        clearInterval(this.interval);
    }

    render() {
        const time = Date.now()
        let tottime = 0
        return <div className="timer-wrapper">
            <div className="timer-heading">
                Set Game <i>Speedrun</i>
            </div>
        {
            this.props.splits.map((val) => {
                let done = this.props.done[val.name]
                let displaytime = done ? true : val.name == this.props.splitName ? true : false

                let timetodisplay = done ? done : time - this.props.totTime
                tottime+=val.best
                return <div className="timer-row" style={this.props.splits.indexOf(val) == (this.props.splits.length - 1) ? {borderBottom: 0, margin: 0} : {}}>
                    <div className="timer-t-name">
                        {val.name}
                    </div>
                    <div className={`timer-t-time`} style={{color: timetodisplay > val.best ? "red" : "green"}}>
                        {displaytime ? (val.best < timetodisplay ? "+" : "-") + timeFormat(Math.abs(val.best - timetodisplay)) : ""}
                    </div>
                    <div className="timer-t-best">
                        {timeFormat(tottime)}
                    </div>
                </div>
            })
        }
        <div className="timer-row" style={{borderBottom: 0, margin: 0, flexDirection:"row-reverse", textAlign: "right"}}>
            <h1 style={{display: "flex", }}>{this.timeFormat(time - this.props.totTime)}</h1>
        </div>
    </div>
    }
}