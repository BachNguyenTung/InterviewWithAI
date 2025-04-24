'use client';

import { useState } from 'react';

interface ControlsProps {
  localStream: MediaStream | null;
}

export default function Controls({ localStream }: ControlsProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const toggleAudio = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!isVideoOff);
    }
  };

  const handleEndCall = () => {
    window.location.reload();
  };

  return (
    <div className='flex h-20 items-center justify-center gap-4 bg-gray-800 px-4'>
      <button
        onClick={toggleAudio}
        className={`rounded-full p-4 ${isMuted ? 'bg-red-500' : 'bg-gray-600'} hover:bg-opacity-80`}
      >
        {isMuted ? <MicOffIcon className='h-6 w-6 text-white' /> : <MicIcon className='h-6 w-6 text-white' />}
      </button>

      <button
        onClick={toggleVideo}
        className={`rounded-full p-4 ${isVideoOff ? 'bg-red-500' : 'bg-gray-600'} hover:bg-opacity-80`}
      >
        {isVideoOff ? <VideoOffIcon className='h-6 w-6 text-white' /> : <VideoIcon className='h-6 w-6 text-white' />}
      </button>

      <button onClick={handleEndCall} className='rounded-full bg-red-500 p-4 hover:bg-opacity-80'>
        <PhoneIcon className='h-6 w-6 text-white' />
      </button>
    </div>
  );
}

// Simple icon components
const MicIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill='none' viewBox='0 0 24 24' stroke='currentColor'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z'
    />
  </svg>
);

const MicOffIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill='none' viewBox='0 0 24 24' stroke='currentColor'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z'
    />
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2' />
  </svg>
);

const VideoIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill='none' viewBox='0 0 24 24' stroke='currentColor'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
    />
  </svg>
);

const VideoOffIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill='none' viewBox='0 0 24 24' stroke='currentColor'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636'
    />
  </svg>
);

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill='none' viewBox='0 0 24 24' stroke='currentColor'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M16 3h5m0 0v5m0-5l-6 6M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z'
    />
  </svg>
);
