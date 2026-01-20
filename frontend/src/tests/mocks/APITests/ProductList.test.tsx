import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import ProductList from '../../../components/Shop/ProductList';
import { CartProvider } from '../../../context/CartProvider';
import { BrowserRouter } from 'react-router-dom';

// 1. IMPORTUJEMY ORYGINALNĄ FUNKCJĘ, ŻEBY JĄ ZMOCKOWAĆ
import imagesDownload from '../../../api'; 

// 2. MOCKUJEMY CAŁY MODUŁ API
// Dzięki temu imagesDownload staje się "szpiegiem", którym możemy sterować
vi.mock('../../../api');

// 3. MOCKUJEMY POZOSTAŁE PROBLEMATYCZNE ELEMENTY (UI)
vi.mock('@react-spring/web', () => ({
  useSpring: () => ({}),
  animated: { div: ({ children }: any) => <div>{children}</div> },
}));

vi.mock('@radix-ui/themes', () => ({
  Flex: ({ children }: any) => <div data-testid="mock-flex">{children}</div>,
  Grid: ({ children }: any) => <div data-testid="mock-grid">{children}</div>,
  Box: ({ children }: any) => <div>{children}</div>,
  Container: ({ children }: any) => <div>{children}</div>,
  Theme: ({ children }: any) => <div>{children}</div>,
}));

vi.mock('../../../components/Shop/ProductCard', () => ({
  default: ({ title }: any) => <div data-testid="product-card-mock">{title}</div>
}));

describe('ProductList - Testy Integracyjne', () => {
  
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Powinien wyświetlić karty produktów po pobraniu danych (Happy Path)', async () => {
    // TWORZYMY SZTUCZNE DANE
    const mockData = [
      { 
        id: '1', 
        description: 'Monstera Deliciosa', // To jest nasz cel!
        alt_description: 'Monstera', 
        urls: { raw: 'u', full: 'u', regular: 'u', small: 'u', thumb: 'u' } 
      }
    ];

    // ROZKAZUJEMY FUNKCJI ZWRÓCIĆ NASZE DANE
    // Omijamy sieć, omijamy MSW, omijamy fetch. Czysta logika.
    vi.mocked(imagesDownload).mockResolvedValue(mockData);

    render(
        <CartProvider>
            <BrowserRouter>
                <ProductList />
            </BrowserRouter>
        </CartProvider>
    );

    // Czekamy na zniknięcie loadera
    await waitFor(() => {
        expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
    }, { timeout: 4000 });

    // Szukamy "Monstera". Teraz musi tu być, bo sami ją tam włożyliśmy.
    const plant = await screen.findByText(/Monstera/i, {}, { timeout: 2000 });
    expect(plant).toBeInTheDocument();
  });

  it('Powinien wyświetlić error message przy braku połączenia', async () => {
      // ROZKAZUJEMY FUNKCJI RZUCIĆ BŁĄD
      vi.mocked(imagesDownload).mockRejectedValue(new Error('Network Error'));

      render(
          <CartProvider>
            <BrowserRouter>
                <ProductList />
            </BrowserRouter>
          </CartProvider>
      );

      const error = await screen.findByText(/Failed to load/i, {}, { timeout: 4000 });
      expect(error).toBeInTheDocument();
  });
});