import React, {  } from 'react';
import {NavBar,Icon} from 'antd-mobile';
import './App.css';


const Demo = () => {
  return (
	<div>  
		<NavBar leftContent="back"
		mode="light"
		onLeftClick={() => console.log('onLeftClick')}
		rightContent={[
			<Icon key="0" type="search" style={{ marginRight: '0.32rem' }} />,
			<Icon key="1" type="ellipsis" />,
		]}
		>NavBar</NavBar>
	</div>
  );
};


export default Demo;




