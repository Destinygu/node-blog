# node-blog
该网站使用node+express+mongoose+bootstrap技术实现多人博客系统，其中采用的是ejs模板：http://123.207.248.56:3000/

## 一、运行环境
* node 7.7.4
* npm 4.1.2
* mongoDB 3.2.0

## 二、使用说明

下载mongoDB: <br>
http://pan.baidu.com/s/1c14urV6 <br>
配置mongoDB <br>
http://jingyan.baidu.com/article/d5c4b52bef7268da560dc5f8.html <br>

```
// express4.0以上版本安装
cnpm i -g express 
cnpm i -g express-generator 
// 进入myblog
cd myblog 
cnpm i 
// 运行
cnpm start
```
**注：我实际开发采用node-dev，服务器自动刷新**
```
"scripts": {
    "start": "node-dev ./bin/www"
  },
```


## 三、效果演示
首页
![image](https://github.com/Destinygu/node-/blob/master/myblog-img/1.png) 

注册页
![image](https://github.com/Destinygu/node-/blob/master/myblog-img/2.png) 

注册成功
![image](https://github.com/Destinygu/node-/blob/master/myblog-img/3.png) 

点击确认直接跳转到登录后的首页
![image](https://github.com/Destinygu/node-/blob/master/myblog-img/4.png) 

发表
![image](https://github.com/Destinygu/node-/blob/master/myblog-img/5.png) 
![image](https://github.com/Destinygu/node-/blob/master/myblog-img/6.png) 

发表成功，文章详情页
![image](https://github.com/Destinygu/node-/blob/master/myblog-img/7.png) 

列表页，可对自己的文章进行删除和修改
![image](https://github.com/Destinygu/node-/blob/master/myblog-img/8.png) 

点击右侧头像栏处，查看个人信息
![image](https://github.com/Destinygu/node-/blob/master/myblog-img/9.png)

点击右侧头像栏处，查看退出回到首页
![image](https://github.com/Destinygu/node-/blob/master/myblog-img/10.png)

点击文章标题，发现未登录，跳转到登录页
![image](https://github.com/Destinygu/node-/blob/master/myblog-img/11.png)

更多详细的演示请移步：http://123.207.248.56:3000/

