 $(function(){
		     	/***当鼠标移入切换**/
		     	 /**显示第一个li对应的内容其他兄弟元素隐藏*eq:为索引号***/
					$(".footer-content>div").eq(3).hide().siblings().show();
		            $(".tabItems>li").mouseenter(function(){
						$(this).addClass("active").siblings().removeClass("active");
						var index =  $(this).index();
						$(".footer-content>div").eq(index).show().siblings().hide();
					});
					$('.footer-content').mouseleave(function(){//这里使用mouseover也可以，使用mouseenter是防止冒泡
					    $(this).find('.content_1').hide();//这里的hide可以改成animate，toggle都可以
					});
		          
		     })