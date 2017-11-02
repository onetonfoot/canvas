function copyCanvas(canvasId) {
    //create a dummy CANVAS
    let orginalCanvas = document.getElementById(canvasId)
    let canvasCopy = document.createElement("canvas");
    canvasCopy.width = orginalCanvas.width;
    canvasCopy.height = orginalCanvas.height;
    canvasCopyContext = canvasCopy.getContext('2d');
    //create a rectangle with the desired color
    canvasCopyContext.fillStyle = $("#"+canvasId).css("background-color")
    canvasCopyContext.fillRect(0, 0, orginalCanvas.width, orginalCanvas.height);
    //draw the original canvas onto the destination canvas
    canvasCopyContext.drawImage(orginalCanvas, 0, 0);
    return canvasCopy
}

function downloadCanvas(link,canvasId,filename){
    link.href = copyCanvas(canvasId).toDataURL();
    link.download = filename;
}

$("body").on("click","#download",function(e){
    downloadCanvas(this, 'canvas-real', 'test.png');
    console.log(e)
})
