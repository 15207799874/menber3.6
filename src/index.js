import React from 'react';
import ReactDOM from 'react-dom';
// import App, {BasicExample} from './App';
import App1 from './App1';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<App1 />, document.getElementById('root'));
registerServiceWorker();
