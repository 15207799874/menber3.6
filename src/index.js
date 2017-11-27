import React from 'react';
import ReactDOM from 'react-dom';
import 'app/common/initAPP/InitIndex';
// import App, {BasicExample} from './App';
// import Home from './home/home';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { Provider } from 'react-redux';
import configureStore from './common/store/configure-store';
import TabBarExample from './tabs/tabs';
import registerServiceWorker from './registerServiceWorker';
import AppContainer from './containers/AppContainer';
// import './index.css'; 
import './common.scss';
window.document.documentElement.style.fontSize = window.innerWidth / 640 * 100 + 'px';

const store = configureStore({Home:{innerWidth:window.innerWidth}});
const routes = require('./routes/index').default(store)




ReactDOM.render(
	<AppContainer store={store} routes={routes} />,
	document.getElementById('root')
);
registerServiceWorker();


