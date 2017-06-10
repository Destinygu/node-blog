var ModelUser = require('../model/user');
var crypto = require('crypto');


//登录
module.exports.login = {

    get: function(req, res, next) {
        res.render('login', {
            title: 'login'
        });
    },

    post: function(req, res, next) {
        var postData = {
            email: req.body.email
        };
        var md5 = crypto.createHash('md5');
        var password_md5 = md5.update(req.body.password).digest('hex');

        var resJson = {
            status: false,
            msg: ''
        };
        // 向界面返回获取到的数据
        // res.send(postData);
        ModelUser.findOne(postData, function(err, data) {
            if (err) {
                console.log(err);
            }
            if (data) {
                if (data.password == password_md5) {
                    req.session.user = data;
                    resJson.msg = '登录成功';
                    resJson.status = true;
                    res.send(resJson);
                    // res.redirect('/user/'+data._id);
                } else {
                    resJson.msg = '密码错误';
                    res.send(resJson);
                }
            } else {
                resJson.msg = '没有此用户';
                res.send(resJson);
            }
        });
    }
};

//注册
module.exports.reg = {
    get: function(req, res, next) {
        res.render('reg', {
            title: 'reg'
        });
    },
    post: function(req, res, next) {
        //进行md5加密
        var md5 = crypto.createHash('md5');
        var password_md5 = md5.update(req.body.password).digest('hex');

        var postData = {
            name: req.body.name,
            password: password_md5,
            email: req.body.email
        };

        var resJson = {
            status: false,
            msg: ''
        };

        ModelUser.findOne({
            email: req.body.email
        }, function(err, data) {
            if (err) console.log(err);
            if (data) {
                resJson.msg = '此邮箱已被注册';
                res.send(resJson);
            } else {
                ModelUser.create(postData, function(err, data) {
                    if (err) {
                        resJson.msg = '注册错误';
                        res.send(resJson);
                        console.log(err);
                    } else {
                        resJson.msg = '注册成功';
                        resJson.status = true;
                        req.session.user = data;
                        res.send(resJson);
                    }
                });
            }
        });
    }
};

//修改密码
module.exports.updatepw = {
    get: function(req, res, next) {
        var _id = req.param('_id');
        var getData = {
            _id: req.param('_id')
        };
        ModelUser.findById(getData, function(err, data) {
            if (err) console.log(err);
            if (data) {
                res.render('userup', {
                    title: data.name,
                    view: data
                });
            }
        });
    },
    post: function(req, res) {
        var body = req.body;
        
        var resJson = {
            status: false,
            msg: '',
            data: null
        };
        var md5 = crypto.createHash('md5');
        var password_md5 = md5.update(req.body.password).digest('hex');
        
        ModelUser.update({
            _id: body._id
        }, {
            $set: {
                name: body.name,
                password: password_md5
            }
        }, function(err) {
        if (err) {
            resJson.msg = '修改失败';
            resJson.data = err;
        } else {
            resJson.msg = '修改成功';
            resJson.status = true;
        }
        res.send(resJson);

        });
    }    
};

// 退出
module.exports.logout = {
    get: function(req, res, next) {
        delete req.session.user;
        res.redirect('/');
    }
};

module.exports.isLogin = {
    yes: function(req, res, next) {
        var user = req.session.user;
        if (!user) {
            res.redirect('/login');
        } else {
            next();
        }
    }
};

module.exports.loginNo = {
    no: function(req, res, next) {
        var user = req.session.user;
        if (user) {
            res.redirect('/user/' + user._id);
        } else {
            next();
        }
    }
};