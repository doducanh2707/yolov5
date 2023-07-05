import React, { useState, useRef } from "react";
import cv from "@techstark/opencv-js";
import { Tensor, InferenceSession } from "onnxruntime-web";
import { detectImage,detectVideo } from "./utils/detect";
import "./style/style.css";

const App = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState("Loading OpenCV.js...");
  const cameraRef = useRef(null);
  const canvasRef = useRef(null);

  // Configs
  const modelName = "best.onnx";
  const modelInputShape = [1, 3, 640, 640];
  const topk = 100;
  const iouThreshold = 0.4;
  const confThreshold = 0.2;
  const classThreshold = 0.2;

  // wait until opencv.js initialized
  cv["onRuntimeInitialized"] = async () => {
    // create session
    setLoading("Loading YOLOv5 model...");
    const [yolov5, nms, mask] = await Promise.all([
      InferenceSession.create(`${process.env.PUBLIC_URL}/model/${modelName}`),
      InferenceSession.create(`${process.env.PUBLIC_URL}/model/nms-yolov5.onnx`),
      InferenceSession.create(`${process.env.PUBLIC_URL}/model/mask-yolov5-seg.onnx`),
    ]);

    // warmup main model
    setLoading("Warming up model...");
    const tensor = new Tensor(
      "float32",
      new Float32Array(modelInputShape.reduce((a, b) => a * b)),
      modelInputShape
    );
    await yolov5.run({ images: tensor });

    setSession({ net: yolov5, nms: nms, mask: mask });
    setLoading(null);
  };
  
  let promiseToUseCamera = navigator.mediaDevices.getUserMedia({
    video: {facingMode: 'environment'},
    audio: false,
  });
  
  promiseToUseCamera
    .then(function (mediaStream) {
      cameraRef.current.srcObject = mediaStream;
    })
    .catch(function () {
      console.log("permission to access has been denied by the user");
    });
  return (
    <div className="App">
    <div className="content">
        <video autoPlay ref={cameraRef}
                    onPlay={() => detectVideo(              
                      cameraRef.current,
                      canvasRef.current,
                      session,
                      topk,
                      iouThreshold,
                      confThreshold,
                      classThreshold,
                      modelInputShape)} id= {"temp"} />
     <canvas
          id="canvas"
          width={modelInputShape[2]}
          height={modelInputShape[3]}
          ref={canvasRef}
        />
    </div>
    </div>
  );
};

export default App;