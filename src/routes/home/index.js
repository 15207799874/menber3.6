


export default (store) => (
	{
		getComponent (nextState, cb) {			
			require.ensure([], (require) => {
				const Home = require('./home').default;
		
			cb(null, Home);
			}, 'home')
		}
})