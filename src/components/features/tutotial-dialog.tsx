'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Dialog, DialogContentPlain } from '@/components/shadcn-ui/dialog.tsx';
import { TUTORIAL_TIMER } from '@/lib/constants/appConstant.ts';
import { cn } from '@/lib/utils';
import { Button } from '@/components/shadcn-ui/button';
import { Eye, FolderCog, Inbox, SquareCheckBig } from 'lucide-react';
interface Tutorial {
  id: number;
  videoSrc: string;
  title: string;
  description: string
}

export const TutorialDialog = () => {
  const [open, setOpen] = useState(false);

  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial>({
    id: 0,
    videoSrc: "https://www.youtube.com/embed/5l8fNih8SUM?si=Cu0gGo39Rr0xxx-4",
    title: "Welcome to Team Trekking!",
    description: "Watch this quick video to know how Team Trekking can transform your productivity."
  });

  useEffect(() => {
    const lastShown = localStorage.getItem('tutorial_last_shown');
    const now = Date.now();

    if (!lastShown || now - parseInt(lastShown, 10) > TUTORIAL_TIMER) {
      setOpen(true);
    }
  }, []);

  const onClose = () => {
    localStorage.setItem('tutorial_last_shown', Date.now().toString());
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContentPlain onClose={onClose} className='m-2 overflow-visible'>
        <div className='relative bg-transparent'>
          <VideoPlayer
            title="Youtube Video Player"
            src={selectedTutorial.videoSrc}
            accelerometer
            autoPlay
            clipboardWrite
            encryptedMedia
            gyroscope
            pictureInPicture
            webShare
          >
            <div className="px-6 py-6 m-6 text-center">
              <h2 className="text-lg font-semibold mb-2">
                {selectedTutorial.title}
              </h2>
              <p className="text-gray-600 mb-4">
                {selectedTutorial.description}
              </p>
            </div>
          </VideoPlayer>
          <div className="absolute top-[101%] left-60 flex items-center gap-1 justify-center">
            <div className='p-[2px] rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500'>
              <Button
                size='lg'
                variant="ghost"
                className='block rounded-full bg-purple-500 hover:bg-purple-500/40 px-4 w-14 h-14'>
                <div className="bg-white rounded-sm w-full py-0.5">
                  <FolderCog className='text-purple-500 mx-auto' />
                </div>
              </Button>
            </div>
            <div className='p-[2px] rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500'>
              <Button size='lg' variant="ghost" className='block rounded-full bg-emerald-600 hover:bg-emerald-700 px-4 w-14 h-14'>
                <div className='bg-white rounded-sm w-full py-0.5'>
                  <SquareCheckBig className='text-emerald-600 mx-auto' />
                </div>
              </Button>
            </div>
            <div className='p-[2px] rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500'>
              <Button size='lg' variant="ghost" className='block rounded-full bg-pink-600 hover:bg-pink-700 px-4 w-14 h-14'>
                <div className='bg-white rounded-sm w-full py-0.5'>
                  <Eye className='text-pink-600 mx-auto' />
                </div>
              </Button>
            </div>
            <div className='p-[2px] rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500'>
              <Button size='lg' variant="ghost" className='block rounded-full bg-indigo-500 hover:bg-indigo-600 px-4 w-14 h-14'>
                <div className='bg-white rounded-sm w-full py-0.5'>
                  <Inbox className='text-indigo-500 mx-auto' />
                </div>
              </Button>
            </div>
          </div>
        </div>

      </DialogContentPlain>
    </Dialog>
  );
};

interface VideoPlayerProps {
  width?: number;
  height?: number;
  src: string;
  title: string;
  className?: string;
  children: ReactNode;
  accelerometer: boolean;
  autoPlay: boolean;
  clipboardWrite: boolean;
  encryptedMedia: boolean;
  gyroscope: boolean;
  pictureInPicture: boolean;
  webShare: boolean;
}

const VideoPlayer = ({
  width = 100,
  height = 100,
  src,
  title,
  className,
  children,
  accelerometer,
  autoPlay,
  clipboardWrite,
  encryptedMedia,
  gyroscope,
  pictureInPicture,
  webShare }: VideoPlayerProps) => {
  return (
    <div className="w-full">
      <div className={cn("w-full aspect-video", className)}>
        <iframe
          width={`${width}%`}
          height={`${height}%`}
          src={`${src}`}
          title={`${title}`}
          allow={`${accelerometer ? 'accelerometer;' : ''} ${autoPlay ? 'autoplay;' : ''} ${clipboardWrite ? 'clipboard-write;' : ''} ${encryptedMedia ? 'encrypted-media;' : ''} ${gyroscope ? 'gyroscope;' : ''} 
          ${pictureInPicture ? 'picture-in-picture;' : ''} ${webShare ? 'web-share' : ''}`}
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      {children}
    </div>
  )
}
