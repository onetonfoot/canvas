class DrawingLine extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft; 
    }
    
    onMouseDown(coord,event){
        this.origX = coord[0];
        this.origY = coord[1];
        this.contextReal.beginPath();
        this.setContext(contextDraft)
        this.setContext(contextReal)
        this.contextReal.moveTo(coord[0],coord[1]);
        
    }
    onDragging(coord,event){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        contextDraft.beginPath();
        contextDraft.moveTo(this.origX,this.origY);
        contextDraft.lineTo(coord[0],coord[1]);
        contextDraft.stroke();
    }

    onMouseMove(){}
    onMouseUp(coord,event){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextReal.lineTo(coord[0],coord[1]);
        this.setContext(this.contextReal)
        this.contextReal.stroke();
        this.contextReal.closePath();

    }
    onMouseLeave(){}
    onMouseEnter(){}

}
