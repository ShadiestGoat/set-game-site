import { FunctionalComponent, h } from 'preact';
import { Route, Router } from 'preact-router';
import NotFoundPage from '../routes/notfound';
import { Index } from './Index';

const App: FunctionalComponent = () => {
    return (
        <div id="preact_root">
            <Router>
                <Route path="/" component={Index} />
                <NotFoundPage default />
            </Router>
        </div>
    );
};

export default App;