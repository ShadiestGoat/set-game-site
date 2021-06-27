import {Component, h} from "preact"
import { Game } from "./components/game"
import { Helmet } from "@notwoods/preact-helmet"
import { SvgDefs } from "./components/svgDefs"
import {isMobileOnly} from "react-device-detect"

export class GameS extends Component {
    render() {
        return (
            <div className="rootWrapper">
                <Helmet>
                    <meta content="The set game, recreated by Shady Goat" property="og:title" />
                    <meta content="This is the fun card game 'SET', but recreated as a website made with preact. " property="og:description" />
                    <meta content="https://set.shadygoat.eu" property="og:url" />
                    <meta content="#6d10ff" data-react-helmet="true" name="theme-color" />
                </Helmet>
                {isMobileOnly ? "Sorry, but mobile is currently not supported!" : <Game />}
            </div>

        )
    }
}

export class Index extends Component {
    render() {
        return (
            <div className="rootWrapper">
            <Helmet>
                <meta content="The set game, recreated by Shady Goat" property="og:title" />
                <meta content="This is the fun card game 'SET', but recreated as a website made with preact. " property="og:description" />
                <meta content="https://set.shadygoat.eu" property="og:url" />
                <meta content="#6d10ff" data-react-helmet="true" name="theme-color" />
            </Helmet>
            {isMobileOnly ? "Sorry, but mobile is currently not supported!" : <Game />}
            </div>
        )
    }
}