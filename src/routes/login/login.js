import React, { Component } from "react";
import {NavBar,Button} from 'antd-mobile';
import md5 from "md5";
// import Regist from "./Regist";
// import RetrievePassword from "./RetrievePassword";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./redux/MemberAction";
import { browserHistory } from 'react-router'


//let SCREEN_WIDTH = Dimensions.get("window").width;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputUser: "",
      inputPassword: "",
      inputCheck: "",
    //   checkImg: config.host + "/ValidateCode?" + Date.now(),
      warnText: "",
      isNeedCheckCode: false
    };
    this._openRegist = this._openRegist.bind(this);
    this._openRetrievePassword = this._openRetrievePassword.bind(this);
    this.isStartToast = false;
    this.deviceUserId = "";
    this.channelId = "";
  }
  componentWillMount() {

  }
  componentDidMount() { }
  componentWillUnmount() {
    // this.timer && clearTimeout(this.timer);
    // this.props.params &&
    //   this.props.params.callback &&
    //   this.props.params.callback(false);
    // if (this.props.navigator.getCurrentRoutes().length == 1) {
    //   if (!this.isLogined) {
    //     RCTDeviceEventEmitter.emit("changeTabBarIdx", { idx: 0, goTop: true });
    //   }
    // }
  }
  _openRegist() {
    this.props.navigator.push({
      component: Regist
    });
  }
  _openRetrievePassword() {
    this.props.navigator.push({
      component: RetrievePassword
    });
  }
  startToast(value = "") {
    //防止多次触发
    if (this.isStartToast == true) {
      return;
    } else {
      this.isStartToast = true;
    }
    // this.setState({ warnText: value });
    this.setState({ warnText: "用户名不存在或密码不匹配" });

  }

  isCanTouchLogin() {
    if (
      this.state.inputUser.trim() != "" &&
      this.state.inputPassword.trim() != ""
    ) {
      if (
        this.state.isNeedCheckCode == true &&
        this.state.inputCheck.length != 4
      ) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  renderLeftButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          // this.props.params && this.props.params.callback && this.props.params.callback(false);
          this.props.navigator.pop();
        }}
        activeOpacity={0.7}
        style={{ marginLeft: 13, marginTop: 11 }}
      >
        <Text style={{ fontSize: 16, color: "#444" }}>关闭</Text>
      </TouchableOpacity>
    );
  }

  //登录操作
  onClickLogin() {
    console.log("--------------md5登录操作:", this.state.inputPassword);
    console.log("--------------md5", md5(this.state.inputPassword));
    let data = {
      account: this.state.inputUser,
      password: md5(this.state.inputPassword),
      deviceUserId: '',
      channelId: '',
      platform: "IOS",
      validateCode: ''
    };
    this.props.actions
      .login(data)
      .then(data => {       
          console.log('login data', data);
        //   if (!data.isApprove) {
        //     //帐号未审核
        //     StorageUtils.readInfo('BASEINFOR').then((inforResult) => {
        //       console.log('StorageUtils BaseInfor>> ----', inforResult);
        //       let userInfo = inforResult.data;
        //       if (userInfo.userName == this.state.inputUser && userInfo.businessRanges != '' && userInfo.customerTypeId != '') {
        //         this.props.navigator.push({
        //           component: Fillinfor,
        //           params: {
        //             buyersId: data.result.buyersId,
        //             businessRanges: userInfo.businessRanges,
        //             customerTypeId: userInfo.customerTypeId
        //           }
        //         });
        //       } else {
        //         this._ToBaseInfor();
        //       }
        //     }, (error) => {
        //       console.log('StorageUtils BaseInfor>> ----error', error);
        //       this._ToBaseInfor();
        //     });
        //   }
          if (data.isApprove) {
            //帐号已审核
            //登录结束后，关闭当前页面
            // this.isLogined = true;
            // this.props.params &&
            // this.props.params.callback &&
            // this.props.params.callback(true);
            browserHistory.goBack();
          }
      })
      .catch(error => {
        console.log("error", error);
        //this.startToast({});
        this.setState({ inputPassword: "" });
        // alert(error.code);
        if (error.code == "500") {
          // this.startToast('账户名与密码不匹配，请重新输入');
         // this.isNeedValidateCode();
        }
      });
  }
  _ToBaseInfor() {
    this.props.navigator.replace({
      component: BaseInfor,
      //要禁用安卓物理返回键的页面，同时需要去 lib/navigator.js 文件的 onBackAndroid 方法手动添加页面判断
      forbiddenPage: "PerfectInformation",
      params: {
        userName: this.state.inputUser
      }
    });
  }
  //判断是否需要验证码
  isNeedValidateCode() {
    if (this.state.inputUser.trim() == "") {
      return;
    }
    InteractionManager.runAfterInteractions(() => {
      new Fetch({
        url: "app/user/isNeedValidateCode.json",
        method: "POST",
        data: {
          loginId: this.state.inputUser
        }
      })
        .dofetch()
        .then(data => {
          if (data.needCode != this.state.isNeedCheckCode) {
            this.setState({ isNeedCheckCode: data.needCode });
          }
          //重新刷新验证码图片
          if (data.needCode == true) {
            this.setState({
              checkImg: config.host + "/ValidateCode?" + Date.now()
            });
          }
        })
        .catch(error => {
          console.log("error", error);
        });
    });
  }

  render() {   	  
    return (
      <div className="flexVer-js-ac" style={{width:"100%",backgroundColor:"#f5f5f5"}}>
		<NavBar	mode="light"
			style={{width:"100%"}}
			onLeftClick={()=>{browserHistory.goBack()}}
			>登录</NavBar>
		<input type="text" 
			style={{backgroundColor:"#f5f5f5",marginTop:50,width:"80%",height:100,borderWidth:0,borderBottomWidth:3,orderBottomColor:"#e5e5e5"}}
			placeholder="用户名／手机号／邮箱" 
			value={this.state.inputUser}
			onChange={(e)=>{this.setState({inputUser:e.target.value})}}
			/>
		<input type="text" 
			style={{backgroundColor:"#f5f5f5",marginTop:50,width:"80%",height:100,borderWidth:0,borderBottomWidth:3,borderBottomColor:"#e5e5e5"}}
			placeholder="密码" 
			value={this.state.inputPassword}
			onChange={(e)=>{this.setState({inputPassword:e.target.value})}}
			/>
		<Button type="primary" style={{marginTop:50,width:"80%"}} disabled={this.state.inputUser && this.state.inputPassword ? false : true}
			onClick={()=>{
					console.log('>>>>>submit',this.state.inputUser);
					this.onClickLogin();
				}}
			>登录
		</Button>
		<div style={{marginTop:40}}>
			<span>找回密码 </span>|<span> 注册账号</span>	
		</div> 
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);