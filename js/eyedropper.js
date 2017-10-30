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