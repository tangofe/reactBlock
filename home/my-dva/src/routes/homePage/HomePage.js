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
      <div style={{height:'1600px'}}>
        Home内容来了
      </div>
    )
  }
}
export default  Home;
