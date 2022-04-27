obj_status = 'false';
objects = [];
md_status = "";

function setup() {
    canvas = createCanvas(320, 320);
    canvas.position(587, 330);
    video = createCapture(VIDEO);
    video.hide();
    video.size(320, 320);
}
function draw() {
    image(video, 0, 0, 320, 320);
    if (md_status == "true") {
        for (i = 0; i < objects.length; i++) {
            if (obj_status == 'false') {
                if (objects[i].label == obj_inp) {
                    obj_status = 'true';

                    var synth = window.speechSynthesis;
                    speak_data = "Mentioned Object Detected";
                    var utterThis = new SpeechSynthesisUtterance(speak_data);
                    synth.speak(utterThis);

                    document.getElementById("Status").innerHTML = "Status : Objects Detected";
                    fill('blue');
                    percent = floor(objects[i].confidence * 100);
                    text(objects[i].label + " " + percent + " %", objects[i].x + 15, objects[i].y + 15);
                    noFill();
                    stroke('blue');

                    console.log(objects[i].x + ' / ' + objects[i].y + " / " + objects[i].confidence + " / " + percent);
                    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
                    document.getElementById("obj_name").innerHTML = objects[i].label;
                    video.stop();
                }
            }
            else {
                i = objects.length;
            }
        }
        if (obj_status == 'false') {
            document.getElementById("Status").innerHTML = "Status : Object Not Found";
        }
    }
}

function start() {
    objDetect = ml5.objectDetector('cocossd', modelLoaded);
    objDetect.detect(video, gotResult);
    document.getElementById("Status").innerHTML = "Status : Detecting Objects";
    obj_inp = document.getElementById("obj_input").value;
    console.log(obj_inp);
    video.loop();
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}

function modelLoaded() {
    console.log("Model Initialized!");
    md_status = "true";
}