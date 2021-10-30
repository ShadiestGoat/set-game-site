import { Fragment, FunctionComponent, h } from "preact";
import Particles from "particles-bg"
import { Helmet } from "@notwoods/preact-helmet";
import { NavBar } from "../../components/NavBar";
import "../../animations.css"
//todo fix!!

const IndexPage:FunctionComponent = () => (<Fragment>
    <NavBar page="home" />
    <Helmet>
        <meta content="The set game, recreated by Shady Goat" property="og:title" />
        <meta content="This is the fun card game 'SET', but recreated as a website made with preact. " property="og:description" />
        <meta content="/" property="og:url" />
        <meta content="#6d10ff" data-react-helmet="true" name="theme-color" />
    </Helmet>
    <div>
        <Particles bg={true}
        type="cobweb"
        num={75}
        color="#3178c6"
        />
        <h1 style={{marginTop: "31vh"}} class={`fadeIn`} >Set, The Game</h1>
    </div>
</Fragment>)

export default IndexPage
