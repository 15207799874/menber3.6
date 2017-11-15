export default (store) => (
	{
		path:'login',
		getComponent (nextState, cb) {			
			require.ensure([], (require) => {
				const Home = require('./login').default;
		
			cb(null, Home);
			}, 'login')
		}
})