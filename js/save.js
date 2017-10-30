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

function downloadCanvas(link,canvasId,filename){
    link.href = copyCanvas(canvasId).toDataURL();
    link.download = filename;
}


// $(document).on( 'click', "#download-link", function(e) {
    // e.preventDefault();
    // downloadCanvas(this, 'canvas-real', 'test.png');
// })

// document.getElementById('download-link').addEventListener('click', function() {
//     downloadCanvas(this, 'canvas-real', 'test.png');
// }, false);


$("#download-link").click(function(e){
    // e.preventDefault();
    downloadCanvas(this, 'canvas-real', 'test.png');
})
