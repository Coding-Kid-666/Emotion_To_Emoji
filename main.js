



console.log("ml5 version:" + ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/cwwWuzuff/model.json", modelLoaded);

function modelLoaded(){
    console.log("Model has succesfully loaded!")
}

Webcam.set({
    height: 300,
    width: 350,
    image_format:'png',
    png_quality: 90
});
 webcam = document.getElementById("camera");

 Webcam.attach(webcam);

 function takeSnapshot(){
     Webcam.snap(function(data_uri){
         document.getElementById("result").innerHTML = '<img id="outputImg" src="' + data_uri + '">';
         console.log("Snapshot succesfully taken.");
     });
 }

function speak(){
    var synth = window.speechSynthesis;
    var speak_data1 = "The first prediction is..." + prediction_1;
    var speak_data2 = "And the second prediction is..." + prediction_2;
    utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById("outputImg");
    classifier.classify(img, gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(prediction_1 == "Happy"){
            document.getElementById("update_emoji_1").innerHTML = "&#128522"
        }
        if(prediction_1 == "Sad"){
            document.getElementById("update_emoji_1").innerHTML = "&#128532"
        }
        if(prediction_1 == "._."){
            document.getElementById("update_emoji_1").innerHTML = "&#128528"
        }
        if(prediction_2 == "Happy"){
            document.getElementById("update_emoji_1").innerHTML = "&#128522"
        }
        if(prediction_2 == "Sad"){
            document.getElementById("update_emoji_1").innerHTML = "&#128532"
        }
        if(prediction_2 == "._."){
            document.getElementById("update_emoji_1").innerHTML = "&#128528"
        }
    }
}