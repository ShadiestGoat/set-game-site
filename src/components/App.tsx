import { FunctionalComponent, h } from 'preact';
import { Route, Router } from 'preact-router';
import IndexPage from '../routes/home';
import NotFoundPage from '../routes/notfound';
import Changelog from "../routes/changelog"
import './NavBar/style.css'
// import SingleGameT from '../routes/singleplayer/test';
import SingleGame from '../routes/singleplayer/';
import HelpPage from '../routes/help';


const App: FunctionalComponent = () => {
    const v = localStorage.getItem('v')
    console.log("test")
    fetch("https://raw.githubusercontent.com/ShadiestGoat/set-game-site/main/package.json").then((res) => {
            res.json().then(pkg => {
            const ver = pkg.version
            if (ver != v) {
                localStorage.setItem('v', ver)
                if (!v) location.reload()
        }})}).catch(
            () => console.log("Failed to check for updates... check your connection!")
        )
    return (
        <div id="preact_root">
            <Router>
                <Route path="/" component={IndexPage} />
                <Route path="/s" component={SingleGame} />
                <Route path="/help" component={HelpPage} />
                <Route path="/changelog" component={Changelog} />
                <NotFoundPage default />
            </Router>
        </div>
    );
};

export default App;
