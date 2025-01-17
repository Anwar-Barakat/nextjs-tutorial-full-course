import { create } from "zustand";

interface CounterStore {
  count: number;
  increment: () => void;
  decrement: () => void;
  incrementBy: (value: number) => void;
  decrementBy: (value: number) => void;
  reset: () => void;
}

export const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  incrementBy: (value: number) =>
    set((state) => ({ count: state.count + value })),
  decrementBy: (value: number) =>
    set((state) => ({ count: state.count - value })),
  reset: () => set(() => ({ count: 0 })),
}));
