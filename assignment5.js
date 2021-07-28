// author: Ferdowsi Rumi 301168815
// assignment 5: Bug Smasher
var bugSmashed = 0;
var scoreSpan;

window.addEventListener("load", setUpPage, false);

function setUpPage() {
    canvasAddEventListener();
    scoreSpan = document.getElementById("score");
    scoreSpan.innerHTML = "0";
}


var canvas = document.createElement('canvas');
canvas.id = "bugSmasherCanvas";
canvas.style.zIndex = 8;
var ctx = canvas.getContext("2d");



var divGameStage = document.getElementById("divGameStage");
divGameStage.appendChild(canvas);

const win = {
    w: canvas.innerWidth,
    h: canvas.innerHeight
}
console.log(win);
const bgImage = new Image();
const bugImage = new Image();
// bug image
var bugReady = false;

const bugImgSrc = 'img/bug.png';
bugImage.onload = function () {
    bugReady = true;
};
bugImage.src = bugImgSrc;
var bug = {
    x: Math.floor(60 + (Math.random() * (canvas.width - 100))),
    y: Math.floor((Math.random() * (400)))
};
var fps = 5;
var timer = 0;


/*--------------------
Init
--------------------*/
const init = () => {
    resize();
    render();
    timer = setInterval(reset, 30000 / fps);
    reset();
}


/*--------------------
Preload Image
--------------------*/
const imgSrc = "img/macro3.jpg";
bgImage.onload = init;
bgImage.src = imgSrc;


/*--------------------
Resize
--------------------*/
const resize = () => {
    win.w = window.innerWidth;
    win.h = window.innerHeight;
    canvas.width = win.w;
    canvas.height = win.h;
    canvas.style.width = `${win.w - 20}px`;
    canvas.style.height = `${win.h}px`;
}


/*--------------------
Render
--------------------*/
const render = () => {
    ctx.clearRect(0, 0, win.w, win.h);
    // const type = document.querySelector('input[name="type"]:checked').value
    coverImg(bgImage, 'cover');

    if (bugReady) {
        ctx.drawImage(bugImage, bug.x, bug.y, 55, 55);
    }
    // Score
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.font = "16px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Bug Smashed: " + bugSmashed, 0, 5);
    requestAnimationFrame(render);
}



window.addEventListener('resize', init);
// Update game objects
var update = function (modifier) {

    // Is bug inside?
    // console.log("x,y", bug.x, bug.y, clickX, clickY);
    //console.log("cx,cy", );

    if (
        Math.abs(bug.x - clickX) <= 60 &&
        Math.abs(bug.y - clickY) <= 60
    ) {
        console.log("bug smashed", bugSmashed), scoreSpan;
        ++bugSmashed;
        scoreSpan.innerHtml = bugSmashed;
        reset;
    }
};

// The main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;

    //  update(delta /999999999);
    init;

    then = now;

    // Request to do this again ASAP
    requestAnimationFrame(main);
};

// Reset the game when the player smashes the bug
var reset = function () {
    // bug.x = canvas.width / 2;
    // bug.y = canvas.height / 2;
    bug.x = Math.floor(60 + (Math.random() * (canvas.width - 100)));
    bug.y = Math.floor((Math.random() * (450)))

    if (bugReady) {
        render();
        ctx.drawImage(bugImage, bug.x, bug.y, 60, 60);
    }
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;


function canvasAddEventListener() {
    var canvas = document.getElementById("bugSmasherCanvas");
    if (canvas.addEventListener) {
        canvas.addEventListener("mousedown", onMouseDown, false);
    } else if (canvas.attachEvent) {
        canvas.attachEvent("onmousedown", onMouseDown);
    }
}
function getMousePosition(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function onMouseDown(event) {
    var mouseXinCanvas = getMousePosition(canvas, event).x;
    var mouseYinCanvas = getMousePosition(canvas, event).y
    if (isBugSmashed(bug, mouseXinCanvas, mouseYinCanvas)) {
        caught = true;
        clearInterval(timer);
        timer = setInterval(reset, 30000 / fps);
        reset();
    }
};

//check if the bug is smashed
function isBugSmashed(bug, clickX, clickY) {
    //console.log("BUG:", bug, clickX, clickY);

    if (
        Math.abs(bug.x - clickX) <= 60 &&
        Math.abs(bug.y - clickY) <= 60
    ) {
        ++bugSmashed;
        scoreSpan.innerText = bugSmashed;
        fps = fps + 2;
       // console.log("bug smashed", bugSmashed), scoreSpan;

        return true;
    }
    return false;
};

//Reset Score box
function resetScore() {
    
    //console.log("Reset Score");
    scoreSpan.innerText = 0;
    bugSmashed = 0;
    reset();
    return false;
};

//Reset speed box
function resetSpeed() {
    console.log("Reset Speed");
    fps = 5;
    clearInterval(timer);
    timer = setInterval(reset, 30000 / fps);
    reset();
    return false;
};
console.log('Bug smashed: ', bugSmashed);

/*--------------------
Cover Image
--------------------*/
const coverImg = (bgImage, type = 'cover') => {
    const imgRatio = bgImage.height / bgImage.width;
    const winRatio = window.innerHeight / window.innerWidth;
    if ((imgRatio < winRatio && type === 'contain') || (imgRatio > winRatio && type === 'cover')) {
        const h = window.innerWidth * imgRatio;
        ctx.drawImage(bgImage, 0, (window.innerHeight - h) / 2, window.innerWidth, h);
    }
    if ((imgRatio > winRatio && type === 'contain') || (imgRatio < winRatio && type === 'cover')) {
        const w = window.innerWidth * winRatio / imgRatio;
        ctx.drawImage(bgImage, (win.w - w) / 2, 0, w, window.innerHeight);
    }
}