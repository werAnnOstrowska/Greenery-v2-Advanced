import {create} from 'zustand';

type PriceState = {
    isDiscountApplied: boolean;
    discountAmount: number;
    applyDiscount: (code: string ) => void;
    resetDiscount: () => void;
    calculateFinalPrice: (basePrice: number) => number;
};


// Definiujemy dostępne kody i ich wartości (0.1 = 10%, 0.2 = 20%)
const DISCOUNT_CODES: Record<string, number> = {
    'PLANTS20': 0.2,
    'WELCOME10': 0.1,
    'SPRING': 0.15,
};

export const useDiscountLogic = create<PriceState>((set, get) => ({
    isDiscountApplied: false,
    discountAmount: 0,

    applyDiscount: (code: string) => {
        const normalizedCode = code.toUpperCase();
        
        // Sprawdzamy, czy kod istnieje w naszej mapie
        if (normalizedCode in DISCOUNT_CODES) {
            set({ 
                isDiscountApplied: true, 
                discountAmount: DISCOUNT_CODES[normalizedCode] 
            });
        } else {
            // Jeśli kodu nie ma, zerujemy zniżkę
            set({ isDiscountApplied: false, discountAmount: 0 });
        }
    },

    resetDiscount: () => set({ isDiscountApplied: false, discountAmount: 0 }),

    calculateFinalPrice: (basePrice: number) => {
        const { isDiscountApplied, discountAmount } = get();
        if (basePrice < 0) return 0;
        const result = isDiscountApplied ? basePrice * (1-discountAmount) : basePrice;
        return Math.round(result *100)/100;
    }
}));
