![Header](readme_img/logo.png)

# Greenery v2.0 - Advanced React E-commerce

Rozbudowana wersja projektu sklepu z roślinami. Ta iteracja skupia się na **jakości kodu (QA)**, pełnym pokryciu testami (E2E + Unit), zaawansowanym zarządzaniu stanem oraz responsywności interfejsu (RWD).

## 🚀 Key Improvements vs v1.0

W porównaniu do pierwotnej wersji (MVP), projekt został znacząco rozbudowany technicznie:

### 1. Responsywność (RWD) & UI/UX
* **Mobile-First Grid**: Implementacja responsywnej siatki produktów (przejście z 3 kolumn na desktopie do 1 na mobile) przy użyciu Radix UI Grid.
* **Adaptive Navigation**: Przebudowa nagłówka (`Header`) i paska nawigacji (`Navbar`) z użyciem CSS Media Queries oraz Flexbox, zapewniająca czytelność na małych ekranach.
* **Micro-interactions**: Dodanie animacji przycisków i kart produktów przy użyciu `react-spring` (efekt hover, scale).

### 2. Rozszerzona Logika Biznesowa
* **Cart Management**: Pełna obsługa koszyka – dodawanie, usuwanie pojedynczych sztuk (`decrement`), całkowite czyszczenie pozycji (`remove`) oraz obsługa stanów pustych.
* **Discount System**: Implementacja logiki kodów rabatowych (np. `PLANTS20`), dynamicznie przeliczających sumę zamówienia.
* **Modal & State**: Wykorzystanie **Zustand** do zarządzania stanem globalnym modali (proces rezerwacji) w separacji od kontekstu koszyka.

### 3. Zaawansowane Testowanie
Wprowadzenie rygorystycznej strategii testowej obejmującej dwie warstwy:
* **Vitest**: Testy jednostkowe i integracyjne komponentów (mockowanie hooków, kontekstu i API).
* **Playwright**: Testy End-to-End (E2E) symulujące pełne ścieżki użytkownika w przeglądarce.

---

## 🧪 Testing Strategy

Projekt zawiera 10 kluczowych scenariuszy E2E (Playwright), które gwarantują stabilność krytycznych funkcji aplikacji:

| ID | Test Case | Opis Testu (Co jest sprawdzane?) |
|:---|:---|:---|
| **01** | **Purchase Flow** | Weryfikacja "Happy Path": dodanie produktu do koszyka i poprawna nawigacja do podsumowania. |
| **02** | **Dynamic Filtering** | Sprawdzenie, czy wybór kategorii (np. "Kaktusy") poprawnie filtruje listę produktów i usuwa niepasujące elementy. |
| **03** | **Quantity Logic (+)** | Interaktywne zwiększanie liczby sztuk w koszyku i weryfikacja natychmiastowej aktualizacji UI. |
| **04** | **Quantity Logic (-)** | Zmniejszanie liczby sztuk oraz automatyczne usuwanie produktu z koszyka po osiągnięciu ilości 0. |
| **05** | **Empty State** | Weryfikacja komunikatów "Your cart is empty" oraz blokady przycisku rezerwacji przy pustym koszyku. |
| **06** | **Back Navigation** | Sprawdzenie poprawności powrotu z koszyka do sklepu (przycisk "Shop More") i zachowania stanu aplikacji. |
| **07** | **Discount System** | Walidacja kodu `PLANTS20` – sprawdzenie przeliczenia ceny (Old Price vs New Price) i komunikatu sukcesu. |
| **08** | **Reservation Modal** | Weryfikacja otwarcia modalu (Zustand) i obecności formularza po kliknięciu "Reserve Now". |
| **09** | **Deep Clean** | Sprawdzenie, czy ikona kosza (`delete`) usuwa produkt całkowicie, niezależnie od liczby sztuk w wierszu. |
| **10** | **Mobile Accessibility** | Test funkcjonalny na symulowanym urządzeniu (Viewport 375px) – weryfikacja dostępności przycisków i nawigacji na telefonie. |

---

## 🛠️ Tech Stack

* **Core**: React 18, TypeScript, Vite
* **UI Frameworks**: Material UI (MUI), Radix UI Themes
* **State Management**: React Context API (Cart), Zustand (Modals)
* **Form Handling**: Formik
* **Animation**: React Spring
* **Testing**: Playwright (E2E), Vitest (Unit/Integration)

---

## ⚙️ Installing & Running

Follow the guide beneath to set up the project locally:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/werAnnOstrowska/projektReact.git](https://github.com/werAnnOstrowska/projektReact.git)
   cd projektReact
   ```

2. **Install dependecies**<br>

```
 npm install
```

3. **Setup environmental variables: create a .env file in the root directory**<br>

    ```
    touch .env
    # Open file and add your Unsplash API Key:
    VITE_UNSPLASH_CLIENT_ID=your_access_key_here
    ```


4. **Run the application**<br>

    ```
    npm run dev
    ```

5. **Run tests**<br>.

    Unit tests (Vitest):

    ```
     npm test

    ```

    To run e2e tests with playwright, run: 

    ```
     npm playwright test

    ```

    
### Dependencies

1. React router
2. React Query
3. Playwright
4. Vitest
5. Material Ui
6. Radix Ui
7. React Spring
8. react-chartjs-2
9. Formik
10. Zustand
11. env

### Photos
![main](readme_img/main.jpeg)
![summary](readme_img/summary.jpeg)
![form](readme_img/form.png)