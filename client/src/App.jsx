import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function WebRTC() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const [isCallStarted, setIsCallStarted] = useState(false);

  useEffect(() => {
    peerConnection.current = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" }, // Using Google's STUN server
      ],
    });

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("candidate", event.candidate);
      }
    };

    peerConnection.current.ontrack = (event) => {
      console.log("Received remote stream:", event.streams[0]);
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    socket.on("offer", async (offer) => {
      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(offer)
      );
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      socket.emit("answer", answer);
    });

    socket.on("answer", async (answer) => {
      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
    });

    socket.on("candidate", async (candidate) => {
      await peerConnection.current.addIceCandidate(
        new RTCIceCandidate(candidate)
      );
    });

    return () => {
      socket.off("offer");
      socket.off("answer");
      socket.off("candidate");
    };
  }, []);

  const startCall = async () => {
    setIsCallStarted(true);
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localVideoRef.current.srcObject = stream;

    stream
      .getTracks()
      .forEach((track) => peerConnection.current.addTrack(track, stream));

    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);
    socket.emit("offer", offer);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">WebRTC Video Call</h1>
      <div className="grid grid-cols-2 gap-4">
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          className="w-64 h-48 border border-gray-500"
        />
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-64 h-48 border border-gray-500"
        />
      </div>
      {!isCallStarted && (
        <button
          onClick={startCall}
          className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded"
        >
          Start Call
        </button>
      )}
    </div>
  );
}
