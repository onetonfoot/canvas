class Eyedropper extends PaintFunction{
    constructor(contextReal){
        super();
        this.context = contextReal;
        this.selected = false;
        this.original = $("#strokecolor").spectrum("get");          
    }


    onDragging(coord,event){
        
    }
    onMouseMove(coord,event){
        var pxData = this.context.getImageData(coord[0],coord[1], 1, 1);
        console.log($("#strokecolor").spectrum("get"));
        if (this.selected == false) {
        $(".strokespectrum > div > div").css("background", "rgb(" + pxData.data[0] + "," + pxData.data[1] + "," + pxData.data[2] + ")");
        }
    }
    onMouseDown(coord,event){
        var pxData = this.context.getImageData(coord[0],coord[1], 1, 1);
        $("#strokecolor").spectrum("set", "rgb(" + pxData.data[0] + "," + pxData.data[1] + "," + pxData.data[2] + ")");
        this.selected = true;
        $(".strokespectrum").css("background", "#EEE");
        
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