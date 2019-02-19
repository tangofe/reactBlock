/**
 * Created by Administrator on 2017/8/18.
 */
import React, {Component} from 'react'
import Ueditor from '../Ueditor';

class Home extends  Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
   // this.getData();
  }
  getData = ()=>{
    const params=[];
    fetch("/reactBlock/test.php",{
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
    }).catch((error)=>{
      console.log(error);
    })
  }
  render(){
    return (
      <div style={{height:'100%'}}>
       <h1>只是主页，主页主页，但不知道写什么，尴尬~~</h1>
        <h3>做些自我介绍怎么样？我来自...</h3>
        <h3>欢迎你来访，大家一起学习共进！比心~</h3>
      </div>
    )
  }
}
export default  Home;
