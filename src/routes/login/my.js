import React, { Component } from 'react';
import styles from './my.scss';

class fastBuy extends Component {
	render() {
		return (	
			<div className={styles.container}>	
				<div className={styles.h1} >
					<i className={"fa fa-gear " + styles.leftHeadBtn}></i>				
					<i className={"fa fa-bell " + styles.rightHeadBtn}></i>				
				</div>	
				<div className={styles.h2}>
					<div className={styles.avatarContainer}>
						<img src={`${process.env.PUBLIC_URL}/000wode_s@2x.png`} alt="avatar" className={styles.avatar}/>
					</div>
					<p className={styles.hh1}>采购商</p>
					<p className={styles.hh2}>所属单位：蓬蓬短发就是</p>
				</div>
				<div className={styles.hMessage}>
					<span>账户积分 26</span>	
					<span>账户余额 26</span>	
					<span>优惠券 26</span>	
				</div>	
				<div className={styles.order}>
					<span>我的订单</span>
					<span>全部订单 <i className="fa fa-hand-o-right"></i></span>
				</div>
				<div className={styles.orderKind}>
					<div className={styles.orderItem}>
						<img src={`${process.env.PUBLIC_URL}/000wode_s@2x.png`} alt="" className={styles.orderImg}/>
						<span className={styles.orderFont}>待付款</span>
					</div>
					<div className={styles.orderItem}>
						<img src={`${process.env.PUBLIC_URL}/000wode_s@2x.png`} alt="" className={styles.orderImg}/>
						<span className={styles.orderFont}>待发货</span>
					</div>
					<div className={styles.orderItem}>
						<img src={`${process.env.PUBLIC_URL}/000wode_s@2x.png`} alt="" className={styles.orderImg}/>
						<span className={styles.orderFont}>待收货</span>
					</div>
					<div className={styles.orderItem}>
						<img src={`${process.env.PUBLIC_URL}/000wode_s@2x.png`} alt="" className={styles.orderImg}/>
						<span className={styles.orderFont}>已完成</span>
					</div>
					<div className={styles.orderItem}>
						<img src={`${process.env.PUBLIC_URL}/000wode_s@2x.png`} alt="" className={styles.orderImg}/>
						<span className={styles.orderFont}>退货/售后</span>
					</div>
				</div>
				<div className={styles.intergral}>
					<div className={styles.interContain}>
						<img src={`${process.env.PUBLIC_URL}/000wode_s@2x.png`} alt="" className={styles.entryImg}/>
						<span>积分订单</span>
					</div>
					<i className="fa fa-hand-o-right"></i>
				</div>
				<div className={styles.intergral}>
					<div className={styles.interContain}>
						<img src={`${process.env.PUBLIC_URL}/000wode_s@2x.png`} alt="" className={styles.entryImg}/>
						<span>常购品种</span>
					</div>
					<i className="fa fa-hand-o-right"></i>
				</div>
				<div className={styles.intergral}>
					<div className={styles.interContain}>
						<img src={`${process.env.PUBLIC_URL}/000wode_s@2x.png`} alt="" className={styles.entryImg}/>
						<span>采购计划</span>
					</div>
					<i className="fa fa-hand-o-right"></i>
				</div>
				<div className={styles.intergral}>
					<div className={styles.interContain}>
						<img src={`${process.env.PUBLIC_URL}/000wode_s@2x.png`} alt="" className={styles.entryImg}/>
						<span>商家收藏</span>
					</div>
					<i className="fa fa-hand-o-right"></i>
				</div>
				<div className={styles.apply}>
					<div className={styles.interContain}>
						<img src={`${process.env.PUBLIC_URL}/000wode_s@2x.png`} alt="" className={styles.entryImg}/>
						<span>我的供应商</span>
					</div>
					<i className="fa fa-hand-o-right"></i>
				</div>
				<div className={styles.intergral}>
					<div className={styles.interContain}>
						<img src={`${process.env.PUBLIC_URL}/000wode_s@2x.png`} alt="" className={styles.entryImg}/>
						<span>我的集采</span>
					</div>
					<i className="fa fa-hand-o-right"></i>
				</div>
				<div className={styles.intergral}>
					<div className={styles.interContain}>
						<img src={`${process.env.PUBLIC_URL}/000wode_s@2x.png`} alt="" className={styles.entryImg}/>
						<span>集采申请</span>
					</div>
					<i className="fa fa-hand-o-right"></i>
				</div>
				<div className={styles.feedback}>
					<div className={styles.interContain}>
						<img src={`${process.env.PUBLIC_URL}/000wode_s@2x.png`} alt="" className={styles.entryImg}/>
						<span>反馈中心</span>
					</div>
					<i className="fa fa-hand-o-right"></i>
				</div>
				<div className={styles.footer}></div>
			</div>	
		);
	}
}

export default fastBuy;