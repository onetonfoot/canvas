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
        this.firstClick = true;
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
        if (this.firstClick){
            this.startPoint(coord)
            this.firstClick = false;
        }
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
        this.setContext(contextDraft)
        this.setContext(contextReal)
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

    startPoint(coord){
        let a = coord[0]
        let b = coord[1]
        this.point = {
            p1: {
                x: a -50,
                y: b 
            },
            p2: {
                x: a+50,
                y: b
            },
            cp1: {
                x: a ,
                y: b
            }
        }
    }

    onDblClick() { 
        contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.drawReal();
        this.firstClick = true;
    }

    drawReal(){
        contextReal.lineWidth = this.lineWidth;
        contextReal.strokeStyle = this.strokeColor;
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
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.strokeColor;
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
    onMouseEnter() {
        this.draw(canvasDraft);
    }

}