class Text extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();

        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
    }

    onMouseDown(coord) {
        this.color = $("#strokecolor").spectrum("get").toRgbString();
        this.fontFamily = $('#set-font-family').val();
        this.fontSize = $('#set-font-size').val() + "px";
        this.fontWeight = $('#set-bold').is(':checked') ? "bold":"normal";
        this.fontStyle = $('#set-italic').is(':checked') ? "italic":"unset";
        
        let text = this;
        let context = this.contextReal;

        //initializing the textarea
        if ($('#text-input').length == 0) {
        let newInput = $(`<div id="text-input"><textarea id="textarea"></textarea></div>`);
        newInput.width(200).height(100).css({
            left: coord[0] + "px",
            top: coord[1] + "px",
        }).draggable({
            cancel: "text",
            start: function (){
                $('#textarea').focus();
             },
            stop: function (){
                $('#textarea').focus();
             } 
         }).resizable().appendTo('#canvas-container');
         newInput.children('#textarea').css({
            fontFamily: this.fontFamily,
            fontSize: this.fontSize,
            color: this.color,
            fontWeight: this.fontWeight,
            fontStyle: this.fontStyle,
         });

         $('#textarea').click(function() {
             $(this).focus();
         })

         //adjust the css according to current setting
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
            let color = $("#strokecolor").spectrum("get").toRgbString();
            $('#canvas-container textarea').css('color', color);
        })

        //printing the text on the canvas
        $('#canvas-container').dblclick(function (e) {
            let textarea = $('#textarea');
            let val = textarea.val();
            let fontFamily = textarea.css('fontFamily');
            let color = textarea.css('color');
            let fontSize = parseInt(textarea.css('font-size').replace("px", ""));
            let isBold = $('#set-bold').is(':checked');
            let isItalic = $('#set-italic').is(':checked');
            let posOffset = {};
            posOffset.x = 0;
            posOffset.y = fontSize;
            let lines = val.split("\n");
            let x = parseInt(textarea.parent().css("left").replace("px", ""));
            let y = parseInt(textarea.parent().css("top").replace("px", ""));
            let textStyle = `${isBold ? "bold": ""} ${isItalic ? "italic": ""} ${fontSize}px ${fontFamily}`;
            context.font = textStyle;
            context.fillStyle = text.strokeColor;
            
            for (var i = 0; i < lines.length; i++) {
                context.fillText(lines[i], x+posOffset.x, y+posOffset.y + i*(fontSize*(1.42857143) /*adjust for line height*/));
            }
            $(this).off('dblclick');
            textarea.parent().remove();
            
        })
        this.storeUndo();
    }
}

    onDragging() {}
    onMouseMove() {}
    onMouseUp() {}
    onMouseLeave() {}
    onMouseEnter() {}


}
