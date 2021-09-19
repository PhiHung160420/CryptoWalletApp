import {combineReducers} from 'redux';
import TabReducer from './tab/tab.reducer';
import MarketReducer from './market/market.reducer';

const rootReducer = combineReducers({TabReducer, MarketReducer});

export default rootReducer;
