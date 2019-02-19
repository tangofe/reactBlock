import dva from 'dva';


// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));
app.model(require('./models/articleList'));
app.model(require('./models/login'));

// 4. Router
app.router(require('./router'));

// 5. Start
/*var proxy = require('http-proxy-middleware')
//context可以是单个字符串，也可以是多个字符串数组，分别对应你需要代理的api,星号（*）表示匹配当前路径下面的所有api
const context = [`/login`, `/admin/!*`]
//options可选的配置参数请自行看readme.md文档，通常只需要配置target，也就是你的api所属的域名。
const options = {
  target: 'http://localhost',
  changeOrigin: true
}
//将options对象用proxy封装起来，作为参数传递
const apiProxy = proxy(options)
//现在你只需要执行这一行代码，当你访问需要跨域的api资源时，就可以成功访问到了。
app.use(context, apiProxy)*/
app.start('#root');
