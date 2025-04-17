const path = require('path')
const Koa = require('koa')
const router = require('koa-router')()
const static = require('koa-static')
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./index.template.html', 'utf-8')
})
const app = require('./dist/bundle.server.js').default

const koa = new Koa()
koa.use(static(path.join(__dirname, './dist')))

router.get('/(.*)', async (ctx, next) => {
  const context = {
    url: ctx.url
  }
  let htmlStr
  await app(context).then(res => {
    renderer.renderToString(res, context, (err, html) => {
      if (!err) {
        htmlStr = html
      }
    })
  })
  ctx.body = htmlStr
});
/**
 * router.get('/(.*)', async (ctx, next) => {...})是用来定义一个Koa路由处理器的
 * 它接收两个参数，第一个参数是路由的路径，第二个参数是一个异步函数，用于处理该路由的请求。
 * 在这个例子中，我们定义了一个通配符路由，它可以匹配所有路径，并返回一个HTML字符串。
 * 这个HTML字符串是通过Vue Server Renderer渲染的，它接收一个Vue实例和一个上下文对象作为参数。
 * Vue实例是通过app(context)创建的，它是一个异步函数，返回一个Promise对象。
 * 上下文对象包含了请求的URL，它会被传递给Vue实例，以便在渲染时使用。
 * 最后，我们使用renderer.renderToString方法将Vue实例渲染成HTML字符串，并将其赋值给htmlStr变量。
 * 最后，我们将htmlStr作为响应体返回给客户端。
 * 
 * router.get用于定义一个处理GET请求的路由
 * 路由路径/(.*)表示一个正则表达式，用于匹配所有的URL路径
 * .*表示匹配任意字符，+表示匹配一次或多次，?表示匹配零次或一次
 * .*表示匹配任意字符(包括/)，冰球额可以匹配零个或多个字符
 * 因此,/(.*)表示可以匹配到任何请求，包括根路径和任何子路径
 * 
 * 路由处理器是一个异步函数，接收ctx(上下文对象)和next(下一个中间件的函数)两个参数
 * ctx是Koa的上下文对象，包含了请求和响应的信息
 * next是下一个中间件的函数，用于调用下一个中间件
 * 在这个例子中，我们使用await关键字来等待app(context)的Promise对象解析完成
 * 解析完成后，我们将htmlStr作为响应体返回给客户端
 * 
 * 在这个处理器中，首选创建一个context对象,保存当前请求的URL
 */

/**
 * 路由的用途：
 * 路由是Web应用程序的核心部分，用于将URL映射到相应的处理程序。
 * 在Koa中，我们可以使用koa-router中间件来定义路由。
 * 路由可以处理GET、POST、PUT、DELETE等HTTP请求方法，也可以处理任何URL路径。
 * 
 * 捕获所有请求:通过使用/(.*)，你可以捕获所有的GET请求并进行处理。
 * 这在服务端渲染的应用中非常有用，因为你需要根据请求的URL来渲染相应的页面。
 */

/**
 * koa.on用于监听Koa的事件
 */

/**
 * koa.listen用于启动Koa服务器
 */

/**
 * koa.use用于注册一个中间件
 * 中间件是一个函数，用于处理请求和响应
 * 在这个例子中，我们使用koa-static中间件来提供静态文件服务
 * 它接收一个路径作为参数，用于指定静态文件的目录
 * 在这个例子中，我们将静态文件的目录设置为./dist
 */


/**
 * router.routes用于注册路由,是Koa Router提供的方法，用于返回一个中间件函数，该函数会自动处理与路由相关的请求
 * 这个方法会在注册录用定义中所有的GET,POST等请求处理逻辑
 * 
 * 整体作用
 * 注册路由: 通过调用 koa.use(router.routes())，你将路由中间件注册到 Koa 应用中，使得 Koa 能够处理定义的路由请求。
 * 处理请求: 当请求到达 Koa 应用时，这个中间件会根据请求的 URL 匹配相应的路由，并执行对应的处理器。
 */
koa.use(router.routes())

koa.on("error", (err, ctx) => {
  console.log(new Date(), " : ", err);
});

koa.listen(9000, () => {
  console.log('server is listening in 9000');
});
