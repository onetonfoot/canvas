class DrawingLine extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft; 
    }
    
    onMouseDown(coord,event){
        this.origX = coord[0];
        this.origY = coord[1];
        this.contextReal.strokeStyle = "#df4b26";
        this.contextReal.lineJoin = "round";
        this.contextReal.lineWidth = 5;
        this.contextReal.beginPath();
        this.contextReal.moveTo(coord[0],coord[1]);
        this.contextDraft.strokeStyle = "#df4b26";
        this.contextDraft.lineJoin = "round";
        this.contextDraft.lineWidth = 5;


        
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
