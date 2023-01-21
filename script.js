// Get the video element
const video = document.getElementById("webcam");

// Get the canvas element
const canvas = document.getElementById("picture");
const ctx = canvas.getContext("2d");

// Get the text output element
const textOutput = document.getElementById("text-output");

let mediaStream;

// check if running on iOS
const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
console.log(iOS);

if(iOS){
  // create a input file element
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.capture = 'camera';
  input.style.display = 'none';
  input.id = 'cameraInput';

  // create a take photo button
  const button = document.createElement('button');
  button.innerHTML = 'Take Photo';
  button.onclick = function(){
    input.click();
  }

  // append the input and the button to the body
  document.body.appendChild(input);
  document.body.appendChild(button);

  // handle the file change event
  input.onchange = function(event){
    const file = event.target.files[0];
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    document.getElementById("picture").appendChild(img);
  }

}else{
  // Ask for user permission to access the webcam
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      mediaStream = stream;
      video.srcObject = stream;
      video.play();
    })
    .catch(err => {
      console.error("Webcam access denied", err);
    });

  // Function to take a picture
  function snap() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    canvas.style.display = "block";
    video.style.display = "none";
    // readTextFromImage();
  }
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
