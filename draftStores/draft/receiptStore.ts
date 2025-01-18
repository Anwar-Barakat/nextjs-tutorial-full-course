import { Receipt } from "@/types/Receipt";
import { create } from "zustand";

interface ReceiptStore {
  receipts: Receipt[];
  addReceipt: (receipt: Receipt) => void;
  removeReceipt: (id: string) => void;
  resetReceipts: () => void;
  editReceipt: (id: string) => void;
  updateReceipt: (id: string, updatedReceipt: Partial<Receipt>) => void;
}

export const useReceiptStore = create<ReceiptStore>((set) => ({
  receipts: [],
  addReceipt: (receipt: Receipt) =>
    set((state) => {
      const nextId =
        state.receipts.length > 0
          ? Math.max(...state.receipts.map((r) => parseInt(r.id))) + 1
          : 1;
      return {
        receipts: [...state.receipts, { ...receipt, id: nextId.toString() }],
      };
    }),

  editReceipt: (id: string) =>
    set((state) => ({
      receipts: state.receipts.map((r) =>
        r.id === id ? { ...r, isEditing: true } : r
      ),
    })),

  updateReceipt: (id: string, updatedReceipt: Partial<Receipt>) =>
    set((state) => ({
      receipts: state.receipts.map((r) =>
        r.id === id ? { ...r, ...updatedReceipt } : r
      ),
    })),

  removeReceipt: (id: string) =>
    set((state) => ({
      receipts: state.receipts.filter((receipt) => receipt.id !== id),
    })),

  resetReceipts: () => set(() => ({ receipts: [] })),
}));
