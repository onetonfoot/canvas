class Text extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();

        this.contextReal = contextReal;
        this.contextDraft = contextDraft;

        //initial style value
        this.color = this.strokeColor;
        this.fontFamily = $('#set-font-family').val();
        this.fontSize = $('#set-font-size').val();
        this.bold = $('#set-bold').is(':checked');
        this.italic = $('#set-italic').is(':checked');

        let self = this;

        $(function () {
            let textarea = document.createElement('textarea');
            textarea.classList.add("movable");
            textarea.style.fontFamily = self.fontFamily;
            textarea.style.color = self.color;
            textarea.style.fontSize = self.fontSize + "px";
            textarea.style.fontWeight = self.bold ? "bold": null;
            textarea.style.fontStyle = self.italic ? "italic" : null;
            $('#canvas-container').append(textarea);
            $('.movable').draggable({
                cancel: ""
            })
        });

        $('#canvas-container').dblclick(function (e) {
            let textarea = $('#canvas-container textarea');
            let val = textarea.val();
            let fontFamily = textarea.css('fontFamily');
            let color = textarea.css('color');
            let fontSize = parseInt(textarea.css('font-size').replace("px", ""));
            let isBold = $('#set-bold').is(':checked');
            let isItalic = $('#set-italic').is(':checked');
            let posOffset = {};
            posOffset.x = 0;
            posOffset.y = fontSize;
            let strArray = val.split("\n");
            let x = parseInt(textarea.css("left").replace("px", ""));
            let y = parseInt(textarea.css("top").replace("px", ""));
            let textStyle = `${isBold ? "bold": ""} ${isItalic ? "italic": ""} ${fontSize}px ${fontFamily}`;
            self.contextReal.font = textStyle;
            self.contextReal.fillStyle = self.strokeColor;
            
            for (var i = 0; i < strArray.length; i++) {
                self.contextReal.fillText(strArray[i], x+posOffset.x, y+posOffset.y + i*(fontSize + 20));
            }
            $(this).off('dblclick');
            textarea.remove();
        })
        
        $("#set-bold").change(function() {
            if (this.checked) {
                $('#canvas-container textarea').css("font-weight", "bold");
            }   else {
                $('#canvas-container textarea').css("font-weight", "normal");
            }
        })

        $("#set-italic").change(function() {
            if (this.checked) {
                $('#canvas-container textarea').css("font-style", "italic");
            }   else {
                $('#canvas-container textarea').css("font-style", "unset");
            }
        })

        $("#set-font-size").change(function() {
            $('#canvas-container textarea').css("font-size", this.value + "px");
        })

        $("#set-font-family").change(function() {
            $('#canvas-container textarea').css("font-family", this.value);
        })
        
        $("#strokecolor").change(function() {
            let color = $(".sp-preview-inner").css("background-color");
            $('#canvas-container textarea').css("color", color);
            // $('#canvas-container textarea').css("color", color);
        })
    }

    onMouseDown() {}
    onDragging() {}
    onMouseMove() {}
    onMouseUp() {}
    onMouseLeave() {}
    onMouseEnter() {}


}
