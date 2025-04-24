'use client';

import { useEffect, useRef } from 'react';

interface VideoPlayerProps {
  stream: MediaStream | null;
  muted: boolean;
}

export default function VideoPlayer({ stream, muted }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <video ref={videoRef} autoPlay playsInline muted={muted} className='h-full w-full object-cover'>
      <track default kind='captions' srcLang='en' src='' />
    </video>
  );
}
