import { data1 } from './data/4x4.js';
import { data2 } from './data/32x32.js';

let newData2 = [];
let finalData2 = [];

for (let i = 0; i < data2.length; i++) {
    for (let j = 0; j < data2[i].length; j++) {
        newData2.push(`rgba(${data2[i][j][0]},${data2[i][j][1]},${data2[i][j][2]},${(data2[i][j][3] / 255).toFixed(2)})`);
    }
    finalData2.push(newData2);
    newData2 = [];
}

const canvas_4x4 = document.querySelector('#canvas_4x4');
const canvas_32x32 = document.querySelector('#canvas_32x32');
const canvas_image = document.querySelector('#canvas_image');

const ctx1 = canvas_4x4.getContext("2d");
const ctx2 = canvas_32x32.getContext("2d");
const ctx3 = canvas_image.getContext("2d");

let rsImage = new Image();
rsImage.src = 'assets/images/image.png';
rsImage.onload = function () {
    ctx3.drawImage(rsImage, 0, 0, canvas_image.width, canvas_image.height);
}

function drawArrayData(data, canvas, ctx) {
    let arrayWidth = data[0].length;
    let arrayHeight = data.length;
    let scaleX = canvas.width / arrayWidth;
    let scaleY = canvas.height / arrayHeight;

    for (let row = 0; row < arrayHeight; row++) {
        for (let col = 0; col < arrayWidth; col++) {
            ctx.fillStyle = data[row][col];
            ctx.fillRect(col * scaleX, row * scaleY, scaleX, scaleY);
        }
    }
}

drawArrayData(data1, canvas_4x4, ctx1);
drawArrayData(finalData2, canvas_32x32, ctx2);


function buttonHandler(button) {
    let selectedCanvas = button.value;
    let canvases = document.querySelectorAll('canvas');
    for (let k = 0; k < canvases.length; k++) {
        canvases[k].classList.remove('show');
        if (canvases[k].classList.contains(selectedCanvas)) {
            canvases[k].classList.add("show");
        }
    }
}

function initButtonListeners(el) {
    for (let i = 0; i < el.length; i++) {
        el[i].addEventListener('click', () => buttonHandler(el[i]));
    }
}

let el = document.querySelectorAll('.switcher__selection');
initButtonListeners(el);
