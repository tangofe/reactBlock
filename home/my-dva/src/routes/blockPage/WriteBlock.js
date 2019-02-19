/**
 * Created by Administrator on 2017/8/18.
 */
import React, {Component} from 'react'
import { Form,Input, Button,Select,message } from 'antd';
import Ueditor from '../Ueditor';
import style from './writeBlock.less'
import E from 'wangeditor'
const FormItem = Form.Item;
const Option = Select.Option;
const blockName = [];
let type = '';
class WriteBlock extends  Component {
  constructor(props) {
    super(props)
    this.state = {
      title:'',
      content: '',
      type:'',
      key:''
    }
  }
  componentWillMount() {
    //this.getData();
    this.getType();
    //console.log(this.props.params.id);
  }
  componentDidMount() {
    const elem = this.refs.editorElem
    const editor = new E(elem)
    //使用 onchange 函数监听内容的变化，并实时更新到 state 中
    editor.customConfig.onchange = html => {
      this.setState({
        content: html
      })
    }
    editor.create()
    if (this.props.params.id!=="0") {
      //console.log(typeof this.props.params.id);
      this.getData(editor)
    }
  }
  componentWillReceiveProps () {
    this.forceUpdate();
  }
  getData = (ed)=>{
    const params= new FormData();
    params.append("id",this.props.params.id);
    fetch("reactBlock/api/getArticle.php",{
      method: 'post',
      headers: {},
      mode: 'cors',
      // credentials: 'same-origin',
      // origin: '',
      // credentials: 'include',
      body: params,
    }).then((response)=>{
      if (response.ok) {
        return response.json();
      }
    }).then((json)=>{
      console.log(json);
      this.setState({
        title: json.title,
        content: json.content,
        type: json.fid,
      })
      //UE.getEditor("content").setContent(json.content);
      ed.txt.html(json.content)
      //this.props.form.setFieldsValue({"content":json.content});
      this.props.form.setFieldsValue({"title":json.title});
      this.props.form.setFieldsValue({"type":json.fid.toString()});
    }).catch((error)=>{
      console.log(error);
    })
  }
  getType = ()=> {
    fetch("/reactBlock/api/getType.php", {
      method: 'post',
      headers: {},
      mode: 'cors',
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
    }).then((json) => {
     // console.log(json);
      //let id = 0;
      for (let i=0; i<json.length;i++) {
       //console.log(typeof json[i].id); string
        //id = JSON.parse(jsons[i].id);
        //console.log(typeof id);
        blockName.push(<Option key={json[i].id} value={json[i].id}>{json[i].fenlei_name}</Option>);
      }
      //console.log(blockName);
    }).catch((error) => {
      console.log(error);
    })
  }
  save = ()=>{
     //const content = UE.getEditor("content").getContent();
    const content = this.state.content;
    console.log(content)
     const title = this.props.form.getFieldValue('title');
     const type = this.props.form.getFieldValue('type');
     this.props.form.setFieldsValue({"content":content});
    if (content=='<p><br></p>') {
      message.error('正文不能为空')
      return false
    }
     const params = new FormData();
     params.append("content",content);
     params.append("title",title);
     params.append("type",type);
     if (this.props.params.id !=="0") {
       params.append("id",this.props.params.id);
     }
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        console.log(content);
        fetch("/reactBlock/api/addBlock.php", {
          method: 'post',
          headers: {},
          mode: 'cors',
          // credentials: 'same-origin',
          // origin: '',
          // credentials: 'include',
          body: params,
        }).then((response) => {
          if (response.ok) {
            return response.json();
          }
        }).then((json) => {
          //console.log(json);
          if (json.code===200) {
           message.success(json.msg);
          }else {
            message.error(json.msg);
          }
        }).catch((error) => {
          console.log(error);
          message.error(error);
        })
      }
    })
  }
  change = ()=>{
    const content = UE.getEditor("content").getContent();
    console.log(content);
  }
  handleChange = ()=>{

  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 20 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 20,
          offset: 4,
        },
      },
    };
    return (
      <div style={{height:'1600px'}} key={this.state.key}>
        <Form>
          <FormItem
            {...formItemLayout}
            label="标题"
          >
            {getFieldDecorator('title', {
              rules: [{
                required: true, message: '标题不能为空',
              }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<span className="beforeRed">正文</span>}
          >

              <div ref="editorElem" style={{textAlign: 'left'}}>
              </div>

  {/* <Ueditor  id="content" height="400"  style={ {margin:"0 auto"}} /> */}
            {/*value={formData.content} disabled={!this.props.canEdit}*/}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="所属分类">
            {getFieldDecorator('type', {
              initialValue: "1",
              rules: [{
                required: true, message: '所属分类不能为空',
              }],
            })(
              <Select onChange={this.handleChange} style={{"width":"200px"}}>
                {blockName}
              </Select>
            )}
          </FormItem>
        <FormItem { ...tailFormItemLayout}>
        <Button type="primary" onClick={this.save}>发表博客</Button>
        </FormItem>

        </Form>
      </div>
    )
  }
}
export default  WriteBlock = Form.create()(WriteBlock);;
