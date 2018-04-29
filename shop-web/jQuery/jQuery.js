$(document).ready(function($) {

	// 登录链接事件
	$("#loginLink").click(function(){
		// 调用登录窗口
		loginLink();
		// 点击注册转到注册窗口
		$(".title-rege").click(function(){
			regeLink();
		});

		$(".title-login").click(function(){
			loginLink();
		});		
	});

	// 注册链接事件
	$("#regeLink").click(function(){
		// 调用注册窗口
		regeLink();
		// 点击登录转到登录窗口
		$(".title-login").click(function(){
			loginLink();
		});

		$(".title-rege").click(function(){
			regeLink();
		});
	});

	// 登录窗口封装
	function loginLink() {
		// 获取登录窗HTML代码
		var loginHtml = $('#loginHtml').html();
		// 把HTML代码传入弹出层显示函数
		showLayer(loginHtml, 350, 350, closeCallback);

		// 在调用之前，把error-msg清除掉
		$(".error-msg-username").css("visibility","hidden");
		$(".error-msg-password").css("visibility","hidden");

		$(".title-rege").click(function(){
			regeLink();
			$(".title-login").click(function(){
				loginLink();
			});	
		});

		$('.title-rege').mouseenter(function(){
			$('.title-login').removeClass('title-focus');
			$('.title-rege').addClass('title-focus');
		});

		$('.title-rege').mouseleave(function(){
			$('.title-login').addClass('title-focus');
			$('.title-rege').removeClass('title-focus');
		});

		// 登录表单校验 用户名输入检测
		$("#username").blur(function(){
			var username = $("input[name='username']").val();
			if(username.length >= 11 && !isNaN(username)){
				return true;
			}else{
				$(".error-msg-username").css("visibility","visible");
			}

			$(this).focus(function(){
				$(".error-msg-username").css("visibility","hidden");
			});
		});

		// 登录表单校验 密码输入检测
		$("#password").blur(function(){
			var password = $("input[name='password']").val();
			if(password.length >= 6 && password.length <= 16 && password.indexOf(" ") == -1){
				return true;
			}else{
				$(".error-msg-password").css("visibility","visible");
			}

			$(this).focus(function(){
				$(".error-msg-password").css("visibility","hidden");
			});
		});
	}

	// 注册窗口封装
	function regeLink() {
		// 获取注册窗HTML代码
		var regeHtml = $('#regeHtml').html();

		// 把HTML代码传入弹出层显示函数
		showLayer(regeHtml, 350, 320, closeCallback);

		// 在调用之前，把error-msg清除掉
		$(".error-msg-username").css("visibility","hidden");
		$(".error-msg-code").css("visibility","hidden");

		$(".title-login").click(function(){
			loginLink();
			$(".title-rege").click(function(){
				regeLink();
			});	
		});

		$('.title-login').mouseenter(function(){
			$('.title-rege').removeClass('title-focus');
			$('.title-login').addClass('title-focus');
		});

		$('.title-login').mouseleave(function(){
			$('.title-rege').addClass('title-focus');
			$('.title-login').removeClass('title-focus');
		});

		// 注册表单校验 用户名输入检测
		$("#username").blur(function(){
			var username = $("input[name='username']").val();
			if(username.length >= 11 && username.indexOf("@") != -1 && !isNaN(username)){
				return true;
			}else{
				$(".error-msg-username").css("visibility","visible");
			}

			$(this).focus(function(){
				$(".error-msg-username").css("visibility","hidden");
			});
		});

		// 注册表单校验 验证码输入检测
		$("#input-code").blur(function(){
			var code = $("input[name='code']").val();
			if(code === "GYyd"){
				return true;
			}else{
				$(".error-msg-code").css("visibility","visible");
			}

			$(this).focus(function(){
				$(".error-msg-code").css("visibility","hidden");
			});
		});
	}

	// 弹出层关闭回调函数
	function closeCallback(){
		$(".error-msg-username").html("");
		$(".error-msg-password").html("");
		$(".error-msg-code").html("");
	}	

	// 显示弹出层
	function showLayer(html, width, height, closeCallback) {
		// 显示弹出层遮罩
		$("#layer-mask").show();
		// 显示弹出层窗体
		$("#layer-pop").show();
		// 动态的设置弹出层窗体的大小和样式
		$('#layer-pop').css({
			width: width,
			height: height
		})
		// 填充弹出层的窗体内容
		$('#layer-content').html(html);
		// 弹出层关闭按钮绑定事件
		$("#layer-close").click(function(){
			// 弹出层关闭
			hideLayer();
			// 关闭的回调函数，撤销输入错误的提示
			closeCallback();
		});
	}

	// 隐藏弹出层
	function hideLayer() {
		// 弹出层关闭
		$("#layer-mask").hide();
		$("#layer-pop").hide();
	}

});