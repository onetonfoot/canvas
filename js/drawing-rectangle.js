class DrawingRectangle extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;            
    }
    onMouseDown(coord,event){
        this.contextReal.fillStyle = this.fillColor;
        this.origX = coord[0];  
        this.origY = coord[1];
    }
    onDragging(coord,event){
        this.draw(this.contextDraft,coord)
    }
    draw(context,coord){
        context.beginPath();
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        context.rect(this.origX,this.origY,coord[0]- this.origX,coord[1] - this.origY)
        this.setContext(context)
        context.stroke();
        context.fill();
        context.closePath();
    }
    onMouseUp(coord){
        this.draw(this.contextReal,coord)
    }
    onMouseMove(){}
    onMouseLeave(){}
    onMouseEnter(){}
}