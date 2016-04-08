var express=require('express');
var port=process.env.PORT || 3000;
var app=express();

app.set('views','./views');
app.set('view engine','jade');
app.listen(port);

console.log("imooc started on "+port);

app.get('/',function(req,res){
	res.render('index.jade',{
		title:"电影网站首页"
	});
});

app.get('/movie/:id',function(req,res){
	res.render('detail.jade',{
		title:'电影详情页面'
	});
});

app.get('/admin/movie',function(req,res){
	res.render('admin.jade',{
		title:'后台管理--新增电影页面'
	});
});

app.get('/admin/list',function(req,res){
	res.render('list.jade',{
		title:'后台管理--电影列表页面'
	});
});