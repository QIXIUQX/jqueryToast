;(function (document, window) {
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

		// var toastEl = $('<div class="x-toast-item x-toast-item-' + opts.type + '" style="display: none">	<i class="x-toast-icon x-toast-icon-' + opts.type + '"></i><p class="x-toast-content x-toast-content-' + opts.type + '">' + opts.message + '</p></div>')
		if(opts.duration === 0 ){
			var toastEl = $('<div class="x-toast-item x-toast-item-' + opts.type + '" style=""><i class="x-toast-icon x-toast-icon-' + opts.type + '"></i><p class="x-toast-content x-toast-content-' + opts.type + '">' + opts.message + '</p><i class="x-toast-icon x-toast-close"><svg viewBox="0 0 24 24" width="24" height="24" stroke="#c0c4cc" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></i></div>')
		}else{
			var toastEl = $('<div class="x-toast-item x-toast-item-' + opts.type + '" style=""><i class="x-toast-icon x-toast-icon-' + opts.type + '"></i><p class="x-toast-content x-toast-content-' + opts.type + '">' + opts.message + '</p><i class="x-toast-icon x-toast-close"></i></div>')
		}
		$(".x-toast-wrap").append(toastEl)
		toastEl.fadeIn(120)
		toastEl.data("toastDuration", {
			duration: opts.duration
		})

		if (opts.duration === 0) {
			handleToastItemClick()
		} else {
			toastOpts.timer = setTimeout(function () {
				toastEl.fadeOut(120, "", function () {
					toastEl.remove()
				})
			}, opts.duration)
		}

		/**
		 * 处理toast 被点击时候的事件 如果toast 始终显示的时候  点击toast 则关闭toast
		 */
		function handleToastItemClick() {
			$(".x-toast-wrap").off().on("click", ".x-toast-close", function () {
				console.log($(this).parents(".x-toast-item").data());
				if (opts.duration === 0 && $(this).parents(".x-toast-item").data("toastDuration").duration === 0) {
					$(this).fadeOut(120, "", function () {
						$(this).parents(".x-toast-item").remove()
					})
				}
			})
		}


	}
})(document, window);