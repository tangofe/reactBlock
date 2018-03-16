
/**
 * Created by Administrator on 2017/8/18.
 */
import React, {Component} from 'react'
import { Link } from 'dva/router';
import { message } from 'antd';
let content = '';
class ArticleBlock extends  Component {
  constructor(props) {
    super(props)
    this.state = {
      title:'',
      content: '',
      id: '',
    }
  }
  componentWillMount() {
    this.getAticle();
  }
  getAticle = ()=>{
    const id = this.props.params.id;
    const params = new FormData();
    params.append("id",id);
    fetch("/reactBlock/api/getArticle.php",{
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
      content = json.content;
      var i = document.getElementById('article');
     // console.log(i);
     // console.log(doc);
      i.innerHTML= content;
      this.setState({
        title:json.title,
        content: json.content,
        id:json.id
      })
      //console.log(i.innerHTML);
    }).catch((error) => {
      console.log(error);
    })
  }

  render(){
    return (
      <div>
        <h1 style={{textAlign: "center"}}>{this.state.title}</h1>
        <div id="article" style={{marginTop:"20px"}}>
        </div>
      </div>
    )
  }
}
export default  ArticleBlock;
