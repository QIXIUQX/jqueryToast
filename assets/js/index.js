window.onload = function () {
	$(".success").on("click", function () {
		toast({
			duration:1000,
			type:"success",
			message:"successsuccesssuccesssuccesssuccesssuccesssuccesssuccesssuccesssuccesssuccesssuccesssuccess"
		})
	})
	$(".info").on("click", function () {
		toast({
			duration:2000,
			type:"info",
			message:"infoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfo"
		})
	})
	$(".warning").on("click", function () {
		toast({
			duration:2000,
			type:"warning",
			message:"warningwarningwarningwarningwarningwarningwarningwarningwarningwarningwarning"
		})
	})
	$(".error").on("click", function () {
		toast({
			duration:2000,
			type:"error",
			message:"errorerrorerrorerrorerrorerrorerrorerrorerrorerrorerrorerrorerrorerrorerrorerror"
		})
	})
}