// let canvasReal = document.getElementById('canvas-real');
// let contextReal = canvasReal.getContext('2d');
// let canvasDraft = document.getElementById('canvas-draft');
// let contextDraft = canvasDraft.getContext('2d');
// let currentFunction;
// let dragging = false;

class Bucket extends PaintFunction {
    constructor() {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
    }

    onMouseDown(coord, e) {
        let color = $("#fillcolor").spectrum("get").toRgb();
        let canvasWidth = canvasReal.width;
        let canvasHeight = canvasReal.height;
        let colorLayer = contextReal.getImageData(x, y, canvasWidth, canvasHeight);
        let pixelStack = [
            [coord[0], coord[1]]
        ];

        while (pixelStack.length) {
            var newPos, x, y, pixelPos, reachLeft, reachRight;
            newPos = pixelStack.pop();
            x = newPos[0];
            y = newPos[1];

            pixelPos = (y * canvasWidth + x) * 4;
            while (y-- >= 0 && matchStartColor(pixelPos)) {
                pixelPos -= canvasWidth * 4;
            }
            pixelPos += canvasWidth * 4;
            ++y;
            reachLeft = false;
            reachRight = false;
            while (y++ < canvasHeight - 1 && matchStartColor(pixelPos)) {
                colorPixel(pixelPos);

                if (x > 0) {
                    if (matchStartColor(pixelPos - 4)) {
                        if (!reachLeft) {
                            pixelStack.push([x - 1, y]);
                            reachLeft = true;
                        }
                    } else if (reachLeft) {
                        reachLeft = false;
                    }
                }

                if (x < canvasWidth - 1) {
                    if (matchStartColor(pixelPos + 4)) {
                        if (!reachRight) {
                            pixelStack.push([x + 1, y]);
                            reachRight = true;
                        }
                    } else if (reachRight) {
                        reachRight = false;
                    }
                }

                pixelPos += canvasWidth * 4;
            }
        }
        context.putImageData(colorLayer, 0, 0);

        function matchStartColor(pixelPos) {
            var r = colorLayer.data[pixelPos];
            var g = colorLayer.data[pixelPos + 1];
            var b = colorLayer.data[pixelPos + 2];

            return (r == startR && g == startG && b == startB);
        }

        function colorPixel(pixelPos) {
            colorLayer.data[pixelPos] = color.r;
            colorLayer.data[pixelPos + 1] = color.g;
            colorLayer.data[pixelPos + 2] = color.b;
            colorLayer.data[pixelPos + 3] = 255;
        }
    }

    onDragging() {}
    onMouseMove() {}
    onMouseUp() {}
    onMouseLeave() {}
    onMouseEnter() {}
    onDblClick() {}
}