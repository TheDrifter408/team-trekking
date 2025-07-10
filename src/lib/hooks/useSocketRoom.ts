import { useEffect } from 'react';
import { SOCKET_ROOM_ACTION } from '../constants';

interface UseSocketRoomOptions<T> {
  roomPrefix: string;
  roomSuffix: string | undefined;
  socket: any;
  onData: (data: T) => void;
  joinEvent?: string;
  leaveEvent?: string;
}

export function useSocketRoom<T>({
  roomPrefix,
  roomSuffix,
  socket,
  onData,
  joinEvent = SOCKET_ROOM_ACTION.JOIN_ROOM,
  leaveEvent = SOCKET_ROOM_ACTION.LEAVE_ROOM,
}: UseSocketRoomOptions<T>) {
  useEffect(() => {
    if (!roomSuffix) return;

    const room = `${roomPrefix}${roomSuffix}`;

    socket.emit(joinEvent, { room });
    socket.on(room, (socketData: { data: T }) => {
      onData(socketData.data);
    });

    return () => {
      socket.emit(leaveEvent, { room });
      socket.off(room);
    };
  }, [roomPrefix, roomSuffix]);
}
