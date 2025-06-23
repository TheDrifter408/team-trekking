'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Dialog, DialogContentPlain } from '@/components/shadcn-ui/dialog.tsx';
import { TUTORIAL_TIMER } from '@/lib/constants/appConstant.ts';
import { cn } from '@/lib/utils';
import { Button } from '@/components/shadcn-ui/button';
import { Eye, FolderCog, Inbox, SquareCheckBig } from 'lucide-react';
import { useWorkspaceGlobalApiQuery } from '@/service/rtkQueries/globalQuery.ts';
import { Tutorial } from '@/types/request-response/workspace/ApiRessponse';
import { LABEL } from '@/lib/constants';

export const TutorialDialog = () => {
  const [open, setOpen] = useState(false);

  const { data: workSpaceGlobal } = useWorkspaceGlobalApiQuery();

  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial>({
    id: 0,
    tutorialUrl: "https://www.youtube.com/embed/5l8fNih8SUM?si=Cu0gGo39Rr0xxx-4",
    title: "Welcome to Team Trekking!",
    isActive: true,
  });

  const onClose = () => {
    localStorage.setItem('tutorial_last_shown', Date.now().toString());
    setOpen(false);
  };

  const onSelectVideo = (index: number) => {
    if (workSpaceGlobal) {
      setSelectedTutorial(workSpaceGlobal.tutorial[index])
    }
  }

  useEffect(() => {
    const lastShown = localStorage.getItem('tutorial_last_shown');
    const now = Date.now();

    if (!lastShown || now - parseInt(lastShown, 10) > TUTORIAL_TIMER) {
      setOpen(true);
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContentPlain onClose={onClose} className='overflow-visible'>
        <div className='relative'>
          <VideoPlayer
            title="Youtube Video Player"
            src={workSpaceGlobal?.tutorial[0].tutorialUrl}
            accelerometer
            autoPlay
            clipboardWrite
            encryptedMedia
            gyroscope
            pictureInPicture
            webShare
            width={100}
            height={100}
          >
            <div className="p-6 text-center">
              <h2 className="text-lg font-semibold mb-2">
                {selectedTutorial.title}
              </h2>
              <p className="text-gray-600 mb-4">
                {LABEL.WATCH_THESE_VIDEOS}
              </p>
            </div>
          </VideoPlayer>
          <div className="absolute top-[101%] left-56 flex items-center gap-1 justify-center">
            <div className='p-[2px] rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500'>
              <Button
                size='lg'
                variant="ghost"
                onClick={() => onSelectVideo(0)}
                className='block rounded-full bg-purple-500 hover:bg-purple-500/40 px-4 w-14 h-14'>
                <div className="bg-white rounded-sm w-full py-0.5">
                  <FolderCog className='text-purple-500 mx-auto' />
                </div>
              </Button>
            </div>
            <div className='p-[2px] rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500'>
              <Button
                size='lg'
                variant="ghost" onClick={() => onSelectVideo(1)}
                className='block rounded-full bg-emerald-600 hover:bg-emerald-700 px-4 w-14 h-14'>
                <div className='bg-white rounded-sm w-full py-0.5'>
                  <SquareCheckBig className='text-emerald-600 mx-auto' />
                </div>
              </Button>
            </div>
            <div className='p-[2px] rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500'>
              <Button
                size='lg'
                variant="ghost"
                onClick={() => onSelectVideo(2)}
                className='block rounded-full bg-pink-600 hover:bg-pink-700 px-4 w-14 h-14'>
                <div className='bg-white rounded-sm w-full py-0.5'>
                  <Eye className='text-pink-600 mx-auto' />
                </div>
              </Button>
            </div>
            <div className='p-[2px] rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500'>
              <Button
                size='lg'
                variant="ghost"
                onClick={() => onSelectVideo(3)}
                className='block rounded-full bg-indigo-500 hover:bg-indigo-600 px-4 w-14 h-14'>
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
  src?: string;
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
      <div className={cn("w-full aspect-video p-0 mx-auto", className)}>
        <iframe
          width={`${width}%`}
          height={`${height}%`}
          src={`${src ? src : 'https://www.youtube.com/embed/5l8fNih8SUM?si=Cu0gGo39Rr0xxx-4'}`}
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
