import { FunctionalComponent, h } from 'preact';
import { Route, Router } from 'preact-router';
import Profile from '../routes/profile';
import NotFoundPage from '../routes/notfound';
import { Game } from './components/game';
import { Index } from './Index';

const App: FunctionalComponent = () => {
    return (
        <div id="preact_root">
            <Router>
                <Route path="/" component={Index} />
                <Route path="/profile/" component={Profile} user="me" />
                <Route path="/profile/:user" component={Profile} />
                <NotFoundPage default />
            </Router>
        </div>
    );
};

export default App;