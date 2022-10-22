(function (document, window) {
	window.toastOpts = {
		timer: null
	}
	/**
	 *
	 * @param options {String|Object} 配置对象，该对象支持以下参数：
	 * {
	 *     message：{String}消息内容
	 *     duration：{Number}延迟
	 *     type：{String}弹窗类型,success,info,warning,error
	 * }
	 */
	window.toast = function (options) {
		var opts = {
			message: "",
			duration: 2000,
			type: "info"
		}

		if (typeof options === "string") {
			opts.message = options
		}
		Object.assign(opts, options)

		// 处理提示框的父盒子
		if ($(".x-toast-wrap").length === 0) {
			$('body').append('<div class="x-toast-wrap"></div>')
		}

		var toastEl = $('<div class="x-toast-item x-toast-item-'+opts.type+'" style="display: none">	<i class="x-toast-icon x-toast-icon-'+opts.type+'"></i><p class="x-toast-content x-toast-content-'+opts.type+'">' + opts.message + '</p></div>')
		$(".x-toast-wrap").append(toastEl)
		toastEl.fadeIn(120)

		toastOpts.timer = setTimeout(function () {
			toastEl.fadeOut(120, "", function () {
				toastEl.remove()
			})
		}, opts.duration)


	}
})(document, window);