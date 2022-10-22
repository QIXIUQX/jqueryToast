/** 时间日期操作相关方法 */
var dateUtils = {}
/*** url操作相关方法 */
var urlUtils = {}
/** 本地存储操作相关方法 */
var storageUtils = {}
/** 倒计时操作相关方法 */
var countDownUtils = {}
/** 公共方法 */
var commonUtils = {}
/**
 * dom 操作
 */
var domUtils = {}


/**========================内部工具类 不提供给外部使用==============================*/
/**
 * 传入月份的上一个月
 * @param dateTime{Object|string} 字符串或者时间对象
 */
function getLastMonth(dateTime) {
	if (dateTime.month - 1 === 0) {
		dateTime.month = 12
		dateTime.year = dateTime.year - 1
	} else {
		dateTime.month = dateTime.month - 1
	}
	return dateTime
}

/**======================================================*/
/**
 * 对传入的字符串进行编码(btoa方法)
 * @param { string } str 需要进行编码的字符串
 * @returns {string} 编码之后的字符串
 */
commonUtils.encodeString = function (str) {
	return btoa(str)
}

/**
 * 对传入的字符串进行解码
 * @param {string} str 需要解码的字符串
 * @returns {string} 解码之后的值
 */
commonUtils.decodeString = function (str) {
	return atob(str)
}

/**
 * 判断变量的值是否存在，如果存在则返回对应的值，如果不存在则返回暂无或者由调用者指定的值
 * @param value 需要被检测的变量
 * @param returnDoesNotExist 变量不存在时候返回的值
 * @returns {*|string}
 */
commonUtils.variableValueExists = function (value, returnDoesNotExist) {
	returnDoesNotExist = returnDoesNotExist || "暂无"
	return value ? value : returnDoesNotExist
}

/**
 * 字符串切割
 * @param value{String} 需要切割的字符串
 * @param start{Number} 开始位置
 * @param end{Number} 需要切几位
 * @returns {string}  分割后的字符串
 */
commonUtils.strSlice = function (value, start, end) {
	return value.toString().slice(start, end)
}

/**
 * 字符串截取
 * @param {String} str 需要截取的字符串，传入的将会自动转换为String。
 * @param {Number} startNum 开始位置
 * @param {Number} length 结束位置
 * @returns {string} 返回截取的子发出
 */
commonUtils.subStr = function (str, startNum, length) {
	return ("" + str + "").toString().substr(startNum, length)
}

/**
 * 不足10的话前面补0
 * @param {Number} number 需要处理的值
 * @returns {Number|string} 处理完成和返回的值
 */
commonUtils.fillWith0 = function (number) {
	return number >= 10 ? number : "0" + number
}

/**
 * 打乱数组中元素位置
 * @param {Array} array 需要被打乱的数组
 * @returns {Array}   返回一个新的数组
 */
commonUtils.messArray = function (array) {
	var _after = [];
	var index = 0
	for (var i = array.length - 1; i >= 0; i--) {
		index = commonUtils.randomNum(0, i);
		_after[_after.length] = array.splice(index, 1)[0];
	}
	return _after;
}

/**
 * 生成从minNum到maxNum的随机数
 * @param {Number} minNum 最小值
 * @param {Number} maxNum 最大值
 * @returns {Number} 返回随机值
 */
commonUtils.randomNum = function (minNum, maxNum) {
	return parseInt((Math.random() * (maxNum - minNum + 1) + minNum).toString(), 10);
}

/**
 * 防抖函数
 * @param { Function } fn 回调函数
 * @param {Number} delay 延迟时间
 * @param {Boolean} trigger 首次是否触发，默认不触发
 * @returns {*} 如果防抖函数有返回值则通过res 返回
 */
commonUtils.debounce = function (fn, delay, trigger) {
	if (!trigger) trigger = false
	var t = null;
	var res = null;
	var debounced = function () {
		var _self = this;
		var args = arguments;
		if (t) {
			clearTimeout(t);
		}
		if (trigger) {
			var exec = !t;

			t = setTimeout(function () {
				t = null;
			}, delay);

			if (exec) {
				res = fn.apply(_self, args);
			}
		} else {
			t = setTimeout(function () {
				res = fn.apply(_self, args);
			}, delay);
		}
		return res;
	};
	debounced.remove = function () {
		clearTimeout(t);
		t = null;
	};

	return debounced;
}

/**
 * 节流函数
 * @param { Function } fn 函数
 * @param {Number} delay  延迟时间
 */
commonUtils.throttle = function (fn, delay) {
	if (!delay) delay = 500
	var timer = null;
	var beginTime = new Date().getTime();
	return function () {
		var _self = this;
		var args = arguments;

		var currentTime = new Date().getTime();
		clearTimeout(timer);
		timer = null;
		if (currentTime - beginTime >= delay) {
			fn.apply(_self, args);
			beginTime = currentTime;
		} else {
			timer = setTimeout(function () {
				fn.apply(_self, args);
			}, delay);
		}
	};
}

/**
 * 是否是一个函数
 * @param {*} value 需要被检测的值
 * @returns {boolean} true 是函数 false 不是函数
 */
commonUtils.isFunction = function (value) {
	return toString.call(value) === '[object Function]';
}

/**
 * 是否是字符串
 * @param {*} value 需要被检测的值
 * @returns {boolean} true 是 false 不是
 */
commonUtils.isString = function (value) {
	return typeof value === 'string';
}

/**
 * 是否是数字
 * @param {*} value 需要被检测的值
 * @returns {boolean} true 是 false 不是
 */
commonUtils.isNumber = function (value) {
	return typeof value === 'number';
}

/**
 * 是否是对象
 * @param {*} value 需要被检测的值
 * @returns {boolean} true 是 false 不是
 */
commonUtils.isObject = function (value) {
	return value !== null && typeof value === 'object';
}

/**
 * 是否是 undefined
 * @param {*} value 需要被检测的值
 * @returns {boolean} true 是 false 不是
 */
commonUtils.isUndefined = function (value) {
	return typeof value === 'undefined';
}

/**
 * 禁用后退功能 执行此方法后 将不不能使用浏览器的前进后退功能
 */
commonUtils.handleDisableBackOrForward = function () {
	if (window.history && window.history.pushState) {
		$(window).on('popstate', function () {
			window.history.pushState('forward', null, '#');
			window.history.forward(1);
		});
	}
	window.history.pushState('forward', null, '#');
	window.history.forward(1);
}

/**
 * 数组中存放对象的去重
 * @param {Array} array 需要去重的数组
 * @param {String} propertiesName 根据什么属性做去重
 * @returns {Array} 返回一个新数组
 */
commonUtils.uniqueByObject = function (array, propertiesName) {
	if (!propertiesName) throw new Error("必须传入属性名称已完成去重")
	var result = [];
	var obj = {};
	for (var i = 0; i < array.length; i++) {
		if (!obj[array[i][propertiesName]]) {
			result[result.length] = array[i];
			obj[array[i][propertiesName]] = true;
		}
	}
	return result
}

/**
 * 普通数组去重
 * @param {Array} array 需要操作的数组
 * @returns {Array} 去重后的数组
 */
commonUtils.unique = function (array) {
	var _arr1 = [];
	for (var i = 0, len = array.length; i < len; i++) {
		if (_arr1.indexOf(array[i]) === -1) {
			_arr1[_arr1.length] = array[i];
		}
	}
	return _arr1;
}

/**
 * 实现网页的复制功能 注意 必须存在网页才可正常使用
 * @param {String} shareContent 需要复制的内容
 * @param {Function} callback 复制后的回调函数
 */
commonUtils.copyShane = function (shareContent, callback) {
	var _input = document.createElement("input"); // 直接构建input
	_input.value = shareContent; // 设置内容
	document.body.appendChild(_input); // 添加临时实例
	_input.select(); // 选择实例内容
	document.execCommand("Copy"); // 执行复制
	document.body.removeChild(_input); // 删除临时实例

	if (callback instanceof Function) {
		callback();
	}
}

/**
 * 是否是一个空的对象 注意  值兼容ie 9 以上浏览器调用
 * @param {Object} obj 需要查询是否为空的对象
 * @returns {boolean}   是空或者不是空
 */
commonUtils.isEmptyObject = function (obj) {
	return Object.keys(obj).length === 0
}

/**
 * 获取不重复的随机数数组 长度必须小于等于最大值减去最小值
 * @param {Number} length 需要获取的长度
 * @param {Number} minNum 随机数最小值
 * @param {Number} maxNum 随机数最大值
 * @returns {Array} 生成的不重复随机数数组
 */
commonUtils.randomNumNoRepeat = function (length, minNum, maxNum) {
	if ((maxNum - minNum) + 1 < length) throw new Error("随机数长度必须小于最大随机数减最小随机数")
	var _tempArray = []
	for (var i = 0; i < length; i++) {
		var randomNum = commonUtils.randomNum(minNum, maxNum)
		if (_tempArray.indexOf(randomNum) !== -1) {
			i--
		} else {
			_tempArray[_tempArray.length] = randomNum
		}
	}
	return _tempArray
}

/**
 * 将首字母都转换成大写
 * @param {String} str 需要被转换的字符串
 * @returns {String} 转换后的字符串
 */
commonUtils.capitalizeEveryWord = function (str) {
	return str.replace(/\b[a-z]/g, function (char) {
		char.toUpperCase()
	});
}

/**
 * 检查变量或值是否为空
 * @param {*} val 需要被检查的值
 * @returns {boolean} 是否为空
 */
commonUtils.checkVariableNull = function (val) {
	return val === undefined || val === null;
}


/**
 * 检测数组存在值
 * 如果数组中存在值， 则删除该值，不存在则将值添加到数组中，最后返回数组
 * @param array{Array} 需要操作的数组，
 * @param num{Number}  需要添加或者删除的值
 * @returns {Array}  经过处理之后的数组
 */
commonUtils.checkArrayExistValue = function (array, num) {
	var _index = array.indexOf(num)
	if (_index !== -1) {
		array.splice(_index, 1)
	} else {
		array.push(num)
	}
	return array
}

/**
 * 获取百分比
 * @param {Number} value 需要转变的之
 * @param {Number} fixed 保留几位小数  默认保留2位
 * @param {String} symbol 是否拼接百分号
 * @returns {string} 拼接好的字符串
 */
commonUtils.getPercentage = function (value, fixed, symbol) {
	fixed = fixed ? fixed : 2
	symbol = symbol ? symbol : ""
	return (value * 100).toFixed(fixed) + symbol
}

/**
 * 是否是移动端设备
 * @returns {RegExpMatchArray}  匹配结果。如果是移动端则返回的正则匹配结果数组中，会包含对应设备的值，如果没有则表示是pc端
 */
commonUtils.isMobile = function () {
	return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
}

//urlUtils

/**
 * 获取url中的参数对应的值
 * @param { String } name 参数名称
 * @returns {string|null} 获取到的值， 如果是空返回null
 */
urlUtils.getUrlParam = function (name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg);  //匹配目标参数
	if (r != null) return unescape(r[2]);
	return null; //返回参数值
}

/**
 * 获取当前的url
 * @returns {String} 获取的url
 */
urlUtils.currentUrl = function () {
	return window.location.href.toString();
}


//dateUtils

/**
 * 将指定的时间格式化为时间对象，并以对象的形式放回出来，注意：星期日为0
 * @param {String|Number|Date|any} time time需要转换为对象的时间，支持时间日期字符串或时间戳
 * @param {Boolean} fill0 是否需要补0  false 不补0 true 补0
 * @returns {Object} 返回值类型一个包含日期时间星期的对象
 */
dateUtils.formatTimeStrOrTimeStampToObject = function (time, fill0) {
	if (!fill0) fill0 = false
	time = time.replaceAll("-","/")
	var _timeStamp = new Date(time)
	var _timeStampObj = {
		"WEEK_MAP": ["日", "一", "二", "三", "四", "五", "六"],
		"QUARTER_MAP": ["一", "二", "三", "四"],
		"year": _timeStamp.getFullYear(),
		"month": _timeStamp.getMonth() + 1,
		"week": _timeStamp.getDay(),
		"day": _timeStamp.getDate(),
		"hour": _timeStamp.getHours(),
		"minutes": _timeStamp.getMinutes(),
		"seconds": _timeStamp.getSeconds(),
		"milliSeconds": _timeStamp.getMilliseconds(),
		"quarter": Math.floor((_timeStamp.getMonth() + 3) / 3) - 1
	}
	if (fill0) {
		_timeStampObj.month = commonUtils.fillWith0(_timeStampObj.month)
		_timeStampObj.day = commonUtils.fillWith0(_timeStampObj.day)
		_timeStampObj.hour = commonUtils.fillWith0(_timeStampObj.hour)
		_timeStampObj.minutes = commonUtils.fillWith0(_timeStampObj.minutes)
		_timeStampObj.seconds = commonUtils.fillWith0(_timeStampObj.seconds)
	}

	return _timeStampObj
}

/**
 * 倒计时功能 可通过配置resultType 来决定返回值类型 （string返回"00:10"|object返回{minutes:00,seconds:10}） 是否补0 由fill0 决定
 * @param {Number} second 每次倒计时的秒数 必须填写
 * @param {String|Object} resultType 返回值类型  string 或者object两种类型 默认字符串
 * @param {Boolean}fill0 在小于10的时候是否补0 默认不补
 * @returns {string|{}}
 */
countDownUtils.handleCountDown = function (second, resultType, fill0) {
	var _timerObj = {};
	if (second >= 0) {
		_timerObj.minutes = Math.floor(second / 60);
		_timerObj.seconds = Math.floor(second % 60);
	}
	if (fill0) {
		_timerObj.minutes = commonUtils.fillWith0(_timerObj.minutes)
		_timerObj.seconds = commonUtils.fillWith0(_timerObj.seconds)
	}
	if (resultType === "object") {
		return _timerObj;
	}
	return _timerObj.minutes + ":" + _timerObj.seconds;
}

/**
 *
 * 选择的时间是否在指定的范围内,可以指定开始时间 结束时间,最小需要多少时间,最大需要多少时间 返回各式,（例如判断用户选择的两个时间，是否大于1天并且小于14天）
 * {
 *     message：“返回的信息”，
 *     type：返回类型（0：开始时间大于结束时间，1：返回时间大于开始时间，并且小于结束时间，2：返回时间要在时间段内，3：符合所有条件）
 *     day ：返回的天数 （在type属于3 的时候这里才有大于等于0的值）
 * }
 * @param {String|Number|Date|any}beginTime 开始时间
 * @param {String|Number|Date|any} endTime 结束时间
 * @param {Number} minNum 时间范围最小不能小于天数
 * @param {Number} maxNum 时间方位最大不能大于天数
 * @returns {Object}
 */
dateUtils.selectDateRange = function (beginTime, endTime, minNum, maxNum) {
	if (!minNum) minNum = 0
	if (!maxNum) maxNum = 0
	beginTime = beginTime.replaceAll("-","/")
	endTime = endTime.replaceAll("-","/")
	var dateSpan, calcData;
	var begin = new Date(beginTime).getTime();
	var end = new Date(endTime).getTime();
	if (end - begin < 0) {
		return {
			message: "开始时间大于结束时间",
			type: 0,
			day: -1
		};
	}
	// 判断选择的时间是否大于十四天
	dateSpan = end - begin;
	dateSpan = Math.abs(dateSpan);
	calcData = Math.floor(dateSpan / (24 * 3600 * 1000));

	if (calcData < minNum) {
		return {
			message: "选择时间需" + minNum + "-" + maxNum + "天",
			type: 1,
			day: -1
		};
	}

	if (calcData > maxNum) {
		return {
			message: "选择的时间大于" + maxNum + "天",
			type: 2,
			day: -1
		};
	}
	return {
		message: "相差" + calcData + "天",
		type: 3,
		day: calcData
	}
}

/**
 * 根据传入的时间戳，计算往前或者往后几天的日期是多少  支持正负数 正数表示往后几天 负数表示往前几天
 * @param timeStamp 时间戳或者时间字符串
 * @param postponeTime 往前或者往后几天
 * @param fill0 在小于10 的时候是否补零
 * @returns {{}} 返回一个时间对象
 */
dateUtils.timeCalculation = function (timeStamp, postponeTime, fill0) {
	if (!postponeTime) postponeTime = 0
	timeStamp = timeStamp.replaceAll("-","/")
	if (!fill0) fill0 = true
	var date = new Date(timeStamp).getTime();
	var _afterDate = date + (1000 * 60 * 60 * 24 * postponeTime)
	return dateUtils.formatTimeStrOrTimeStampToObject(_afterDate, fill0)
}

/**
 * 获取当前时间对象  或者按照当前传入的格式化字符串格式化时间
 * @param {string}formatStr
 * @returns {String|Object} 返回当前时间对象 或者按照当前传入的格式化字符串格式化时间
 */
dateUtils.getCurrentDate = function (formatStr) {
	if (!formatStr) {
		formatStr = "yyyy-MM-dd hh:mm:ss"
	}
	return dateUtils.dateFormat(dateUtils.getTimeStamp(), formatStr)
}

/**
 * 将日期时间按照指定的字符串进行格式化() 如 传入 yyyy-MM-dd hh:mm:ss 将会返回 2022-02-11 12:24:48，字符含义：
 * yyyy 年，
 * MM 月，
 * dd 日，
 * hh 时（24小时制），
 * mm 分，
 * ss 秒，
 * S 毫秒，
 * week 周，
 * quarter 季度
 * 完整字符串如： yyyy-MM-dd hh:mm:ss:S 星期week 第quarter季度 返回的字符串：2022-02-11 21:06:37:785 星期五 第一季度
 * @param timeStamp 需要被格式化的时间
 * @param formatStr 指定格式化的字符串 如：yyyy-MM-dd hh:mm:ss
 * @returns {string} 格式化后的字符串
 */
dateUtils.dateFormat = function (timeStamp, formatStr) {
	var item
	timeStamp =timeStamp.replaceAll("-","/")
	var DATE_KEY_MAP = [
		{
			reg: /yyyy/,
			date: "year"
		},
		{
			reg: /MM/,
			date: "month"
		},
		{
			reg: /dd/,
			date: "day"
		},
		{
			reg: /hh/,
			date: "hour"
		},
		{
			reg: /mm/,
			date: "minutes"
		},
		{
			reg: /ss/,
			date: "seconds"
		},
		{
			reg: /S/,
			date: "milliSeconds"
		}
	]
	var _date = dateUtils.formatTimeStrOrTimeStampToObject(timeStamp, true)

	if (!formatStr) {
		formatStr = "yyyy-MM-dd hh:mm:ss"
	}

	for (var i = 0; i < DATE_KEY_MAP.length; i++) {
		item = DATE_KEY_MAP[i]
		formatStr = formatStr.replace(item.reg, _date[item.date] + '')
	}

	formatStr = formatStr.replace(/week/g, _date.WEEK_MAP[_date.week] + "")
	formatStr = formatStr.replace(/quarter/g, _date.QUARTER_MAP[_date.quarter] + "")

	return formatStr
}

/**
 * 获取当前时间戳
 * @returns {number} 时间戳
 */
dateUtils.getCurrentTimeStamp = function () {
	return new Date().getTime()
}

/**
 * 获取从指定月份开始的指定区间的月份集合,如开始时间为本月
 * @param {string|DateConstructor} startMonth 开始的年月日时间戳或者字符串
 * @param {Number} length 区间长度,需要往前几个月就写多少的长度,如往前四个月则写4
 * @param {Boolean} containsCurrentMonth 是否包含当前月的数据
 * @param {String} formatStr 存储时候按照指定格式进行字符串格式化
 * @returns {*[]}
 */
dateUtils.getMonthList = function (startMonth, length, containsCurrentMonth, formatStr) {
	var _dateList = []
	var _dateTimeObj = dateUtils.formatTimeStrOrTimeStampToObject(new Date(startMonth), true)
	formatStr = formatStr ? formatStr : "yyyy年MM月"
	if (!containsCurrentMonth) {
		_dateTimeObj = getLastMonth(_dateTimeObj)
	}
	for (var i = 0; i < length; i++) {
		var str = _dateTimeObj.year + "-" + _dateTimeObj.month + "-" + _dateTimeObj.day + " " + _dateTimeObj.hour + ":" + _dateTimeObj.minutes + ":" + _dateTimeObj.seconds
		_dateList[_dateList.length] = dateUtils.dateFormat(str, formatStr)
		_dateTimeObj = getLastMonth(_dateTimeObj)
	}
	return _dateList
}

/**
 * 获取指定月份的最后一天
 * @param dateTime 需要获取的年月日,支持字符串时间,时间戳等标准时间,如果只传入年月日则返回的时分秒为08:00:00
 * @param formatStr 指定格式化的字符串 可以为空(默认将会以:yyyy-MM-dd hh:mm:ss进行格式化)
 * @returns {string|*} 格式化之后的字符串
 */
dateUtils.getMonthLastDay = function (dateTime, formatStr) {
	dateTime =dateTime.replaceAll("-","/")
	var _dateTimeStr
	var date
	var day
	formatStr = formatStr ? formatStr : "yyyy-MM-dd hh:mm:ss"
	_dateTimeStr = dateUtils.dateFormat(new Date(dateTime), "yyyy-MM-dd hh:mm:ss")
	date = dateUtils.formatTimeStrOrTimeStampToObject(_dateTimeStr, true)
	day = new Date(date.year, date.month, 0).getDate()
	var tempDateTimeStr = "" + date.year + "-" + date.month + "-" + day + " " + date.hour + ":" + date.minutes + ":" + date.seconds
	return dateUtils.dateFormat(new Date(tempDateTimeStr), formatStr)
}


/**
 * 获取指定月份的第一天
 * @param dateTime 时间字符串或者是时间戳,
 * @param formatStr 格式化字符串,默认为 "yyyy-MM-dd hh:mm:ss"
 * @returns {string|*} 按照指定格式返回时间字符串,如:2022-07-01 12:32:12
 */
dateUtils.getMonthFirstDay = function (dateTime, formatStr) {
	dateTime = dateTime.replaceAll("-","/")
	formatStr = formatStr ? formatStr : "yyyy-MM-dd hh:mm:ss"
	var _date = new Date(dateTime)
	var dateTimeStr
	_date.setDate(1)
	dateTimeStr = dateUtils.dateFormat(_date, formatStr)
	return dateTimeStr
}

//storageUtils

/**
 *  保存内容到 localStorage 中
 * @param storageName 本地仓库名称
 * @param storageVal 需要存储的值
 * @returns {*} 成功返回存储名称 否则返回null
 */
storageUtils.saveStorage = function (storageName, storageVal) {
	if (storageName.trim() === "") {
		throw new Error("saveStorage error：storageName does not empty")
	}
	try {
		localStorage.setItem(storageName, JSON.stringify(storageVal))
		return storageName
	} catch (e) {
		throw new Error("saveStorage error: save fail" + e)
	}

}
/**
 *  根据传入的 storageName 获取 localStorage 中的值
 * @param storageName 名称
 * @returns {any} 经过转换 的值
 */
storageUtils.getStorage = function (storageName) {
	if (storageName.trim() === "") {
		throw new Error("getStorage error:storageName does not empty")
	}
	try {
		return JSON.parse(localStorage.getItem(storageName));
	} catch (e) {
		throw new Error("getStorage error:get fail" + e)
	}
}
/**
 * 移除 localStorage 中的指定数据
 * @param storageName 需要被移除的数据的名称
 * @returns {*} 移除成功返回 名称
 */
storageUtils.removeStorage = function (storageName) {
	if (storageName.trim() === "") {
		throw new Error("removeStorage error:storageName does not empty")
	}
	try {
		localStorage.removeItem(storageName)
		return storageName
	} catch (e) {
		throw new Error("removeStorage error:remove fail" + e)
	}
}

/**
 * 保存内容到 sessionStorage 中
 * @param storageName 本地仓库名称
 * @param storageVal 需要存储的值
 * @returns {null|*} 成功返回存储名称 否则返回null
 */
storageUtils.saveSession = function (storageName, storageVal) {
	if (storageName.trim() === "") {
		throw new Error("saveSession error：storageName does not empty")
	}
	try {
		sessionStorage.setItem(storageName, JSON.stringify(storageVal))
		return storageName
	} catch (e) {
		throw new Error("saveSession error：save fail:" + e)
	}

}
/**
 *  根据传入的 storageName 获取 sessionStorage 中的值
 * @param storageName 名称
 * @returns {any} 经过转换 的值
 */
storageUtils.getSession = function (storageName) {
	if (storageName.trim() === "") {
		throw new Error("getSession error:storageName does not empty")
	}
	try {
		return JSON.parse(sessionStorage.getItem(storageName));
	} catch (e) {
		throw new Error("getSession error:get fail" + e)
	}
}
/**
 * 移除 sessionStorage 中的指定数据
 * @param storageName 需要被移除的数据的名称
 * @returns {*} 移除成功返回 名称
 */
storageUtils.removeSession = function (storageName) {
	if (storageName.trim() === "") {
		throw new Error("removeSession error:storageName does not empty")
	}
	try {
		sessionStorage.removeItem(storageName)
		return storageName
	} catch (e) {
		throw new Error("removeSession error:remove fail" + e)
	}
}

//dom 操作相关方法
/**
 * 返回页面顶部
 */
domUtils.backTop = function () {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}

/**
 * bottomVisible 检测页面是否滚动到底部，
 * @returns {boolean} 是否滚动到底部
 */
domUtils.bottomVisible = function () {
	return document.documentElement.clientHeight + window.scrollY >= (document.documentElement.scrollHeight || document.documentElement.clientHeight);
}

/**
 * 检测dom(整个页面的可见性) 的可见性
 * @returns {boolean} true 可见 false 不可见
 */
domUtils.visibility = function () {
	return document.visibilityState === "visible"
}

/**
 *没有数据的时候向页面插入没有数据标签
 * @param HTMLDOMElement 需要插入的元素（为空时传入： "" 即可）
 * @param msg 需要插入的提示信息（可以为空）
 * @returns {string} 如果没有dom元素的情况下，将返回拼接好的字符串
 */
domUtils.appendNoDataEl = function (HTMLDOMElement, msg) {
	if (!msg) {
		msg = "暂无内容"
	}
	if (!HTMLDOMElement) {
		throw new Error("添加失败，未传入HTMLDOMElement")
	}
	$(HTMLDOMElement).html('<div style="padding: 5px 20px;font-size: 16px;color: #999;text-align: center;user-select: none;	-moz-user-select: none;	-webkit-user-select: none;">' + msg + '</div>')
}

/**
 * 页面刷新时候，将对应的值保存到本地存储中，该方法只能被调用一次
 * @param key 存储时候的key
 * @param values 存储时候的values
 */
domUtils.pageRefreshEvent = function (key, values) {
	window.addEventListener('beforeunload', _saveStorage);

	function _saveStorage() {
		storageUtils.saveStorage(key, values)
	}
}