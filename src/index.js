import React from 'react';
import ReactDOM from 'react-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import CustomerDetails from "./components/customerDetails"
import OrderSummary from "./components/orderSummary"


const Root = () => {
  return(
    <Router>
        <Switch>
          <Route path="/" exact component={CustomerDetails}/>
          <Route path="/order-summary" component={OrderSummary}/>
        </Switch>
    </Router>
  )
}
ReactDOM.render(<Root/>,
  document.getElementById('root')
);
