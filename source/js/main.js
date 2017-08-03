$(document).ready(function() {
    $(".navbar-toggle").on("click", function() {
        var open = $(".item-content").is(":visible")
        if (open) {
            $(".item-content").fadeOut()
        } else {
            $(".item-content").fadeIn()
        }
    })

    $('.carousel').carousel();

    $(".model-item-button button").on("click", function() {
        $(".model-item-button button").removeClass("active-btn");
        $(this).addClass("active-btn");
        var id = $(this).attr("id");
        var src = $(".model-item-img img");
        console.log(id, src);
        switch (id) {
            case "m":
                src.attr("src", "images/catalog/M.jpg");
                src.width(70+"%")
                break;
            case "l":
                src.attr("src", "images/catalog/L.jpg");
                src.width(80+"%")
                break;
            case "xl":
                src.attr("src", "images/catalog/XL.jpg");
                src.width(90+"%")
                break;
            case "xxl":
                src.attr("src", "images/catalog/XXL.jpg");
                src.width(100+"%")
                break;

        }
    })
});