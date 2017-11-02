let canvasReal = document.getElementById('canvas-real');
let contextReal = canvasReal.getContext('2d');
let canvasDraft = document.getElementById('canvas-draft');
let contextDraft = canvasDraft.getContext('2d');
let currentFunction;
let dragging = false;

let undoData = []; //for storing the history data
let redoData = []; //for the redo data 
undoData[0] = contextReal.createImageData(canvasReal.width, canvasReal.height);







function desktopMode() {

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
        currentFunction.onMouseMove([mouseX, mouseY], e, this);
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

}

function mobileMode() {
    var hammertime = new Hammer(canvasDraft);
    hammertime.on('drag swipe tap press pan panup pandown', function (ev) {
        //console.log(ev.type);
    });
    /*
        hammertime.on('tap',function(ev){
            let mouseX = ev.center.x - canvasDraft.offsetLeft;
            let mouseY = ev.center.y - canvasDraft.offsetTop;
            currentFunction.onMouseDown([mouseX,mouseY],ev);
            //console.log(mouseX+":"+mouseY + ":"+ev.center.x + ","+ev.center.y);
        })*/
    hammertime.on('panstart', function (ev) {
        let mouseX = ev.center.x - canvasDraft.offsetLeft;
        let mouseY = ev.center.y - canvasDraft.offsetTop;
        currentFunction.onMouseDown([mouseX, mouseY], ev);
        dragging = true;
        //console.log(mouseX+":"+mouseY + ":"+ev.center.x + ","+ev.center.y);
    })
    hammertime.on('panmove', function (ev) {
        let mouseX = ev.center.x - canvasDraft.offsetLeft;
        let mouseY = ev.center.y - canvasDraft.offsetTop;
        currentFunction.onDragging([mouseX, mouseY], ev);
        // currentFunction.onMouseMove([mouseX,mouseY],ev);
        // console.log("panmove");
    });
    hammertime.on('panend', function (ev) {
        let mouseX = ev.center.x - canvasDraft.offsetLeft;
        let mouseY = ev.center.y - canvasDraft.offsetTop;
        currentFunction.onMouseUp([mouseX, mouseY], ev);
        // console.log("panend");
    });
}



$(document).ready(function () {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || $(window).width() < 768) {
        mobileMode();
    } else if ($(window).width() > 767) {
        desktopMode();
    }
});




class PaintFunction {
    constructor() {
        this.fillColor = $("#fillcolor").spectrum("get");
        this.strokeColor = $("#strokecolor").spectrum("get");
        this.lineCap = $("#line-cap").text().trim().toLowerCase()
        this.lineJoin = $("#line-join").text().trim().toLowerCase()
    }

    get lineWidth() {
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