import {Component, h} from "preact"
import { Game } from "./components/game"
import { Helmet } from "@notwoods/preact-helmet"
import { SvgDefs } from "./components/svgDefs"

export class Index extends Component {
    render() {
        return (
            <div className="rootWrapperAmIRightFellas">
                <Helmet>
                    <meta content="The set game, recreated by Shady Goat" property="og:title" />
                    <meta content="This is the fun card game 'SET', but recreated as a website made with preact. " property="og:description" />
                    <meta content="https://set.shadygoat.eu" property="og:url" />
                    <meta content="#6d10ff" data-react-helmet="true" name="theme-color" />
                </Helmet>
                <Game />
            </div>
        )
    }
}