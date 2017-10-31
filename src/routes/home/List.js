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
      isLoading: true,
	  height: document.documentElement.clientHeight * 3 / 4,	 
	};
	this.page = 1;
  }

  componentWillMount(){
	 this.props.fetchData && this.props.fetchData(this.page,(result)=>{		
		 console.log('>>>>>>',result);
		this.setState({dataSource: this.state.dataSource.cloneWithRows(result)});
	 });

  }

  componentDidMount() {
   // you can scroll to the specified position
    setTimeout(() => this.lv.scrollTo(0, 120), 800);	
    const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;;
    setTimeout(() => {     
      this.setState({        
        isLoading: false,
        height: hei,
      });
    }, 600);
  }

  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.dataSource !== this.props.dataSource) {
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRowsAndSections(nextProps.dataSource),
  //     });
  //   }
  // }

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
        isLoading: false,
      });
    }, 1000);
  }

  render() {
    const row = (rowData, sectionID, rowID) => {
		console.log('>>>>>>>>>',rowData);
      return (
        <img key={rowID} style={{width:this.props.innerWidth/2-50,marginLeft:rowID%2 != 0 ? 98 : 0}} src={rowData.product.picUrl}/>        
      );
    };

    return (
      <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? 'Loading...' : 'Loaded'}
        </div>)}
        contentContainerStyle={{...style.flexHor,flexWrap:'wrap',marginTop:10}}
        renderRow={row}        
        style={{
          height: this.state.height,
          overflow: 'auto',
        }}
        pageSize={4}
        onScroll={() => { console.log('scroll'); }}
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
