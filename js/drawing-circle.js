class DrawingCircle extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;            
    }
    onMouseDown(coord,event){
        this.origX = coord[0];
        this.origY = coord[1];
    }
    onDragging(coord,event){
        this.draw(this.contextDraft,coord)
    }
    calculateDiameter(x1,y1,x2,y2){
        let a = Math.pow(x1 - x2,2)
        let b = Math.pow(y1 - y2,2)
        let d = Math.sqrt(a + b)
        return d
    }
    draw(context,coord){
        this.diameter = this.calculateDiameter(this.origX,this.origY,coord[0],coord[1])
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        context.beginPath();
        context.arc(this.origX,this.origY  ,this.diameter,0,Math.PI*2)
        this.setContext(context)
        context.stroke();
        context.fill();
        context.closePath();
    }
    onMouseUp(coord){
        this.draw(this.contextReal,coord)
        this.storeUndo();
    }
    onMouseMove(){}
    onMouseLeave(){}
    onMouseEnter(){}
}

