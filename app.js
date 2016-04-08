var express=require('express');
var path=require("path");//静态资源处理
var mongoose=require('mongoose');
var _=require('underscore');
var Movie=require('./models/movie.js');
var port=process.env.PORT || 3000;
var app=express();

//链接数据库，数据库先mongod 启动数据库，再mongo进入数据库操作
mongoose.connect('mongodb://localhost/imooc');

app.set('views','./views');//视图所在目录
app.set('view engine','jade');
app.use(express.static(path.join(__dirname,'public')));//静态资源处理
app.use(require('body-parser')());
//对于时间格式的处理
app.locals.moment=require('moment');
app.listen(port);

console.log("imooc started on "+port);

//首页
app.get('/',function(req,res){
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err);
		}
		res.render('pages/index.jade',{
		title:"电影网站首页",
		movies:movies
	});
	});	
});
//详情页面
app.get('/movie/:id',function(req,res){
	var id=req.params.id;
	Movie.findById(id,function(err,movie){
		if(err){
			console.log(err);
		}
		res.render('pages/detail.jade',{
			title:'电影详情页面'+movie.title,
			movie:movie
		});
	});	
});

app.get('/admin/movie',function(req,res){
	res.render('pages/admin.jade',{
		title:'后台管理--新增电影页面',
		movie:{
			title:'',
			doctor:'',
			year:'',
			country:'',
			language:'',
			poster:'',
			flash:'',
			summary:''
		}
	});
});
app.get('/admin/movie/update/:id',function(req,res){
	var id=req.params.id;
	if(id){
		Movie.findById(id,function(err,movie){
			if(err){
				console.log(err);
			}
			res.render('pages/admin.jade',{
				title:"后台更新"+movie.title,
				movie:movie
			})
		});
	}
});
//新增或者修改电影
app.post('/admin/movie/new',function(req,res){
	var id=req.body.movie._id;
	var movieObj=req.body.movie;
	var _movie;

	if(id!='undefined'){
		Movie.findById(id,function(err,movie){
			if(err){
				console.log(err);
			}
			_movie=_.extend(movie,movieObj);
			//_.extend(destination,sources)复制source对象中的所有属性，覆盖到destination对象上，并返回destination对象，复制是按照顺序的，所以后面的对象属性会把前面的对象属性覆盖掉
			_movie.save(function(err,movie){
				if(err){
					console.log(err);
				}
				res.redirect('/movie/'+movie._id);
			});
		});
	}else{
		_movie=new  Movie({
			title:movieObj.title,
			doctor:movieObj.doctor,
			country:movieObj.country,
			language:movieObj.language,
			year:movieObj.year,
			poster:movieObj.poster,
			flash:movieObj.flash,
			summary:movieObj.summary
		});

		_movie.save(function(err,movie){
			if(err){
				console.log(err);
			}
			res.redirect('/movie/'+movie._id);
		});
	}
});
app.get('/admin/list',function(req,res){
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err);
		}
		res.render('pages/list.jade',{
			title:'后台管理--电影列表页面',
			movies:movies
		});
	});	
});


//delete
app.delete('/admin/list',function(req,res){
	var id=req.query.id;
	if(id){
		Movie.remove({_id:id},function(err,movie){
			if(err){
				console.log(err);
			}else{
				res.json({success:1});
			}
		});
	}
});