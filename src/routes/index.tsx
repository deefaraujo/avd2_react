import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Update from '../pages/Update'
import Details from '../pages/Details'

const Routes: React.FC = () => (
  <Switch>
    <Route path='/' exact component={Dashboard} />
    <Route path='/titulo/:id' exact component={Update} />
    <Route path='/detalhes/:campeao' component={Details} />
  </Switch>
)

export default Routes
