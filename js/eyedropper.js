class Eyedropper extends PaintFunction{
    constructor(contextReal){
        super();
        this.context = contextReal;            
    }


    onDragging(coord,event){
        
    }
    onMouseMove(coord,event){
        var pxData = this.context.getImageData(coord[0],coord[1], 1, 1);
        $("#eyedropper").css("backgroundColor", "rgb(" + pxData.data[0] + "," + pxData.data[1] + "," + pxData.data[2] + ")");
    
        

    }
    onMouseDown(coord,event){
        var pxData = this.context.getImageData(coord[0],coord[1], 1, 1);
        $("#strokecolor").spectrum("set", "rgb(" + pxData.data[0] + "," + pxData.data[1] + "," + pxData.data[2] + ")");
        }
    onMouseUp(coord,event){}
    onMouseLeave(coord,eventv){}
    onMouseEnter(coord,event){
    }
    
    
}