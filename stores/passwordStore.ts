import { create } from "zustand";

interface PasswordState {
  length: number;
  includeNumbers: boolean;
  includeSymbols: boolean;
  includeUppercase: boolean;
  includeLowercase: boolean;
  password: string;
  generatePassword: () => void;
  setLength: (length: number) => void;
  toggleIncludeNumbers: () => void;
  toggleIncludeSymbols: () => void;
  toggleIncludeUppercase: () => void;
  toggleIncludeLowercase: () => void;
}

const usePasswordStore = create<PasswordState>((set) => ({
  length: 10,
  includeNumbers: true,
  includeSymbols: true,
  includeUppercase: true,
  includeLowercase: true,
  password: "",
  generatePassword: () => {
    set((state) => {
      const numbers = "0123456789";
      const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
      const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const lowercase = "abcdefghijklmnopqrstuvwxyz";

      let characters = "";
      let password = "";

      if (state.includeNumbers) {
        characters += numbers;
      }

      if (state.includeSymbols) {
        characters += symbols;
      }

      if (state.includeUppercase) {
        characters += uppercase;
      }

      if (state.includeLowercase) {
        characters += lowercase;
      }

      for (let i = 0; i < state.length; i++) {
        password += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }

      return { password };
    });
  },
  setLength: (length: number) => {
    set({ length });
  },
  toggleIncludeNumbers: () => {
    set((state) => ({ includeNumbers: !state.includeNumbers }));
  },
  toggleIncludeSymbols: () => {
    set((state) => ({ includeSymbols: !state.includeSymbols }));
  },
  toggleIncludeUppercase: () => {
    set((state) => ({ includeUppercase: !state.includeUppercase }));
  },
  toggleIncludeLowercase: () => {
    set((state) => ({ includeLowercase: !state.includeLowercase }));
  },
}));

export default usePasswordStore;
