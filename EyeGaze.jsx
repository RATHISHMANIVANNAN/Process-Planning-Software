import React, { useRef, useEffect, useState } from "react";
import * as cam from "@mediapipe/camera_utils";
import { FaceMesh } from "@mediapipe/face_mesh";
import "./EyeGaze.css";

const EyeGaze = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [status, setStatus] = useState("Analyzing...");
  let camera = useRef(null);

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const faceMesh = new FaceMesh({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });

    faceMesh.onResults((results) => {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      if (!results.multiFaceLandmarks || results.multiFaceLandmarks.length === 0) {
        setStatus("No Face Detected");
        return;
      }

      const faceLandmarks = results.multiFaceLandmarks[0];

      // Extract eye landmark points
      const leftEyeRatio = Math.abs(faceLandmarks[159].y - faceLandmarks[145].y);
      const rightEyeRatio = Math.abs(faceLandmarks[386].y - faceLandmarks[374].y);
      const blinkThreshold = 0.015;

      if (leftEyeRatio < blinkThreshold && rightEyeRatio < blinkThreshold) {
        setStatus("Inactive (Low Eye Activity)");
      } else {
        setStatus("Active & Engaged");
      }

      // Draw face tracking points on the transparent canvas
      ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    });

    camera.current = new cam.Camera(videoRef.current, {
      onFrame: async () => {
        await faceMesh.send({ image: videoRef.current });
      },
      width: 640,
      height: 480,
    });

    camera.current.start();

    return () => {
      if (camera.current) {
        camera.current.stop();
      }
    };
  }, []);

  return (
    <div className="eye-gaze-container">
      <h2>User Availability: <span className={status.includes("Inactive") ? "inactive" : "active"}>{status}</span></h2>
      <div className="video-container">
        <video ref={videoRef} className="video-stream" autoPlay playsInline />
        <canvas ref={canvasRef} className="overlay-canvas" width="640" height="480" />
      </div>
    </div>
  );
};

export default EyeGaze;
