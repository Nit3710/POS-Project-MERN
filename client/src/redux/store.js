import {legacy_createStore,combineReducers,applyMiddleware}from 'redux'
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'
import { rootReducer } from './rootReducer';
const finalReducer=combineReducers({
    rootReducer:rootReducer
})
const initialState={
    finalReducer:{
        cartItems:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[]
    }
}
const middleware=[thunk];
const store=legacy_createStore(finalReducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));
export default store;