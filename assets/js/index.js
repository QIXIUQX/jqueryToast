window.onload = function () {
	$(".success").on("click", function () {
		toast({
			duration:10000,
			type:"success",
			message:"successsuccesssuccesssuccesssuccesssuccesssuccesssuccesssuccesssuccesssuccesssuccesssuccess"
		})
	})
	$(".info").on("click", function () {
		toast({
			duration:10000,
			type:"info",
			message:"infoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfo"
		})
	})
	$(".warning").on("click", function () {
		toast({
			duration:10000,
			type:"warning",
			message:"warningwarningwarningwarningwarningwarningwarningwarningwarningwarningwarning"
		})
	})
	$(".error").on("click", function () {
		toast({
			duration:0,
			type:"error",
			message:"errorerrorerrorerrorerrorerrorerrorerrorerrorerrorerrorerrorerrorerrorerrorerror"
		})
	})
}