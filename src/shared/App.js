import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { Main, SignIn, SignUp, Forgot, Profile, QnA, Help, QnAWrite, HelpWrite, QnAView, HelpView, QnAEdit, HelpEdit, AnswerWrite } from './../pages';

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
        <Route path="/qna/write" exact component={QnAWrite}/>
        <Route path="/qna/:id" exact component={QnAView}/>
        <Route path="/qna/edit/:id" exact  component={QnAEdit}/>
        <Route path="/qna/answer/:id" component={AnswerWrite}/>
        <Route path="/help" exact component={Help}/>
        <Route path="/help/write" component={HelpWrite}/>
        <Route path="/help/:id" exact component={HelpView}/>
        <Route path="/help/edit/:id"  component={HelpEdit}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
