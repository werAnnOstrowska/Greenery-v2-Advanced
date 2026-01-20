// src/components/Shop/productFilters.ts

/**
 * Typ odpowiadający strukturze danych z Unsplash API.
 * Definiujemy go tutaj, aby plik był samowystarczalny i łatwy do testowania.
 */
export type UnsplashImage = {
  id: string;
  description: string | null;
  alt_description: string | null;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
};

/**
 * Typ produktu rozszerzony o dane biznesowe (typ rośliny i cenę),
 * które są niezbędne do działania sklepu i testów.
 */
export type Product = UnsplashImage & {
  type: string;
  price: number;
};

/**
 * Funkcja mapująca surowe obrazy z API na produkty.
 * Generuje stabilną cenę i typ na podstawie ID obrazu, co pozwala na 
 * powtarzalne wyniki w testach jednostkowych.
 */
export const mapImagesToProducts = (images: UnsplashImage[]): Product[] => {
  return images.map((img) => {
    // Obliczamy sumę kodów ASCII znaków w ID. 
    // Jawne typowanie (acc: number, char: string) zapobiega błędowi 'implicit any'.
    const charCodeSum = img.id.split('').reduce((acc: number, char: string) => {
      return acc + char.charCodeAt(0);
    }, 0);

    const types = ["flower", "leaf", "cactus"];
    
    return {
      ...img,
      // Wybieramy typ na podstawie sumy kontrolnej ID
      type: types[charCodeSum % types.length],
      // Generujemy cenę w przedziale 50 - 500 PLN
      price: (charCodeSum % 450) + 50,
    };
  });
};

/**
 * Funkcja filtrująca listę produktów. 
 * Idealna do testowania przypadków brzegowych (np. brak wyników).
 */
export const filterProductsByType = (products: Product[], type: string): Product[] => {
  if (type === "all") return products;
  return products.filter((p) => p.type === type);
};