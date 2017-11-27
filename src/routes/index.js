
import React from 'react';
import CoreLayout from '../layouts/CoreLayout';
import TabBarExample from '../tabs/tabs';
// import MovieDetail from './MovieDetail';
// import Cinema from './Cinema';
// import CinemaDetail from './CinemaDetail';
// import Me from './Me';
// import NoData from './NoData';
// import PageNotFound from './PageNotFound';
// import Redirect from './PageNotFound/redirect';


export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: {component:TabBarExample},
  childRoutes: [
	{
		path:'login',
		component:require('./login/login').default	
	},
	{
		path:'category',
		component:require('./category/category').default	
	}
 
  ]
})

export default createRoutes;
