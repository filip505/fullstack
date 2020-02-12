import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from "react-router-dom";
import DriverListContainer from './container/driver.list.container';
import HeaderComponent from './component/header.component';
import DriverDetailsContainer from './container/driver.details.container'
import style from './style/app.scss'


function App() {
  return (
    <Router>
      <Route component={HeaderComponent} />
      <Route path="/" component={(props) => (
        <div className={style.dashboard}>
          <DriverListContainer {...props} />
          <Route path="/:id" component={DriverDetailsContainer} />
        </div>
      )}>
      </Route>
    </Router >
  )
}

ReactDOM.render(<App />, document.getElementById("app"))