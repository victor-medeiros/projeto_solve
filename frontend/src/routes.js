import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import StartModalComponent from './pages/Home/Components/HomeComponent/StartModalComponent';
import FinishModalComponent from './pages/Home/Components/HomeComponent/FinishModalComponent';
import CancelModalComponent from './pages/Home/Components/HomeComponent/CancelModalComponent';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route path='/' exact component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/home/:id' component={Home} />
            <Route path='/modal-start' component={StartModalComponent} />
            <Route path='/modal-finish' component={FinishModalComponent} />
            <Route path='/modal-cancel' component={CancelModalComponent} />
        </BrowserRouter>
    );
}

export default Routes;