require.config({
　　paths: {// 指定各个模块的加载路径
　　　 "jquery": "lib/jQuery_v1.11_m",
　　　 "Config": "Config",
　　　 "Util": "Util",
	  "dialog": "plugIn/jQ.dialog_v6.05/dialog_m",
	  "md5": "plugIn/md5_m",
	  "base64": "plugIn/base64_m"
　　},
   shim: {
	   "dialog": {// jq插件依赖加载方式(弹窗)
　　　　　　deps: ["jquery"],
　　　　　　exports: "dialog"
	　　}
	}
});

require(['jquery', 'Config', 'Util', 'dialog', 'md5', 'base64'], function ($, Config, Util, dialog, __MD5, __BASE64){

var login = {
	go: function(){
		var that = this;

		// 选择国际区号展示
		$('select[name="tel_block"]').change(function(){
		  	$('.tel_block_txt span').text($(this).val());
		});

		// 登录
		$('.loginBtn').on('click', function(){
			var cId = $('input[name="cardId"]').val(),
				account = $('input[name="tel"]').val(),
				pwa = $('input[name="pwa"]').val();
			
			if(!account || !cId || !pwa){
				Util.TipHidden(Config.Enum_TipStr[2].desc, true);
				return false;
			}
			// if(that.btn_login_flag){
			// 	that.btn_login_flag = false;
				that.login({
					// code: GetQueryString('code'),
					deviceCode: sessionStorage._dCode ? sessionStorage._dCode : "",
					sms: sessionStorage._sms ? sessionStorage._sms : "",
					cardId: cId,
					// phone: account,
					password: __MD5.hex_md5(pwa),
					account: account
					// nationCode: $('select[name="tel_block"]').val().split('+')[1]
				});
			// }
				
		});

		// 登录关联enter键
		$(document).keydown(function(e){
			 var e = e || event,
			 keycode = e.which || e.keyCode;
			 if (keycode == 13)
			 	$(".loginBtn").click();
		});
	},
	login: function(obj){
		var that = this,
			ajaxType = 'POST',
			url = 'playerLogin.do',
			data = obj;

		$.ajax({
			type: ajaxType,
			url: Config.Server_CM + url,
			data: data,
            dataType: 'json',
            crossDomain: true,
	    	success: function(msg){
	    		if(msg.statusCode == 200){
	    			if(!msg.data || msg.data == {}){
	    				Util.TipHidden(Config.Enum_TipStr[4].desc, true);
	    				return false;
	    			}
	    			msg.data.player = {
	    				account: obj.account
	    			};
	    			sessionStorage._logoninfo = __BASE64.encode(JSON.stringify(msg.data));
	    			sessionStorage._clubId = msg.data.club.clubId;
	    			sessionStorage._presidentId = msg.data.club.presidentId;
	    			sessionStorage._masterScoreLock = msg.data.club.masterScoreLock;
	    			sessionStorage._playerId = msg.data.playerId;
	    			sessionStorage._playerDuties = msg.data.playerDuties;
	    			sessionStorage._diamond = msg.data.diamond;
	    			sessionStorage._costs = msg.data.gameConfig ? JSON.stringify(msg.data.gameConfig) : '';
	    			sessionStorage._UUID = msg.data.UUID;
	    			// sessionStorage._dCode = msg.data.deviceCode;
	    			sessionStorage._dLock = msg.data.deviceLock;
	    			sessionStorage.isMasterClub = msg.data.isMasterClub;
	    			sessionStorage._channelName = msg.data.channelName;
	    			sessionStorage._superClub = JSON.stringify(msg.data.superClub);

	    			Util.TipHidden(Config.Enum_TipStr[3].desc, false, 600);
					Util.Delayed(1000, function(){
						var timestamp = new Date().getTime();
						window.location.href ="default.html#"+ timestamp;
					});
	    		}else if(msg.statusCode == 205){
	    			Util.AlertBoxView({
		                viewTitle: '验证码输入',
		                isViewClose: false,
		                okBtnFn: function(){
		                	var valStr = $('#alertVal').val(),
		                		obj_ = {};
		                	if(!valStr){
		                		Util.TipHidden(Config.Enum_TipStr[15].desc, true);
		                		return false;
		                	}
		                	
		                	sessionStorage._sms = valStr;
		                	sessionStorage._dCode = msg.data.deviceCode;
		                	$('.loginBtn').click();
		                },
		                altWidth: 130,
		                altInitMainFn: function () {
		                	var txt = "验证码";
		                	// if(type == 'updateBusinessCard')
		                	// 	txt = 'CardID';
		                	var html_ = '<input type="text" id="alertVal" class="inputNum" maxlength="6" style="width:120px;" placeholder="'+ txt +'" >';

		            		// html_ += '<br />＊ 修改会消耗钻石 '+ (price_ ? price_ : 0) +'（首次免费）';
		                	
		                	return html_;

		                }
		            });
	    		}else{
		            if(msg.statusMsg)
		            	Util.TipHidden(msg.statusMsg, true);
		            else
		            	Util.TipHidden(Config.Enum_TipStr[5].desc, true);
	    		}

			}
		});

	},
	init: function(){
		var that = this;
		// 插件－弹窗 样式表依赖插入
		Util.PlugInInit('script/plugIn/jQ.dialog_v6.05/ui-dialog.css');


		// 依赖功能操作
		that.go();

		// 初始清除数据
        Util.ClearLocalData();

	}
};
login.init();

});