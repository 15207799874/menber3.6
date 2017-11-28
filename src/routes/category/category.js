import React, { Component } from 'react';
import {NavBar,Icon} from 'antd-mobile';
import styles from './category.scss';
import Fetch from 'app/common/lib/Fetch'
import { browserHistory } from 'react-router'

class fastBuy extends Component {
	constructor(props) {
		super(props);
		this.renderRow = this._renderCategory.bind(this);
		this.fetchData = this._fetchCategoryData.bind(this);
		this.state = {
			data:[],
		};
	}
	
	componentDidMount() {
		this.fetchData();
	}

	_fetchCategoryData() {
		new Fetch({
			url: '/app/category/findAllProductCategory.json',
		}).dofetch().then((data) => {
			let arr = data != null && data.result != null ? data.result : [];
			if (arr != null && arr.length > 0) {
				this.setState({data: arr});
			}
		}).catch((error) => {
			console.log('=> catch: ', error);
		});
	}

	// 跳转到分类的详细抽屉式列表页FindProductItems
	_openCategoryDetail(sysObjectId, title) {
		if (sysObjectId == null) {
			Toast.show('抱歉，获取信息失败！');
			return;
		}
		this.props.navigator.push({
			component: FindProductItems,
			params: {
				sysObjectId: sysObjectId,
				title: title,
			}
		})
	}

	//渲染找货分类页
	_renderCategory(data) {
		// let prdImg = imageUtil.get(config.host + "/upload/" + rowData.iconFileId, "120X120");	

		return data.map((item,index)=>{
			return(
				<div key={index} className={styles.items}>
					<div className={styles.itemSub}>
						<img src={`http://www.etaoyao.com/upload/${item.iconFileId}`} alt="" className={styles.img}/>
						<span className={styles.name}>{item.title}</span> <br/>
						<span className={styles.describe}>(共找到{item.productSize}种药品）</span>
					</div>
				</div>
			)
		})
		// const content = (
		// 	<TouchableOpacity key={'renderCategory' + rowData.id} style={{ width: screenWidth / 2, height: 160, backgroundColor: '#fff' }}
		// 		activeOpacity={0.7} onPress={() => { this._openCategoryDetail(rowData.id, rowData.title) } }>
		// 		<View style={styles.listItem}>
		// 			<Image source={prdImg} style={styles.listImg} resizeMode='contain'></Image>
		// 			<Text style={{ fontSize: 14, textAlign: 'center', color: '#0c1828', paddingTop: 14, }}>{rowData.title}</Text>
		// 			<Text style={{ fontSize: 10, textAlign: 'center', color: '#8495a2', paddingTop: 9, }}>（共找到{rowData.productSize}种药品）</Text>
		// 		</View>
		// 	</TouchableOpacity>

		// );
		// return content;

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
					{this.renderRow(this.state.data)}
				</div>
			</div>
		);
	}
}

export default fastBuy;