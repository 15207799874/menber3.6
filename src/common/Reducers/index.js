import { combineReducers } from 'redux';
// import user from '../../src/user/reducers/SignIn';
import Home from 'app/routes/home/redux/Home';
// import MyTickling from '../../src/member/reducers/MyTickling';
// import searchParams from '../../src/product/reducers/SearchParams';
// import StocksList from 'future/src/stocksList/reducers/stocksList';
// import IntegralCart from '../../src/RedeemExchange/reducers/IntegralCart';
// import MsgInfo from '../../src/member/reducers/MsgInfo';
// import Member from '../../src/member/reducers/Member';
const rootReducer = combineReducers({
//   user,
//   searchParams,
     Home,
//   MyTickling,
	// StocksList,
//   IntegralCart,
//   MsgInfo,
//   Member
});

export default rootReducer;