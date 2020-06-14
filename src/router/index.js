import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Home, Login, Reg, LayoutPage, List, Echart } from './assembly'

export default class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/reg" component={Reg} />
          <LayoutPage {...this.props}>
            <Switch>
              <Route path="/list" component={List} />
              <Route path="/echart" component={Echart} />
              <Route path="/" component={Home} />
            </Switch>
          </LayoutPage>
        </Switch>
      </BrowserRouter>
    )
  }
}
