class Bucket extends PaintFunction {
    constructor() {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
    }

    onMouseDown(coord, e) {
        let color = $("#strokecolor").spectrum("get").toRgb();
        let canvasWidth = canvasReal.width;
        let canvasHeight = canvasReal.height;
        let colorLayer = this.contextReal.getImageData(x, y, canvasWidth, canvasHeight);
        let startPixel = this.contextReal.getImageData(coord[0],coord[1], 1, 1);
        let startR = startPixel.data[0];
        let startG = startPixel.data[1];
        let startB = startPixel.data[2];
        let loop = 0;

        let pixelStack = [
            [coord[0], coord[1]]
        ];

        while (pixelStack.length && loop < 500000) {
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
                loop++;
            }
        }
        if (loop < 500000) {
        this.contextReal.putImageData(colorLayer, 0, 0);
        this.storeUndo();
        }
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