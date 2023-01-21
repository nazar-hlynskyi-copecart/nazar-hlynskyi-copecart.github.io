// Get the video element
const video = document.getElementById("webcam");

// Get the canvas element
const canvas = document.getElementById("picture");
const ctx = canvas.getContext("2d");

// Get the text output element
const textOutput = document.getElementById("text-output");

const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

if(iOS){
  // ask user permission to access the camera
  navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    const videoTracks = stream.getVideoTracks();
    window.adapter.browserShim.attachMediaStream(video, videoTracks[0]);
    video.play();
  });
}else{
  // Ask for user permission to access the webcam
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
      video.play();
    })
    .catch(err => {
      console.error("Webcam access denied", err);
    });
}

// Function to take a picture
function snap() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0);
  canvas.style.display = "block";
  video.style.display = "none";
  // readTextFromImage();
}

// Function to read text from image using OCR
function readTextFromImage() {
  const imageData = canvas.toDataURL("image/jpeg")

  var myHeaders = new Headers();
  myHeaders.append("apikey", "K83308110188957");

  var formdata = new FormData();
  formdata.append("language", "eng");
  formdata.append("isOverlayRequired", "false");
  formdata.append("iscreatesearchablepdf", "false");
  formdata.append("issearchablepdfhidetextlayer", "false");
  formdata.append("base64Image", imageData);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };

  fetch("https://api.ocr.space/parse/image", requestOptions)
    .then(response => response.text())
    .then(result => textOutput.innerHTML = result)
    .catch(error => console.log('error', error));
}

// Function to take a new photo
function newPhoto() {
  canvas.style.display = "none";
  video.style.display = "block";
}
