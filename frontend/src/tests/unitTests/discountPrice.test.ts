import { describe, it, expect, beforeEach } from 'vitest';
import { useDiscountLogic } from "../../components/ShoppingCart/discountPrice";

// STORE UNITS TESTS - ZUSTAND

describe('Funkcjonalność applyDiscount', () => {
    it('powinien aktywować zniżkę niezależnie od wielkości liter (case-insensitive)', () => {
        useDiscountLogic.getState().applyDiscount('plants20');

        // świeży stan do swprawdzenia, nie stara migawka
        const store = useDiscountLogic.getState();

        expect(store.isDiscountApplied).toBe(true);
        expect(store.discountAmount).toBe(0.2);
    });
});


describe('Funkcjonalność resetDiscount', () => {
    beforeEach(() => {
        useDiscountLogic.getState().resetDiscount();
    });

    it('powinien poprawnie zresetować zniżkę do stanu początkowego', () => {
        useDiscountLogic.getState().applyDiscount('PLANTS20');

        expect(useDiscountLogic.getState().isDiscountApplied).toBe(true);

        useDiscountLogic.getState().resetDiscount();

        expect(useDiscountLogic.getState().isDiscountApplied).toBe(false);
        expect(useDiscountLogic.getState().discountAmount).toBe(0);
    });
});

describe('Funkcjonalność calculateFinalPrice', () => {
    it('funkcja powinna poprawnie zaokrąglać ułamki w cenie końcowej', () => {

        useDiscountLogic.getState().applyDiscount('PLANTS20');

        const store = useDiscountLogic.getState();

        const price = store.calculateFinalPrice(99.99);

        expect(price).toBeCloseTo(79.99);
    });
});

//POPRAWNOŚĆ OBLICZEŃ MATEMATYCZNYCH

describe('Poprawność obliczeń dla różnych stawek', () => {
    it('calculateFinalPrice reaguje na zmiany stawki zniżki', () => {

        useDiscountLogic.setState({ 
            discountAmount: 0.5, 
            isDiscountApplied: true 
        });

        const store = useDiscountLogic.getState();

        const result = store.calculateFinalPrice(200);

        expect(result).toBe(100);
    });
});

// TEST PRZEŁĄCZANIA/NADPISYWANIA ZNIŻEK

describe('Test przełączania się zniżek', () => {
    it('po wpisaniu następnego poprawnego kodu zniżki, zniżki nie powinny się sumować', () => {

        useDiscountLogic.getState().applyDiscount('plants20');

        useDiscountLogic.getState().applyDiscount('welcome10');

        const finalState = useDiscountLogic.getState();

        expect(finalState.discountAmount).toBe(0.1);
        expect(finalState.isDiscountApplied).toBe(true);

    });
});

//TEST INVALIDACJI - NEGATIVE TEST

describe('Inwalidacja zniżek', () => {
    it('wpisanie niepoprawnego kodu po poprawnym powinno wyzerować wcześniejszą zniżkę', () => {

        useDiscountLogic.getState().applyDiscount('spring');
        useDiscountLogic.getState().applyDiscount('ZLY_KOD');

        const state = useDiscountLogic.getState();

        expect(state.isDiscountApplied).toBe(false);
        expect(state.discountAmount).toBe(0);
    });
});