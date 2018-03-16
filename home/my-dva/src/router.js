import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Product from './routes/Product';
import DemoPage from './routes/demoPage/DemoPage'
import LayPage from './routes/demoPage/LayPage'
import Progress from './routes/progressPage/Progress'
import Question from './routes/questionPage/Question'
import Home from './routes/homePage/HomePage'
import Feel from './routes/feelPage/Feel'
import  Boot from  './routes/bootPage/Boot'
import Block from './routes/blockPage/WriteBlock'
import Article from './routes/blockPage/ArticleBlock'
import ArticleList from './routes/blockListPage/ArticleList'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      {/*<Route path="/" component={IndexPage} />*/}
      <Route path="/" component={DemoPage} >
        <Route path="home" component={Home} />
        <Route path="progress/:id" component={Progress}/>
        <Route path="question/:id" component={Question}/>
        <Route path="feel/:id" component={Feel}/>
        <Route path="boot/:id" component={Boot}/>
        <Route path="writeBlock/:id" component={Block}/>
        <Route path="article/:id" component={Article} />
        <Route path="articleList/:id" component={ArticleList} />
      </Route>
      <Route path="/lay" component={LayPage} />
    </Router>
  );
}

export default RouterConfig;
