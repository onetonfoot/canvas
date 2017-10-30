class DrawingEllipse extends PaintFunction{
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
    onMouseUp(coord){
        this.draw(this.contextReal,coord)
    }
    onMouseMove(){}
    onMouseLeave(){}
    onMouseEnter(){}
    
    draw(context,coord){
        
                var centerX = this.origX;
                var centerY = this.origY;
                var width = (coord[0]-this.origX)*3.2;
                var height = (coord[1]-this.origY)*3.2;
                this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
                context.beginPath();
                
                context.moveTo(centerX, centerY - height/2); // A1
                
                context.bezierCurveTo(
                  centerX + width/2, centerY - height/2, // C1
                  centerX + width/2, centerY + height/2, // C2
                  centerX, centerY + height/2); // A2
              
                context.bezierCurveTo(
                  centerX - width/2, centerY + height/2, // C3
                  centerX - width/2, centerY - height/2, // C4
                  centerX, centerY - height/2); // A1
               
                  this.setContext(context)
                  context.stroke();
                  context.fill();
                  context.closePath();	
            }
}

