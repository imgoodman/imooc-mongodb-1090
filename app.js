var express=require('express');
var path=require("path");//静态资源处理
var port=process.env.PORT || 3000;
var app=express();

app.set('views','./views');//视图所在目录
app.set('view engine','jade');
app.use(express.static(path.join(__dirname,'bower_components')));//静态资源处理
app.use(require('body-parser')());
app.listen(port);

console.log("imooc started on "+port);

app.get('/',function(req,res){
	res.render('pages/index.jade',{
		title:"电影网站首页",
		movies:[]
	});
});

app.get('/movie/:id',function(req,res){
	res.render('pages/detail.jade',{
		title:'电影详情页面',
		movie:{}
	});
});

app.get('/admin/movie',function(req,res){
	res.render('pages/admin.jade',{
		title:'后台管理--新增电影页面',
		movie:{}
	});
});

app.get('/admin/list',function(req,res){
	res.render('pages/list.jade',{
		title:'后台管理--电影列表页面',
		movies:[]
	});
});