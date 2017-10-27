let canvasReal = document.getElementById('canvas-real');
let contextReal = canvasReal.getContext('2d');
let canvasDraft = document.getElementById('canvas-draft');
let contextDraft = canvasDraft.getContext('2d');
let currentFunction;
let dragging = false;




$('#canvas-draft').mousedown(function (e) {
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;
    currentFunction.onMouseDown([mouseX, mouseY], e);
    dragging = true;
});
$('#canvas-draft').mousemove(function (e) {
    if (dragging) {
        let mouseX = e.pageX - this.offsetLeft;
        let mouseY = e.pageY - this.offsetTop;
        currentFunction.onDragging([mouseX, mouseY], e);
    }
    currentFunction.onMouseMove(e, this);
});
$('#canvas-draft').mouseup(function (e) {
    dragging = false;
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;
    currentFunction.onMouseUp([mouseX, mouseY], e);
});
$('#canvas-draft').mouseleave(function (e) {
    dragging = false;
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;
    currentFunction.onMouseLeave([mouseX, mouseY], e);
});

$('#canvas-draft').mouseenter(function (e) {
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;
    currentFunction.onMouseEnter([mouseX, mouseY], e);
});



class PaintFunction {
    constructor() {
        this.fillColor = "green"
        this.strokeColor = "black"
        this.lineCap = "butt"
        this.lineWidth = "5"
    }

    setContext(context) {
        context.lineCap = this.lineCap
        context.lineWidth = this.lineWidth;
        context.strokeStyle = this.strokeColor
        context.stroke();
        context.fillStyle = this.fillColor;
        context.fill();
    }

    onMouseDown() {}
    onDragging() {}
    onMouseMove() {}
    onMouseUp() {}
    onMouseLeave() {}
    onMouseEnter() {}
}