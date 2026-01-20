import { describe, it, expect } from 'vitest';
import { filterProductsByType, type Product, mapImagesToProducts, type UnsplashImage } from '../../components/Shop/productFilters';


// LOGIC UNITS 

//Factory Function dla ułatwienia "udawanych" produktów 
const createMockProduct = (id: string, type: string): Product => ({
    id,
    type, 
    price: 100,
    description: null,
    alt_description: null,
    urls: { raw: '', full: '', regular: '', small: '', thumb: '' }
});

const createMockUnsplashImage = (id: string): UnsplashImage => ({
    id,
    description: null,
    alt_description: null,
    urls: { raw: '', full: '', regular: '', small: '', thumb: '' } 
});


// TEST FUNKCJI FILTROWANIA 

describe('Filtracja produktów', () => {
    it('powinien zwrócić tylko kaktusy, gdy wybrany filtr to cactus', () => {
        // 1. Przygotowanie danych (Arrange)
        const products = [
            createMockProduct('1', 'cactus'),
            createMockProduct('2', 'leaf'),
        ];

        // 2. Wykonaj akcję (Act)
        const result = filterProductsByType(products, 'cactus');

        // 3. Sprawdzenie wyniku (Assert)
        expect(result).toHaveLength(1);
        expect(result[0].type).toBe('cactus');
    });
});

// TEST MAPOWANIA - CZY ID ZMIENIA SIĘ NA DETERMINISTYCZNY TYP REGRESJI I STABILNOŚCI

describe('Mapowanie id produktów na CharCodeSum', () => {
    it('powinien zwrócić dwa takie same produkty dla tego samego ID obrazu', () => {

        //94805710675
        const image1 = createMockUnsplashImage('94805710675');
        const image2 = createMockUnsplashImage('94805710675');

    
        const [product1] = mapImagesToProducts([image1]);
        const [product2] = mapImagesToProducts([image2]);
    
        expect(product1.type).toBe(product2.type);
        expect(product1.price).toBe(product2.price);
        expect(product1).toStrictEqual(product2);
    });

});

// TEST LOGIKI MATEMATYCZNEJ

describe('Obliczanie ceny produktu', () => {
    it('każda cena powinna być w przedziale 50-500', () => {
        const products = [
            createMockUnsplashImage('plants-123'),
            createMockUnsplashImage('leaf'),
            createMockUnsplashImage('flower-648393905476'),
            createMockUnsplashImage('6655'),
            createMockUnsplashImage('68975478'),
            createMockUnsplashImage('8745309489243647')
        ]
        const results = mapImagesToProducts(products);
        results.forEach((product) => {
            expect(product.price).toBeGreaterThanOrEqual(50);
            expect(product.price).toBeLessThanOrEqual(500);
        });
    });
});

// DATA INTEGRITY

describe('SPrawdzenie logiki filtra dla danych o tych sdamych id ale różnych typach', () => {
    it('algorytm powinien zwróić listę o długości 2 niezależnie od błędów w danych', () => {
        const products = [
            createMockProduct('1', 'cactus'),
            createMockProduct('1', 'flower'),
            createMockProduct('2', 'flower'),
        ];

        const result = filterProductsByType(products, 'flower');

        expect(result).toHaveLength(2);
        expect(result[0].id).toBe('1');
        expect(result[1].id).toBe('2');


    });
});