import { FunctionalComponent, h } from 'preact';
import { Route, Router } from 'preact-router';
import NotFoundPage from '../routes/notfound';
import { GameS } from './Index';
import { IndexPage } from './IndexPage';

const App: FunctionalComponent = () => {
    return (
        <div id="preact_root">
            <Router>
                {/* <Route path="/" component={IndexPage} /> */}
                <Route path="/s" component={GameS} />
                <Route path="/" component={GameS} />
                <NotFoundPage default />
            </Router>
        </div>
    );
};

export default App;