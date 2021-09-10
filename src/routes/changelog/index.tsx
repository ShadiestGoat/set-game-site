import { Fragment, FunctionComponent, h } from "preact"
import { Helmet } from "@notwoods/preact-helmet"
import changes from "../../ChangelogFile"
import { NavBar } from "../../components/NavBar"
import style from "./style.css"

type change = {
    version: string;
    updateName: string;
    added: string[];
    fixed: string[];
    changed: string[];
    removed: string[];
}
const test: change[] = changes.reverse()
const keysToMap: (keyof change)[] = [
    'added',
    "changed",
    "fixed",
    "removed"
]


const ChangelogPage: FunctionComponent = () => (
    <Fragment>
    <Helmet>
        <meta content="The set game, recreated by Shady Goat" property="og:title" />
        <meta content="This is the fun card game 'SET', but recreated as a website made with preact. " property="og:description" />
        <meta content="https://set.shadygoat.eu" property="og:url" />
        <meta content="#6d10ff" data-react-helmet="true" name="theme-color" />
    </Helmet>
    <NavBar page="changes" />
    <ul class={`${style.changesWrapper} center`}>
        {
            test.map((val: change, index) => {
                return (
                    <li class={style.changeWrapper} key={val.version}>
                        <h1 class={style.changeVersion}>{val.version} - {val.updateName}</h1>
                        {keysToMap.map((key) => {
                            return ((Object.keys(test[index][key]).length == 0 || (!test[index][key][0] && Object.keys(test[index][key]).length == 1)) ?
                            <Fragment />
                            :(
                            <Fragment>
                                <h2 class={style.subTitle}>{key[0].toUpperCase() + key.substr(1, key.length - 1)}</h2>
                                {(test[index][key] as string[]).map((str, index) => {if (!str) return
                                    return <p key={key + index.toString()} class={style.changesItem}>- {str[0]?.toUpperCase() + str.substr(1, str.length - 1)}</p>
                                })}
                            </Fragment>
                            ))
                        })}
                    </li>
                )
            })
        }
    </ul>
    </Fragment>
)

export default ChangelogPage
