status=""
objects=[]
song=""

function preload(){

song=loadSound("its_your_mother.mp3")

}

function setup(){

canvas=createCanvas(380,380)
canvas.center()
video=createCapture(VIDEO)
video.hide()
coco=ml5.objectDetector('cocossd',modelLoaded)
    document.getElementById("status").innerHTML="Detection Started ";


}
function modelLoaded(){

console.log("Modal has Loaded")
status="true"

}

function gotResult(error,results){

    if(error){

console.log(error)

    }
    else{

console.log(results)
objects=results;
    }


}


function draw(){

image(video,0,0,380,380)
if(status != "")
{r=random(255);
    g=random(255);
    b=random(255);
    coco.detect(video,gotResult)
for(i=0;i< objects.length; i++)
{

document.getElementById("status").innerHTML="Is Able To Detect";
p=floor(objects[i].confidence*100);
stroke(r,g,b)
text(objects[i].label + " " + p + " %" , objects[i].x+15,objects[i].y+15);
noFill()
stroke(r,g,b)
rect (objects[i].x,objects[i].y,objects[i].width,objects[i].height);
if(objects[i].label=="person")
{

document.getElementById("number").innerHTML="Baby Found";
song.stop();

}
else{

document.getElementById("number").innerHTML="Where is the baby?";
song.play();

}
}
if(objects.length==0){

    document.getElementById("number").innerHTML="Where is the baby?";
    song.play();

}

}
}
