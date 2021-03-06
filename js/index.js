
	//域名
	var serverUrl = 'http://47.113.113.156:8080/'
	var msmCode = ''	//手机验证码
	
	// 轮播图
	layui.use('carousel', function(){
	  var carousel = layui.carousel;
	  //建造实例
	  carousel.render({
	    elem: '#test1',
	    width: '100%',
		height:'600px',
	    arrow: 'always' //始终显示箭头
	    //,anim: 'updown' //切换动画方式
	  });
	});
	
	// 经纪人
	layui.use('carousel', function(){
	  var carousel = layui.carousel;
	  //建造实例
	  carousel.render({
	    elem: '#test2',
	    width: '100%',
		height:'300px',
		autoplay:false,
		indicator:'none',
	    // arrow: 'always' //始终显示箭头
	    //,anim: 'updown' //切换动画方式
	  });
	});
	
	//登录框
	function login(){
		layui.use('layer', function(){
		  var layer = layui.layer;
		  layer.open({
			title:"用户登录",  
		    type: 1, 
		    content: `
				<form class="layui-form" action="#" style="height: 360px; width: 360px;"> 
					<div class="layui-form-item login-line">
						<label class="layui-form-label">手机号</label>
						<div class="layui-input-block">
							<input type="text" name="phone" maxlength="11" lay-verify="required|phone maxlength="11" id="longinPhone" placeholder="请输入您的手机号" autocomplete="off" class="layui-input">
						</div>
					</div>
				    <div class="layui-form-item login-line">
						<label class="layui-form-label">短信验证码</label>
						  <div class="layui-input-block">
							<input type="text" name="code" maxlength="6" placeholder="请输入短信验证码" autocomplete="off" class="layui-input">
							<button type="button" id="loginBtnText" class="layui-btn layui-btn-primary" onclick="getLoginCode()">获取验证码</button>
						</div>
				    </div>
					<div class="layui-input-block">
					    <button class="layui-btn layui-btn-warm" lay-submit lay-filter="loginFrom">立即登录</button>
					</div>
					<a style="display: flex;justify-content: flex-end; margin-right:50px" href="http://925029931.com" target="_blank">经纪人登录</a>
				</form>
			`
		  });
		});              
	}
	
	// 注册框
	function register(){
		layui.use('layer', function(){
		  var layer = layui.layer;
		  // layer.title('牛皮膏药',1),
		  layer.open({
			title:"用户注册",
		    type: 1, 
		    content: `<form class="layui-form" action="#" style="height: 360px; width: 360px;">
						<div class="layui-form-item login-line">
							<label class="layui-form-label">用户名/姓名</label>
							  <div class="layui-input-block">
								<input type="text" name="number" placeholder="姓名" lay-verify="required" autocomplete="off" class="layui-input">
							</div>
						</div>
						
						<div class="layui-form-item login-line">
							<label class="layui-form-label">手机号</label>
							  <div class="layui-input-block">
								<input type="text" name="phone" placeholder="手机号" lay-verify="required|phone" id="phoneNum" autocomplete="off" class="layui-input">
							</div>
						</div>
						
						<div class="layui-form-item">
							<label class="layui-form-label">密码</label>
							  <div class="layui-input-block">
								<input type="text" name="password" placeholder="密码" lay-verify="required|number"   autocomplete="off" class="layui-input">
							</div>
						</div>
						
						<label class="layui-form-label">短信验证码</label>
						  <div class="layui-input-block">
							<input type="text" name="code" placeholder="请输入短信验证码" maxlength="6" autocomplete="off" class="layui-input">
							<button type="button" class="layui-btn layui-btn-primary" id="registerBtnText" onclick="getRegisterCode()">获取验证码</button>
						</div>
						
						<div class="layui-input-block" style="margin-top:10px">
						    <button class="layui-btn layui-btn-warm" lay-submit lay-filter="registerForm" >一键注册/登录</button>
						</div>
					</form>`
		  });
		});              
	};
	
	// 获取注册验证码
	function getRegisterCode(){
		var phone = $('#phoneNum').val();
		if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))){ 
		    alert("手机号码有误，请重填");  
		}else{
			$.ajax({
				type:"post",
				url: serverUrl+'cf-user/getRegisterCaptcha',
				dataType:'json',
				data:{"phone":phone},
				success:function(res){
					if(res.code == 200){
						//返回在验证码放到全局变量
						msmCode = res.data
						// 倒计时
						let timedown = 60
						$('#registerBtnText').text(`${timedown}s`)
						let time = window.setInterval(function(){
							if(timedown<=0){
								clearInterval(time)
								$('#registerBtnText').text(`重新获取验证码`)
								return
							}
							timedown -= 1
							$('#registerBtnText').text(`${timedown}s`)
						},1000)
					}else{
						alert('获取失败')
					}
				}
			});	
		}
	}
	
	// 获取登录验证码
	function getLoginCode(){
		var phone = $('#longinPhone').val();
		if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))){ 
		    alert("手机号码有误，请重填");  
		}else{
			$.ajax({
				type:"post",
				url: serverUrl+'/cf-user/getLoginCaptcha',
				dataType:'json',
				data:{"phone":phone},
				success:function(res){
					if(res.code == 200){
						//返回在验证码放到全局变量
						msmCode = res.data
						// 倒计时
						let timedown = 60
						$('#loginBtnText').text(`${timedown}s`)
						let time = window.setInterval(function(){
							if(timedown<=0){
								clearInterval(time)
								$('#loginBtnText').text(`重新获取验证码`)
								return
							}
							timedown -= 1
							$('#loginBtnText').text(`${timedown}s`)
						},1000)
					}else{
						alert('获取失败')
					}
				}
			});	
		}
	}
	
	// 注册表单校验
	layui.use('form', function(){
	  var form = layui.form;
	  var layer = layui.layer;
	  // 确定提交表单
	  form.on('submit(registerForm)', function(data){
		let number = data.field.number
		let phone = data.field.phone
		let password = data.field.password
		let code =  data.field.code
		console.log(`用户名:${number}+手机号:${phone}+验证码:${code}+ 密码:${password}`);
		if(msmCode!=code){
			alert('验证码错误')
		}else{
			$.ajax({
				type:'post',
				url:serverUrl+"/cf-user/register",
				dataType:'json',
				data:{
					"number":number,
					"phone":phone,
					"password":password,
				},
				xhrFields: {
					withCredentials: false
				},
				success:function(res){
					if(res.code==200){
						$('.login-box').children().empty()
						$('.login-box').append(`<span onclick="myMsg()">${res.data}</span> / <span onclick="Logout()">退出</span>`)
						localStorage.setItem("phone", phone);
						console.log(msmCode)
						layer.closeAll();
					}else{
						alert(res.msg)
					}
				}
			})
		}
		return false;
	  });
	});
	
	// 登录表单验证
	layui.use('form', function(){
	  var form = layui.form;
	  var layer = layui.layer;
	  // 确定提交表单
	  form.on('submit(loginFrom)', function(data){
		let phone = data.field.phone
		let code =  data.field.code
		console.log(`手机号:${phone}+验证码:${code}`);
		if(msmCode!=code){
			alert('验证码错误')
		}else{
			$.ajax({
				type:'post',
				url:serverUrl+"/cf-user/phoneLogin",
				dataType:'json',
				data:{
					"phone":phone,
				},
				success:function(res){
					if(res.code==200){
						$('.login-box').children().empty()
						$('.login-box').append(`<span onclick="myMsg()">${res.data}</span> / <span onclick="Logout()">退出</span>`)
						localStorage.setItem("phone", phone);
						layer.closeAll();
					}else{
						alert(res.msg)
					}
				}
			})
		}
		return false;
	  });
	});
	
	//退出登录
	function Logout(){
		localStorage.removeItem("phone");　　
		console.log('退出')
		hasLogin()
	}
	
	// 判断用户是有有登录
	function hasLogin(){
		var	phoneStorage = localStorage.getItem('phone')
		if(phoneStorage!=null){
			$('.login-box').children().empty()
			$('.login-box').append(`<div><a href="javaScript:void(0)" onclick="myMsg()">${phoneStorage}</a> / <a href="javaScript:void(0)" onclick="Logout()">退出</a></div>`)
		}else{
			$('.login-box').children().empty()
			$('.login-box').append(`<div><a href="javaScript:void(0)" onclick="login()">登录</a> / <a href="javaScript:void(0)" onclick="register()">注册</a></div>`)
		}
		console.log(phoneStorage)
	}
	
	//焦点获取
	$('#xcx').mouseenter(function(){
		$('#xcxImgs').show()
	}).mouseout(function(){
		$('#xcxImgs').hide()
	})
	
	/*----------------------渲染优选新房---------------------------*/
	function getHourse(){
		$.ajax({
			type:'post',
			url:serverUrl+"/cf-new-house/findAll",
			data:{
				offset:1,
				pagesize:8
			},
			success:function(res){
				console.log(res.data)
				
				for(var item of res.data){	
					var coverImg;
					if(item.cfEffectImgs[0].effectImg!=undefined){
						coverImg = item.cfEffectImgs[0].effectImg
					}
									// <div style="display: flex;justify-content: space-between;">
									// </div>
					console.log(coverImg)
					let divItem =`<div class="YXhourse-li" onclick="detail(${item.cfNewHouse.id})">
					                <div class="YXhourse-left">
									    <img src="${coverImg}" class="YXhourse-img">
									    <div class="YXhourse-name">${item.cfNewHouse.estateName}</div>
										
									    <div class="YXhourse-line" >
									    	<div class="YXhourse-div1">${item.cfNewHouse.estateDistrict}/3室2厅</div>
									    </div>
									</div>
									<div class="YXhourse-right">
									  <div class="YXhourse-div1">${item.cfNewHouse.totalPrice}/元</div>
									</div>
								</div>`
					$('#YXhourse').append(divItem)
				}
				
			}
		})
	}
	
	// 去详情页
	function detail(e){
		window.location.href = "./pages/detail.html?id="+e
	}

	//去所有房源
	function onMore(){
		window.location.href = "./pages/more.html"
	}

	// 打开咨询弹框
	function openKF(){
		layui.use('layer', function(){
			var layer = layui.layer;					
			layer.open({
				title:"手机号快捷咨询",
				type: 1, 
				content: `<form class="layui-form" action="#">
							<div class="layui-form-item">
								<label class="layui-form-label">姓名</label>
								<div class="layui-input-block">
								<input type="text" name="username" required  lay-verify="required" placeholder="请输入您的姓名" autocomplete="off" class="layui-input">
								</div>
							</div>
							<div class="layui-form-item">
								<label class="layui-form-label">手机号</label>
								<div class="layui-input-inline">
								<input type="number" name="password" required lay-verify="required" placeholder="请输入你的手机号" autocomplete="off" class="layui-input">
								</div>
							</div>
							<div class="layui-form-item">
								<div class="layui-input-block">
									<button class="layui-btn" lay-submit lay-filter="zixunFrom">立即提交</button>
								</div>
							</div>
						</form>`
			});
		});            
	}

	//验证咨询框
	layui.use('form', function(){
	  var form = layui.form;
	  // 确定提交表单
	  form.on('submit(zixunFrom)', function(data){
		console.log(data.field.username)
		console.log(data.field.password)
		return false 
	  });
	});
	

	// 查看是否有登录
	$(function(){
		hasLogin()
		getHourse()
	})