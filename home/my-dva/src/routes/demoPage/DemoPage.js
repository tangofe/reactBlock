import React,{ Component} from 'react'
import { Layout } from 'antd'
const { Header, Footer, Sider, Content } = Layout;
import SiderDemo from '../../components/layoutBox/Sider'
import HeaderDemo from '../../components/layoutBox/Header'
import Home from '../homePage/HomePage'
class demoPage extends Component{
  state = {
    color: '#fff',
   collapsed: false,
 };
  changeCol (collapsed) {
    this.setState({
      collapsed: collapsed
    });
  }
  changeTheme (sw) {
    this.setState({
      color: !sw?'#fff':'#404040',
    })
  }
  componentWillMount () {

  }
  render () {
   // console.log(this.props.children);
    const show = (this.props.children?
      <div>{this.props.children}</div>
    :
      <Home />);
    let id = (this.props.children? (this.props.children.props.params? this.props.children.props.params.id :0): 0);
    //console.log(id);
    return (
      <div>
        <Layout className="ant-layout-has-sider">
          <SiderDemo style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }} collapsed={this.state.collapsed} color={this.state.color}/>
          <Layout>
            <HeaderDemo onColla={this.changeCol.bind(this)} onTheme={this.changeTheme.bind(this)} color={this.state.color} id={id}/>
            <Content style={{ padding: 24, background: '#fff', minHeight: '1080px' }}>
              {show}
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default demoPage;
