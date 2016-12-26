define(['jquery'],function(){
	//alert($.fn.jquery)
	 function create(){
	 	$.fn.say=function(opt){
	 		var obj={
	 			ind:0,
	 			box:'',
	 			list:'',
	 			time:1000,
	 			oli:'',
	 			left:'',
	 			right:''
	 		}
	 		var set=$.extend({},obj,opt)

	 		ind=set.ind,
	 		timer=null,
	 		box=$(set.box),
	 		oli=$(set.oli),
	 		list=$(set.list),
	 		left=$(set.left),
	 		right=$(set.right),
	 		w=list.find('img').outerWidth(),
	 		len=list.find('img').length;
	 		list.width(w*len)
	 		console.log(len)
	 		return $(this).each(function(){

	 			function auto(){
					timer=setInterval(function(){
						if(list.is(':animated'))return false;
			 			ind++
			 			if(ind>len-1){
			 				//封装一个无缝运动
			 				showimg(ind)
			 			}else{
			 				//封装一个轮播图
			 				show(ind)
			 			}
			 		},set.time)
				}

				auto()
				
		 		function show(info){
		 			oli.find('li').eq(info).addClass('on').siblings().removeClass('on');
		 			list.stop().animate({'margin-left':-w*info},800);
		 		}
		 		//无缝运动
		 		function showimg(index){
		 			list.width(w*(len+1));
		 			list.children('li').first().clone().appendTo(list);
		 			list.stop().animate({'margin-left':-w*index},800,function(){
		 				list.css('margin-left',0);
		 				list.children('li').last().remove();
		 			})
		 			ind=0
		 			oli.find('li').eq(0).addClass('on').siblings().removeClass('on');
		 		}

		 		//鼠标滑过时清除定时器

		 		$(this).hover(function(){
		 			clearInterval(timer)
		 		},function(){
		 			auto()
		 		})

		 		//鼠标点击右边
		 		right.on('click',function(){
		 			if(list.is(':animated'))return false;
		 			ind++
		 			if(ind>len-1){
		 				showimg(ind)
		 			}else{
		 				show(ind)
		 			}
		 		})

		 		//鼠标点击左边
		 		left.on('click',function(){
		 			if(list.is(':animated'))return false;
		 			ind--
		 			if(ind<0){
		 				hideimg(ind)
		 				ind=len-1
		 				oli.find('li').eq(ind).addClass('on').siblings().removeClass('on');
		 			
		 			}else{
		 				show(ind)
		 			}
		 				
		 			
		 		})


		 		//鼠标滑过时
		 		oli.find('li').on('mouseover',function(){
		 			var txt=$(this).index()
		 			show(txt)
		 		})
		 		//无缝运动
		 		function hideimg(ind){
		 			/*list.width(w*(len+1));
		 			list.children('li').first().clone().appendTo(list)
		 			list.css('margin-left',-w*len)
		 			list.stop().animate({'margin-left':-w*(len-1)},800,function(){
		 				list.children('li').last().remove();
		 			})*/

		 			list.width(w*(len+1));
		 			list.children('li').last().clone().prependTo(list)
		 			list.css('margin-left',-w)
		 			list.stop().animate({'margin-left':0},800,function(){
		 				list.css('margin-left',-w*(len-1))
		 				list.children('li').first().remove()
		 			})

		 		}
		 	})
	 	}
	 	
	 }

	 return create;
})