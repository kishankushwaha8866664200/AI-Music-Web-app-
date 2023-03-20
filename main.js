//Score
var scorelw = 0;
var scorerw = 0;
// Status
var song_status1 = "";
var song_status2 = "";
// Songs
var song = "";
var song1 = "";
// Wrist X 
var leftWristX = 0;
var rightWristX = 0;
// Wrist Y
var leftWristY = 0;
var rightWristY = 0;

function preload() {
   song = loadSound("music.mp3");
   song1 = loadSound("music2.mp3");
}
function setup() {
    canvas = createCanvas(540, 540);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("Model Loaded");
}
function draw()
{
    image(video, 0, 0, 540, 540);
    fill("red");
    stroke("red");

    song_status1 = song1.isPlaying();
    
    if(scorerw>0.2)
    {
        circle(rightWristX, rightWristY, 20);
        song1.stop();
        if(song_status1 == false)
        {
            song.play();
            document.getElementById('songName').innerHTML = "Playing Harry Potter Song";
        }
    }

    song_status2 = song1.isPlaying();
   
    if(scorelw>0.2)
    {
        circle(rightWristX, rightWristY, 20);
        song1.stop();
        if(song_status2 == false)
        {
            song1.play();
            document.getElementById('songName').innerHTML = "Playing Peter Pan Song";
        }
    }
}

function gotPoses(results){
   
    if(results.length > 0) {
    console.log(results);

    scorelw = results[0].pose.keypoints[9].score;
    scorerw = results[0].pose.keypoints[10].score;
    console.log(scorelw);
    console.log(scorerw);
    
    leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX, "Left Wrist Y = " + leftWristY);
        
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rightWristX, "Right Wrist Y = " + rightWristY);
    }
}