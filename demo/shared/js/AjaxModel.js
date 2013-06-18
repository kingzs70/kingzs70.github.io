/**
 * @description 对ajax操作进行封装，目的是将数据通信的逻辑抽象出来，提高代码复用率，增强代码可维护性。
 * @author kingzs70
 * @date 2011-8-17
 * @requires tangram.js
 */

/** 
基本用法：
var model = new AjaxModel(options);
options的格式：
options = {
    data : {}, 			  			      //可选参数。全局静态数据，你可以将model下所有ajax请求共用的数据存在data中，这样就不用每次发起请求都提供了
	onFailure : function(){..}  	      //可选参数。比如服务器关闭，session过期等问题引起的错误，导致Ajax请求失败时的回调函数
	onRequestBegin : function(){}	      //可选参数。请求开始前执行。
	onRequestEnd : function(){}		      //可选参数。请求结束时执行。
    methods : {			  			      //需要创建的ajax方法，可以添加任意多个
        add : {			  			      //add为方法名
            url : 'demo.ccom/add', 	      //ajax请求的地址
            onSuccess : function(data){}, //请求成功时调用的方法，data由三部分组成，options.data + 请求输入数据 + 请求返回数据，如三部分命名冲突，以后面的为准
            method : 'post' 			  //可选参数。默认值是get
        },
        delete : {
            url : '',
            succeed : function(data){}
        },
		...
    
    }
}
Ajax接口数据格式
{
	status : 0, //0代表成功，其他代表错误代码
	msg : '',   //消息
    data : {},  //服务器回传数据，必须是 key : value 对这种形式。
}

一个具体的例子：
以“添加删除标签”场景为例，可能会按照如下方式定义model对象。
var tagModel = new AjaxModel({
	data : { userid : XX }, //每次调用add或del方法，都会发送userid这个参数
	onRequestBegin : function () {alert('正在发送请求')},
	onRequestEnd : function () { alert('请求结束')},
	methods : {
		add : {
			url : VAR.TAG_ADD_URL,
			onSuccess : onAddSuccess,
			method : 'post'
		},
		del : {
			url : VAR.TAG_DEL_URL,
			onSuccess : onDelSuccess
		}
	}
});
添加标签：
tagModel.add({ tagname : 'kingzs70' });
删除标签:
tagModel.del( {tagid : 123456 });
添加标签成功执行onAddSuccess
function onAddSuccess (data) {
	//根据data，把新加的标签显示在网页上内容省略...
	//data由三部分组成：
	//1. tagModel定义时声明的 { userid : XX }
	//2. add方法调用时的输入参数 { tagname : 'kingzs70' }
	//3. add请求返回的data { tagid : xxx }
	//也就是说 data = model定义时声明的data + 请求输入 + 请求输出
	//当字段出现重复时，排在后面的优先级更高
}

详情可参见：http://kingzs70.sinaapp.com/demo/tag
 */


/**
 * 构造器方法。根据options中内容动态创建AjaxModel对象
 */
var AjaxModel = function (options) {
	var i,
		getFunc = function (i) {
			return function (input) {
				this.onRequestBegin();
				this.request(options.methods[i].url, this.getOptions(options.methods[i],input));
			};
		};
	this.data = options.data || {};
	if (this.isFunction(options.onRequestBegin)) {
		this.onRequestBegin = options.onRequestBegin;
	}
	if (this.isFunction(options.onRequestEnd)) {
		this.onRequestEnd = options.onRequestEnd;
	}
	if (this.isFunction(options.onFailure)) {
		this.onFailure = options.onfailure;
	}
	for (i in options.methods) {
		this[i] = getFunc(i);
	}
};
/**
 * 如果使用其他框架，只需重定义如下方法
 */
AjaxModel.prototype.isFunction = T.lang.isFunction;
AjaxModel.prototype.isArray = T.lang.isArray;
AjaxModel.prototype.$ = T.g;
AjaxModel.prototype.jsonDecode = T.json.decode;
AjaxModel.prototype.extend = T.object.extend;
AjaxModel.prototype.request = T.ajax.request;

/**
 * 获取用于发送Ajax请求的options对象
 */
AjaxModel.prototype.getOptions = function (method,input) {
	return {
		data : this.getQueryString(input),
		method : method.method || 'get',
		onsuccess : this.getSuccessFunc(method,input),
		onfailure : this.onFailure
	};
};

/**
 * 当系统不可用，即Ajax请求失败时的默认回调函数
 */
AjaxModel.prototype.onFailure = function () {
	alert('系统或网络出错~。');
};
/**
 * ajax-loader 图片的id，AjaxModel会在请求开始根据这个id找到loader图片，如果找到就显示出来
 * 在请求结束时，会隐藏该图片
 */
AjaxModel.prototype.AjaxLoaderImgId = 'AjaxModelProcessing';
/**
 * 请求发送前调用。显示Ajax-loading图片，提示用户请求已开始
 * 使用方法：只需要在页面内合适位置插入一个Ajax-loading图片，id设为AjaxLoaderImgId的值即可
 */
AjaxModel.prototype.onRequestBegin = function () {
	var loaderImg = this.$(this.AjaxLoaderImgId);
	if (loaderImg) {	//根据Id:AjaxProcessing 查找元素，如果存在则显示出来
	    loaderImg.style.visibility = 'visible';
	}
};
/**
 * 请求结束后调用。隐藏Ajax-loading图片，提示用户请求已结束
 */
AjaxModel.prototype.onRequestEnd = function () {
	var loaderImg = this.$(this.AjaxLoaderImgId);
	if (loaderImg) {
		loaderImg.style.visibility = 'hidden';
	}
};
/**
 * 获取Ajax请求成功时的回调函数
 */
AjaxModel.prototype.getSuccessFunc = function (method,input) {
	var that = this;
	return function (xhr, result) {
		that.onRequestEnd();
		try {
			result = that.jsonDecode(result);
		} catch (e) {
			result = { status : 1, msg : 'json数据格式解析错误'};
		}
		if (result.status === 0) {
			if (that.isFunction(method.onSuccess)) {
			    //构造回调数据。由三部分组成，model中维护的静态数据，请求输入数据，请求返回数据。
			    //如果这三类数据有同名的，则请求返回数据优先级最高，model中维护的静态数据优先级最低。
			    var data = {};
			    that.extend(data, that.data);
			    that.extend(data, input);
			    that.extend(data, result.data);
				method.onSuccess(data);
			}
		} else {
			alert(result.msg);
		}
		
	};
};
/**
 * 获取用于Ajax请求的查询字符串
 */
AjaxModel.prototype.getQueryString = function (input) {
	var result = [], data = {};
	this.extend(data, this.data);
	this.extend(data, input);
	for (var i in data) {
		result[result.length] = i + '=' + data[i];
	}
	return result.join('&');
};
