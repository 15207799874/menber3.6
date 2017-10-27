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
import './index.css';



const store = configureStore();

const Root = () => (
	<Provider store={store}>
		<TabBarExample />
	</Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
