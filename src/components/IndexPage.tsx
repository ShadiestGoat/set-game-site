import { Component, Fragment, h } from "preact";
import Particles from "particles-bg"
import { rand } from "../tools";
import { NavBar } from "./NavBar";

export class IndexPage extends Component<{}> {
    render() {
        return (
            <Fragment>
                <NavBar page="home" />
                <div>
                    <Particles bg={true}
                    type="cobweb"
                    num={75}
                    color="#3178c6"
                    />
                    <h1 style={{marginTop: "31vh"}} className="fadeIn">Set, The Game</h1>
                </div>
            </Fragment>
        )
    }
}