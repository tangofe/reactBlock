/**
 * Created by Administrator on 2017/8/18.
 */
import React, {Component} from 'react'
import { Form,Input, Button,Select,message } from 'antd';
import Ueditor from '../Ueditor';
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
    }
  }
  componentWillMount() {
    //this.getData();
    this.getType();
    //console.log(this.props.params.id);
  }
  componentDidMount() {
    if (this.props.params.id!=="0") {
      //console.log(typeof this.props.params.id);
      this.getData()
    }
  }
  getData = ()=>{
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
      UE.getEditor("content").setContent(json.content);
      this.props.form.setFieldsValue({"content":json.content});
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
     const content = UE.getEditor("content").getContent();
     const title = this.props.form.getFieldValue('title');
     const type = this.props.form.getFieldValue('type');
     this.props.form.setFieldsValue({"content":content});

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
      <div style={{height:'1600px'}}>
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
            label="正文"
          >
            {getFieldDecorator('content', {
              rules: [{
                required: true, message: '正文不能为空',
              }],
            })(
              <Ueditor  id="content" height="400"  style={ {margin:"0 auto"}} />
            )}
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
