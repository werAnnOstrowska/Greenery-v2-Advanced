import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get(/\/search\/photos/, () => {
    return HttpResponse.json({
      results: [
        { 
          // ID '1' (kod 49) % 3 = 1 -> 'leaf'. Twój filtr startowy to 'all', więc to przejdzie.
          id: 'test-id', 
          description: 'Monstera', 
          alt_description: 'Monstera', 
          urls: { 
            raw: 'http://test.com', 
            full: 'http://test.com', 
            regular: 'http://test.com', 
            small: 'http://test.com/img.jpg', // Ważne dla karty!
            thumb: 'http://test.com' 
          } 
        }
      ]
    });
  }),
];