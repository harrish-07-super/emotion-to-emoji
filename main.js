prediction1 = ""
prediction2 = ""

Webcam.set({
    width: 300,
    height: 300,
    image_format: 'jpg',
    jpg_quality: 1000
});

camera = document.getElementById(camera);

Webcam.attach("camera");

function capture() {
    Webcam.snap(function (datauri) {
        document.getElementById("result").innerHTML = '<img id="capture_img" src="' + datauri + '"/>';
    });
}

console.log("ml5version", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/zPbNv78xO/model.json", modelLoaded);

function modelLoaded() {
    console.log("Model loaded!");
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "first prediction is" + prediction1;
    speak_data_2 = "second prediction is" + prediction2;
    var utter_this = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utter_this);
}

function predict() {
    img = document.getElementById("capture_img");
    classifier.classify(img, gotresult);
}

function gotresult(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        prediction1 = results[0].label;
        document.getElementById("result_emotion_name").innerHTML = prediction1;
        prediction2 = results[1].label;
        document.getElementById("result_emotion_name2").innerHTML = prediction2;
        speak();
        if(prediction1=="happy"){
            document.getElementById("update_emoji").innerHTML="&#128516;";
        }
        if(prediction1=="sad"){
            document.getElementById("update_emoji").innerHTML="&#128532;";
        }
        if(prediction1=="angry"){
            document.getElementById("update_emoji").innerHTML="&#128545;";
        }

        if(prediction2=="happy"){
            document.getElementById("update_emoji2").innerHTML="&#128516;";
        }
        if(prediction2=="sad"){
            document.getElementById("update_emoji2").innerHTML="&#128532;";
        }
        if(prediction2=="angry"){
            document.getElementById("update_emoji2").innerHTML="&#128545;";
        }
    }
}