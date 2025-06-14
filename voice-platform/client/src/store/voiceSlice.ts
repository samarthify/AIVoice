import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VoiceState {
  isRecording: boolean;
  audioBlob: Blob | null;
}

const initialState: VoiceState = {
  isRecording: false,
  audioBlob: null,
};

const voiceSlice = createSlice({
  name: 'voice',
  initialState,
  reducers: {
    setRecording: (state, action: PayloadAction<boolean>) => {
      state.isRecording = action.payload;
    },
    setAudioBlob: (state, action: PayloadAction<Blob | null>) => {
      state.audioBlob = action.payload;
    },
  },
});

export const { setRecording, setAudioBlob } = voiceSlice.actions;
export default voiceSlice.reducer; 