
/**
 * Created by Administrator on 2017/8/18.
 */
import React, {Component} from 'react';
import { message } from 'antd';
import { Link } from 'dva/router';
import { connect } from "dva";
import style from './articleList.less';
let articleList = [];

class ArticleList extends  Component {
  constructor(props) {
    super(props);
    this.state = {
      getArticleLista : [],
    }

    //this.getArticle();
  }
  componentWillMount() {
    //console.log(this.state.articleList);
    //this.getArticle();
  }
  getArticle = ()=>{
    //console.log('aa');
    const id = this.props.params.id;
    const params = new FormData();
    params.append("id",id);
    fetch("/reactBlock/api/getArticleList.php",{
      method: 'post',
      headers: {},
      // credentials: 'same-origin',
      // origin: '',
      // credentials: 'include',
      body: params,
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
    }).then((json) => {
      console.log(json);
      articleList = [];
      for(let i=0; i<json.length; i++) {
        articleList[i] = <li key={json[i].id}><Link to={`/article/${json[i].id}`}>{i+1+'.'+json[i].title}</Link></li>;
      }
      console.log(articleList);
      this.setState({articleList: articleList});

    }).catch((error) => {
      console.log(error);
    })

  }
  handleDelete = (id)=>{
   // const fid = this.props.params.id;
   /* console.log(fid);
    const iid = id;
    this.props.dispatch({ type: 'article/delArticle', payload: { id:iid, fid:fid} });*/
    //e.preventDefault();
    const params = new FormData();
    params.append("id",id);
    fetch("/reactBlock/api/deleteBlock.php",{
      method: 'post',
      headers: {},
      body: params,
    }).then((response)=>{
      //console.log("ss", response);
      if (response.ok) {
        return response.json();
      }
    }).then((json)=>{
      console.log(json)
      if (json.code===200) {
        message.success(json.msg);
        let fid = this.props.params.id;
        this.props.dispatch({ type: 'article/getArticleList', payload: { id:fid } });
      } else {
        message.error(json.msg);
      }
    }).catch((error)=>{
      message.error(error);
    })

  }
  render(){
    const list = this.props.getArticleList
    //console.log(list);
    articleList = [];
    if (list) {
      for (let i = 0; i < list.length; i++) {
        articleList.push(
          <li key={list[i].id}><Link to={`/article/${list[i].id}`}>{i + 1 + '.' + list[i].title}</Link><span
            style={{float: 'right', marginRight: '16px', fontSize: '12px', lineHeight: '36px'}}
            onClick={()=>this.handleDelete(list[i].id)}>删除</span><Link
            style={{float: 'right', marginRight: '12px', fontSize: '12px', lineHeight: '36px'}}
            to={`/writeBlock/${list[i].id}`}>编辑</Link></li>);
      }
    }
    //console.log(articleList);
    return (
      <div>
        <ul className="articleList">
            {articleList}
        </ul>
      </div>
    )
  }
}
export default connect((state) => {
  return {
    getArticleList: state.article.getArticleList,
  }
})(ArticleList);
