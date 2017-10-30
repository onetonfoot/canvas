class Polygon extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.path = []
        this.counter = 0
    }

    onMouseDown(coord, event) {
        this.path.push(coord)
    }
    onMouseMove(coord,event){
        this.setContext(contextDraft)
        this.path.push(coord)
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.drawPath(contextDraft)
        this.path.pop();
    }
    onDblClick(coord, event) {
        this.setContext(contextReal)
        this.drawPath(contextReal)
        this.path = [];
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
    }
    drawPath(context){
        context.beginPath();
        context.moveTo(...this.path[0])
        this.path.forEach( (position) => {
            context.lineTo(...position)

        })
        context.closePath();
        context.fill();
        context.stroke();
    }

    onMouseUp(coord, event) {}
    onDragging(coord, event) {}
    onMouseLeave() {}
    onMouseEnter() {}
}