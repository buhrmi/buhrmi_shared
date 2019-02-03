define(['jquery', 'Config'], function ($, Config){
/* 
** 通用函数库
** time 2018.03.08
** author @aileLiu
**
*/
var Util = {
    /* 
    ** 初始化存储消息
    ** time 2018.07.20
    ** str字符串
    **
    */
    MessageDataInit: function(data) {
        var arr = [],
            time = new Date().getTime();
        $.each(data, function(i, e){
            if((e.createTime + e.deadTime) >= time)
                arr.push(e);
        });

        return arr;
    },
    hl:'红龙币',
    /*
     ** 通过俱乐部卡片ID查找俱乐部信息
     ** time 2018.03.22
     ** str, key
     */
    getCreateClubRoomCostNum: function () {
        var that = this,
            ajaxType = 'POST',
            u_ = 'getCreateClubRoomCostNum.do',
            data = {},
            info = null;

        $.ajax({
            type: ajaxType,
            url: Config.Server_CM + u_,
            data: data,
            async: false,
            dataType: 'json',
            success: function(msg){
                if(msg.statusCode == 200){

                    info = msg.data;

                }else{

                    if(msg.statusMsg)
                        Util.TipHidden(msg.statusMsg,true);
                    else
                        Util.TipHidden('查找私局配置失败！！！！', true);

                }

            },
            error: function(msg){
                Util.TipHidden('查找私局配置失败！！！！', true);
                console.log('Ajax error:',msg);
            }
        });

        return info;
    },
    /*
    ** 网络请求参数
    ** time 2018.07.11
    ** TF: 点击等待返回后再次请求flag
    **
    */
    NetReq: {
        TF: true,
    },
    /*
    ** 列表多字段排序
    ** time 2018.07.10
    ** arr: any[], sortRules: { key: string, direction: 'ASC' | 'DESC' }[]
    **
    */
    ListSortToData: function(arr, sortRules) {
        if(!arr)
            return;

        var columns = sortRules.map(function(k){
            return k.key;
        });
        var orderBy = sortRules.map(function(k){
            return k.direction;
        });

        function arrayMultiSortRecursive(a, b, columns, orderBy, index) {
            var direction = orderBy[index] == 'DESC' ? 1 : 0;
            var isNumeric = !isNaN(a[columns[index]] - b[columns[index]]);

            var x = isNumeric ? a[columns[index]] : a[columns[index]].toLowerCase();
            var y = isNumeric ? b[columns[index]] : b[columns[index]].toLowerCase();

            if (x < y) return direction === 0 ? -1 : 1;

            if (x == y) return columns.length - 1 > index ? arrayMultiSortRecursive(a, b, columns, orderBy, index + 1) : 0;

            return direction === 0 ? 1 : -1;
        }

        return arr.concat().sort(function(a, b){
            return arrayMultiSortRecursive(a, b, columns, orderBy, 0);
        });
    },
    /* 
    ** 验证字符串长度（把双字节的替换成两个单字节的然后再获得长度）
    ** time 2018.06.08
    ** str字符串
    **
    */
    ValidateStrLength: function(str) {
      if (str == null) return 0;
      if (typeof str != "string"){
        str += "";
      }
      return str.replace(/[^\x00-\xff]/g,"01").length;
    },
    /* 
    ** 验证非数字／字母／汉字
    ** time 2018.05.25
    ** str字符串
    **
    */
    TextValidate: function(str){
        var reg = /[^\u4e00-\u9fa5a-zA-Z0-9]/g;
        if(reg.test(str)){
            Util.TipHidden(Config.Enum_TipStr[19].desc, true);
            return false;
        }
        return true;
    },
    /* 
    ** 渲染倒出按钮及事件绑定（公共方法） 
    ** time 2018.05.08
    ** fn 回调, tipStr 提示文本, linkStr 下载地址, objCR 插入对象
    **
    */
    RanderExportExcel: function(fn, tipStr, linkStr, objCR){
        if(linkStr){
            Util.TipHidden('正在生成Excel中…', 600, 240);
            $('.downloadBtn').remove();
            $('.actionBox').before('<a class="downloadBtn" download target="_blank" href="'+ Config.Server_CM +'excel/'+ linkStr +'">点击下载 '+ linkStr +'</a>');

            Util.Delayed(1000, function(){
                $('.downloadBtn')[0].click();
                Util.TipHidden('导出中，如未自动导出成功 请点击下载！！！！', 2400, 300);
            });

            return false;
        }

        var tipTxt = '确认要导出查询的数据吗？';
        
        if(tipStr)
            tipTxt = tipStr;

        // 添加按钮
        // $('table .sub').after('<input type="button" value="导  出" class="add clickToExcelBtn">');
        var obj = '<a href="javascript:;" class="clickToExcelBtn col_com1_1"><i class="iconfont col_com1_1">&#xe604;</i>导 出</a>';
        if($('.actionBox').length)
            $('.actionBox').prepend(obj);
        else if(objCR)
            // 添加操作按钮模块(ACTIONBOX)
            Util.CreateBtnBlock('ACTIONBOX', obj, objCR);
        else
            // 添加操作按钮模块(ACTIONBOX)
            Util.CreateBtnBlock('ACTIONBOX', obj, '.searchBox');

        // 绑定导出表格
        $(document).off('click', '.clickToExcelBtn');
        $(document).on('click', '.clickToExcelBtn', function(){
            var ok = fn,
                cancel = function(){};
            
            Util.Tip('确认框', tipTxt, ok, 300, cancel);
            
        });
    },
    /* 
    ** 浮点数转百分比 
    ** time 2018.05.07
    ** num浮点数值, floatNum小数点位数
    **
    */
    FloatToPercent: function(num, floatNum){
        if(!floatNum)
            floatNum = 4;
        
        return Number(Number(num*100).toPrecision(floatNum));
    },
    /* 
    ** 百分比转浮点数 
    ** time 2018.05.07
    ** num浮点数值, floatNum小数点位数
    **
    */
    PercentToFloat: function(num, floatNum){
        if(!floatNum)
            floatNum = 4;
        
        return Number(Number(num/100).toPrecision(floatNum));
    },
    /*
     ** 返回排序标题
     ** time 2018.04.04
     ** title 文字, sortinfo 排序规则type
     **
     */
    SortTitle: function(title, sortinfo){
        return '<p class="listSortBtn" data-sortinfo="'+ sortinfo +'">'+ title +'<i class="iconfont">&#xe60e;</i></p>';
    },
    /* 
    ** 获取URL参数串的对象或值
    ** time 2018.03.22
    ** type 编码操作（encode: 加密／decode: 解密）, str
    * , 'base64'/ , __BASE64
    */
    __BASE64: function(type, str){
        
         if(type == 'encode')
            return __BASE64.encode(str);
         
         if(type == 'decode')
            return __BASE64.decode(str);
    },
    /*
     ** 通过俱乐部卡片ID查找俱乐部信息
     ** time 2018.03.22
     ** str, key
     */
    getClubByCardId: function (cardId) {
        var that = this,
            ajaxType = 'GET',
            u_ = 'getClubByBusinessCard.do?type=getClubByBusinessCard',
            data = {
                businessCard: cardId
            },
            info = null;

        $.ajax({
            type: ajaxType,
            url: Config.Server_CM + u_,
            data: data,
            async: false,
            dataType: 'json',
            success: function(msg){
                if(msg.statusCode == 200){
                    msg = JSON.parse(msg.data);

                    info = msg.club;

                }else{

                    if(msg.statusMsg)
                        Util.TipHidden(msg.statusMsg,true);
                    else
                        Util.TipHidden('查找俱乐部失败！！！！', true);

                }

            },
            error: function(msg){
                Util.TipHidden('查找俱乐部失败！！！！', true);
                console.log('Ajax error:',msg);
            }
        });

        return {clubInfo: info};
    },
    /* 
    ** 获取URL参数串的对象或值
    ** time 2018.03.22
    ** str, key
    */
    GetParamsObjOrValue: function(str, key){
        if(!str || str.indexOf('params_') == -1)
            return;

        var paramsStr = str.split('params_')[1],
            paramsArr = paramsStr.split('&'),
            obj = {},
            value = null;

         $.each(paramsArr, function(i, e){
            var param = e.split('=');
            if(key && key == param[0])
                value = param[1];
            if(!key)
                obj[param[0]] = param[1];
         });
         if(!key)
            return obj;
         else
            return value;
    },
    /* 
    ** 通用弹窗
    ** time 2018.03.20
    ** args 默认参数替换对象
    */
    AlertBoxView: function(args){
        var defaults = {
                altClass: null,// 样式名称
                viewTitle: '标题',// 弹窗标题栏文字（不显示传null）
                isViewClose: true,// 是否显示标题栏关闭按钮
                viewCelBtn: '取消',// 取消按钮文字（不显示传null）
                celBtnFn: function(){// 取消按钮绑定函数
                    $(defaults.altClass).remove();
                    $('.ui-altBg').remove();
                },
                viewOkBtn: '确认',// 确认按钮文字（不显示传null）
                okBtnFn: null,// 确认按钮绑定函数
                altWidth: 500,// 弹窗默认宽度
                altInitMainFn: null,// 弹窗初始化主体内容函数,构造弹窗主要内容
                backFn: null// 回调函数
                
        };
        $.extend(defaults, args);

        var box_ = '<div class="ui-altBox"><div class="ui-altBox_content"></div></div>',
            tlt_ = '<div class="ui-altBox_tlt"><strong>标题</strong></div>',
            tltBtn_ = '<a href="javascript:;" class="btn_close">×</a>',
            btn_ = '<div class="ui-altBox_btn"></div>',
            btnCel_ = '<button type="button" class="ui-btn btn_cel"></button>',
            btnOk_ = '<button type="button" class="ui-btn btn_ok"></button>';
        
        $('body').append(box_);
        // 显示标题块
        if(defaults.viewTitle){
            $('.ui-altBox_content').before(tlt_);
            $('.ui-altBox_tlt strong').html(defaults.viewTitle);
        }
        if(defaults.isViewClose){
            $('.ui-altBox_tlt').append(tltBtn_);
            $('.btn_close').on('click',function(){
                $(defaults.altClass).remove();
                $('.ui-altBg').remove();
            });
        }
        // 显示按钮块
        if(defaults.viewOkBtn || defaults.viewCelBtn){
            $('.ui-altBox_content').after(btn_);
            if(defaults.viewCelBtn){
                $('.ui-altBox_btn').append(btnCel_)
                    .children('.btn_cel').html(defaults.viewCelBtn);
                if(defaults.celBtnFn){
                    $('.btn_cel').on('click',function(){
                        defaults.celBtnFn();
                    });
                }
            }
            if(defaults.viewOkBtn){
                $('.ui-altBox_btn').append(btnOk_)
                    .children('.btn_ok').html(defaults.viewOkBtn);
                if(defaults.okBtnFn){
                    $('.btn_ok').on('click',function(){
                        defaults.okBtnFn();
                    });
                }
            }

        }
        // 添加样式名
        if(defaults.altClass){
            $('.ui-altBox').addClass(defaults.altClass);
            defaults.altClass = '.'+ defaults.altClass;
        }else{
            defaults.altClass = '.ui-altBox';
        }
        // 构造主体内容
        if(defaults.altInitMainFn){
            var mainStr_ = defaults.altInitMainFn();
            $(defaults.altClass).children('.ui-altBox_content').html(mainStr_);
        }
        // 执行回调函数
        if(defaults.backFn){
            defaults.backFn();
        }
        
        var W_ = defaults.altWidth + 22,// 滚轮会有22px的占宽
            H_ = $(defaults.altClass).height();
        $(defaults.altClass).show()
            .css({'width':W_ +'px','margin-top':H_/2*-1 +'px','margin-left':W_/2*-1 +'px'})
            .after('<div class="ui-altBg"></div>');
        
    },
    AlertBoxView_close: function(x){
        if(x)
            $(x).remove();
        else
            $('.ui-altBox').remove();

        $('.ui-altBg').remove();
    },
    /* 
    ** 获取Config配置文本描述
    ** time 2018.03.19
    ** type 配置标识, configName Config配置名称
    */
    GetConfigTxt: function(type, configName){
        var objArray = Config[configName],
            txt = '';
        
        if(objArray){
            $.each(objArray, function(i, e){
                if(type == e.type)
                    txt = e.desc;
            });
        }
        return txt ? txt : type;
    },
    /* 
    ** 获取json内容
    ** time 2018.03.19
    ** jsonAddr 文件地址, childType 内容子类, fn 回调
    */
    GetJson: function(jsonAddr, childType, fn){
        var url = jsonAddr +'.json';

        $.getJSON(url).then(function(msg){
            if(childType && fn){
                fn(msg[childType]);
            }else
                fn(msg);
                
        },function(e){
            Util.TipHidden(Config.Enum_TipStr[1].desc +' ['+ jsonAddr +']', true);
        });
    },
    /* 
    ** 通用延迟函数
    ** time 2018.03.14
    ** num, fn
    */
    Delayed: function(num, fn){
        var delay = setTimeout(function() {
            clearTimeout(delay);
            fn();
        }, num);
    },
    /* 
    ** 通用分页
    ** time 2018.03.13
    ** totalPage, nowPage, curPageCount
    */
    Paging: function(_totalPage, _nowPage, _curPageCount, fn){
        var that = this,
            totalPage = _totalPage ? _totalPage : 1,
            nowPage = _nowPage ? _nowPage : 1,
            curPageCount = _curPageCount ? _curPageCount : 10;
        that.pagingRander(totalPage, nowPage, curPageCount);

        // 绑定分页点击事件
        $(document).off('click', '.page_a a');
        $(document).on('click', '.page_a a', function(){
            if(!$(this).hasClass('hover')){
                var pageNum = $(this).data('index');
                fn(pageNum, curPageCount);
                    
            }
            
        });
        // if(curPageCount){// 兼容扩展，考虑旧的分页（前端传pageSize无效的接口）
            // 每页条数
            $(document).off('change', 'select[name="curPageCount"]');
            $(document).on('change', 'select[name="curPageCount"]',function(){
                nowPage = 1;
                var newPageSize = $(this).val();
                fn(nowPage, newPageSize);
                
            });
            // 跳转页面
            $(document).off('click', '.pageBtn');
            $(document).on('click', '.pageBtn',function(){
                nowPage = $('input[name="linkPageNum"]').val();
                if(!nowPage || nowPage == 0 || nowPage > totalPage || nowPage == _nowPage){
                    Util.TipHidden(Config.Enum_TipStr[10].desc, true);
                    return false;
                }

                var newPageSize = $('select[name="curPageCount"]').val();
                fn(nowPage, newPageSize);
                
            });
        // }
    },
    _pagingNum: 0,
    pagingRander: function(totalPage, nowPage, curPageCount){
        var that = this,
            page_aStr = '',
            showPageNum = 10,// 默认显示10页
            showPageCount = 5,// 点击默认显示下一个5页
            lastPageNum = totalPage%10,
            totalPageNum = parseInt(totalPage / showPageCount) - 1,
            num = parseInt(nowPage / showPageCount) - 1;
        if(nowPage != 1)
            page_aStr = '<a href="javascript:;" data-index="'+ (nowPage-1) +'">上一页</a>';
        
        if(num > 0)// 保持num的值
            that._pagingNum = num;
        else
            that._pagingNum = 0;

        if(totalPage < 10)// 总页码小于10
            showPageNum = totalPage;
        else if(totalPage == nowPage && nowPage%showPageCount == 0)// 最后一页为showPageCount的倍数时
            that._pagingNum--;
        else if(lastPageNum && that._pagingNum == totalPageNum)// 分页已处于最后阶段时
            showPageNum = (lastPageNum < showPageCount ? lastPageNum+showPageCount : lastPageNum);

        for(var i=Number(that._pagingNum*showPageCount + 1); i <= Number(that._pagingNum*showPageCount + showPageNum); i++){
            if(i != nowPage){
                page_aStr += '&nbsp;<a href="javascript:;" data-index="'+ i +'">'+ i +'</a>';
            }else{
                page_aStr += '&nbsp;<a href="javascript:;" data-index="'+ i +'" class="hover">'+ i +'</a>';
            }
            
        }

        if(nowPage != totalPage)
            page_aStr += '&nbsp;<a href="javascript:;" data-index="'+ (nowPage+1) +'">下一页</a>&nbsp;';

        $('.page_a').remove();
        // if(!curPageCount)// 兼容考虑
        //     $('body').append('<div class="page_a">'+ page_aStr +'</div>');
        // else{
            $('body').append('<div class="page_a">每页<select name="curPageCount"><option value="10">10</option><option value="20">20</option><option value="30">30</option><option value="50">50</option><option value="100">100</option></select>条，共 '+ totalPage +' 页&nbsp;'+ page_aStr +'&nbsp;<input type="text" size="8" name="linkPageNum" placeholder="输入页码" class="inputNum">&nbsp;<input type="button" value="跳转" class="pageBtn btnFunt btn_cancel arr_5" /></div>');
            $('select[name="curPageCount"]').val(curPageCount);
        // }
            
    },
    /* 
    ** loading弹窗
    ** time 2018.03.14
    ** action 操作（open：打开／close：关闭）,type loading类型(null 默认无背景，BG 带背景)
    */
    TipLoading: function(action, type){
        if(action == 'close'){
            $('.loading_bg').remove();
            return false;
        }

        var h = $(window).height(),
            w = $('body').width(),
            d = dialog({
            onshow: function(){
                if(type == 'BG')
                    $('.ui-popup').addClass('loading_bg');
                else
                    $('.ui-popup').addClass('loading');

            }
        }).width(w).height(h);

        if(action == 'open')
            d.show();

    },
    /* 
    ** 气泡弹窗
    ** time 2018.03.14
    ** e 参照对象ID,f 文本内容,top top定位值px（int）
    */
    TipBubble: function(e, f, top){
        var follow = document.getElementById(e);
        var d = dialog({
            align: 'right top',
            content: f,
            quickClose: true// 点击空白处快速关闭
        });
        d.show(follow);

        // 调整top值
        var t_ = $('.ui-popup').css('top');
        if(t_)
            t_ = Number(t_.split('px')[0]) - 10;
        if(top)
            t_ = top;

        $('.ui-popup').css({'top': t_ +'px'});
    },
    /* 
    ** 提示弹窗
    ** time 2018.03.13
    ** e 具体内容,i 显示icon,f 延迟消失时间,g 内容区域宽度[不传值宽度自动]
    */
    TipHidden: function(e,i,f,g){
        i = (!!i) ? '<i class="iconfont">&#xe60b;</i> ' : '';
        f = f ? f : 2000;
        g = g ? g : 250;

        var d = dialog({
            content: i+e
        }).width(g);
        d.show();
        setTimeout(function () {
            d.close().remove();
        }, f);
    },
    /* 
    ** 行为弹窗
    ** time 2018.03.13
    ** e 标题,f 具体内容,g 确认后执行函数,h 关联取消按钮[1传function显示取消按钮 2不传值不显示取消按钮],n 内容区域宽度
    */
    Tip: function(e,f,g,h,n){
        n = n ? n : 300;

        var d = dialog({
            title: e,
            content: f,
            okValue: '确认',
            ok: g,
            cancelValue: '取消',
            cancel: h
        }).width(n);
        d.show();
    },
    /* 
    ** 搜索模块-执行动作
    ** time 2018.03.13
    */
    searchBlockGo: function() {
        // 搜索框
        $('body').on('click', '.searchBtn>a', function(){
            var parent_ = $(this).parents('.searchBox');
            if(parent_.attr('style') != 'height: auto;'){
                $(this).children('i').css({'transform': 'rotate(180deg)'});
                parent_.css({'height': 'auto'});
            }else{
                $(this).children('i').css({'transform': 'rotate(0deg)'});
                parent_.css({'height': '40px'});
            }
                
        });

        // 初始化模块动作的标记
        localStorage.searchBoxStamp = 1;
    },
    /* 
    ** 搜索模块添加
    ** time 2018.03.13
    ** contentHtml 搜索参数html, isLevelTop 是否有高级搜索功能, afterObj 插入的参照对象
    ** 添加内容页Top模块: TF是否添加搜索模块 afterObj插入参照对象
    */
    CreateSearchBlock: function(contentHtml, isLevelTop, afterObj, btnClass){
        var that = this,
            levelTopHtml = '<a href="#" class="col_com1_1"><i class="iconfont col_com1_1">&#xe60e;</i>高级搜索</a>',
            btnBox = '<div class="searchBox"><div class="content">'+ contentHtml +'</div><div class="searchBtn">'+ (isLevelTop ? levelTopHtml : "") +'<input type="button" class="'+ (btnClass ? btnClass : "") +' btn_s btnFunt col_bg_com5_1 col_com4_0 arr_5" value="搜索" /></div></div>';

        if(afterObj)
            $(afterObj).after(btnBox);
        else{
            if($('.commRefresh').length)
                $('.rTopBox').after(btnBox);
            else
                $('body').prepend(btnBox);
        }
            

        // 初次启动高级搜索
        if(isLevelTop && localStorage.searchBoxStamp != 1)
            that.searchBlockGo();
    },
    /* 
    ** 操作模块添加
    ** time 2018.03.13
    ** type 样式类型(枚举为样式名), contentHtml 内容html, afterObj 插入参照对象
    */
    CreateBtnBlock: function(type, contentHtml, afterObj, secendName){
        var that = this,
            obj = (type == 'BTNBOX' ? 'btnBox' : 'actionBox'),
            btnBox = '<div class="'+ obj +' '+ secendName +'">'+ contentHtml +'</div>';

        if(afterObj)
            $(afterObj).after(btnBox);
        else
            $('body').prepend(btnBox);
    },
    /* 
    ** 设置刷新模块
    ** time 2018.03.30
    ** veiw 显示（值:NO）, contentHtml 内容html, prevLink 上一页链接（默认document.referrer）
    */
    SetRefresh_num: 0,
    SetRefreshTopBox: function(veiw, contentHtml, prevLink){
        var that = this;

        if(veiw == 'NO')
            $('.rTopBox .actionNew').hide();
        // else
        //     $('.rTopBox .actionNew').show();

        if(contentHtml){
            if(contentHtml == 'return'){
                var num = ++that.SetRefresh_num,
                    link = document.referrer;

                if(prevLink)
                    link = prevLink;

                contentHtml = '<a href="'+ link +'" class="btn arr_5 col_bg_com5"><i class="iconfont col_com4_0">&#xe669;</i>返 回</a>';
            }

            $('.rTopBox').append(contentHtml)
        }
            
    },
    /* 
    ** 表格列表init
    ** time 2018.03.13
    */
    listTableGo: function() {
        // 表格列表样式表现 :hover
        $("body").on('mouseover','.table1 tr',function () {
            $(this).children("td").addClass("tron");
        }).on('mouseout','.table1 tr',function () {
            $(this).children("td").removeClass("tron");
        });

        // 初始化标记
        localStorage.listTableStamp = 1;
    },
    /* 
    ** 插件依赖init
    ** time 2018.03.13
    ** cssAddr css样式地址
    */
    PlugInInit: function(cssAddr) {
        // 插件样式表依赖插入
        if(cssAddr)
            $('head').append('<link href="'+ cssAddr +'" rel="stylesheet" type="text/css" />');
    },
    /* 
    ** 日期转换时间戳
    ** time 2018.03.13
    ** string格式 2018-03-10 12:00:00(转为毫秒级)
    */
    DateToUnix: function(string) {
        var stringArr = [],
            stringArr1 = [],
            stringArr2 = [];
        if(string.indexOf(' ') == -1){
            string += ' 00:00:00';
        }
        stringArr = string.split(' ');
        stringArr1 = stringArr[0].split('-');
        stringArr2 = stringArr[1].split(':');
        string = stringArr1.concat(stringArr2);
        var timestamp = new Date(string[0],(string[1] - 1),string[2],string[3],string[4],string[5]).getTime();
        // timestamp = timestamp / 1000; // 秒级

        return timestamp;
    },
    /* 
    ** 时间戳转换日期
    ** time 2018.03.12
    ** timestamp 整数(毫秒级)
    */
    UnixToDate: function(timestamp){
        // 添加'0'
        var add0 = function(m){return m<10 ? '0'+m : m }
        
        var time = new Date(timestamp);
        var year = time.getFullYear();
        var month = time.getMonth()+1;
        var date = time.getDate();
        var hours = time.getHours();
        var minutes = time.getMinutes();
        var seconds = time.getSeconds();

        return year+'-'+add0(month)+'-'+add0(date)+' '+add0(hours)+':'+add0(minutes)+':'+add0(seconds);
    },
    /* 
    ** 创建表格列表
    ** time 2018.03.09
    ** tableName 表格className, theadData 表头数组, tbodyName tbody的className, 
    ** tbodyHtml 列表内容html, tableType 表格显示类型
    */
    CreateTable1Block: function(tableName, theadData, tbodyName, tbodyHtml, tableType){
        var that = this,
            tableStr = '',
            theadStr = '',
            tbodyStr = '';
        // 生成表头
        if(theadData)
            $.each(theadData, function(i, e){
                theadStr += '<th>'+ e +'</th>';
                if(i == theadData.length-1)
                    theadStr = '<thead><tr>'+ theadStr +'</tr></thead>';
            });
        // 生成表主体盒子
        if(tbodyName && !tbodyHtml)
            tbodyStr = '<tbody class="'+ tbodyName + (tableType ? " tableType" : "") +'"></tbody>';

        if(tbodyHtml)
            tbodyStr = '<tbody class="'+ tbodyName + (tableType ? " tableType" : "")  +'">'+ tbodyHtml +'</tbody>';

        tableStr = '<table width="100%" border="0" cellspacing="1" cellpadding="0" class="table1" id="'+ tableName +'">'+
                        theadStr +
                        tbodyStr +
                    '</table>';

        // 表格列表依赖加载
        if(localStorage.listTableStamp != 1)
            that.listTableGo();

        return tableStr;
    },
    ClearLocalData: function(){
        sessionStorage.removeItem('_UUID');
        sessionStorage.removeItem('_logoninfo');
        sessionStorage.removeItem('_clubId');
        sessionStorage.removeItem('_clubinfo');
        sessionStorage.removeItem('_presidentId');
        sessionStorage.removeItem('_playerId');
        sessionStorage.removeItem('_costs');
        sessionStorage.removeItem('_diamond');
        sessionStorage.removeItem('_sms');
        sessionStorage.removeItem('_dLock');
        sessionStorage.removeItem('_masterScoreLock');
        sessionStorage.removeItem('_superClub');
        localStorage.removeItem('areaInfo');

    },
    /* 
    ** 刷新模块初始化
    ** time 2018.03.30
    */
    refreshTopBox: function(){
        var that = this;
        // 添加刷新按钮
        if($('.commRefresh').length)
            that.CreateBtnBlock('BTNBOX', '<a href="javascript:;" class="actionNew btn arr_5 col_bg_com5"><i class="iconfont col_com4_0">&#xe627;</i>刷 新</a>', null, 'rTopBox');

        // 点击刷新
        $(document).on('click', '.actionNew', function(){
            location.reload();
        });

    },
    /* 
    ** 页面初始化 数据清理
    ** time 2018.03.09
    */
    clearData: function(){
        localStorage.removeItem('searchBoxStamp');
        localStorage.removeItem('listTableStamp');

    },
    /*
     ** 加
     ** time 2018.03.09
     */
    dcmAdd: function(arg1,arg2){

        var r1,r2,m;
        try{r1=arg1.toString().split(".")[1].length;}catch(e){r1=0;}
        try{r2=arg2.toString().split(".")[1].length;}catch(e){r2=0;}
        m=Math.pow(10,Math.max(r1,r2));
        return (Util.accMul(arg1,m)+Util.accMul(arg2,m))/m;
    },
    /*
     ** 减
     ** time 2018.03.09
     */
    dcmShort: function(arg1,arg2){

        var r1,r2,m;
        try{r1=arg1.toString().split(".")[1].length;}catch(e){r1=0;}
        try{r2=arg2.toString().split(".")[1].length;}catch(e){r2=0;}
        m=Math.pow(10,Math.max(r1,r2));
        return (Util.accMul(arg1,m)-Util.accMul(arg2,m))/m;
    },
    /*乘
     ** time 2018.03.09
     */
    accMul: function(arg1,arg2){

        var m=0,s1=arg1.toString(),s2=arg2.toString();
        try{m+=s1.split(".")[1].length}catch(e){}
        try{m+=s2.split(".")[1].length}catch(e){}
        return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
    },
    /*
     ** 除
     ** time 2018.03.09
     */
    accDiv: function(arg1,arg2){

        var t1=0,t2=0,r1,r2;
        try{t1=arg1.toString().split(".")[1].length}catch(e){}
        try{t2=arg2.toString().split(".")[1].length}catch(e){}
        with(Math){
            r1=Number(arg1.toString().replace(".",""))
            r2=Number(arg2.toString().replace(".",""))
            return (r1/r2)*pow(10,t2-t1);
        }
    },
    go: function(){
        var that = this;

        // 使用inputNum 不能输入非数字
        $(document).on('keyup', '.inputNum2', function(){
            this.value = this.value.replace(/\D/g,'');
        });

        // 使用inputNum 不能输入非数字
        $(document).on('keyup', '.inputNum', function(){
            this.value = this.value.replace(/^0+$/g,'');
            this.value = this.value.replace(/\D/g,'');
        });

        // 使用inputAbcNum 不能输入非字母数字
        $(document).on('keyup', '.inputAbcNum', function(){
            var reg = new RegExp("[\u4e00-\u9fa5`~!@#$%^&*()_\\-+=|{}:;\",\\[\\].<>/?\\·~！@#￥……&*（）——|{}【】‘；：”“。，、？《》\\\\｀～¥＝＋－＊＃％［］｛｝｜／]");
            if(reg.test(this.value))
                this.value = this.value.replace(/[^a-zA-Z0-9]/g,'');
        });

        // 使用inputStr 不能输入非数字／字母／汉字（未屏蔽【空格】及【'】，中文拼音词语输入会用来分割造成干扰）
        $(document).on('keyup', '.inputStr', function(){
            var reg = new RegExp("[`~!@#$%^&*()_\\-+=|{}:;\",\\[\\].<>/?\\·~！@#￥……&*（）——|{}【】‘；：”“。，、？《》\\\\｀～¥＝＋－＊＃％［］｛｝｜／]");
            if(reg.test(this.value))
                this.value = this.value.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '');
        });

        // 使用inputFloat 可以输入小数，但不超过两位小数
        $(document).on('keyup', '.inputFloat', function(){
            this.value = this.value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
            this.value = this.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
            this.value = this.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
            this.value = this.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数
            if(this.value.indexOf(".")< 0 && this.value !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
                this.value= parseFloat(this.value);
            }
        });

        // 使用inputFloat 可以输入小数，但不超过一位小数
        $(document).on('keyup', '.inputFloatOne', function(){
            this.value = this.value.replace(/^0+$/g,'');//不能填0
            this.value = this.value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
            this.value = this.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
            this.value = this.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
            this.value = this.value.replace(/^(\-)*(\d+)\.(\d).*$/,'$1$2.$3');//只能输入一个小数
            if(this.value.indexOf(".")< 0 && this.value !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
                this.value= parseFloat(this.value);
            }
        });
        // 只能填整数
        $(document).on('keyup', '.inputSimple', function(){
            this.value = this.value.replace(/^0+$/g,'');
            this.value = this.value.replace(/\D/g,'');
        });

        // 只能填整数还可以填0
        $(document).on('keyup', '.inputSimpleZero', function(){
            this.value = this.value.replace(/\D/g,'');
        });

        // 绑定刷新模块
        that.refreshTopBox();

        // 插件－弹窗 样式表依赖插入
        // that.PlugInInit('../script/plugIn/jQ.dialog_v6.05/ui-dialog.css');

        // ajax默认设置
        $.ajaxSetup({
            beforeSend: function () {// 发送请求之前
                that.TipLoading('open', 'BG');
            },
            complete: function () {// 请求完成之后
                that.TipLoading('close');
                that.NetReq.TF = true;
            },
            headers: { // 默认添加请求头
                "UUID": sessionStorage._UUID
            },
            data: { // 默认添加参数
                "clubId": sessionStorage._clubId,
                "timestamp_cm": new Date().getTime()
            },
            error: function(xhr){// 与服务器约定返回统一错误处理码
                if(xhr.status == 408) {
                    xhr.abort();// 超时后中断请求
                    that.TipHidden(Config.Enum_TipStr[0].desc, true);
                    return false;
                }
                if(xhr.status == 307) {// IP改变
                    that.TipHidden(Config.Enum_TipStr[20].desc, true);
                    Util.Delayed(1500, function(){
                        top.location.href = Config.Server_CM +"login.html";
                    });
                    return false;
                }
                if(xhr.status == 401) {// 无权限
                    that.AlertBoxView_close();// 关闭alt
                    that.TipHidden(Config.Enum_TipStr[16].desc, true);
                    return false;
                }
                if(xhr.status == 403) {// 登录失效
                    that.TipHidden(Config.Enum_TipStr[17].desc, true);
                    Util.Delayed(1500, function(){
                        top.location.href = Config.Server_CM +"login.html";
                    });
                    return false;
                }
                if(xhr.status == 417) {// token失效或超时
                    that.TipHidden(Config.Enum_TipStr[21].desc, true);
                    Util.Delayed(1500, function(){
                        top.location.href = Config.Server_CM +"login.html";
                    });
                    return false;
                }

                console.log('================ status: '+ xhr.status +'================');
            }
    　　 });

    },
    /* 
    ** 页面初始化
    ** time 2018.03.09
    */
    Init: function(){
        var that = this;

        // 初始清除数据
        that.clearData();

        // 依赖功能操作
        that.go();
    }
};
Util.Init();

return Util;
});