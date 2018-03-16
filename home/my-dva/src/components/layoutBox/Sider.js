import React from 'react';
import { Link } from 'dva/router';
import { Layout, Menu, Icon } from 'antd';
/*import  style from './SideHead.less'*/
import { connect } from "dva";
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
//let id = 1;
class SiderDemo extends React.Component{
  static propTypes = {
    color: React.PropTypes.string,
  };

  state = {
    id:1,
   collapsed: false,
    current: '1',
    bgColor: '#404040',
 };
  handleClick =  (e) =>{
    this.setState({
      current: e.key,
    });
    //const id= this.props.params.id;
    //console.log(e.key);
    let id = e.key;
    this.props.dispatch({ type: 'article/getArticleList', payload: { id:id } });
    //console.log(this.props.getArticleList); 这里获取的时上一个数据
  };
  handleNav = ()=>{
    //const id= this.props.params.id;
    //console.log(1);
  }
  render () {
    return (
      <Sider  trigger={null} collapsible collapsed={this.props.collapsed} style={{backgroundColor: this.props.color==='#fff'?'#404040':'#fff',borderRight:'1px solid #404040'}}>
         <div className="logo" style={{margin:'20px',height:'110px',backgroundColor: this.props.color==='#fff'?'#fff':'#404040',lineHeight:'110px',textAlign: 'center'}}>我是LOGO好吗</div>
         <Menu theme={this.props.color === '#fff'? 'dark':'light'} mode="inline" defaultSelectedKeys={['1']} selectedKeys={[this.state.current]} onClick={this.handleClick}>

           <Menu.Item key="99"><Link to="/home">
             <Icon type="home" />
             <span>主页</span></Link>
           </Menu.Item>
           <SubMenu key="sub1" title={<Link to={"/progress/1"}><Icon type="video-camera" /><span className="nav-text">我的实习</span></Link>} style={{color:this.props.color}} className={this.props.color === '#fff'? 'bgB':'bgW'}>
             <Menu.Item key="100"><Link to={"/progress/1"}>
               <Icon type="video-camera" />
               <span>实习过程</span></Link>
             </Menu.Item>
             <Menu.Item key="101" >
               <Icon type="upload" />
               <span >实习问题</span>
             </Menu.Item>
           </SubMenu>
           <SubMenu key="sub2" title={<Link to="/feel/1"><Icon type="video-camera" /><span className="nav-text">前端技术</span></Link>} style={{color:this.props.color}} className={this.props.color === '#fff'? 'bgB':'bgW'}>
             <Menu.Item key="102"><Link to="/feel/1">
               <Icon type="video-camera" />
               <span>学习感受</span></Link>
             </Menu.Item>
             <Menu.Item key="1" ><Link to="/articleList/1">
               <Icon type="upload" />
               <span>react</span></Link>
             </Menu.Item>
             <Menu.Item key="2"><Link to="/articleList/2">
               <Icon type="upload" />
               <span>bootstrap</span></Link>
             </Menu.Item>
             <Menu.Item key="3" ><Link to="/articleList/3">
               <Icon type="upload" />
               <span>javascript</span></Link>
             </Menu.Item>
             <Menu.Item key="4"><Link to="/articleList/4">
               <Icon type="upload" />
               <span>JQuery</span></Link>
             </Menu.Item>
             <Menu.Item key="7"><Link to="/articleList/7">
               <Icon type="upload" />
               <span>PHP</span></Link>
             </Menu.Item>
             <Menu.Item key="5"><Link to="/articleList/5">
               <Icon type="upload" />
               <span>Swiper</span></Link>
             </Menu.Item>
             <Menu.Item key="6"><Link to="/articleList/6">
               <Icon type="upload" />
               <span>webpack</span></Link>
             </Menu.Item>
           </SubMenu>
         </Menu>
      </Sider>
    )
  }
}
export default connect((state) => {
  return {
    getArticleList: state.article.getArticleList,
  }
})(SiderDemo);
