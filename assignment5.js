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
    y: Math.floor((Math.random() * (canvas.height - 100)))
};
var fps = 5;
var timer = 0;


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

/*--------------------
Init
--------------------*/
const init = () => {
    resize();
    render();
    timer = setInterval(reset, 30000 / fps);
    reset();
    // canvasAddEventListener();
}


/*--------------------
Preload Image
--------------------*/
const imgSrc = "img/macro3.jpg";
bgImage.onload = init;
bgImage.src = imgSrc;

window.addEventListener('resize', init);
// Update game objects
var update = function (modifier) {

    // Are they touching?
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
    bug.y = Math.floor((Math.random() * (canvas.height - 100)))

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
        canvas.addEventListener("mousedown", onMouseClick, false);
    } else if (canvas.attachEvent) {
        canvas.attachEvent("onmousedown", onMouseClick);
    }
}

//mousedown event
//var canvas = document.getElementById("bugSmasherCanvas");


function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function onMouseClick(event) {
    if (event.button != 0) return;

    var mouseXinCanvas = getMousePos(canvas, event).x;
    var mouseYinCanvas = getMousePos(canvas, event).y

    if (isBugSmashed(bug, mouseXinCanvas, mouseYinCanvas)) {
        caught = true;
        clearInterval(timer);
        timer = setInterval(reset, 30000 / fps);
        reset();
        // render();
    }
    if (ResetScore(mouseXinCanvas, mouseYinCanvas)) {
        location.reload();
    }
    if (ResetSpeed(mouseXinCanvas, mouseYinCanvas)) {
        clearInterval(timer);
        timer = setInterval(reset, 30000 / fps);
        reset();
        render();
    }
};

//check if the bug is smashed
function isBugSmashed(bug, clickX, clickY) {
    console.log("BUG:", bug, clickX, clickY);

    if (
        Math.abs(bug.x - clickX) <= 60 &&
        Math.abs(bug.y - clickY) <= 60
    ) {
        console.log("bug smashed");
        ++bugSmashed;
        console.log("bug smashed", bugSmashed), scoreSpan;
        scoreSpan.innerText = bugSmashed;
        fps = fps + 2;
        return true;
    }
    return false;
};

//Reset Score box
function ResetScore(x, y) {

    if (x > (305)
        && x < (545)
        && y > (15)
        && y < (85)
    ) {
        return true;
    }
    return false;
};

//Reset speed box
function ResetSpeed(x, y) {
    if (x > (605)
        && x < (845)
        && y > (15)
        && y < (85)
    ) {
        fps = 10;
        return true;
    }
    return false;
};
console.log('Bug smashed: ', bugSmashed);

// function setUpPage() {
//     if (div)
//         canvasAddEventListener();
// }
// // function loadImages() {
// // Background image
// var bgReady = false;
// var bgImage = new Image();
// bgImage.onload = function () {

//     bgReady = true;
//     // drawImageActualSize();
// };
// // bgImage.width = canvas.width;
// bgImage.src = "img/macro3.jpg";

// // bug image
// var bugReady = false;
// var bugImage = new Image();
// bugImage.onload = function () {
//     bugReady = true;
// };
// bugImage.src = "img/beetle.png";


// // Handle keyboard controls
// var keysDown = {};


// // Draw everything
// var render = function () {
//     // canvas.width = this.naturalWidth;
//     // canvas.height = this.naturalHeight;
//     if (bgReady) {
//         // drawImage(bgImage);
//         // bgImage.onload = drawImageActualSize();
//         ctx.drawImage(bgImage, 0, 0, bgImage.width, bgImage.height, 0, 0, canvas.width, canvas.height);
//     }

//     if (bugReady) {
//         ctx.drawImage(bugImage, bug.x, bug.y, 50, 50);
//     }
//     // Score
//     ctx.fillStyle = "rgb(255, 255, 255)";
//     ctx.font = "11px Helvetica";
//     ctx.textAlign = "left";
//     ctx.textBaseline = "top";
//     ctx.fillText("Bug Smashed: " + bugSmashed, 0, 5);
// };





// function moveBugByInterval() {
//     // let date = new Date();
//     // let time = date.toLocaleTimeString();
//     var divBug = document.getElementById('divBug');

//     divBug.style.left = Math.floor((Math.random() * 100) + 1).toString() + "%";;
//     divBug.style.top = Math.floor((Math.random() * 100) + 1).toString() + "%";
//     console.log("bug displaced:", divBug.style.top);

//     //.textContent = time;
// }

//const createClock = setInterval(moveBugByInterval, 1000);




let formFields = [];
function setUpFormData() {
    var inputs = document.querySelectorAll("#registerForm input");
    inputs.forEach(element => {
        formFields[element.id] = {
            value: element.value,
            valid: false
        };
    });
    //console.log(formFields);
}

function validateInputFields() {
    let form = document.getElementById("form");
    let firstname = document.getElementById("firstname");
    let lastname = document.getElementById("lastname");
    let password = document.getElementById("password");
    let password2 = document.getElementById("password2");
    let province = document.getElementById("province");
    let postalcode = document.getElementById("postalcode");
    let email = document.getElementById("email");
    let address = document.getElementById("address");
    let city = document.getElementById("city");
    let age = document.getElementById("age");

    let firstnameValue = firstname.value.trim();
    let lastnameValue = lastname.value.trim();
    let passwordValue = password.value.trim();
    let password2Value = password2.value.trim();
    let provinceValue = province.value.trim();
    let postalcodeValue = postalcode.value.trim();
    let emailValue = email.value.trim();
    let addressValue = address.value.trim();
    let cityValue = city.value.trim();
    let ageValue = age.value.trim();


    if (firstnameValue === "") {
        setErrorFor(firstname, "firstname cannot be blank");
        formFields[firstname.id].valid = false;
    } else {
        formFields[firstname.id].valid = true;
        setSuccessFor(firstname);
    }

    if (lastnameValue === "") {
        formFields[lastname.id].valid = false;
        setErrorFor(lastname, "lastname cannot be blank");

    } else {
        formFields[lastname.id].valid = true;
        setSuccessFor(lastname);
    }
    if (addressValue === "") {
        formFields[address.id].valid = false;
        setErrorFor(address, "address cannot be blank");

    } else {
        formFields[address.id].valid = true;
        setSuccessFor(address);
    }
    if (cityValue === "") {
        formFields[city.id].valid = false;
        setErrorFor(city, "city cannot be blank");
    } else {
        formFields[city.id].valid = true;
        setSuccessFor(city);
    }

    emailValidation(emailValue);
    proviceValidation(provinceValue);
    postalcodeValidation(postalcodeValue);
    passwordValidation(passwordValue, password2Value);
    ageValidation(ageValue);

    // console.log("after validation", formFields);
}



function emailValidation(emailValue) {
    if (emailValue === "") {
        formFields[email.id].valid = false;
        setErrorFor(email, "Email cannot be blank");

    } else if (!validateEmail(emailValue)) {
        formFields[email.id].valid = false;
        setErrorFor(email, " Email field must contain the @ and . characters");

    } else {
        formFields[email.id].valid = true;
        setSuccessFor(email);
    }
}

function postalcodeValidation(postalcodeValue) {
    if (postalcodeValue === "") {
        formFields[postalcode.id].valid = false;
        setErrorFor(postalcode, "Postal code cannot be blank");
    } else if (!validatePostalcode(postalcodeValue)) {
        formFields[postalcode.id].valid = false;
        setErrorFor(postalcode, " postal code has to be in the a0a0a0 format");
    } else {
        formFields[postalcode.id].valid = true;
        setSuccessFor(postalcode);
    }
}

function proviceValidation(provinceValue) {
    if (provinceValue === "") {
        formFields[province.id].valid = false;
        setErrorFor(province, "Province cannot be blank");
    } else if (!validateProvince(provinceValue)) {
        formFields[province.id].valid = false;
        setErrorFor(province, "Province is not valid. Should be one of (QC, ON, MN, SK, BC)");
    } else {
        formFields[province.id].valid = true;
        setSuccessFor(province);
    }
}

function passwordValidation(passwordValue, password2Value) {
    if (passwordValue === "") {
        formFields[password.id].valid = false;
        setErrorFor(password, "password cannot be blank");

    } else if (!validatePassword(passwordValue)) {
        formFields[password.id].valid = false;
        setErrorFor(password, "Passwords must have 6 characters at least one digit and one upper-case");
    } else {
        formFields[password.id].valid = true;
        setSuccessFor(password);
    }

    if (password2Value === "") {
        formFields[password2.id].valid = false;
        setErrorFor(password2, "Repeat password cannot be blank");
    } else if (password2Value !== passwordValue) {
        formFields[password2.id].valid = false;
        setErrorFor(password2, "passwords does not match");
    } else {
        formFields[password2.id].valid = true;
        setSuccessFor(password2);
    }
}


function ageValidation(ageValue) {
    if (ageValue === "") {
        formFields[age.id].valid = false;
        setErrorFor(age, "age cannot be blank");

    } else if (ageValue < 18) {
        formFields[age.id].valid = false;
        setErrorFor(age, "you are not eligialbe if your age is under 18");
    } else {
        formFields[age.id].valid = true;
        setSuccessFor(age);
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    small.innerHTML = message;
    formControl.className = "form-control error";
}


function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

function validateEmail(emailValue) {
    var regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    var isEmail = regEx.test(emailValue);
    // console.log(isEmail ? "It's an email" : "Not an email");
    return isEmail;
}


function validateProvince(provinceValue) {
    var regEx = /^(ON|QC|MN|SK|AB|BC)$/i;
    var isProvince = regEx.test(provinceValue);
    return isProvince;
}

function validatePostalcode(postalcodeValue) {
    var regEx = /^[A-Z]\d[A-Z]\d[A-Z]\d$/i;
    var isPostalcode = regEx.test(postalcodeValue);
    return isPostalcode;
}

function validatePassword(passwordValue) {
    var regEx = /^(?=.*\d)(?=.*[A-Z]).{6,}.*$/;
    var isPassword = regEx.test(passwordValue);
    return isPassword;
}

function validateForm() {
    validateInputFields();
    var isFormValid = true;

    var inputs = document.querySelectorAll("#registerForm input");
    inputs.forEach((element) => {
        // console.log("Element:,", formFields[element.id]);
        if (formFields[element.id].valid === false) {
            isFormValid = false;
        }
    });

    return isFormValid;
}

function registerAccount() {
    var successResult = document.getElementById("successResult");
    var validationResult = document.getElementById("validationResult");
    var isFormValid = validateForm();
    if (!isFormValid) {
        validationResult.innerHTML = "Your order can not be submitted. Please check the validation result.";
        successResult.innerHTML = "";
        validationResult.style.visibility = "visible";
        successResult.style.visibility = "hidden";
    } else {
        successResult.innerHTML = "Congratulations! Your order is successfully submitted!";
        validationResult.innerHTML = "";
        validationResult.style.visibility = "hidden";
        successResult.style.visibility = "visible";
    }
}

function createRegisterAccountEventListener() {
    var btnRegisterAccount = document.getElementById("btnRegisterAccount");
    if (btnRegisterAccount.addEventListener) {
        btnRegisterAccount.addEventListener("click", registerAccount, false);
    } else if (btnRegisterAccount.attachEvent) {
        btnRegisterAccount.attachEvent("onclick", registerAccount);
    }
}

function createClearFormEventListener() {
    var btnClear = document.getElementById("btnClear");
    if (btnClear.addEventListener) {
        btnClear.addEventListener("click", clearForm, false);
    } else if (btnClear.attachEvent) {
        btnClear.attachEvent("onclick", clearForm);
    }
}

function createInputFieldsEventListener() {
    var inputs = document.querySelectorAll("input");
    inputs.forEach(element => {
        if (element.addEventListener) {
            element.addEventListener("blur", validateInputFields, false);
            element.addEventListener('input', validateInputFields, false);
        } else if (element.attachEvent) {
            element.attachEvent("blur", validateInputFields);
            element.attachEvent('input', validateInputFields);
        }
    });
}

function clearForm() {
    var registerForm = document.getElementById("registerForm");

    if (registerForm != null) {
        confirm("Are you sure to clear the form?");
        successResult.innerHTML = "";
        validationResult.innerHTML = "";
        validationResult.style.visibility = "hidden";
        successResult.style.visibility = "hidden";

        registerForm.reset();

        var fromControls = document.querySelectorAll(".form-control");
        fromControls.forEach(formControl => {
            formControl.className = "form-control";
        });
    }
    return false;
}




// <!-- // ^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$ : Email-->
// <!-- ^[A-Z]\d[A-Z]\d[A-Z]\d$ : postalCode -->
// <!-- ^(?=.*\d)(?=.*[A-Z]).{6,}.*$ :  password