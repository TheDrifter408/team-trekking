'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContentPlain } from '@/components/shadcn-ui/dialog.tsx';
import { TUTORIAL_TIMER } from '@/lib/constants/appConstant.ts';

export const TutorialDialog = () => {
  const [open, setOpen] = useState(false);

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
      <DialogContentPlain onClose={onClose}>
        <div className="w-full">
          <div className="w-full aspect-video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/5l8fNih8SUM?si=Cu0gGo39Rr0xxx-4"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div className="px-6 py-6 text-center">
            <h2 className="text-lg font-semibold mb-2">
              Welcome to Team Trekking!
            </h2>
            <p className="text-gray-600 mb-4">
              Watch this quick video to know how Team Trekking can transform
              your productivity.
            </p>
          </div>
        </div>
      </DialogContentPlain>
    </Dialog>
  );
};
