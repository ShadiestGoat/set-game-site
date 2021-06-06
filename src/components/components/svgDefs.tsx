import { Component, h } from "preact";
import { colorMap } from "./gameHelper";

export class SvgDefs extends Component {

    render() {
        return <svg width="0" height='0'>
        <defs>
            <pattern
            xlinkHref="#sr"
            id="pr"
            patternTransform="matrix(-2,0,0,15,-2,-5)"
            />
            <pattern
            patternUnits="userSpaceOnUse"
            width="2"
            height="1"
            patternTransform="translate(0,0) scale(10,10)"
            id="sr">
            <rect
                style={`fill:${colorMap.r};stroke:none`}
                x="0"
                y="-0.5"
                width="1"
                height="2"
                />
            </pattern>

            <pattern
            xlinkHref="#sg"
            id="pg"
            patternTransform="matrix(-2,0,0,15,-2,-5)"
            />
            <pattern
            patternUnits="userSpaceOnUse"
            width="2"
            height="1"
            patternTransform="translate(0,0) scale(10,10)"
            id="sg">
            <rect
                // @ts-ignore
                style={`fill:${colorMap.g};stroke:none`}
                x="0"
                y="-0.5"
                width="1"
                height="2"
                />
            </pattern>

            <pattern
            xlinkHref="#sp"
            id="pp"
            patternTransform="matrix(-2,0,0,15,-2,-5)"
            />
            <pattern
            patternUnits="userSpaceOnUse"
            width="2"
            height="1"
            patternTransform="translate(0,0) scale(10,10)"
            id="sp">
            <rect
                // @ts-ignore
                style={`fill:${colorMap.p};stroke:none`}
                x="0"
                y="-0.5"
                width="1"
                height="2"
                />
            </pattern>
        </defs>
        </svg>
    }
}