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