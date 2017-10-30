class Curve extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.dPoint = {}
        this.drag
        this.point = {
            p1: {
                x: 100,
                y: 250
            },
            p2: {
                x: 400,
                y: 250
            },
            cp1: {
                x: 250,
                y: 100
            }
        }
        this.style = {
            curve: {
                width: this.lineWidth,
                color: this.strokeColor
            },
            cpline: {
                width: 1,
                color: "#C00"
            },
            point: {
                radius: 10,
                width: 2,
                color: "#900",
                fill: "rgba(200,200,200,0.5)",
                arc1: 0,
                arc2: 2 * Math.PI
            }
        }
    }

    onMouseDown(coord, event) {
        let e = {};
        e.x =  coord[0];
        e.y = coord[1]
		var dx, dy;
		for (var p in this.point) {
			dx = this.point[p].x - e.x;
			dy = this.point[p].y - e.y;
			if ((dx * dx) + (dy * dy) < this.style.point.radius * this.style.point.radius) {
				this.drag = p;
				this.dPoint = e;
				return;
			}
		}
    }
    onDragging(coord, event) {
        let e = {};
        e.x =  coord[0];
        e.y = coord[1]
        this.point[this.drag].x += e.x - this.dPoint.x;
        this.point[this.drag].y += e.y - this.dPoint.y;
        this.dPoint = e;
        this.draw(contextDraft);

    }

    onMouseUp(coord, event) {
		this.draw(contextDraft);
    }

    drawCurve(context) {}

    onDblClick() { 
        contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.drawReal();

    }

    drawReal(){
        contextReal.lineWidth = this.style.curve.width;
        contextReal.strokeStyle = this.style.curve.color;
        contextReal.beginPath();
        contextReal.moveTo(this.point.p1.x, this.point.p1.y);
        contextReal.quadraticCurveTo(this.point.cp1.x, this.point.cp1.y, this.point.p2.x, this.point.p2.y);
        contextReal.stroke();
    }

    draw(ctx) {

        ctx.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        // control lines
        ctx.lineWidth = this.style.cpline.width;
        ctx.strokeStyle = this.style.cpline.color;
        ctx.beginPath();
        ctx.moveTo(this.point.p1.x, this.point.p1.y);
        ctx.lineTo(this.point.cp1.x, this.point.cp1.y);
        ctx.lineTo(this.point.p2.x, this.point.p2.y);
        ctx.stroke();
        // curve
        ctx.lineWidth = this.style.curve.width;
        ctx.strokeStyle = this.style.curve.color;
        ctx.beginPath();
        ctx.moveTo(this.point.p1.x, this.point.p1.y);
        ctx.quadraticCurveTo(this.point.cp1.x, this.point.cp1.y, this.point.p2.x, this.point.p2.y);
        ctx.stroke();
        // control points
        for (var p in this.point) {
            ctx.lineWidth = this.style.point.width;
            ctx.strokeStyle = this.style.point.color;
            ctx.fillStyle = this.style.point.fill;
            ctx.beginPath();
            ctx.arc(this.point[p].x, this.point[p].y, this.style.point.radius, this.style.point.arc1, this.style.point.arc2, true);
            ctx.fill();
            ctx.stroke();
        }
    }

    onMouseMove() {}
    onMouseLeave() {}
    onMouseEnter() {}

}


// http://blogs.sitepointstatic.com/examples/tech/canvas-curves/bezier-curve.html
// (function() {

// 	var canvas, ctx, code, point, style, drag = null, dPoint;

// 	// define initial points
// 	function Init(quadratic) {

// 		point = {
// 			p1: { x:100, y:250 },
// 			p2: { x:400, y:250 }
// 		};

// 		if (quadratic) {
// 			point.cp1 = { x: 250, y: 100 };
// 		}
// 		else {
// 			point.cp1 = { x: 150, y: 100 };
// 			point.cp2 = { x: 350, y: 100 };
// 		}

// 		// default styles
// 		style = {
// 			curve:	{ width: 6, color: "#333" },
// 			cpline:	{ width: 1, color: "#C00" },
// 			point: { radius: 10, width: 2, color: "#900", fill: "rgba(200,200,200,0.5)", arc1: 0, arc2: 2 * Math.PI }
// 		}

// 		// line style defaults
// 		ctx.lineCap = "round";
// 		ctx.lineJoin = "round";

// 		// event handlers
// 		canvas.onmousedown = DragStart;
// 		canvas.onmousemove = Dragging;
// 		canvas.onmouseup = canvas.onmouseout = DragEnd;

// 		DrawCanvas();
// 	}


// 	// draw canvas
// 	function DrawCanvas() {
// 		ctx.clearRect(0, 0, canvas.width, canvas.height);

// 		// control lines
// 		ctx.lineWidth = style.cpline.width;
// 		ctx.strokeStyle = style.cpline.color;
// 		ctx.beginPath();
// 		ctx.moveTo(point.p1.x, point.p1.y);
// 		ctx.lineTo(point.cp1.x, point.cp1.y);
// 		if (point.cp2) {
// 			ctx.moveTo(point.p2.x, point.p2.y);
// 			ctx.lineTo(point.cp2.x, point.cp2.y);
// 		}
// 		else {
// 			ctx.lineTo(point.p2.x, point.p2.y);
// 		}
// 		ctx.stroke();

// 		// curve
// 		ctx.lineWidth = style.curve.width;
// 		ctx.strokeStyle = style.curve.color;
// 		ctx.beginPath();
// 		ctx.moveTo(point.p1.x, point.p1.y);
// 		if (point.cp2) {
// 			ctx.bezierCurveTo(point.cp1.x, point.cp1.y, point.cp2.x, point.cp2.y, point.p2.x, point.p2.y);
// 		}
// 		else {
// 			ctx.quadraticCurveTo(point.cp1.x, point.cp1.y, point.p2.x, point.p2.y);
// 		}
// 		ctx.stroke();

// 		// control points
// 		for (var p in point) {
// 			ctx.lineWidth = style.point.width;
// 			ctx.strokeStyle = style.point.color;
// 			ctx.fillStyle = style.point.fill;
// 			ctx.beginPath();
// 			ctx.arc(point[p].x, point[p].y, style.point.radius, style.point.arc1, style.point.arc2, true);
// 			ctx.fill();
// 			ctx.stroke();
// 		}

// 		ShowCode();
// 	}


// 	// show canvas code
// 	function ShowCode() {
// 		if (code) {
// 			code.firstChild.nodeValue = 
// 				"canvas = document.getElementById(\"canvas\");\n"+
// 				"ctx = canvas.getContext(\"2d\")\n"+
// 				"ctx.lineWidth = " + style.curve.width +
// 				";\nctx.strokeStyle = \"" + style.curve.color +
// 				"\";\nctx.beginPath();\n" +
// 				"ctx.moveTo(" + point.p1.x + ", " + point.p1.y +");\n" +
// 				(point.cp2 ? 
// 					"ctx.bezierCurveTo("+point.cp1.x+", "+point.cp1.y+", "+point.cp2.x+", "+point.cp2.y+", "+point.p2.x+", "+point.p2.y+");" :
// 					"ctx.quadraticCurveTo("+point.cp1.x+", "+point.cp1.y+", "+point.p2.x+", "+point.p2.y+");"
// 				) +
// 				"\nctx.stroke();"
// 			;
// 		}
// 	}


// 	// start dragging
// 	function DragStart(e) {
// 		e = MousePos(e);
// 		var dx, dy;
// 		for (var p in point) {
// 			dx = point[p].x - e.x;
// 			dy = point[p].y - e.y;
// 			if ((dx * dx) + (dy * dy) < style.point.radius * style.point.radius) {
// 				drag = p;
// 				dPoint = e;
// 				canvas.style.cursor = "move";
// 				return;
// 			}
// 		}
// 	}


// 	// dragging
// 	function Dragging(e) {
// 		if (drag) {
// 			e = MousePos(e);
// 			point[drag].x += e.x - dPoint.x;
// 			point[drag].y += e.y - dPoint.y;
// 			dPoint = e;
// 			DrawCanvas();
// 		}
// 	}


// 	// end dragging
// 	function DragEnd(e) {
// 		drag = null;
// 		canvas.style.cursor = "default";
// 		DrawCanvas();
// 	}


// 	// event parser
// 	function MousePos(event) {
// 		event = (event ? event : window.event);
// 		return {
// 			x: event.pageX - canvas.offsetLeft,
// 			y: event.pageY - canvas.offsetTop
// 		}
// 	}


// 	// start
// 	canvas = document.getElementById("canvas");
// 	code = document.getElementById("code");
// 	if (canvas.getContext) {
// 		ctx = canvas.getContext("2d");
// 		Init(canvas.className == "quadratic");
// 	}

// })();