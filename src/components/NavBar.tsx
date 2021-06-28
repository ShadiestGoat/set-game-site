import { Component, h } from "preact";

type CurPages = "home" | "single" | "multi" | "changes" | "help"

export class NavBar extends Component<{page:CurPages}> {
    activeMaker(needed:CurPages) {
        return this.props.page == needed ? 'active' : ""
    }
    render() {
        return (
            <nav class="navbar-wrapper">
                    <div className="navbar-item-1 nav-item">
                        <a className={`nav-link ${this.activeMaker('home')}`} href="/">Home</a>
                    </div>
                    {/* <img className="nav-item navbar-item-1" style="width: 3rem; height:3rem; border-radius: 50%;" src="https://shadygoat.eu/pfp.png" /> */}
                    <div className="navbar-item-last">
                        <ul class="navbar">
                            <li class="nav-item">
                                <a class={`nav-link ${this.activeMaker('help')}`} href="/help" aria-current="page">Help</a>
                            </li>
                            <li class="nav-item">
                                <a class={`nav-link ${this.activeMaker('single')}`} href="/s">Play Singleplayer</a>
                            </li>
                            <li class="nav-item">
                                <a class={`nav-link ${this.activeMaker('multi')}`} href="/m">Play Multiplayer</a>
                            </li>
                            <li class="nav-item">
                                <a class={`nav-link ${this.activeMaker('changes')}`} style={{fontSize: "85%"}} href="/changelog">Changelog</a>
                            </li>
                        </ul>
                    </div>
            </nav>
        )
    }
}