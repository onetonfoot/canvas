class DrawingLine extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft; 
    }
    
    onMouseDown(coord,event){
        this.origX = coord[0];
        this.origY = coord[1];
        this.contextReal.strokeStyle = this.strokeColor;
        this.contextDraft.strokeStyle = this.strokeColor;
        this.contextReal.lineJoin = "round";
        this.contextDraft.lineWidth = this.lineWidth;
        this.contextReal.lineWidth = this.lineWidth;
        this.contextReal.beginPath();
        this.contextReal.moveTo(coord[0],coord[1]);
        this.contextDraft.strokeStyle = this.strokeColor;
        this.contextDraft.lineJoin = "round";


        
    }
    onDragging(coord,event){
        contextDraft.beginPath();
        contextDraft.moveTo(this.origX,this.origY);
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        contextDraft.lineTo(coord[0],coord[1]);
        contextDraft.stroke();
        
        

 
    }

    onMouseMove(){}
    onMouseUp(coord,event){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextReal.lineTo(coord[0],coord[1]);
        this.contextReal.stroke();

    }
    onMouseLeave(){}
    onMouseEnter(){}

}
