import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { LinksPage } from './pages/LinksPage'
import { CreatePage } from './pages/CreatePage'
import { CallRoom } from './pages/CallRoom'
import { AuthPage } from './pages/AuthPage'
import { createBrowserHistory } from 'history'

export const useRoutes = isAuthenticated => {
  if (1) {
    // if (isAuthenticated) {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/links" exact component={LinksPage} />
          <Route path="/create" exact component={CreatePage} />
          <Route path="/room/:id" exact component={CallRoom} />
          <Redirect to="/create" />
        </Switch>
      </BrowserRouter>
    )
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}
