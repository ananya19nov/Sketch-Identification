function setup(){
    canvas = createCanvas(400, 400);
    canvas.position(570, 270);
    background("white");
    synth = window.speechSynthesis;
    canvas.mouseReleased(classifyCanvas);
}

function preload(){
    classifier = ml5.imageClassifier("DoodleNet");
}

function draw(){
    stroke("black");
    strokeWeight(13);
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas(){
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    document.getElementById('label').innerHTML = 'Label :- ' + results[0].label;

    document.getElementById('confidence').innerHTML = 'Confidence :- ' + Math.round(results[0].confidence * 100) + '%';

    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}

function clearCanvas(){
    background("white");
}
