var userPlugin = require('../plugins/user');
var blogPlugin = require('../plugins/blog');

module.exports = function (app) {

    app.use(function (req, res,next) {
        var user = req.session.user;
        if(user){
            //一次性存入的变量
            app.locals.user = user;
        }else{
            app.locals.user = user;
        }
        // console.log(user);
        next();
    });

    //首页
    app.get('/',blogPlugin.indexList.get);

    //登录
    app.get('/login',userPlugin.loginNo.no,userPlugin.login.get);
    app.post('/login',userPlugin.login.post);
    //注册
    app.get('/reg',userPlugin.loginNo.no,userPlugin.reg.get);
    app.post('/reg',userPlugin.reg.post);
    //个人资料
    app.get('/user/:_id',userPlugin.isLogin.yes,userPlugin.userInfo.get);
    //退出
    app.get('/logout',userPlugin.isLogin.yes,userPlugin.logout.get);

    //添加博客文章
    app.get('/add',userPlugin.isLogin.yes,blogPlugin.add.get);
    app.post('/add',blogPlugin.add.post);
    
    //查看博客详情
    app.get('/view/:_id',userPlugin.isLogin.yes,blogPlugin.blogDetail.get);

    // 博客文章列表
    app.get('/list',userPlugin.isLogin.yes,blogPlugin.blogList.get);
    
    // 删除博客
    app.get('/list/:_id',blogPlugin.deleteBlog.get);
    
    // 修改博客
    app.get('/list/:_id/editor', blogPlugin.updateBlog.get);
    app.post('/list/:_id/editor', blogPlugin.updateBlog.post);

    //404
    app.use(function(req, res){
        res.render("404");
    });
};
