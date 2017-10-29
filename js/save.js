function copyCanvas(canvasId) {
    //create a dummy CANVAS
    let srcCanvas = document.getElementById(canvasId)
    let canvasCopy = document.createElement("canvas");
    canvasCopy.width = srcCanvas.width;
    canvasCopy.height = srcCanvas.height;
    destCtx = canvasCopy.getContext('2d');
    //create a rectangle with the desired color
    destCtx.fillStyle = $("#"+canvasId).css("background-color")
    destCtx.fillRect(0, 0, srcCanvas.width, srcCanvas.height);
    //draw the original canvas onto the destination canvas
    destCtx.drawImage(srcCanvas, 0, 0);
    return canvasCopy
}

//Not Working
$("#download-link").click(function(e){
    e.preventDefault();
    var canvasCopy = copyCanvas("canvas-real")
    var link = document.querySelector("#download-link")
    link.href = canvasCopy.toDataURL();
    link.download = "someImg.png"
    return false
})


