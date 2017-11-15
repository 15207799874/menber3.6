
// import React from 'react'
// export const CoreLayout = ({ children, location }) => {
// 	//console.log('>>>>>>Test',props.children);
// 	return(
// 		<div className='container text-center'>
// 		{children}
// 	  </div>
// 	)
// }



// export default CoreLayout

import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import style from "./CoreLayout.css";

 
export default class Container extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
 
    componentWillMount() {
        // document.body.style.margin = "0px";
        // // 这是防止页面被拖拽
        // document.body.addEventListener('touchmove', (ev) => {
        //     ev.preventDefault();
        // });
    }
 
    render() {
        return (
            <ReactCSSTransitionGroup				
                transitionName="transitionWrapper"
                component="div"
                className={[style.transitionWrapper,style.clearfix]}
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}>
                <div key={this.props.location.pathname}
                     style={{position:"absolute", width: "100%"}}>
                    {
                        this.props.children
                    }
                </div>
            </ReactCSSTransitionGroup>
        );
    }
 
}






