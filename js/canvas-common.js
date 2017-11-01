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
$('#canvas-draft').dblclick(function (e) {
    dragging = false;
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;
    currentFunction.onDblClick([mouseX, mouseY], e);
});
$('#canvas-draft').mousemove(function (e) {
    if (dragging) {
        let mouseX = e.pageX - this.offsetLeft;
        let mouseY = e.pageY - this.offsetTop;
        currentFunction.onDragging([mouseX, mouseY], e);
    }
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;
    currentFunction.onMouseMove([mouseX, mouseY],e, this);
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

class PaintFunction{
    constructor(){
    this.fillColor = $("#fillcolor").spectrum("get");
    this.strokeColor = $("#strokecolor").spectrum("get");
    this.lineCap = $("#line-cap").text().trim().toLowerCase()
    this.lineJoin = $("#line-join").text().trim().toLowerCase()
    }

    get lineWidth(){
        return document.querySelector("#line-width").value
    }

    setContext(context) {
        context.lineJoin = this.lineJoin
        context.lineCap = this.lineCap
        context.lineWidth = this.lineWidth
        context.strokeStyle = this.strokeColor
        context.fillStyle = this.fillColor
    }

    storeUndo() {
        undoData.push(contextReal.getImageData(0, 0, canvasReal.width, canvasReal.height));
        if (redoData.length > 0) {
            redoData = [];
        }
    }

    onMouseDown() {}
    onDragging() {}
    onMouseMove() {}
    onMouseUp() {}
    onMouseLeave() {}
    onMouseEnter() {}
    onDblClick() {}
}
