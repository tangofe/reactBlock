import React,{ Component} from 'react'
import { Layout,Form,Modal,Input,Button,Icon,message } from 'antd'
import { connect } from 'dva'
const { Header, Footer, Sider, Content } = Layout;
import SiderDemo from '../../components/layoutBox/Sider'
import HeaderDemo from '../../components/layoutBox/Header'
import Home from '../homePage/HomePage'
class demoPage extends Component{
  state = {
    color: '#fff',
   collapsed: false,
   loginModal: false,
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
    let id = (this.props.children? (this.props.children.props.params? this.props.children.props.params.id :0): 0);
    this.props.dispatch({ type: 'article/changeKey', payload: { id:id } });
  }
  handleLogin = ()=>{
    if (this.props.loginStatus) {
      this.props.dispatch({ type: 'login/toLogin', payload: { status:false } });
    } else {
      this.setState({
        loginModal: true
      })
    }
  }
  toLogin = ()=>{
    var user = this.props.form.getFieldValue('username')
    var pwd = this.props.form.getFieldValue('password')
    if (user=='tango'&&pwd=='123456') {
      this.props.dispatch({ type: 'login/toLogin', payload: { status:true } });
      this.setState({
        loginModal: false
      })
      message.success('欢迎您！');
    } else {
      message.error('不是管理员别乱搞>_<*');
      
    }
  }
  handleCancel = ()=>{
    this.setState({
      loginModal: false
    })
  }
  render () {
   // console.log(this.props.children);
    const { getFieldDecorator } = this.props.form;
    const show = (this.props.children?
      <div>{this.props.children}</div>
    :
      <Home />);
    let id = (this.props.children? (this.props.children.props.params? this.props.children.props.params.id :0): 0);
    //console.log(id);
    return (
      <div>
        <Layout className="ant-layout-has-sider">
          <SiderDemo  style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }} collapsed={this.state.collapsed} color={this.state.color}/>
          <Layout>
            <HeaderDemo onColla={this.changeCol.bind(this)} onTheme={this.changeTheme.bind(this)} color={this.state.color} id={id} loginStatus={this.props.loginStatus} handleLogin={this.handleLogin}/>
            <Content style={{ padding: 24, background: '#fff',paddingLeft: this.state.collapsed?'88px':'224px'}}>
              {show}
            </Content>
            <Modal
              title="管理员登录"
              visible={this.state.loginModal}
              onCancel={this.handleCancel}
              footer={null}
            >
              <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                  {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                  })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}} />} placeholder="Username" />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                  })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                  )}
                </Form.Item>
                <Form.Item>
                  
                  <Button type="primary"  className="login-form-button"  onClick={this.toLogin}>
                    Log in
                  </Button>
              
                </Form.Item>
              </Form>
            </Modal>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default connect((state) => {
  return {
    loginStatus: state.login.loginStatus,
  }
})(Form.create()(demoPage));
