import React, { Component } from 'react';

import styles from './fastBuy.scss';

class fastBuy extends Component {
	render() {
		return (
			<div>
				<div className={styles.headBar}>
					<i className={styles.left + " fa fa-plus"}></i>
					<span className={styles.title}>速购</span>				
					<i className={styles.plus + " fa fa-plus"}></i>
				</div>
				<div className={styles.searchBg}>
					<div className={styles.searchBar}>
						<i className="fa fa-search" aria-hidden="true"></i>
						<span>请输入药品／厂家／准字号</span>
					</div>
				</div>
				<p className={styles.p1}>更多关键字</p>
				<p className={styles.p2}>{'品种全称  '+'|'+'  品种首字母  '+'|'+'  品种编码'}</p>
			</div>
		);
	}
}

export default fastBuy;