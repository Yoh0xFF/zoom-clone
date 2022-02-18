import { RootState } from '@app/store/store';

export const selectIsRoomHost = (state: RootState) => {
  return state.connection.isRoomHost;
};

export const selectConnectOnlyWithAudio = (state: RootState) => {
  return state.connection.connectOnlyWithAudio;
};

export const selectRoomId = (state: RootState) => {
  return state.connection.roomId;
};

export const selectIdentity = (state: RootState) => {
  return state.connection.identity;
};