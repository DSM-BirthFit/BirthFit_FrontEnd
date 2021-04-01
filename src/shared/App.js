import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { Main, SignIn, SignUp, Forgot, Profile, QnA, Help, QnAWrite, HelpWrite, QnAView, HelpView } from './../pages';

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
        <Route path="/qna/:id" component={QnAView}/>
        <Route path="/help" exact component={Help}/>
        <Route path="/help/write" component={HelpWrite}/>
        <Route path="/help/:id" component={HelpView}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
