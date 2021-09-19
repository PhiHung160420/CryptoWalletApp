export const SET_TRADE_MODAL_VISIBLE = 'SET_TRADE_MODAL_VISIBLE';

export const setTradeModalVisibleSuccess = isVisible => {
  return {
    type: SET_TRADE_MODAL_VISIBLE,
    payload: {isVisible},
  };
};

export const setTradeModalVisible = isVisible => {
  return dispatch => {
    dispatch(setTradeModalVisibleSuccess(isVisible));
  };
};
