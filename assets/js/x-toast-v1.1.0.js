window.onload = function () {
	$(".success").on("click", function () {
		toast({
			duration:3000,
			type:"success",
			message:"成功提示框"
		})
	})
	$(".info").on("click", function () {
		toast({
			duration:3000,
			type:"info",
			message:"信息提示框"
		})
	})
	$(".warning").on("click", function () {
		toast({
			duration:3000,
			type:"warning",
			message:"警告提示框"
		})
	})
	$(".error").on("click", function () {
		toast({
			duration:0,
			type:"error",
			message:"error error error error error error error error error error error error error error error error error error error error "
		})
		toast({
			duration:0,
			type:"error",
			message:"测试提示框测试提示框测试提示框测试提示框测试提示框测试提示框测试提示框"
		})
	})
}