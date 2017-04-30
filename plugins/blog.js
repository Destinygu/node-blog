var ModelBlog = require('../model/blog');
var markdown = require('markdown').markdown;

// 添加博客
module.exports.add = {
  get: function(req, res, next) {
    res.render('add', {
      title: '发表博客'
    })

  },
  post: function(req, res, next) {
    var postData = {
      author: req.session.user._id,
      title: req.body.title,
      content: markdown.toHTML(req.body.content)
    };
    ModelBlog.create(postData, function(err, data) {
      if (err) console.log(err);
      res.redirect('/view/' + data._id);
    });
  }
};

//  博客详情页
module.exports.blogDetail = {
  get: function(req, res, next) {
    var getData = {
      _id: req.params._id
    };
    ModelBlog.findOne(getData, function(err, data) {
      if (err) console.log(err);
      if (data) {
        ModelBlog.update(getData, {
          $inc: {
            pv: 1
          }
        }, function(err) {
          if (err) console.log(err);
        });
        res.render('detail', {
          title: data.title,
          view: data
        });
      } else {
        res.send('此微博不存在');
      }
    }).populate('author');
  }
};

// 主页展示公共博客列表  
module.exports.indexList = {
  get: function(req, res, next) {

    var aList = ModelBlog.find({}, null, {
      sort: {
        _id: -1
      }
    }).populate('author');
    aList.exec(function(err, data) {
      if (err) console.log(err);
      res.render('index', {
        title: '首页',
        list: data
      });
    });
  }
};

//  私人博客列表
module.exports.blogList = {
  get: function(req, res, next) {

    var aList = ModelBlog.find({
      author: req.session.user
    }, null, {
      sort: {
        _id: -1
      }
    }).populate('author');
    aList.exec(function(err, data) {
      if (err) console.log(err);
      res.render('list', {
        title: '博客列表',
        list: data
      });

    });
  }
};

// 删除博客
module.exports.deleteBlog = {
  get: function(req, res, next) {
    var getJson = {
      status: false,
      msg: ''
    };

    ModelBlog.remove({
      _id: req.param('_id')
    }, function(err, data) {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/list');
      }
    });
  }
};

// 更新博客
module.exports.updateBlog = {
  get: function(req, res) {
    var _id = req.params._id;
    ModelBlog.findOne({
      _id: _id
    }, null, function(err, data) {
      res.render('editor', {
        title: data.title,
        view: data
      });
    });
  },
  post: function(req, res) {

    var body = req.body;
    var resJson = {
      status: false,
      msg: '',
      data: null
    };
    ModelBlog.update({
      _id: body._id
    }, {
      $set: {
        title: body.title,
        content: body.content
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