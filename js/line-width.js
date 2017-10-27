$("#line-width").bind('input',function(e){
    let width = $("#line-width").val()
    currentFunction.lineWidth = String(width);
});
