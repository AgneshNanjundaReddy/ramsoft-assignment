import { createStore } from 'redux';
import { combineReducers } from 'redux';
import reducer from './reducer';
import { loadState } from './localStorage';

const  rootReducer = combineReducers({
    reducer
});
const persistedState = loadState();

export default function configureStore() {
 return createStore(
  rootReducer,
  persistedState
 );
}