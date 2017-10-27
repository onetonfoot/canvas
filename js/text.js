class Text extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;

        let self = this;

        $(function () {
            let textarea = `<textarea class="movable"></textarea>`;
            $('#canvas-container').append(textarea);
            $('.movable').draggable({
                cancel: ""
            })
        });

        $('#canvas-container').dblclick(function () {
            var textarea = $('#canvas-container textarea');
            var val = textarea.val();
            var coorX = parseInt(textarea.css("left").replace("px", ""));
            var coorY = parseInt(textarea.css("top").replace("px", ""));
            var fontSize = textarea.css("font-size");
            var font = "serif";
            self.contextReal.font = `${fontSize} ${font}`;
            self.contextReal.fillText(val, coorX, coorY + 15);
            textarea.remove();
        })
    }

    onMouseDown() {}
    onDragging() {}
    onMouseMove() {}
    onMouseUp() {}
    onMouseLeave() {}
    onMouseEnter() {}


}
