import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route path='/' exact component={Login} />
            <Route path='/home/:id' component={Home} />
        </BrowserRouter>
    );
}

export default Routes;