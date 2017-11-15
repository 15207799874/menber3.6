import { combineReducers } from 'redux';
// import user from '../../src/user/reducers/SignIn';
import Home from 'app/routes/home/redux/Home';
// import MyTickling from '../../src/member/reducers/MyTickling';
// import searchParams from '../../src/product/reducers/SearchParams';
// import StocksList from 'future/src/stocksList/reducers/stocksList';
// import IntegralCart from '../../src/RedeemExchange/reducers/IntegralCart';
import MsgInfo from '../../../src/routes/login/redux/MsgInfoRedux';
import Member from '../../../src/routes/login/redux/MenberRedux';
const rootReducer = combineReducers({
//   user,
//   searchParams,
    Home,
//   MyTickling,
	// StocksList,
//   IntegralCart,
	MsgInfo,
	Member
});

export default rootReducer;