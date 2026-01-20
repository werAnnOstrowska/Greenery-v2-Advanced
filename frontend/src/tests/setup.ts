import '@testing-library/jest-dom';
import { beforeAll, afterEach, afterAll, vi } from 'vitest';

// 1. Zmieniamy import na "side-effect". 
// To uruchamia kod biblioteki, który dopisuje fetch, Headers itp. do obiektu `window`.
import 'whatwg-fetch'; 

// 2. Skoro import powyżej zadziałał, fetch jest teraz w `window`.
// Musimy go tylko przepisać do globalnego zakresu, żeby Vitest i MSW go widziały.
// Używamy "as any", żeby TypeScript nie blokował nas, jeśli typy się nie zgadzają.

const globalWindow = window as any;

vi.stubGlobal('fetch', globalWindow.fetch);
vi.stubGlobal('Headers', globalWindow.Headers);
vi.stubGlobal('Request', globalWindow.Request);
vi.stubGlobal('Response', globalWindow.Response);

// 3. Importujemy serwer na samym końcu, gdy środowisko jest już gotowe
import { server } from './mocks/APITests/server';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());