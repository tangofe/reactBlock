import React, {PropTypes} from 'react'
import { Layout, Menu, Icon, Breadcrumb, Switch} from 'antd';
import { Link } from 'dva/router';
/*import  style from './SideHead.less'*/
const { Header, Sider, Content } = Layout;
const [progress, quesion]= [<div><Breadcrumb.Item >我的实习</Breadcrumb.Item>
<Breadcrumb.Item >实习进程</Breadcrumb.Item></div>];

class HeaderDemo extends React.Component {
  static propTypes = {
    onColla: PropTypes.func,
    color: PropTypes.string,
    onTheme: PropTypes.func,
  };
  state = {
   collapsed: false,
    bgColor:  '#404040',
    color: '#fff',
    loginModal:false,
 };
   toggle = () => {
     this.setState({
       collapsed: !this.state.collapsed,
     });
     this.props.onColla(!this.state.collapsed)
   };
  onChange(checked) {
    //console.log(`switch to ${checked}`);
    this.props.onTheme(checked);
    this.setState({
      bgColor: checked?'#fff':'#404040',
      color: checked?'#404040':'#fff',
    })
    //console.log(checked);

  }
  componentWillMount () {
    //console.log('header');
    if (this.props.params) {
     // console.log(this.props.params.id);
    }
    //console.log(this.props.id);
    /*console.log(this.props.id);
    const bread = (this.props.id==1?<div> <Breadcrumb.Item href="" style={{color:this.state.color}}>presss</Breadcrumb.Item>
      <Breadcrumb.Item style={{color:this.state.color}}>study</Breadcrumb.Item></div>:'kongde ');
    console.log(bread);*/
  }
  handleLogin = ()=>{
    this.props.handleLogin()
  }
  render () {
    //console.log(this.props.params);
    //console.log(this.props.id);

    return (
      <Header style={{ background: this.state.bgColor ,paddingRight:'10px', borderBottom:'1px solid #404040',paddingLeft: this.state.collapsed?'64px':'200px' }}>
      <Icon
           className="trigger"
           type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
           onClick={this.toggle}
           style={{ fontSize: '18px',
              lineHeight: '64px',
              padding: "0 '16px'",
              cursor: 'pointer',
              float: 'left',
              color: this.state.color,
              }}
         />
      <div style={{float:'left',color:this.state.color,marginLeft:'20px'}} onClick={()=>this.handleLogin()}><a>{this.props.loginStatus?'退出':'登录'}</a></div>
      <div className="head" style={{float:'right',color:this.state.color}}>dark</div>
      <Switch defaultChecked={false} onChange={this.onChange.bind(this)} size='small' style={{float:'right',marginTop:'26px',marginRight:'5px'}}/>
        { this.props.loginStatus?<Link style={{float:'right',marginRight:'16px',fontSize:'14px'}} to={"/writeBlock/0"}>写博客</Link>:''}
      </Header>
    )
  }
}

export default HeaderDemo;
