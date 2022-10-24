window.onload = function () {
	$(".success").on("click", function () {
		toast({
			duration:3000,
			type:"success",
			message:"成功提示框",
			onClose:function () {
				console.log("成功提示框 关闭窗口回调,在调用者中打印")
			}
		})
	})
	$(".info").on("click", function () {
		toast({
			duration:3000,
			type:"info",
			message:"信息提示框",
			onClose:function () {
				console.log("信息提示框 关闭窗口回调,在调用者中打印")
			}
		})
	})
	$(".warning").on("click", function () {
		toast({
			duration:3000,
			type:"warning",
			message:"警告提示框",
			onClose:function () {
				console.log("警告提示框 关闭窗口回调,在调用者中打印")
			}
		})
	})
	$(".error").on("click", function () {
		toast({
			duration:0,
			type:"error",
			message: "error error error error error error error error error error error error error error error error error error error error ",
			onClose:function () {
				console.log("error提示框 关闭窗口回调,在调用者中打印")
			}
		})
		toast({
			duration:1000,
			type:"error",
			onClose:function () {
				console.log("测试提示框 关闭窗口回调,在调用者中打印")
			},
			message:"测试提示框测试提示框测试提示框测试提示框测试提示框测试提示框测试提示框"
		})
	})
}