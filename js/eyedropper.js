/*let srcCanvas = document.getElementById("canvas-real")
let canvasCopy = document.createElement("canvas");
canvasCopy.width = srcCanvas.width;
canvasCopy.height = srcCanvas.height;
var destCtx = canvasCopy.getContext('2d');
//create a rectangle with the desired color
destCtx.fillStyle = $("#canvas-real").css("background-color")
destCtx.fillRect(0, 0, srcCanvas.width, srcCanvas.height);
//draw the original canvas onto the destination canvas
destCtx.drawImage(srcCanvas, 0, 0);   */    


class Eyedropper extends PaintFunction{
    constructor(contextReal){
        super();
        this.context = contextReal;
        this.selected = false;
        this.original = $("#strokecolor").spectrum("get");
            //create a dummy CANVAS

    }


    onDragging(coord,event){
        
    }
    onMouseMove(coord,event){
        let srcCanvas = document.getElementById("canvas-real")
        this.context.fillStyle = $("#canvas-real").css("background-color")
        //this.context.fillRect(0, 0, canvasDraft.width,canvasDraft.height);
        //draw the original canvas onto the destination canvas
        this.context.drawImage(srcCanvas, 0, 0);   

        var imageData = this.context.getImageData(coord[0],coord[1], 1, 1);
        if (this.selected == false) {
        $(".strokespectrum > div > div").css("background", "rgb(" + imageData.data[0] + "," + imageData.data[1] + "," + imageData.data[2] + ")");
        }
    }
    onMouseDown(coord,event){
        var imageData = this.context.getImageData(coord[0],coord[1], 1, 1);
        if (this.selected == false) {
        $("#strokecolor").spectrum("set", "rgb(" + imageData.data[0] + "," + imageData.data[1] + "," + imageData.data[2] + ")");
        this.selected = true;
        }
        
    }
    onMouseUp(coord,event){}
    onMouseLeave(coord,eventv){
        if (this.selected == false) {
        $(".strokespectrum > div > div").css("background",this.original)
        }
    }
    onMouseEnter(coord,event){
    }
    
    
}