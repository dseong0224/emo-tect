const video = document.getElementById("video");

const constraints = {
  audio: true,
  video: { width: 1280, height: 720 }
};

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  faceapi.nets.faceExpressionNet.loadFromUri("/models")
]).then(getMedia(constraints));

async function getMedia(constraints) {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function(mediaStream) {
      video.srcObject = mediaStream;
      video.onloadedmetadata = function(e) {
        video.play();
      };
    })
    .catch(function(err) {
      console.log(err.name + ": " + err.message);
    }); // always check for errors at the end.
}

// video.addEventListener("play", () => {
//   setInterval(async () => {
//     const detections = await faceapi
//       .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
//       .withFaceLandmarks()
//       .withFaceExpressions();
//     console.log(detections);
//   }, 100);
// });
