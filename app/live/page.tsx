"use client"

import { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import SimplePeer from 'simple-peer';

interface SignalData {
  type: 'offer' | 'pranswer' | 'answer' | 'rollback' | 'renegotiate' | 'transceiverRequest' | 'iceUpdate';
  sdp?: string;
  candidate?: RTCIceCandidate;
  sdpMid?: string;
  sdpMLineIndex?: number;
  renegotiate?: boolean;
  transceiverRequest?: any;
}

const Live = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState<string>("");
  const [callerSignal, setCallerSignal] = useState<SignalData | null>(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const userVideo = useRef<HTMLVideoElement | null>(null);
  const partnerVideo = useRef<HTMLVideoElement | null>(null);
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    socket.current = io({
      path: '/api/socket',
    });

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream);
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });

    socket.current.on("callUser", (data: { from: string; signal: SignalData }) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });
  }, []);

  const callPeer = (id: string) => {
    const peer = new SimplePeer({
      initiator: true,
      trickle: false,
      stream: stream!,
    });

    peer.on("signal", (data: SignalData) => {
      socket.current!.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: socket.current!.id,
      });
    });

    peer.on("stream", (stream: MediaStream) => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    socket.current!.on("callAccepted", (signal: SignalData) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
  };

  const acceptCall = () => {
    setCallAccepted(true);
    const peer = new SimplePeer({
      initiator: false,
      trickle: false,
      stream: stream!,
    });

    peer.on("signal", (data: SignalData) => {
      socket.current!.emit("acceptCall", { signal: data, to: caller });
    });

    peer.on("stream", (stream: MediaStream) => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    peer.signal(callerSignal!);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Live Streaming</h1>
      <div className="w-full max-w-screen-lg flex justify-center mb-8">
        <video playsInline muted ref={userVideo} autoPlay className="w-full max-w-md rounded-lg shadow-lg mb-4" />
        {callAccepted && (
          <video playsInline ref={partnerVideo} autoPlay className="w-full max-w-md rounded-lg shadow-lg mb-4" />
        )}
      </div>
      <div className="flex flex-col items-center">
        {receivingCall && !callAccepted ? (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4">{caller} is calling you</h2>
            <button onClick={acceptCall} className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
              Accept
            </button>
          </div>
        ) : (
          <button
            onClick={() => callPeer("peerId")}
            className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
          >
            Go Live
          </button>
        )}
      </div>
    </div>
  );
};

export default Live;
