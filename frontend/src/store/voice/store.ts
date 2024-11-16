import { create } from 'zustand';
import { IAudioStore } from './types';



const useAudioStore = create<IAudioStore>((set) => ({
  activePlayer: null,
  setActivePlayer: (player) => set({ activePlayer: player }),
  
}));

export default useAudioStore;