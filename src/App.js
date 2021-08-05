import Bands from "./components/Bands";
import BandPage from "./components/BandPage"
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Fragment } from "react";

function App() {
  return (
    <Router>
      <Fragment>
          <Route exact path="/" component={Bands} />
          <Route exact path="/band/:id" component={BandPage} />
      </Fragment> 
    </Router>
  );
}

export default App;