(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(100).fadeOut("slow");
        checkSession();

    });

    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    loadHeader();


})(jQuery);

function loadHeader(){
    $.ajax({
        type: "GET",
        url: "/buy/header/",
        dataType: "html",
        success: function(data, textStatus) {
            $("#common-header").html(data);
        },
        error: function() {
            console.log('Problem in Header');
        }
    });
}

