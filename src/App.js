import {Route, Switch,Router} from 'react-router-dom';
import React from 'react';
import Userprofile from './components/Userprofile';
import Postcomp from './postcomp';
// import History from './History';
import Header from './components/Header';


const App=()=>{

    return(<div>
         <Header />
         <Postcomp />
         </div>)
            {/* <Router history={History}>
           
            <Switch>
                <Route exact path="/" component={Postcomp} />
                <Route exact path="/user" component={Userprofile} />
            </Switch>
            </Router>
            </div>); */}
}
export default App;