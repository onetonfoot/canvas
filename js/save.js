var canvas = document.getElementById('canvas-real');
// save canvas image as data url (png format by default)
var dataURL = canvas.toDataURL();
// set canvasImg image src to dataURL
// so it can be saved as an image
document.getElementById('canvas-img').src = dataURL;