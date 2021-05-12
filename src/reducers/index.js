import { combineReducers } from 'redux';
import head from './Head';
import sidebar from './Sidebar';
import user from './User';
import write from './Write';
import view from './View';
import post from './Post';

const reducerApp = combineReducers({
    head,
    sidebar,
    user,
    write,
    view,
    post,
})

export default reducerApp;