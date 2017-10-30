class Eraser extends PaintFunction{
    constructor(contextReal){
        super();
        this.context = contextReal;            
    }
    onMouseDown(coord,event){   
        this.setContext(this.context);
        this.context.beginPath();
    }
    onDragging(coord,event){
        this.context.globalCompositeOperation="destination-out";
        this.draw(coord[0],coord[1]);
        this.context.globalCompositeOperation="source-over";
    }
    onMouseMove(){}
    onMouseUp(){}
    onMouseLeave(){}
    onMouseEnter(){}

    draw(x,y){
        this.context.lineTo(x,y);
        this.context.moveTo(x,y);
        this.context.closePath();
        this.context.stroke();    
    }
}