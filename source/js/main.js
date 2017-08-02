$(document).ready(function() {
	$('.carousel').carousel();

	$(".model-item-button button").on("click", function() {
		$(".model-item-button button").removeClass("active-btn");
		$(this).addClass("active-btn");
		var id=$(this).attr("id");
		var src=$(".model-item-img img");
		console.log(id, src);
		switch(id) {
		 	case "m":
				src.attr("src", "images/catalog/M.jpg");
				break;
			case "l":
				src.attr("src", "images/catalog/L.jpg");
				break;
			case "xl":
				src.attr("src", "images/catalog/XL.jpg");
				break;
			case "xxl":
				src.attr("src", "images/catalog/XXL.jpg");
				break;

		}
	})
});