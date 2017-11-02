//Canvas size
function setCanvasSize() {
    // $('html, body').css({
    //     height: $(window).height(),
    //     width: $(window).width()
    // })
    $('#canvas-container').css({
        // height: $(window).height() - $('#top-bar').height(),
        // width: $(window).width() - $('#side-bar').width(),
        // marginLeft: $('#side-bar').width(),
        // marginTop: $('#top-bar').height()
        // height: window.innerHeight - $('#top-bar').height(),
        // width: window.innerWidth - $('#side-bar').width(),
        // marginLeft: "60px",
        // marginTop: "60px",
        height: window.innerHeight ,
        width: window.innerWidth ,
    });

    let canvases = $('.canvas');

    $('.canvas').each(function () {
        let w = $('#canvas-container').width();
        let h = $('#canvas-container').height();
        $(this).attr("width", w);
        $(this).attr("height", h);
    });
};
setCanvasSize();