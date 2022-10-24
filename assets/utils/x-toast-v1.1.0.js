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
		var toastIcon = ""
		switch (opts.type) {
			case "success":
				toastIcon =
						'		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">' +
						'			<defs>' +
						'				<style>.success-1{fill:#66c23a;}.success-2{fill:#fff;}</style>' +
						'			</defs>' +
						'			<g id="success_2" data-name="success 2">' +
						'				<g id="success_1-2" data-name="success 1">' +
						'					<circle id="oval_51" data-name="oval 51" class="success-1" cx="6" cy="6" r="6"/>' +
						'					<g id="path_269" data-name="path 269">' +
						'						<path class="success-2"' +
						'						      d="M5.27,8.58a.47.47,0,0,1-.35-.15L2.64,6.16a.5.5,0,0,1,0-.7.5.5,0,0,1,.71,0L5.27,7.37,8.65,4a.49.49,0,1,1,.7.7L5.62,8.43A.47.47,0,0,1,5.27,8.58Z"/>' +
						'					</g>' +
						'				</g>' +
						'			</g>' +
						'		</svg>'
				break;
			case "info":
				toastIcon =
						'	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">' +
						'		<defs>' +
						'			<style>.info-1{fill:#909399;}.info-2{isolation:isolate;}.info-3{fill:#fff;}</style>' +
						'		</defs>' +
						'		<g id="info_2" data-name="info 2">' +
						'			<g id="info_1-2" data-name="info 1">' +
						'				<circle id="oval_52" data-name="oval 52" class="info-1" cx="6" cy="6" r="6"/>' +
						'				<g id="_2" data-name=" 2" class="info-2">' +
						'					<g class="info-2">' +
						'						<path class="info-3"' +
						'						      d="M6.67,3.38A.68.68,0,0,1,6,4.09a.69.69,0,0,1-.68-.71A.67.67,0,0,1,6,2.68.66.66,0,0,1,6.67,3.38ZM6.48,8.29l0,1h-1l0-1,.14-3.46h.67Z"/>' +
						'					</g>' +
						'				</g>' +
						'			</g>' +
						'		</g>' +
						'	</svg>'
				break;
			case "warning":
				toastIcon =
						'	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">' +
						'		<defs>' +
						'			<style>.warning-1{fill:#e6a23c;}.warning-2{isolation:isolate;}.warning-3{fill:#fff;}</style>' +
						'		</defs>' +
						'		<g id="warning_2" data-name="warning 2">' +
						'			<g id="warning_1-2" data-name="warning 1">' +
						'				<circle id="oval_49" data-name="oval 49" class="warning-1" cx="6" cy="6" r="6"/>' +
						'				<g id="_" data-name=" " class="warning-2">' +
						'					<g class="warning-2">' +
						'					<path class="warning-3"' +
						'						      d="M5.33,8.62A.68.68,0,0,1,6,7.91a.69.69,0,0,1,.68.71.67.67,0,0,1-.68.7A.66.66,0,0,1,5.33,8.62Zm.19-4.91,0-1h1l0,1L6.33,7.17H5.66Z"/>' +
						'					</g>' +
						'				</g>' +
						'			</g>' +
						'		</g>' +
						'	</svg>'
				break;
			case "error":
				toastIcon =
						'	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">' +
						'		<defs>' +
						'			<style>.error-1{fill:#f56c6c;}.error-2{fill:#fff;}</style>' +
						'		</defs>' +
						'		<g id="error_2" data-name="error 2">' +
						'			<g id="error_1-2" data-name="error 1">' +
						'				<circle id="oval_50" data-name="oval 50" class="error-1" cx="6" cy="6" r="6"/>' +
						'			<path class="error-2"' +
						'				      d="M6.71,6.14,8.52,4.32a.5.5,0,0,0,0-.7.5.5,0,0,0-.71,0L6,5.43,4.19,3.62a.5.5,0,0,0-.71,0,.48.48,0,0,0,0,.7L5.29,6.14,3.48,8a.5.5,0,0,0,0,.71.52.52,0,0,0,.35.14.54.54,0,0,0,.36-.14L6,6.84,7.81,8.66a.52.52,0,0,0,.71,0,.51.51,0,0,0,0-.71Z"/>' +
						'			</g>' +
						'		</g>' +
						'	</svg>'
				break;
		}

		// var toastEl = $('<div class="x-toast-item x-toast-item-' + opts.type + '" style="display: none">	<i class="x-toast-icon x-toast-icon-' + opts.type + '"></i><p class="x-toast-content x-toast-content-' + opts.type + '">' + opts.message + '</p></div>')
		if (opts.duration === 0) {
			var toastEl = $('<div class="x-toast-item x-toast-item-' + opts.type + '" style="display:none"><div class="x-toast-body"><i class="x-toast-icon x-toast-icon-' + opts.type + '">' + toastIcon + '</i><p class="x-toast-content x-toast-content-' + opts.type + '">' + opts.message + '</p><i class="x-toast-icon x-toast-close"><svg viewBox="0 0 24 24" width="24" height="24" stroke="#c0c4cc" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></i></div></div>')
		} else {
			var toastEl = $('<div class="x-toast-item x-toast-item-' + opts.type + '" style="display: none"><div class="x-toast-body"><i class="x-toast-icon x-toast-icon-' + opts.type + '">' + toastIcon + '</i><p class="x-toast-content x-toast-content-' + opts.type + '">' + opts.message + '</p><i class="x-toast-icon x-toast-close"></i></div></div>')
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
				toastEl.animate({
					height: 0
				}, 120, "linear", function () {
					toastEl.remove()
				})
			}, opts.duration)
		}

		/**
		 * 处理toast 被点击时候的事件 如果toast 始终显示的时候  点击toast 则关闭toast
		 */
		function handleToastItemClick() {
			$(".x-toast-wrap").off().on("click", ".x-toast-close", function () {
				if (opts.duration === 0 && $(this).parents(".x-toast-item").data("toastDuration").duration === 0) {
					var element = $(this).parents(".x-toast-item")
					element.animate({
						height: 0
					}, 120, "linear", function () {
						element.remove()
					})
				}
			})
		}
	}
})(document, window);