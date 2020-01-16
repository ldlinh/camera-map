import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../pages/HomePage'
import Detail from '../pages/DetailPage'

const Routes = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path={`/camera/:id/details`} component={Detail} />
    </Switch>
)

export default Routes