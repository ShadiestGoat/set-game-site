import {Component, h} from "preact"
import { timeFormat } from "../../tools"
import { Split } from "./gameHelper"


// todo mac support thing

type Props = {
    splits: Split[];
    curSplitTime: number;
    splitName: string;
    done: {[key: string]: number};
    totTime: number;
}

type State = {
    doneSplits: {[key: string]: number};
    splits: Split[];
    buildCache: {[key: string]: JSX.Element};
    curSet: 0;
    burner: boolean;
}

export class LiveSplit extends Component<Props, State> {
    interval: NodeJS.Timeout
    timeFormat: typeof timeFormat
    constructor(props: Props) {
        super(props)
        this.state = {
            buildCache: {},
            doneSplits: {},
            splits: this.props.splits,
            curSet: 0,
            burner: false
        }
        this.timeFormat = timeFormat.bind(this)
        this.interval = setInterval(() => {this.setState({burner: !this.state.burner})}, 59)
    }
    componentDidMount() {
        this.interval = setInterval(() => {this.setState({burner: !this.state.burner})}, 59)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const time = Date.now()
        let tottime = 0
        return <div class="timer-wrapper">
            <div class="timer-heading">
                Set Game <i>Speedrun</i>
            </div>
        {
            this.props.splits.map((val) => {
                const done = this.props.done[val.name]
                const displaytime = done ? true : val.name == this.props.splitName
                const timetodisplay = done ? done : time - this.props.totTime

                tottime+=val.best
                return <div key={val.name} class="timer-row" style={this.props.splits.indexOf(val) == (this.props.splits.length - 1) ? {borderBottom: 0, margin: 0} : {}}>
                    <div class="timer-t-name">
                        {val.name}
                    </div>
                    <div class={`timer-t-time`} style={{color: timetodisplay > tottime ? "red" : "green"}}>
                        {displaytime ? (tottime < timetodisplay ? "+" : "-") + timeFormat(Math.abs(tottime - timetodisplay)) : ""}
                    </div>
                    <div class="timer-t-best">
                        {timeFormat(tottime)}
                    </div>
                </div>
            })
        }
        <div class="timer-row" style={{borderBottom: 0, margin: 0, flexDirection:"row-reverse", textAlign: "right"}}>
            <h1 style={{display: "flex", }}>{this.timeFormat(time - this.props.totTime)}</h1>
        </div>
    </div>
    }
}