import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import ShoppingCartBtn from '../../../components/Shop/ShoppingCartBtn';
import SummaryCart from '../../../components/ShoppingCart/SummaryCart';
import { useCart } from '../../../context/useCart';
import { useModalStore } from '../../../components/ShoppingCart/useModalStore';
import type { CartItem } from '../../../context/CartProvider';

//mock hooka useCart

vi.mock('../../../context/useCart', () => ({
    useCart: vi.fn(),
}));

//mock store modal

vi.mock('../../../components/ShoppingCart/useModalStore', () => ({
    useModalStore: vi.fn(),
}));

describe('System koszyka - tetsy z mockami', () => {

    //czyszcenie historii wywołań przed każdym testem 
    beforeEach(() => {
        vi.clearAllMocks();
    })

    //testy

    it('Powinen wyświetlić komunikat "Your cart is empty" po najechaniu przy pustym koszyku', () => {

        //konfiguracja koszyka
        vi.mocked(useCart).mockReturnValue({
            cartItems: [],
            addToCart: vi.fn(),
            removeFromCart: vi.fn(),
            decrementQuantity: vi.fn(),
            clearCart: vi.fn(),
        });

        //renderowanie 
        render(
            <BrowserRouter>
                <ShoppingCartBtn />
            </BrowserRouter>
        );

        //symulacja najechania
        //link, nie button - bo material UI
        const button = screen.getByRole('link', { name: /shopping cart/i });
        fireEvent.mouseEnter(button);

        //asercja - sprawdzenie wyniku 
        expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument();
    });

    it('SummaryCart powinien poprawnie wyświetlać elementy w koszyku', () => {
        const mockItems: CartItem[] = [
            {
            id: '1',
            title: 'Kaktus',
            img: "",
            quantity: 1,
            price: 10
            },
            {
            id: '2',
            title: 'Sukulent',
            img: "",
            quantity: 1,
            price: 200
            },
            {
            id: '3',
            title: 'Monstera',
            img: "",
            quantity: 1,
            price: 100
            }
        ];

        vi.mocked(useCart).mockReturnValue({
            cartItems: mockItems,
            addToCart: vi.fn(),
            removeFromCart: vi.fn(),
            decrementQuantity: vi.fn(),
            clearCart: vi.fn(),
        });

        render(
            <BrowserRouter>
                <SummaryCart />
            </BrowserRouter>
        );

        expect(screen.getAllByRole('listitem')).toHaveLength(3);
        
        //         results.forEach((product) => {
        //     expect(product.price).toBeGreaterThanOrEqual(50);
        //     expect(product.price).toBeLessThanOrEqual(500);
        // });

        mockItems.forEach((item) => {
            expect(screen.getByText(new RegExp(item.title, 'i'))).toBeInTheDocument();

            const expectedPrice = `$${item.price.toFixed(2)}`;
            expect(screen.getByText(expectedPrice, {exact: false})).toBeInTheDocument();
        });

    });

    it('kliknięcie "usuń z kosyzka" powinno wysłać sygnał do CartContext', () => {
        
        const removeSpy = vi.fn();

        const mockItems: CartItem[] = [
            {
            id: '1',
            title: 'Kaktus',
            img: "",
            quantity: 1,
            price: 10
            },
        ];

        vi.mocked(useCart).mockReturnValue({
            cartItems: mockItems,
            addToCart: vi.fn(),
            removeFromCart: removeSpy,
            decrementQuantity: vi.fn(),
            clearCart: vi.fn(),
        });

        render(
            <BrowserRouter>
                <SummaryCart />
            </BrowserRouter>
        );

        const button = screen.getByRole('button', { name: /delete item/i });
        fireEvent.click(button);

        expect(removeSpy).toHaveBeenCalledWith('1');
    });

    it('shoppingCartBtn powinien wyświetlać poprawną liczbę przedmiotów w koszyku w badge', () => {

        const mockItems: CartItem[] = [
            {
            id: '1',
            title: 'Kaktus',
            img: "",
            quantity: 3,
            price: 10
            },
            {
            id: '2',
            title: 'Sukulent',
            img: "",
            quantity: 2,
            price: 200
            },
        ];

        vi.mocked(useCart).mockReturnValue({
            cartItems: mockItems,
            addToCart: vi.fn(),
            removeFromCart: vi.fn(),
            decrementQuantity: vi.fn(),
            clearCart: vi.fn(),
        });

        render(
            <BrowserRouter>
                <ShoppingCartBtn />
            </BrowserRouter>
        );

        const badge = screen.getByLabelText(/badge/i);

        expect(badge).toHaveTextContent('5');

    });

    it('SummaryCart poprawnie otwiera modal do rezerwacji', () => {

        const mockItems: CartItem[] = [
            {
            id: '1',
            title: 'Kaktus',
            img: "",
            quantity: 3,
            price: 10
            },
        ];

        const openModalSpy = vi.fn();

        // vi.mocked(useModalStore).mockReturnValue({
        //     isReserveOpen: false,
        //     openReserve: openModalSpy,
        //     closeReserve: vi.fn(),
        // });

        const mockStoreState = {
            isReserveOpen: false,
            openReserve: openModalSpy,
            closeReserve: vi.fn(),
        };

        vi.mocked(useModalStore).mockImplementation((selector) => selector(mockStoreState));

        vi.mocked(useCart).mockReturnValue({
            cartItems: mockItems,
            addToCart: vi.fn(),
            removeFromCart: vi.fn(),
            decrementQuantity: vi.fn(),
            clearCart: vi.fn(),
        });

        render(
            <BrowserRouter>
                <SummaryCart />
            </BrowserRouter>
        );

        const button = screen.getByRole('button', { name: /reserveBtn/i });
        fireEvent.click(button);

        expect(openModalSpy).toHaveBeenCalledTimes(1);

    });

});