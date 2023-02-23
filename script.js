const cameraFileInput = document.getElementById("cameraFileInput");
const pictureFromCamera = document.getElementById("pictureFromCamera");

cameraFileInput.addEventListener("change", function () {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    pictureFromCamera.setAttribute("src", window.URL.createObjectURL(this.files[0]));
  } else {
    const video = document.createElement("video");
    video.setAttribute("autoplay", "");
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    const constraints = {
      video: true
    };
    navigator.mediaDevices.getUserMedia(constraints)
      .then(function (mediaStream) {
        video.srcObject = mediaStream;
        pictureFromCamera.appendChild(video);
        video.play();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
});
