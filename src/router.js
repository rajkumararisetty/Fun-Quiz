import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Welcome from './components/welcome';
import Questions from './components/questions';
import Result from './components/result';

const AppRouter = () => (
	<Router>
        <Route exact path="/" component={Welcome} />
        <Route path="/questions/:id" component={Questions} />
        <Route exact path="/result/" component={Result} />
    </Router>
);

export default AppRouter;
