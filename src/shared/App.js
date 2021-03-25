import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { Main, SignIn, SignUp, Forgot, Profile } from './../pages';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main}/>
        <Route path="/signin" component={SignIn}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/forgot" component={Forgot}/>
        <Route path="/profile" component={Profile}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
