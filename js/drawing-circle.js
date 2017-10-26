class DrawingCircle extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;            
    }
    onMouseDown(coord,event){
        this.contextReal.fillStyle = "#f44";
        this.origX = coord[0];
        this.origY = coord[1];
    }
    onDragging(coord,event){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.radius = this.calculateRadius(this.origX,this.origY,coord[0],coord[1])
        this.draw(this.contextDraft,coord)
    }
    calculateRadius(x1,y1,x2,y2){
        let a = Math.pow(x1 - x2,2)
        let b = Math.pow(y1 - y2,2)
        let d = Math.sqrt(a + b)
        return d/2
    }
    draw(context,coord){
        context.beginPath();
        context.fillStyle = "#f44";
        context.arc(this.origX,this.origY  ,this.radius,0,Math.PI*2)
        context.stroke();
        context.closePath();
    }
    onMouseMove(){
    }
    onMouseUp(coord){
        this.draw(this.contextReal,coord)
    }
    onMouseLeave(){
    }
    onMouseEnter(){}
}

