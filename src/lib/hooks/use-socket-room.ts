import { useEffect } from 'react';
import { SOCKET_CONNECTION, SOCKET_ROOM_ACTION } from '../constants';

interface UseSocketRoomOptions<T> {
  roomPrefix: string;
  roomSuffix: string | undefined;
  socket?: any;
  joinEvent?: string;
  leaveEvent?: string;
  onData: (data: T) => void;
}

export function useSocketRoom<T>({
  roomPrefix,
  roomSuffix,
  socket = SOCKET_CONNECTION,
  joinEvent = SOCKET_ROOM_ACTION.JOIN_ROOM,
  leaveEvent = SOCKET_ROOM_ACTION.LEAVE_ROOM,
  onData,
}: UseSocketRoomOptions<T>) {
  useEffect(() => {
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
