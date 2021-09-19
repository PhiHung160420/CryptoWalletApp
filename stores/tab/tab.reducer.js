import * as tabActionType from './tab.action';

const initialState = {
  isTradeModalVisible: false,
};

const TabReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case tabActionType.SET_TRADE_MODAL_VISIBLE:
      return {
        ...state,
        isTradeModalVisible: payload.isVisible,
      };

    default:
      return state;
  }
};

export default TabReducer;
