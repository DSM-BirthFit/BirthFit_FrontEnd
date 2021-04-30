import { combineReducers } from 'redux';
import head from './Head';
import sidebar from './Sidebar';
import signin from './Signin';
import signup from './Signup';
import forgot from './Forgot';
import profile from './Profile';
import write from './Write';
import view from './View';
import comment from './Comment';

const reducerApp = combineReducers({
    head,
    sidebar,
    signin,
    signup,
    forgot,
    profile,
    write,
    view,
    comment
})

export default reducerApp;