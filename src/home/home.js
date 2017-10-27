import React, {Component} from 'react';
import {NavBar,Icon,Carousel,Button,Flex, WingBlank,List} from 'antd-mobile';
import styles from './home.css';
import Fetch from 'app/common/lib/Fetch'
import _ from 'underscore';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as homeActions from './redux/Action';
// import * as userActions from 'future/src/member/actions/Member';
import Slider from 'react-slick';

const Item = List.Item;
const Brief = Item.Brief;

class Demo extends Component {
	constructor(props){
		super(props);
		this.state = {
			disabled:false,
			bannerData: [],
			initialHeight: 600,		
		}
		this._getBannerImg = this._getBannerImg.bind(this);
		this.renderBannar = this.renderBannar.bind(this);
		this.searchModuleObjects = this.searchModuleObjects.bind(this);

	}
	componentWillMount(){
		this.props.actions.getHome().then((data) => {
			this._getBannerImg();
			//let tabListData = this.searchtabList('app_module_index_product');
			// if (tabListData != null) {
			// 	this.appModuleId = tabListData[0].appModuleId;
			// 	this.moduleTabId = tabListData[0].appModuleTabId;
			// 	this.sysOrgId = tabListData[0].sysOrgId;
			// 	this.refs.list.reloadData();
			// }
		});
		new Fetch({
			url: '/app/user/getUser.json',
			method: "POST",
			forbidToast: true,
		}).dofetch().then((data) => {
			//判断账户是否通过了审核，通过审核才算登录成功
			// if (data.result.isApprove) {
			// 	this.props.actions.setLogined(true);
			// 	this.isLoginRender = true;
			// }
			// if (data.result.messageNum > 0) {
			// 	this.setState({
			// 		showMessageTip: true,
			// 	});
			// }
		}).catch((err) => {
			console.log(err)
		})		
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
			<div style={{paddingTop:50,paddingBottom:50, backgroundColor:"#f5f5f5",...style.flexHor,flexWrap:'warp'}}>
				{data.map((item,i)=>{
					return(
						<div key={i}>
							<img src={item.iconFileUrl} alt="" height='100' width='100'/>
						</div>
					)
				})}
			</div>
		)
	}
	
  	render() {
		return (
			<div>  
				<div style={{...style.flexHor,position:"fixed",top:0,backgroundColor:"#fff", width:"100%",zIndex:100,justifyContent:'space-between',height:80}}>	
					<span style={{paddingLeft:26}}><i className="fa fa-th-list" style={{fontSize:36,color:"#34457d"}}></i></span>		
					<span style={{display:"inline-block",width:"70%",height:60, backgroundColor:"#f5f5f5",borderRadius:30,...style.flexHor}}>
						<span style={{color:"#333",margin:"auto",display:'flex',flexDirection:'row',alignItems:'center'}}><Icon key="0" type="search"/>搜索商品／品牌</span>					
					</span>			
					<Icon key="1" type="ellipsis" style={{paddingRight:26,color:"#34457d"}}/>
				</div>
				<div style={{height:80}}></div>
				{this.state.bannerData.length != 0 && this.renderBannar()}
				{this.renderEntry()}
				<div className="btn-container">
					<div>
						<WingBlank size="lg">
							<Button className="btn" type="primary">primary 按钮</Button>
							<Button className="btn" disabled onClick={e => console.log(e)}>disabled 按钮</Button>
							<Button className="btn" loading>loading 按钮</Button>
							<Button className="btn" icon="check-circle-o">带图标按钮</Button>
							{/* <Button className="btn" icon={import('!svg-sprite!./reload.svg')}>本地图标</Button> */}
					
							<div style={{ height: '0.16rem' }} />
							{/* <Button className="btn" activeStyle={false}>无点击反馈</Button> */}
							{/* <Button className="btn" activeStyle={{ backgroundColor: 'red' }}>自定义点击反馈 style</Button> */}
					
							<p style={{ margin: '30px 0 18px 0', color: '#999' }}>inline / small</p>
							<Flex style={{ marginBottom: '0.16rem' }}>
							<Button type="primary" inline style={{ marginRight: '0.08rem' }}>inline</Button>
							<Button type="ghost" inline size="small" style={{ marginRight: '0.08rem' }}>inline small</Button>
							<Button type="primary" inline size="small">inline small</Button>
							</Flex>
						</WingBlank>
					</div>
				</div>

				<div>
			<List renderHeader={() => '基本样式'} className="my-list">
				<Item extra={'内容内容'}>标题文字</Item>
			</List>
			<List renderHeader={() => '带副标题'} className="my-list">
				<Item arrow="horizontal" multipleLine>
				标题文字 <Brief>副标题</Brief>
				</Item>
				<Item arrow="horizontal" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
				标题文字 <Brief>副标题</Brief>
				</Item>
			</List>
			<List renderHeader={() => '右侧自定义（无内容 / 文字 / 图片）'} className="my-list">
				<Item>标题文字</Item>
				<Item arrow="horizontal" onClick={() => {}}>标题文字</Item>
				<Item extra="内容内容" arrow="horizontal" onClick={() => {}}>标题文字</Item>
				<Item extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
				标题文字 <Brief>副标题</Brief>
				</Item>
			</List>
			<List renderHeader={() => '垂直居中对齐'} className="my-list">
				<Item multipleLine extra="内容内容">
				标题文字 <Brief>副标题</Brief>
				</Item>
			</List>
			<List renderHeader={() => '左侧带图标'}>
				<Item
				thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
				arrow="horizontal"
				onClick={() => {}}
				>我的钱包</Item>
				<Item thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png" arrow="horizontal">我的花销占比</Item>
			</List>
			<List renderHeader={() => '文字换行'} className="my-list">
				<Item data-seed="logId">单行模式，文字超长则隐藏；文本内容文本内容文本内容文本内容</Item>
				<Item wrap>多行模式，文字超长则换行；文本内容文本内容文本内容文本内容文本内容文本内容</Item>
				<Item extra="内容内容" multipleLine align="top" wrap>
				多行标题文字超长直接折行，文字可能比较长、文字可能比较长、
				</Item>
				<Item extra="没有箭头" arrow="empty" className="spe" wrap>
				极个别情况下，单行标题文字可能比较长，文字可能比较长、文字可能比较长、靠近右边会折行
				</Item>
			</List>
			<List renderHeader={() => '其他'} className="my-list">
				<Item disabled={this.state.disabled} extra="" onClick={() => { console.log('click', this.state.disabled); this.setState({ disabled: true }); }}>点击禁用</Item>
				<Item>
				<select defaultValue="1">
					<option value="1">这是原生 html select</option>
					<option value="2" disabled>不可选</option>
					<option value="3">选项3</option>
				</select>
				</Item>
			</List>
			</div>
			</div>
		);
	}
};




function mapStateToProps(state) {
	return {
		homeData: state.Home,
		// isLogin: state.Member.isLogin
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({ ...homeActions }, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(Demo);


const style = {
	flexHor:{
		display:'flex',
		flexDirection:"row",
		justifyContent:"center",
		alignItems:"center"		
	},
	flexVer:{
		display:'flex',
		flexDirection:"colum",
		justifyContent:"center",
		alignItems:"center"		
	}
}