define(function (){
/* 
** 公共配置文件
** time 2018.03.14
** author @aileLiu
*/
var Config = {
    /* 
    ** 俱乐部头像服务器指向
    ** time 2018.06.05
    */
    ClubIconServer: '//'+ location.hostname +':8080/poker.gm/',
    /* 
    ** 服务器API指向
    ** time 2018.03.14
    */
    // Server_CM: '//'+ location.host +'/poker.cm/',
    Server_CM: 'http://localhost:3000/',
    /* 
    ** 牌型描述
    ** time 2018.06.12
    */
    Enum_okerModelTypeStr: [
        {"type": 1, "desc": "高牌"},
        {"type": 2, "desc": "一对"},
        {"type": 3, "desc": "两对"},
        {"type": 4, "desc": "三条"},
        {"type": 5, "desc": "顺子"},
        {"type": 6, "desc": "同花"},
        {"type": 7, "desc": "葫芦"},
        {"type": 8, "desc": "金刚"},
        {"type": 9, "desc": "同花顺"},
        {"type": 10, "desc": "皇家同花顺"}
    ],
    /* 
    ** 录像回顾扑克操作玩法描述
    ** time 2018.06.12
    */
    Enum_RoundVideoOptionTypeStr: [
        {"type": 0, "desc": "多倍前注"},
        {"type": 1, "desc": "跟注"},
        {"type": 2, "desc": "弃牌"},
        {"type": 3, "desc": "过牌"},
        {"type": 4, "desc": "加注"},
        {"type": 5, "desc": "ALLIN"},
        {"type": 6, "desc": "不触发保险提示"},
        {"type": 7, "desc": "购买保险"},
        {"type": 8, "desc": "不购买保险"},
        {"type": 9, "desc": "买中保险"},
        {"type": 10, "desc": "未买中保险"},
        {"type": 11, "desc": "发公牌"},
        {"type": 12, "desc": "翻手牌(结算翻牌/亮牌)"},
        {"type": 13, "desc": "结算"}
    ],
    /* 
    ** 邀请码类型描述
    ** time 2018.03.29
    */
    /*Enum_InvitationCodeTypeStr: [
        {"*_": 0, "type": "1", "desc": "会长邀请码"},
        {"*_": 1, "type": "2", "desc": "成员邀请码"},
        {"*_": 2, "type": "3", "desc": "密码验证码"}
    ],*/
    /*
     ** 邀请码类型描述
     ** time 2018.03.29
     */
    Enum_InvitationCodeTypeStr: [
     {"*_": 0, "type": "1", "desc": "会长邀请码"},
     {"*_": 1, "type": "2", "desc": "成员邀请码"}
     ],
    /* 
    ** 俱乐部人员划分类型
    ** time 2018.03.30
    */
    Enum_clubPlayerTypeStr: [
        {"*_": 0, "enum": 1, "type": "PRESIDENT", "desc": "创建者"},
        {"*_": 1, "enum": 2, "type": "MANAGER", "desc": "管理员"},
        {"*_": 2, "enum": 3, "type": "OBSERVER", "desc": "观察者"},
        {"*_": 3, "enum": 4, "type": "NORMAL", "desc": "普通会员"},
    ],
    /* 
    ** 玩法类型描述
    ** time 2018.03.29
    */
    Enum_PlayTypeStr: [
        {"type": "0", "desc": "德州"},
        {"type": "1", "desc": "奥马哈"},
        {"type": "2", "desc": "短牌"}
    ],
    /* 
    ** 扑克花色及特殊牌描述
    ** time 2018.03.22
    */
    Enum_PokerTypeStr: [
        {"type": "heart", "desc": "<img style=\"width:18px; vertical-align:middle;\" src=\"../images/si-glyph-poker-4.png\">"},
        {"type": "spade", "desc": "<img style=\"width:18px; vertical-align:middle;\" src=\"../images/si-glyph-poker-3.png\">"},
        {"type": "club", "desc": "<img style=\"width:18px; vertical-align:middle;\" src=\"../images/si-glyph-poker-1.png\">"},
        {"type": "diamond", "desc": "<img style=\"width:18px; vertical-align:middle;\" src=\"../images/si-glyph-poker-2.png\">"},
        {"type": "11", "desc": "J"},
        {"type": "12", "desc": "Q"},
        {"type": "13", "desc": "K"},
        {"type": "14", "desc": "A"}
    ],
    /* 
    ** 交易类型
    ** time 2018.03.19
    */
    Enum_TransactionTypeStr: [
        {"enum": 1, "type": "GRANT", "desc": "发放"},
        {"enum": 2, "type": "CONTRIBUTION", "desc": "贡献"},
        {"enum": 6, "type": "INSURANCE_REBATE", "desc": "保险贡献"},
        {"enum": 7, "type": "SETTLEMENT_REBATE", "desc": "结算贡献"},
        {"enum": 8, "type": "REBATE", "desc": "返点"},
        {"enum": 12, "type": "SYSTEM_REDUCE", "desc": "系统扣除/发放"},
        {"enum": 13, "type": "SETTLEMENT_SUBCLUB_REBATE", "desc": "下属俱乐部结算贡献"},
        {"enum": 14, "type": "JACKPOT_REBATE", "desc": "jackpot贡献"},
        {"enum": 15, "type": "JACKPOT_REDUCE", "desc": "jp扣除"},
        {"enum": 16, "type": "JACKPOT_SETTLEMENT_REDUCE", "desc": "jp结算扣除大师分补齐"},
        {"enum": 17, "type": "JP_GM_ADD", "desc": "jp后台注入"},
        {"enum": 18, "type": "JP_GM_REDUCE", "desc": "jp后台扣除"},
        {"enum": 20, "type": "GRANTED", "desc": "被发放"},
        {"enum": 21, "type": "CONTRIBUTIONED", "desc": "被回收"},
        {"enum": 22, "type": "HANDSREWARD", "desc": "手数奖励扣除"},
        {"enum": 23, "type": "RANKREWARD", "desc": "牌型奖励"},
        {"enum": 24, "type": "ITEMREVERT", "desc": "兑换积分"},
        {"enum": 25, "type": "SYSTEM_RACE_REWARD", "desc": "比赛奖励流转"},
        {"enum": 26, "type": "REDPACKET_REWARD", "desc": "红包活动奖励"},
        {"enum": 27, "type": "RACESERVICEBACK", "desc": "比赛服务费返点"},
        {"enum": 28, "type": "GRANT_TO_LOWER_CLUB", "desc": "发放下级"},
        {"enum": 29, "type": "CLUB_CONTRIBUTE_TO_UPPER_CLUB", "desc": "贡献上级"},
        {"enum": 30, "type": "UPPER_CLUB_GRANTED", "desc": "上级发放"},
        {"enum": 31, "type": "LOWER_CLUB_CONTRIBUTED", "desc": "下级贡献"},
        {"enum": 32, "type": "HONOR_CLUB_COST", "desc": "徽章返利"},
        {"enum": 33, "type": "HONOR_CLUB_ADD", "desc": "徽章补贴"},
        {"enum": 34, "type": "CLUB_WITHDRAW", "desc": "俱乐部提现"},
        {"enum": 36, "type": "CLUB_WITHDRAW_ROLLBACK", "desc": "俱乐部提现回滚"}
    ],
    /* 
    ** 前端提示文本
    ** time 2018.03.14
    */
    Enum_TipStr: [
        {"*_": 0, "type": "", "desc": "连接服务器超时，请重试！"},
        {"*_": 1, "type": "", "desc": "获取JSON配置失败，请刷新重试！"},
        {"*_": 2, "type": "", "desc": "有内容未填！"},
        {"*_": 3, "type": "", "desc": "正在跳转...."},
        {"*_": 4, "type": "", "desc": "登录获取信息有误，请退出重新登录！"},
        {"*_": 5, "type": "", "desc": "登录失败，请重试！"},
        {"*_": 6, "type": "", "desc": "操作失败！"},
        {"*_": 7, "type": "", "desc": "操作成功！"},
        {"*_": 8, "type": "", "desc": "没有相关数据！"},
        {"*_": 9, "type": "", "desc": "获取数据失败！"},
        {"*_": 10, "type": "", "desc": "请填写正确页码！"},
        {"*_": 11, "type": "", "desc": "时间段不能为空！"},
        {"*_": 12, "type": "", "desc": "时间段设置有误！"},
        {"*_": 13, "type": "", "desc": "结束时间不能大于当前时间！"},
        {"*_": 14, "type": "", "desc": "你确定执行此操作吗？"},
        {"*_": 15, "type": "", "desc": "请正确填写内容！"},
        {"*_": 16, "type": "", "desc": "没有权限！"},
        {"*_": 17, "type": "", "desc": "登录失效，请重新登录！"},
        {"*_": 18, "type": "", "desc": "超过单次生成上限数量10条！"},
        {"*_": 19, "type": "", "desc": "不能填写空格等特殊字符！"},
        {"*_": 20, "type": "", "desc": "IP异常，请重新登录！"},
        {"*_": 21, "type": "", "desc": "token失效或过期，请重新登录！"},
        {"*_": 22, "type": "", "desc": "超过长度限制！"},
        {"*_": 23, "type": "", "desc": "时间段设置超过30日！"},
        {"*_": 24, "type": "", "desc": "新建成功，请前往牌桌列表查看！"},
        {"*_": 25, "type": "", "desc": "请填写模版名称！"},
        {"*_": 26, "type": "", "desc": "时间段设置超过7日！"},
    ],
    /* 
    ** 页面初始化
    ** time 2018.03.14
    */
    Init: function(){
        var that = this;

    }
};
Config.Init();

return Config;
});