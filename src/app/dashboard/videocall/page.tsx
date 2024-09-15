"use client";

import React, { useState, useEffect, useRef } from 'react';
import Peer, { Instance as PeerInstance } from 'simple-peer';
import io, { Socket } from 'socket.io-client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PhoneIcon } from "lucide-react";
import { ImPhoneHangUp } from 'react-icons/im';

let socket: Socket | undefined;

export default function VideoCallPage() {
  const [me, setMe] = useState<string>('');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState<string>('');
  const [callerSignal, setCallerSignal] = useState<any>();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState<string>('');
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState<string>('');

  const myVideo = useRef<HTMLVideoElement | null>(null);
  const userVideo = useRef<HTMLVideoElement | null>(null);
  const connectionRef = useRef<PeerInstance | undefined>();

  useEffect(() => {
    socketInitializer();

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (myVideo.current) myVideo.current.srcObject = stream;
      })
      .catch((err) => console.error('Error accessing media devices', err));

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  const socketInitializer = async () => {
    await fetch('/api/sockets'); // Initialize sockets on the server side
    socket = io('/', { path: '/api/sockets' });

    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on('me', (id: string) => setMe(id));

    socket.on('callUser', ({ from, name: callerName, signal }: { from: string, name: string, signal: any }) => {
      setReceivingCall(true);
      setCaller(from);
      setName(callerName);
      setCallerSignal(signal);
    });
  };

  const callUser = (id: string) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream!,
    });

    peer.on('signal', (data) => {
      if (socket) {
        socket.emit('callUser', {
          userToCall: id,
          signalData: data,
          from: me,
          name,
        });
      }
    });

    peer.on('stream', (stream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });

    socket?.on('callAccepted', (signal: any) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream!,
    });

    peer.on('signal', (data) => {
      if (socket) {
        socket.emit('answerCall', { signal: data, to: caller });
      }
    });

    peer.on('stream', (stream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current?.destroy();
    window.location.reload(); // Reload to reset state
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold">Video Call</h1>
      <p className="text-sm">Your ID: {me}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Your Video</CardTitle>
          </CardHeader>
          <CardContent>
            <video playsInline muted ref={myVideo} autoPlay className="w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Peer Video</CardTitle>
          </CardHeader>
          <CardContent>
            {callAccepted && !callEnded ? (
              <video playsInline ref={userVideo} autoPlay className="w-full" />
            ) : (
              <p>No peer connected</p>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="ID to call"
          value={idToCall}
          onChange={(e) => setIdToCall(e.target.value)}
        />
      </div>
      <div className="flex justify-center">
        {callAccepted && !callEnded ? (
          <Button
            variant="destructive"
            onClick={leaveCall}
          >
            <ImPhoneHangUp className="mr-2 h-4 w-4" /> End Call
          </Button>
        ) : (
          <Button
            onClick={() => callUser(idToCall)}
          >
            <PhoneIcon className="mr-2 h-4 w-4" /> Call
          </Button>
        )}
      </div>
      {receivingCall && !callAccepted && (
        <Card className="mt-4">
          <CardContent className="text-center">
            <p className="mb-2">{name} is calling:</p>
            <Button onClick={answerCall}>
              Answer
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
