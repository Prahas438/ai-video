status="";
objects=[];
video="";
function preload(){
    video=createVideo("video.mp4");
    video.hide()
}
function setup(){
    canvas=createCanvas(490,380);
    canvas.center();
}
function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById('status').innerHTML="Status : Detecting Objects";
}
function modelLoaded(){
    console.log("modelLoaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function draw(){
    image(video,0,0,490,380);
    if(status!=""){
        objectDetector.detect(video,gotResult);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML="Number of objects detected: "+objects.length;
            fill("blue");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+""+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("blue");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}
function gotResult(error,results){
    if (error){
        console.log(error);
    }
    else{
    console.log(results);
    objects=results;
}
}
