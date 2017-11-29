import React, { Component } from 'react';
import {NavBar,Icon} from 'antd-mobile';
import styles from './search.scss';
import Fetch from 'app/common/lib/Fetch'
import { browserHistory } from 'react-router'


class search extends Component {
	constructor(props) {
		super(props);	
		this.state = {
			
		};
	}	
	componentDidMount() {
	
	}
	render() {
		return (
			<div className="flexVer-js-ac">
				<NavBar	mode="light"
					style={{width:"100%"}}
					onLeftClick={()=>{browserHistory.goBack()}}
					rightContent={ <Icon key="1" type="ellipsis" />}
				><span className={styles.navName}>全部分类</span></NavBar>
				<div className={styles.bodyContainer} >
				
				</div>
			</div>
		);
	}
}

export default search;