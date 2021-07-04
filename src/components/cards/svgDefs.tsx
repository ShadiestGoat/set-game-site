import { h, FunctionComponent } from "preact";
import { colorMap } from "../gameHelper";

const width = '2'
const height = '1'
const transform = 'matrix(-4,0,0,10,-4,-10)'
const trans1 = 'translate(0,0) scale(10,10)'
export const SvgDefs: FunctionComponent = () => (<svg width="0" height='0'>
    <defs>
        <pattern
        xlinkHref="#sr"
        id="pr"
        patternTransform={transform}
        />
        <pattern
        patternUnits="userSpaceOnUse"
        width={width}
        height={height}
        patternTransform={trans1}
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
        patternTransform={transform}
        />
        <pattern
        patternUnits="userSpaceOnUse"
        width={width}
        height={height}
        patternTransform={trans1}
        id="sg">
        <rect
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
        patternTransform={transform}
        />
        <pattern
        patternUnits="userSpaceOnUse"
        width={width}
        height={height}
        patternTransform={trans1}
        id="sp">
        <rect
            style={`fill:${colorMap.p};stroke:none`}
            x="0"
            y="-0.5"
            width="1"
            height="2"
            />
        </pattern>
    </defs>
</svg>)