/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { ListView } from 'antd-mobile';



class HomeList extends React.Component {
	constructor(props) {
		super(props);
		const dataSource = new ListView.DataSource({   
		rowHasChanged: (row1, row2) => row1 !== row2      
		});
		this.state = {
		dataSource,
		status:'wait',
		isLoading: true,
		isMyriad : false,
		checkNetwork : true,
		openCheckNetwork : this.props.openCheckNetwork,
		height: document.documentElement.clientHeight * 3 / 4,	 
		};
		this.page = 0;
		this.reloadData = this.reloadData.bind(this);
	}

	static propTypes = {
		fetchData: React.PropTypes.func.isRequired,	
	}

	componentWillMount(){
		this.onRefresh();

	}

	getRows(sectionIdentitie){
		if(sectionIdentitie != undefined){
			return this.state.dataSource._dataBlob[sectionIdentitie];
		}
		let sections = this.state.dataSource.sectionIdentities;
		if(sections != undefined && sections.length > 0){
			return this.state.dataSource._dataBlob[sections[0]];
		}
		return null;
	}

	setRows(rows){	
		this.setState({
			dataSource : this.state.dataSource.cloneWithRows(rows)
		});
	}
	appendRows(rows){
		var newRows = this.getRows().concat(rows);
		this.setRows(newRows);
	}

	onRefresh() {
		this.props.fetchData(this.page + 1, (rows, currCount, totalCount) => {
			this.totalRowCount = currCount;
			this.totalCount = totalCount;			
			this.setState({
				status : this.totalRowCount >= this.totalCount ? 'done' : 'wait',
				isLoading : false
			});
			if(rows != null || rows != undefined){
				if(this.page == 0){
					if(rows.length==0){
						this.setState({
							isMyriad : true,						
						});
					} else {
						this.setState({
							isMyriad : false,						
						});
					}
					this.setRows(rows);
				}else{
					this.appendRows(rows);
				}
			}
		}, (err) => {
			console.log("errInfo",err);
			this.page--;
			this.setState({
				status : 'error',
				isLoading : false,
			});
			
		});
	}

	onLoadMore(){	
		this.setState({isLoading : 'loading'});	
		this.page++;
		this.onRefresh();		
	}
	reloadData() {
		this.page = 0;
		this.onRefresh();
	}

	componentDidMount() {
	
		setTimeout(() => this.lv.scrollTo(0, 120), 800);	
		// const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;;
		setTimeout(() => {     
		this.setState({        
			isLoading: false,			
		});
		// console.log('>>>>',document.documentElement.clientHeight,ReactDOM.findDOMNode(this.lv).parentNode.offsetTop);
		}, 600);
	}

	onEndReached = (event) => {   
		console.log('reach end',this.state.isLoading,this.state.status == 'done');
		if (this.state.isLoading || this.state.status == 'done') {
			console.log('>>>>return');
		return;
		}
		this.onLoadMore();
	}
	renderRow(rowData, sectionID, rowID, highlightRow) {
		let price = rowData.product.price == null ? rowData.product.marketPrice : rowData.product.price;
		let leftPrice = Number.parseFloat(price).toFixed(2).toString().split('.');
	
		return (
			<div key={rowID} style={{...style.flexVer,justifyContent:'space-between', width:this.props.innerWidth/2-50,marginLeft:rowID%2 != 0 ? 98 : 0,display:'inline-block'}}>
				<img  style={{width:this.props.innerWidth/2-80}} src={rowData.product.picUrl}/>    					
				<div style={{height:185,...style.flexVer,justifyContent:'space-around',paddingLeft:30,alignItems:'flex-start'}}>
					{
					rowData.product.price == null ?
						<div style={{ width: 158, height: 42, ...style.flexHor, border:'1px solid #8495a2',marginBottom:20,alignItems:'center',paddingLeft:10,paddingRight:10}}>
							<img style={{ width: 26}} src={`${process.env.PUBLIC_URL}/003denglukejian@2x.png`}/>
							<div style={{ width: 2, height: 26, backgroundColor: '#8495a2' }} />
							<span style={{ fontSize: 22, color: '#8495a2' }}>登录可见</span>
						</div>
						: <span style={{ color: '#000', fontSize: 32, marginBottom:10 }}>￥{leftPrice[0]}.{leftPrice[1]}</span>
					}
					<span style={{ color: '#333', fontSize: 26,  }} >{rowData.text}</span>
					<span style={{ color: '#333', fontSize: 26,  }} >{rowData.product.specPack}</span>
				</div>					
			
			</div>
		)
	}

  render() {
    return (
      <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.status == 'wait' ? '上拉加载更多' : this.state.status == 'done' ? '已经没有跟多了' : this.state.isLoading ? '加载中' : '上拉加载更多'}
        </div>)}
        contentContainerStyle={{...style.flexHor,flexWrap:'wrap',marginTop:10}}
        renderRow={this.renderRow.bind(this)}        
        style={{
          height: this.state.height,
          overflow: 'auto',
        }}
        pageSize={4}
        onScroll={() => {}}
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
      />
    );
  }
}

export default HomeList;

const style = {
	flexHor:{
		display:'flex',
		flexDirection:"row",
		justifyContent:"space-between",
		alignItems:"flex-start"		
	},
	flexVer:{
		display:'flex',
		flexDirection:"column",
		justifyContent:"center",
		alignItems:"center"		
	}
}
