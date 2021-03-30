import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { Main, SignIn, SignUp, Forgot, Profile, QnA, Help, HelpWrite, QnAWrite } from './../pages';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main}/>
        <Route path="/signin" component={SignIn}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/forgot" component={Forgot}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/qna" exact component={QnA}/>
        <Route path="/qna/write" component={QnAWrite}/>
        <Route path="/help" exact component={Help}/>
        <Route path="/help/write" component={HelpWrite}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
