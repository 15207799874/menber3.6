import React, { Component } from 'react';
import { TabBar, Icon } from 'antd-mobile';
import Home from '../routes/home/home';
import FastBuy from '../routes/fastBuy/fastBuy';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'

/* eslint global-require: 0 */

class TabBarExample extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'blueTab',
      hidden: false,
    };
  }

  renderContent(pageText) {
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <div style={{ paddingTop: 60 }}>你已点击“{pageText}” tab， 当前展示“{pageText}”信息</div>
        <a style={{ display: 'block', marginTop: 40, marginBottom: 600, color: '#108ee9' }} onClick={(e) => {
          e.preventDefault();
          this.setState({
            hidden: !this.state.hidden,
          });
        }}
        >
          点击切换 tab-bar 显示/隐藏
        </a>
      </div>
    );
  }

  render() {	
    return (
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        hidden={this.state.hidden}
      >
        <TabBar.Item
          title="首页"
          key="首页"
          icon={<div style={{		
            width: '.5rem',
            height: '.5rem',
            background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  0.42rem 0.42rem no-repeat' }}
          />
          }
          selectedIcon={<div style={{
            width: '.5rem',
            height: '.5rem',
            background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  0.42rem 0.42rem no-repeat' }}
          />
          }
          selected={this.state.selectedTab === 'blueTab'}         
          onPress={() => {
            this.setState({
              selectedTab: 'blueTab',
            });
          }}
          data-seed="logId"
        >
          <Home/>
        </TabBar.Item>
        <TabBar.Item
          icon={<Icon type="koubei-o"  />}
          selectedIcon={<Icon type="koubei"  />}
          title="速购"
          key="速购"        
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => {
			if(this.props.isLogin){
				this.setState({
				selectedTab: 'redTab',
				});
			}else{
				browserHistory.push('/login')
			}
          }}
          data-seed="logId1"
        >
			<FastBuy></FastBuy>
        </TabBar.Item>
        <TabBar.Item
          icon={
            <div style={{
              width: '.5rem',
              height: '.5rem',
              background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  0.42rem 0.42rem no-repeat' }}
            />
          }
          selectedIcon={
            <div style={{
              width: '.5rem',
              height: '.5rem',
              background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  0.42rem 0.42rem no-repeat' }}
            />
          }
          title="进货单"
          key="进货单"          
          selected={this.state.selectedTab === 'greenTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'greenTab',
            });
          }}
        >
          {this.renderContent('朋友')}
        </TabBar.Item>
        <TabBar.Item
          icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
          selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
          title="我的"
          key="我的"
          selected={this.state.selectedTab === 'yellowTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'yellowTab',
            });
          }}
        >
          {this.renderContent('我的')}
        </TabBar.Item>
      </TabBar>
    );
  }
}

function mapStateToProps(state) {
	return {
		isLogin: state.Member.isLogin,
		userType: state.Member.userType,
	};
}

export default connect(mapStateToProps)(TabBarExample);