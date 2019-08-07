let write = document.getElementById("write");


let predict = document.getElementById("predict");
let erase = document.getElementById("erase");
let canvas = document.getElementById("can");
let ctx = canvas.getContext("2d");
let w = canvas.width;
let h = canvas.height;
const canvasLineJoin = "round";
const canvasStrokeStyle = "white";
const canvasLineWidth = 12;
ctx.strokeStyle = canvasStrokeStyle;
ctx.lineJoin = canvasLineJoin;
ctx.lineWidth = canvasLineWidth;
ctx.fillStyle = "white";
// ctx.lineJoin = canvasLineJoin;
let body = document.getElementsByTagName("body")[0];
ctx.filter = 'blur(1px)';
var clickX = new Array();
var clickY = new Array();
var clickD = new Array();

let flag = false,
        prevX = 0,
        currX = 0,
        prevY = 0,
        currY = 0,
        dot_flag = false;

    let x = "black",
        y = 20;

body.onload = function() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, w, h);
    canvas.addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);
}

function findxy(res, e) {
    // console.log("in");
    // debugger
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;
        flag = true;
        dot_flag = true;
        if (dot_flag) {
            // ctx.beginPath();
            clickX.push(currX);
            clickY.push(currY);
            clickD.push(true);
            // ctx.moveTo(prevX, prevY);
            // ctx.lineTo(currX, currY);
            // ctx.stroke();
            dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            ctx.beginPath();
            clickX.push(currX);
            clickY.push(currY);
            clickD.push(true);
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(currX, currY);
            ctx.stroke();
            dot_flag = false;
        }
    }
}

function deleted() {
    var m = 1;
    if (m) {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 200, 200);
        var clickX = new Array();
        var clickY = new Array();
        var clickD = new Array();
        write.innerHTML="";
        // document.getElementById("can.style.display = "none";
    }
}	

function boundingBox() {
    var minX = Math.min.apply(Math, clickX) - 20;
    var maxX = Math.max.apply(Math, clickX) + 20;
    
    var minY = Math.min.apply(Math, clickY) - 20;
    var maxY = Math.max.apply(Math, clickY) + 20;
  
    var tempCanvas = document.createElement("canvas"),
    tCtx = tempCanvas.getContext("2d");
  
    tempCanvas.width  = maxX - minX;
    tempCanvas.height = maxY - minY;
    tCtx.drawImage(canvas, minX, minY, maxX - minX, maxY - minY, 0, 0, maxX - minX, maxY - minY);
  
    // var imgBox = document.getElementById("canvas_image");
    // imgBox.src = tempCanvas.toDataURL();
    
    return tempCanvas;

}

function preprocessCanvas(image) {

    // if model is not available, send the tensor with expanded dimensions
    
      // resize the input image to digitrecognizermlp's target size of (1, 28, 28, 1)
      let tensor = tf.browser.fromPixels(image)
        .resizeNearestNeighbor([28, 28])
        .mean(2)
        .expandDims(2)
        .expandDims()
        .toFloat();
    console.log(tensor.shape);
    return tensor.div(255.0);
  
    // else throw an error
  }


async function prediction(){
    const model = await tf.loadLayersModel('localstorage://my-model');
    // canvas.toDataURL('image/png');
    let croppedCanvas = boundingBox();
    
    let tensor = preprocessCanvas(croppedCanvas);

    let preds = model.predict(tensor);
    preds.argMax(1).print();
    let tensorData = preds.argMax(1).dataSync();
    let result = tensorData[0];
    write.innerHTML=result;
    // console.log(result);
    // textxs.dispose();
}

erase.addEventListener("click", deleted);
predict.addEventListener("click", prediction);