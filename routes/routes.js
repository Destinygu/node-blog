var userPlugin = require('../plugins/user');
var blogPlugin = require('../plugins/blog');

var log = userPlugin.isLogin.yes;
var nolog = userPlugin.loginNo.no;

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
    app.get('/login', nolog, userPlugin.login.get);
    app.post('/login', userPlugin.login.post);
    //注册
    app.get('/reg', nolog,userPlugin.reg.get);
    app.post('/reg',userPlugin.reg.post);
    //修改密码
    app.get('/userup/:_id', log, userPlugin.updatepw.get);
    app.post('/userup/:_id', log, userPlugin.updatepw.post);
    //退出
    app.get('/logout', log, userPlugin.logout.get);

    //添加博客文章
    app.get('/add', log, blogPlugin.add.get);
    app.post('/add', blogPlugin.add.post);
    
    //查看博客详情
    app.get('/view/:_id', log, blogPlugin.blogDetail.get);

    // 博客文章列表
    app.get('/list', log, blogPlugin.blogList.get);
    
    // 删除博客
    app.get('/list/:_id', blogPlugin.deleteBlog.get);
    
    // 修改博客
    app.get('/list/:_id/editor', blogPlugin.updateBlog.get);
    app.post('/list/:_id/editor', blogPlugin.updateBlog.post);

    //聊天室
    app.get('/wechat', log, function(req,res,next){
        res.render('wechat',{title:'wechat'});
    });

    //404
    app.use(function(req, res){
        res.render("404");
    });
};
