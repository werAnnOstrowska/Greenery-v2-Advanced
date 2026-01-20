import { describe, it, expect } from 'vitest';
import { calculateBaseTotal, calculateTotalQuantity, formatDisplayPrice, getPlantImage } from '../../components/ShoppingCart/cartCalculations';

describe('Logika finansowa kosyzka', () => {
    it('calculateBaseTotal poprawnie sumuje cenę i ilość', () => {
        const items = [
            {price: 10, quantity: 2},
            {price: 5, quantity: 1}
        ];

        expect(calculateBaseTotal(items)).toBe(25);
    });

    it('calcuteTotalQuantity poprawnie dodaje ilości produtów w koszyku', () => {
        const items = [
            {quantity: 10},
            {quantity: 1},
            {quantity: 5}
        ];

        expect(calculateTotalQuantity(items)).toBe(16);
    });

    it('getPlantImage poprawnie implementuje fallback pattern dla brakujących URL zdjęć', () => {
        // const links = [
        //     {imgUrl: 'https://images.dog.ceo/breeds/cockapoo/bubbles2.jpg'},
        //     {imgUrl: undefined}
        // ];

        const link1 = 'https://images.dog.ceo/breeds/cockapoo/bubbles2.jpg';
        const link2 = undefined;


        expect(getPlantImage(link1)).toBe('https://images.dog.ceo/breeds/cockapoo/bubbles2.jpg');
        expect(getPlantImage(link2)).toBe('/default-plant.png');
    });

    it('formatDisplayPrice poprawnie formatuje liczbę pokazywaną klientowi', () => {
        const price1 = 100;
        const price2 = 12.593;

        expect(formatDisplayPrice(price1)).toBe('$100.00');
        expect(formatDisplayPrice(price2)).toBe('$12.59');
    })
})