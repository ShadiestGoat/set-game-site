import { FunctionComponent, h} from "preact"
import { useEffect, useRef, useState } from "preact/hooks"
import { timeFormat } from "../../tools"
import { Split } from "../gameHelper"
import style from "./style.css"

type Props = {
    splits: Split[];
    splitName: string;
    done: {[key: string]: number};
    totTime: number;
}
const LiveSplit:FunctionComponent<Props> = ({splitName, done, splits, totTime}) => {
    const [ burner, setBurner ] = useState(false);
    const burnRef = useRef<NodeJS.Timeout>();
    useEffect(() => {
        burnRef.current = setInterval(() => {
            setBurner(!burner);
        }, 59);
        return () => {
            clearInterval(burnRef.current);
        };
    }, [ burnRef, setBurner, burner ]);

    const time = Date.now()
    let tottime = 0
    return (
        <div class={style.timerWrapper}>
            <div class={style.timerHeading}>
                Set Game <i>Speedrun</i>
            </div>
        {
            splits.map((val) => {
                const donezo = done[val.name]
                const displaytime = donezo ? true : val.name == splitName
                const timetodisplay = donezo ? donezo : time - totTime

                tottime+=val.best
                return <div key={val.name} class={style.timerRow} style={splits.indexOf(val) == (splits.length - 1) ? {borderBottom: 0, margin: 0} : {}}>
                    <div class={style.timerTName}>
                        {val.name}
                    </div>
                    <div class={style.timerTTime} style={{color: timetodisplay > tottime ? "red" : "green"}}>
                        {displaytime ? (tottime < timetodisplay ? "+" : "-") + timeFormat(Math.abs(tottime - timetodisplay)) : ""}
                    </div>
                    <div class={style.timerTBest}>
                        {timeFormat(tottime)}
                    </div>
                </div>
            })
        }
        <div class={style.timerRow} style={{borderBottom: 0, margin: 0, flexDirection:"row-reverse", textAlign: "right"}}>
            <h1 style={{display: "flex", }}>{timeFormat(Object.keys(done).includes('Game finished') ? done['Game finished'] : (time - totTime))}</h1>
        </div>
    </div>
    )
}
export default LiveSplit