class Eraser extends PaintFunction{
    constructor(contextReal){
        super();
        this.context = contextReal;            
    }
    
    onMouseDown(coord,event){
        //this.context.strokeStyle = $("#bgcolor").spectrum("get");
        this.setContext(this.context);
        this.context.beginPath();
        //this.context.moveTo(coord[0],coord[1]);
        //this.draw(coord[0],coord[1]);
    }
    onDragging(coord,event){
        //this.context.draw(coord[0],coord[1]);
        this.context.globalCompositeOperation="destination-out";
        this.draw(coord[0],coord[1]);
        this.context.globalCompositeOperation="source-over";
        //this.context.arc(coord[0],coord[1],this.lineWidth,0,Math.PI*2,false);
        //this.context.fill();
    }

    onMouseMove(){}
    onMouseUp(){
        this.storeUndo();
    }
    onMouseLeave(){}
    onMouseEnter(){}

    draw(x,y){
        this.context.lineTo(x,y);
        this.context.moveTo(x,y);
        this.context.closePath();
        this.context.stroke();    
    }
}