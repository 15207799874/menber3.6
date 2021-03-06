import React, {Component} from 'react';
import {NavBar,Icon,Carousel,Button,Flex, WingBlank,List,} from 'antd-mobile';
import styles from './home.css';
import Fetch from 'app/common/lib/Fetch'
import _ from 'underscore';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as homeActions from './redux/Action';
import * as userActions from '../login/redux/MemberAction';
// import Slider from 'react-slick';
import NoticeBanner from 'app/common/component/noticeBannar';
// import ScrollArea from 'react-scrollbar';
import HomeList from './List'
import { browserHistory } from 'react-router'


class Home extends Component {
	constructor(props){
		super(props);
		this.state = {
			disabled:false,
			bannerData: [],
			initialHeight: 600,		
			selectTabIndex: 0,
		}
		this.tabPressBg = { backgroundColor: '#2e0f50' }
		this.tabPressTextBg = { color: '#fff' }
		this._getBannerImg = this._getBannerImg.bind(this);
		this.renderBannar = this.renderBannar.bind(this);
		this.searchModuleObjects = this.searchModuleObjects.bind(this);
		this.fetchData = this.fetchData.bind(this);

	}
	componentWillMount(){
		window.onresize=function(){
			// document.body.style.fontSize =
			this.props.actions.resizeWindow()
		}.bind(this);

		this.props.actions.getHome().then((data) => {
			this._getBannerImg();
			let tabListData = this.searchtabList('app_module_index_product');
			if (tabListData != null) {
				console.log('tabListData',tabListData);
				this.appModuleId = tabListData[0].appModuleId;
				this.moduleTabId = tabListData[0].appModuleTabId;
				this.sysOrgId = tabListData[0].sysOrgId;
				//this.refs.list.reloadData();
			}
		});
		new Fetch({
			url: '/app/user/getUser.json',
			method: "POST"			
		}).dofetch().then((data) => {
			// 判断账户是否通过了审核，通过审核才算登录成功
			if (data.result.isApprove) {
				this.props.actions.setLogined(true);
				// this.isLoginRender = true;
			}
			// if (data.result.messageNum > 0) {
			// 	this.setState({
			// 		showMessageTip: true,
			// 	});
			// }
		}).catch((err) => {
			console.log(err)
		})		
	}

	fetchData(page,sucees,error){		
		new Fetch({
			url: 'app/index/pageTabObjects.json',
			data: {
				pageNumber: page,
				pageSize: 10,
				appModuleId: this.appModuleId,
				moduleTabId: this.moduleTabId,
				sysOrgId: this.sysOrgId
			}
		}).dofetch().then((data) => {
			sucees(data.result,page * 10, data.totalCount);
		}).catch((err) => { 
			error && error();
			console.log(err);
		 });	  		
	}

	searchModuleObjects(innerCode) {
		let obj = null;
		_.each(this.props.homeData, (item, index) => {
			if (item.innerCode == innerCode && item.moduleObjects.length != 0) {
				obj = item.moduleObjects;
			}
		});
		return obj;
	}
	_getBannerImg() {
		let data = this.searchModuleObjects('app_module_index_banner');
		//console.log('>>>>>>>searchModuleObjects',data);
		if(data.length == 1){
			data[1] = data[0];
		}
		if(data != null){
			this.setState({bannerData:data});
		}
		//console.log('app_module_index_banner', data);
		// let img = [];
		// if (data != null && data.length > 0) {
		// 	_.each(data, (item, index) => {
		// 		img[index] = item.iconFileUrl;
		// 	});
		// }
		return data;
	}	
	renderBannar(){
		const hProp = this.state.initialHeight ? { height: this.state.initialHeight } : {};			
		return(
			<Carousel        
			autoplay={true}
			infinite
			selectedIndex={0}
			swipeSpeed={35}			
		  >
			{this.state.bannerData.map((item,i) => {	
				return (					
					<a href="http://www.baidu.com" key={i} style={hProp}>
						<img
						src={item.iconFileUrl}
						alt="icon"
						className={styles.img}
						onLoad={() => {
								// fire window resize event to change height
								console.log('onLoad');
								window.dispatchEvent(new Event('resize'));
								this.setState({
								initialHeight: null,
							});
						}}
						/>
					</a>					
				)
				})
			}
		  </Carousel> 			
		)
	}
	

	renderEntry(){
		let data = []		
		let data1 = this.searchModuleObjects("app_module_index_entry");
		console.log('>>>>>>',data1);
		if(data1 != undefined &&  data1.length != 0){
			data = data1;
		}
		return(
			<div style={{paddingTop:25,paddingBottom:50, backgroundColor:"#f5f5f5",display:'flex',flexWrap:'wrap',justifyContent:'flex-start'}}>
				{data.map((item,i)=>{
					return(
						<div key={i} style={{marginTop:25, width:this.props.homeData.innerWidth/4-.5,...style.flexVer}}>
							<div><img src={item.iconFileUrl} alt="" height='100' width='100'/></div>
							<span>{item.text}</span>
						</div>
					)
				})}
			</div>
		)
	}
	
	renderNotice(){
		let datas = this.searchModuleObjects('app_module_index_notice');
		//this.noticeData = datas;
		//console.log('app_module_index_notice data', datas);
		let dataAr = [];
		if (datas != null) {
			datas.map((item, index) => {				
				dataAr.push(item.text);				
			});
		}
		return(
			<div style={{paddingLeft:13,paddingRight:13}}>
				<div style={{height:56,backgroundColor:"#fff",borderRadius:28,...style.flexHor,justifyContent:'space-between',paddingRight:20}}>					
					<span style={{fontSize:26,paddingLeft:20}}>电商</span>
					<div style={{height:30,width:60,fontSize:26,color:'#fff',...style.flexHor,backgroundImage: `url(${process.env.PUBLIC_URL}/001zixundi@2x.png)`}}>资讯
					</div>					
					<NoticeBanner						
						textStyle={{fontSize: 26, marginLeft: 5,position:'relative',flex:1,whiteSpace: 'nowrap',overflow:'hidden', textOverflow:'ellipsis'}}
						pressActions={(Value) => { }}
						dataArr={dataAr}
						num={3}
					></NoticeBanner>
					<div style={{height:28,widtg:1, border:'1px solid #eee',marginRight: 20}}/>
					<span style={{fontSize:26}}>更多</span>
				</div>				
			</div>
			
		)
	}

	renderRight(right, index) {
		let fullwidth = this.props.homeData.innerWidth;
		let imageArrViewHeight = fullwidth*0.6875;		
		let dataIndex = index * 4;
		if (right == null || right.length == 0) {
			return <View />
		}
		let items1 = right[dataIndex] == undefined ? undefined : right[dataIndex];
		let items2 = right[dataIndex + 1] == undefined ? undefined : right[dataIndex + 1];
		let items3 = right[dataIndex + 2] == undefined ? undefined : right[dataIndex + 2];
		let items4 = right[dataIndex + 3] == undefined ? undefined : right[dataIndex + 3];
		return (
			<div style={{flex:1,...style.flexVer,justifyContent:'sapce-between',height:imageArrViewHeight,border:'1px solid #eee'}}>
				<div style={{ flex: 1,...style.flexHor }}>					
					<img style={{width:fullwidth * 0.328125,height:imageArrViewHeight/2,borderTop:'1px solid #eee'}} src={items1 == undefined ? '' : items1.iconFileUrl} />
					<img style={{width:fullwidth * 0.328125,height:imageArrViewHeight/2,borderTop:'1px solid #eee'}} src={items2 == undefined ? '' : items2.iconFileUrl} />
				</div>
				<div style={{ flex: 1, ...style.flexHor }}>
					<img style={{width:fullwidth * 0.328125,height:imageArrViewHeight/2,borderTop:'1px solid #eee'}} src={items3 == undefined ? '' : items3.iconFileUrl} />
					<img style={{width:fullwidth * 0.328125,height:imageArrViewHeight/2,borderTop:'1px solid #eee'}} src={items4 == undefined ? '' : items4.iconFileUrl} />
				</div>
			</div>
		);
	}
	renderImageArr() {//	source={require('../res/home/001xiaoxi-_baise.png')}
		let left = this.searchModuleObjects('app_module_index_adv_left');
		let right = this.searchModuleObjects('app_module_index_adv_right');
		let dataAr = [];
		if (left != null) {
			return left.map((item, index) => {
				return (
					<div style={{marginTop:20, ...style.flexHor,height:this.props.homeData.innerWidth*0.6875,}} key={index}>	
						<img
							style={{width:this.props.homeData.innerWidth * 0.34375,height:this.props.homeData.innerWidth*0.6875,border:'1px solid #eee'}}
							src={item.iconFileUrl}
						/>						
						{this.renderRight(right, index)}
					</div>
				);
			})
		} else {
			return null;
		}
	}

	searchtabList(innerCode) {
		let obj = null;
		_.each(this.props.homeData, (item, index) => {
			if (item.innerCode == innerCode && item.tabList.length != 0) {
				obj = item.tabList;
			}
		});
		return obj;
	}
	renderTitle() {
		return (
			<div style={{height:100,...style.flexHor,backgroundColor:'#fff',marginTop:20}}>
				<div style={{ backgroundColor: '#E5E5E5', width: 4, height: 4, borderRadius: 2, marginRight: 12, }} />
				<div style={{ backgroundColor: '#666', width: 6, height: 6, borderRadius: 3, marginRight: 12, }} />
				<div style={{ backgroundColor: '#999', width: 8, height: 8, borderRadius: 4, marginRight: 12, }} />
				<div style={{ fontSize: 32, color: '#333' }}>为你精选</div>
				<div style={{ backgroundColor: '#999', width: 8, height: 8, borderRadius: 4, marginLeft: 12, }} />
				<div style={{ backgroundColor: '#666', width: 6, height: 6, borderRadius: 3, marginLeft: 12, }} />
				<div style={{ backgroundColor: '#E5E5E5', width: 4, height: 4, borderRadius:2, marginLeft: 12, }} />
			</div>);
	}
	_onTabPress(item, index) {
		if (this.state.selectTabIndex === index) {
			return;
		}
		this.setState({
			selectTabIndex: index
		});
		this.appModuleId = item.appModuleId;
		this.moduleTabId = item.appModuleTabId;
		this.sysOrgId = item.sysOrgId;
		// console.log('>>>>>>>>list',this.refs.list);
		this.refs.list.reloadData();
		
	}	

	renderTabItem() {
		let data = this.searchtabList('app_module_index_product');
		if (data != null) {
			return data.map((item, index) => {
				if (this.state.selectTabIndex == index) {
					this.tabPressBg = { backgroundColor: '#34457d' }
					this.tabPressTextBg = { color: '#fff' }
				} else {
					this.tabPressBg = { backgroundColor: '#fff' }
					this.tabPressTextBg = { color: '#333' }
				}
				return (
					<div style={{width:160,height:52,backgroundColor:'#2e0f50',...style.flexHor,borderRadius:26,marginLeft:26,...this.tabPressBg}} 
						key={index}
						onClick={() => { this._onTabPress(item, index) }}>
						<div style={{ fontSize: 24,...this.tabPressTextBg}}>{item.tabNm}</div>
					</div>
				);
			})
		} else {
			return <div />
		}
	}
	renderTab(){
		return(
            <div style={{height:110,...style.flexHor,justifyContent:'space-around',backgroundColor:'#fff'}}>
				{this.renderTabItem()}
			</div>
        
		)
	}

	headRightBtn(){
		if(this.props.isLogin){
			browserHistory.push('/messagecenter')
		}else{
			browserHistory.push('/login')
		}
	}
	searchBtn(){		
		browserHistory.push('/search')
	}
	
  	render() {
		return (
			<div style={{backgroundColor:"#f5f5f5"}}> 	 	
				<div style={{position:"fixed",top:0,width:'100%',zIndex:100,}}>
					<div className='flexHor-center' style={{backgroundColor:"#fff",justifyContent:'space-between',height:90,paddingLeft:26,paddingRight:26}}>	
						<i className="fa fa-th-list" style={{fontSize:36,color:"#34457d"}}
							onClick={()=>{
								browserHistory.push('/category')
							}}></i>		
						<span style={{display:"inline-block",width:"70%",height:60, backgroundColor:"#f5f5f5",borderRadius:30,...style.flexHor}}
							onClick={this.searchBtn.bind(this)}>
							<span style={{color:"#333",margin:"auto",display:'flex',flexDirection:'row',alignItems:'center'}}><Icon key="0" type="search"/>搜索商品／品牌</span>					
						</span>			
						<i className={"fa fa-bell "} style={{fontSize:36,color:"#34457d" }}
							onClick={this.headRightBtn.bind(this)}></i>	
					</div>
				</div>
				<div style={{height:90}}></div>
				{this.state.bannerData.length != 0 && this.renderBannar()}
				{this.renderEntry()}
				{this.renderNotice()}
				{this.renderImageArr()}
				{this.renderTitle()}
				{this.renderTab()}
				{this.sysOrgId && <HomeList ref="list"  fetchData={this.fetchData} innerWidth={this.props.homeData.innerWidth}/>}
				<div style={{height:150}}></div>
			</div>
		);
	}
};




function mapStateToProps(state) {
	return {
		homeData: state.Home,
		isLogin: state.Member.isLogin
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({ ...homeActions,...userActions}, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);


const style = {
	flexHor:{
		display:'flex',
		flexDirection:"row",
		justifyContent:"center",
		alignItems:"center"		
	},
	flexVer:{
		display:'flex',
		flexDirection:"column",
		justifyContent:"center",
		alignItems:"center"		
	}
}

