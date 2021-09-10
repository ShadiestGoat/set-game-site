import { FunctionComponent, h } from "preact";
import { Link } from 'preact-router/match';
import style from './style.css'

type CurPages = "home" | "single" | "multi" | "changes" | "help"

export const NavBar: FunctionComponent<{page: CurPages}> = ({page}) => {
    function activeMaker(needed: CurPages) {
        return page == needed ? ` ${style.active}` : ""
    }
    return (<nav class={style.navbarWrapper}>
        <div class={style.navbarItemFirst}>
            <Link class={style.navLink + activeMaker('home')} href="/">Home</Link>
        </div>
        <div class={style.navbarItemLast}>
            <ul class={style.navbar}>
                <li class={style.navItem}>
                    <Link class={style.navLink + activeMaker('help')} href="/help" aria-current="page">Help</Link>
                </li>
                <li class={style.navItem}>
                    <Link class={style.navLink + activeMaker('single')} href="/s">Play Singleplayer</Link>
                </li>
                <li class={style.navItem}>
                    <Link class={style.navLink + activeMaker('multi')} href="/m">Play Multiplayer</Link>
                </li>
                <li class={style.navItem}>
                    <Link class={style.navLink + activeMaker('changes')} href="/changelog">Changelog</Link>
                </li>
            </ul>
        </div>
    </nav>)
}
