import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface WinningSymbol {
  imageURL: string;
  value: number;
  name: string;
  _id?: string;
}

interface RewardState {
  reward: string;
  winningSymbol: WinningSymbol | null;
  redemptionCode: string;
  setReward: (reward: string) => void;
  setWinningSymbol: (symbol: WinningSymbol) => void;
  setRedemptionCode: (code: string) => void;
  reset: () => void;
}

const useReward = create<RewardState>()(
  persist(
    (set) => ({
      reward: '',
      winningSymbol: null,
      redemptionCode: '',
      setReward: (reward: string) => {
        set({ reward });
      },
      setWinningSymbol: (symbol: WinningSymbol) => {
        set({
          winningSymbol: symbol,
          reward: symbol.name,
        });
      },
      setRedemptionCode: (code: string) => {
        set({ redemptionCode: code });
      },
      reset: () => {
        set({ reward: '', winningSymbol: null, redemptionCode: '' });
      },
    }),
    {
      name: 'user-state',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export { useReward };
