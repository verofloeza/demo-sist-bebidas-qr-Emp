import { LIST_ORDER } from "../actionType";

const INIT_STATE = {
    cart:[],
    qtyDescount:[]
  };

  const OrdersReducers = (state = INIT_STATE, action) => {
    switch (action.type) {
        case LIST_ORDER:
            return { ...state, cart: [action.payload]}
        ;
        default:
      return state;
    }
}
export default OrdersReducers;