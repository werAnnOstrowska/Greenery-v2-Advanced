import { test, expect } from '@playwright/test';

test.describe('Sklep - Podstawowe funkcjonalności - E2E', () => {

  test('Powinien dodać produkt do koszyka i przejść do strony koszyka', async ({ page }) => {
    // OPCJONALNIE: Mockujemy odpowiedź z API, żeby test był błyskawiczny i niezależny od internetu
    await page.route('**/search/photos**', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          results: [{
            id: '1',
            description: 'Testowa Roslina',
            urls: { small: 'https://via.placeholder.com/150' },
            alt_description: 'Testowa Roslina'
          }]
        }),
      });
    });

    // 1. Wejdź na stronę
    await page.goto('http://localhost:5173/shop');

    // 2. Poczekaj na przycisk "Dodaj do koszyka" (szukamy po aria-label lub ikonie)
    const addToCartBtn = page.getByLabel('add to cart').first();
    
    // Czekamy aż przycisk będzie widoczny
    await expect(addToCartBtn).toBeVisible({ timeout: 15000 });
    await addToCartBtn.click();

    // 3. Sprawdź czy Badge (licznik) przy ikonie koszyka pokazuje '1'
    const badge = page.locator('.MuiBadge-badge');
    await expect(badge).toHaveText('1');

    // 4. Kliknij w główny koszyk (nawigacja)
    await page.getByLabel('shopping cart').click();

    // 5. Sprawdź czy jesteśmy na podstronie koszyka
    await expect(page).toHaveURL(/.*shoppingcart/);

    // 6. Sprawdź czy w koszyku widać tekst informujący o zamówieniu
    // (Dostosuj tekst do tego, co faktycznie masz w ShoppingCart.tsx)
    await expect(page.getByText(/Podsumowanie|Twoje zamówienie|Order/i)).toBeVisible();
  });

  test('Filtrowanie produktów powinno zwrócić tylko produkty o danym typie', async ({page}) => {

    await page.goto('http://localhost:5173/shop');

    const cactusFilter = page.getByRole('checkbox', {name: 'Kaktusy'});
    await cactusFilter.check();

    await expect(cactusFilter).toBeChecked();

    await expect(page.getByRole('button', { name: 'green leaf plant in white' })).toBeVisible();

    const otherPlant = page.getByText("Two woman's");
    await expect(otherPlant).not.toBeVisible();
  });

  //czy guziki plus minus działają i zmieniają całkowitą ilość produktów w koszyku
  test('Testowanie zmiany ilości produktów przez guziki + i -', async ({ page }) => {
    await page.goto('http://localhost:5173/shop');

    //dodanie dwóch różnych roślin do koszyka 
    const addBtn = page.getByLabel('add to cart');
    await addBtn.nth(0).click();
    await addBtn.nth(1).click();

    //przejście do summaryCart
    await page.getByRole('link', { name: 'shopping cart' }).click();

    //sprawdzenie wspólnej ilości produktów w kosyzku - weryfikacja nagłówka 
    await expect(page.getByRole('heading', { name: /Order Summary \(2 items\)/i })).toBeVisible();
  
    const increaseBtn = page.getByLabel('increase quantity');
    const decreaseBtn = page.getByLabel('decrease quantity');

    //zwiększamy ilość pierwszej rośliny
    await increaseBtn.nth(0).click();
    //
    await expect(page.getByRole('heading', { name: /Order Summary \(3 items\)/i })).toBeVisible();

    //ponownie zmniejszamy ilość pierwszej rośliny

    await decreaseBtn.nth(0).click();

    await expect(page.getByRole('heading', { name: /Order Summary \(2 items\)/i })).toBeVisible();

    //zwiększenie ilości drugiej rośliny
    await increaseBtn.nth(1).click();

    //sprawdzenie, czy 1 rośliny jest 1 sztuka
    await expect(page.getByText('1', { exact: true })).toBeVisible();

    //sprawdzenie, czy drugiej rośliny są 2 sztuki
    await expect(page.getByText('2', { exact: true })).toBeVisible();

    //sprawdzenie poprawności dodawania produktów w koszyku po używaniu guzików
    await expect(page.getByRole('heading', { name: /Order Summary \(3 items\)/i })).toBeVisible();
  });

  //czy pusty koszyk wyświetla informacje o pustym kosyzku 
  test('SPrawdzenie wyświetlania się pustego koszyka', async ({ page }) => {
    await page.goto('http://localhost:5173/shop');
    //przejście do summaryCart
    await page.getByLabel('shopping cart').click();
    //sprawdzenie czy ilość produktów w koszyu wynosi 0
    await expect(page.getByRole('heading', { name: /Order Summary \(0 items\)/i })).toBeVisible();
    //SAprawdzenie wyświetlania się tekstu o pustym kosyzku 
    const emptyMessage = page.getByText(/Your cart is empty/i);
    await expect(emptyMessage).toBeVisible();

    //sprawdzenie czy brak kwoty zakupów wyświetla się w poprawny sposób
    const totalAmount = page.getByRole('heading', {name: /Total: \$0.00/i})
    await expect(totalAmount).toBeVisible();

    //sprawdzenie, czy reserveBtn się nie wyświetla 
    const reserveBtn = page.getByLabel('reserveBtn');
    await expect(reserveBtn).not.toBeVisible();

  });


  //czy powrot z koszyka przywraca nas do strony głównej 
  test('SPrawdzanie działanie gzuika "powrót do sklepu"', async ({ page }) => {
    await page.goto('http://localhost:5173/shop');
    const shoppingCartBtn = page.getByRole('link', { name: 'shopping cart' });
    await shoppingCartBtn.click();

    await expect(page.getByRole('heading', { name: /Order Summary \(0 items\)/i })).toBeVisible();
    const backBtn = page.getByLabel('back to shop');
    await backBtn.click();

    await expect(page).toHaveURL('http://localhost:5173/shop');
    
    await expect(page.getByText(/Filtruj rośliny/i)).toBeVisible();

  });

  //test działania kodu rabatowego 
  test('Sprawdzenie poprawności działania kodu rabatowego na cenę', async ({ page }) => {
    await page.goto('http://localhost:5173/shop');

    //dodanie produktu do koszyka 
    const addBtn = page.getByLabel('add to cart');
    await addBtn.nth(0).click();

    const shoppingCartBtn = page.getByRole('link', { name: 'shopping cart' });
    await shoppingCartBtn.click();

    const discountInput = page.getByRole('textbox', { name: 'DISCOUNT CODE' });
    await discountInput.click();
    await discountInput.fill('PLANTS20');
    await discountInput.press('Enter');

    //asercja 
    await expect(page.getByText('Discount applied! (-20%)')).toBeVisible();
    await expect(page.getByText('Old price: $')).toBeVisible();
  });

  test('Sprawdzenie funkcjonalności modalu rezerwacji', async ({ page }) => {
    await page.goto('http://localhost:5173/shop');

    const addBtn = page.getByLabel('add to cart');
    await addBtn.nth(0).click();

    const shoppingCartBtn = page.getByRole('link', { name: 'shopping cart' });
    await shoppingCartBtn.click();

    await page.getByRole('button', { name: 'reserveBtn' }).click();


    await expect(page.getByRole('heading', { name: 'Finalizacja rezerwacji' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Imię' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Potwierdzam zamówienie' })).toBeVisible();
  });

  test('Sprawdzenie poprawności wyświetlania filtrowanych wyuników', async ({ page }) => {

    await page.goto('http://localhost:5173/shop');

    //sprawdzenie filttru kaktusów
    await page.getByRole('checkbox', { name: 'Kaktusy' }).check();

    await expect(page.getByText(/flower/i)).not.toBeVisible();
    await expect(page.getByText(/leaf/i)).not.toBeVisible();

    await page.getByRole('checkbox', { name: 'Liściaste' }).check();

    await expect(page.getByText(/flower/i)).not.toBeVisible();
    await expect(page.getByText(/cactus/i)).not.toBeVisible();

    await page.getByRole('checkbox', { name: 'Kwiaty' }).check();

    await expect(page.getByText(/cactus/i)).not.toBeVisible();
    await expect(page.getByText(/leaf/i)).not.toBeVisible();

  });

  test('Sprawdzenie poprawności zupełnego usunięcia produktów z koszyka za pomocą guzika usunięcia', async ({ page }) => {
    await page.goto('http://localhost:5173/shop');

    const addBtn = page.getByLabel('add to cart');
    await addBtn.nth(0).click();

    const shoppingCartBtn = page.getByRole('link', { name: 'shopping cart' });
    await shoppingCartBtn.click();

    const increaseBtn = page.getByLabel('increase quantity');
    await increaseBtn.nth(0).click();

    await expect(page.getByText('2', { exact: true })).toBeVisible();

    const deleteBtn = page.getByRole('button', { name: 'delete item' });
    await deleteBtn.click();

    await expect(page.getByText('Your cart is empty.')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Order Summary (0 items)' })).toBeVisible();
  });

  test('Sprawdzenie dostępności procesu rezerwacji na urządzeniu mobilnym', async ({ page }) => {
    // Ustawiamy widok typowy dla iPhone 12/13/14
    await page.setViewportSize({ width: 390, height: 844 });
    
    await page.goto('http://localhost:5173/shop');

    // 1. Dodanie produktu na mobile
    const addBtn = page.getByLabel('add to cart');
    await addBtn.nth(0).click();

    // 2. Przejście do koszyka
    await page.getByLabel('shopping cart').click();

    // 3. Sprawdzenie, czy przycisk rezerwacji jest widoczny i klikalny na małym ekranie
    const reserveBtn = page.getByLabel('reserveBtn');
    await expect(reserveBtn).toBeVisible();
    
    // 4. Próba otwarcia modalu na mobile
    await reserveBtn.click();
    
    // 5. Weryfikacja, czy modal się pojawił
    await expect(page.getByRole('heading', { name: 'Finalizacja rezerwacji' })).toBeVisible();
  });
});