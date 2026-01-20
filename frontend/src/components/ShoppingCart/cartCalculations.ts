// Funkcja obliczająca sumę wartości produktów
export const calculateBaseTotal = (items: { price: number, quantity: number }[]) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

// Funkcja obliczająca łączną liczbę sztuk w koszyku
export const calculateTotalQuantity = (items: { quantity: number }[]) => {
  return items.reduce((sum, item) => sum + item.quantity, 0);
};

// Funkcja formatująca cenę do wyświetlania
export const formatDisplayPrice = (price: number) => `$${price.toFixed(2)}`;

// Funkcja zwracająca domyślny obrazek, jeśli URL jest pusty
export const getPlantImage = (imgUrl: string | undefined | null) => imgUrl || '/default-plant.png';