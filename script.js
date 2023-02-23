function openCameraOrWebcam() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // mobile device detected
    document.querySelector('#cameraFileInput').click();
  } else {
    // desktop device detected
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
      .then(stream => {
        const video = document.createElement('video');
        video.srcObject = stream;
        document.body.appendChild(video);
        video.play();
      })
      .catch(error => console.log(error));
  }
}

document.querySelector('#openCameraOrWebcam').addEventListener('click', openCameraOrWebcam);

document
  .getElementById("cameraFileInput")
  .addEventListener("change", function () {
    document
      .getElementById("pictureFromCamera")
      .setAttribute("src", window.URL.createObjectURL(this.files[0]));
  });
