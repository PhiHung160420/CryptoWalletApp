import * as marketActionType from './market.action';

const initialState = {
  myHoldings: [],
  coins: [],
  error: null,
  loading: false,
};

const MarketReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case marketActionType.GET_HOLDINGS_BEGIN:
      return {...state, loading: true};
    case marketActionType.GET_HOLDINGS_SUCCESS:
      return {...state, myHoldings: payload.myHoldings};
    case marketActionType.GET_HOLDINGS_FAILURE:
      return {...state, error: payload.error};
    case marketActionType.GET_COIN_MARKET_BEGIN:
      return {...state, loading: true};
    case marketActionType.GET_COIN_MARKET_SUCCESS:
      return {...state, coins: payload.coins};
    case marketActionType.GET_COIN_MARKET_FAILURE:
      return {...state, error: payload.error};
    default:
      return state;
  }
};

export default MarketReducer;
