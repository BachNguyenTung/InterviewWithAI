'use client';

import { useEffect, useState } from 'react';
import VideoPlayer from './VideoPlayer';
import Controls from './Controls';
import ChatBox from './ChatBox';
import QuestionDisplay from './QuestionDisplay';

export default function VideoRoom() {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const initializeLocalStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setLocalStream(stream);
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };
    //!TODO: initializeRemoteStream
    const initializeRemoteStream = async () => {
      try {
        setRemoteStream(null);
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    initializeLocalStream();
    initializeRemoteStream();

    return () => {
      localStream?.getTracks().forEach((track) => track.stop());
      remoteStream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return (
    <div className='flex h-screen w-screen flex-col bg-gray-900'>
      <div className='flex flex-1'>
        {/* Main content area */}
        <div className='flex flex-1'>
          {/* Left side: Videos and Question */}
          <div className='flex-1 space-y-4 p-4'>
            {/* Video grid */}
            <div className='grid grid-cols-2 gap-4'>
              <div className='relative aspect-video overflow-hidden rounded-lg bg-gray-800'>
                <VideoPlayer stream={remoteStream} muted={false} />
                <div className='absolute bottom-4 left-4 rounded bg-black/50 px-2 py-1 text-white'>Interviewer</div>
              </div>

              <div className='relative aspect-video overflow-hidden rounded-lg bg-gray-800'>
                <VideoPlayer stream={localStream} muted={true} />
                <div className='absolute bottom-4 left-4 rounded bg-black/50 px-2 py-1 text-white'>You</div>
              </div>
            </div>

            {/* Question Display */}
            <QuestionDisplay />
          </div>

          {/* Right side: Chat */}
          <div className='h-full p-4'>
            <ChatBox />
          </div>
        </div>
      </div>

      {/* Controls */}
      <Controls localStream={localStream} />
    </div>
  );
}
