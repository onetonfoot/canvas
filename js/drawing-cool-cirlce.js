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
        this.contextDraft.beginPath();
        this.contextDraft.fillStyle = "#f44";
        // this.contextDraft.globalCompositeOperation = "destination-out"
        this.radius = this.calculateRadius(this.origX,this.origY,coord[0],coord[1])
        this.contextDraft.arc(this.origX,this.origY,this.radius,0,Math.PI*2)
        this.contextDraft.stroke();
        this.contextDraft.closePath();
        // this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        // this.contextDraft.fillRect(this.origX,this.origY,coord[0]- this.origX,coord[1] - this.origY)
    }


    calculateRadius(x1,y1,x2,y2){

        let a = Math.pow(x1 - x2,2)
        let b = Math.pow(y1 - y2,2)
        let d = Math.sqrt(a + b)
        return d/2

    }

    onMouseMove(){
    }

    onMouseUp(coord){
        // this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        // this.contextReal.fillRect(this.origX,this.origY,coord[0]- this.origX,coord[1] - this.origY)
    }
    onMouseLeave(){
    }
    onMouseEnter(){}

    draw(x,y){
        this.context.lineTo(x,y);
        this.context.moveTo(x,y);
        this.context.closePath();
        this.context.stroke();    
    }
}