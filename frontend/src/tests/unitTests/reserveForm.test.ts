import { describe, it, expect } from 'vitest';
import { validationSchema } from '../../components/ShoppingCart/ReserveForm';

describe('Walidacja formularza rezerwacji (Yup)', () => {
    it('powinien odrzucić adres e-mail bez znaku @', async () => {

        const invalidData = {email: 'zlyE-mail.com'};

        const validationPromise = validationSchema.validateAt('email', invalidData);

        await expect(validationPromise).rejects.toThrow("Invalid email address");
    });
    
    it('imię o długości jednego znaku powinno zostać odrzucone', async () => {
        const invalidData = {firstName: 'a' };
    
        const validationPromise = validationSchema.validateAt('firstName', invalidData);
    
        await expect(validationPromise).rejects.toThrow("Too short");
    });

    it('brak pola e-mail przy próbie rezerwacji powinien wyrzucić błąd', async () => {
        const invalidData = {email: ''};
    
        const validationPromise = validationSchema.validateAt('email', invalidData);
    
        await expect(validationPromise).rejects.toThrow("Required");
    });

    it('numer telefonu zawierający litery powinien zostać odrzucony przez regex', async () => {
        const invalidData = {phone: '789aaa098'};

        const validationPromise = validationSchema.validateAt('phone', invalidData);

        await expect(validationPromise).rejects.toThrow("Must be only digits");
    });

    it('poprawny e-mail powinien przejść walidację', async () => {
        const validData = {email: "test@test.com"};

        const validationPromise = validationSchema.validateAt('email', validData);

        await expect(validationPromise).resolves.toBeTruthy();
    });

    it('za długie imię powinno zostać odrzucone przez formularz', async () => {
        const longName = "a".repeat(52);

        const validationPromise = validationSchema.validateAt('firstName', { 
            firstName: longName 
        });

        await expect(validationPromise).rejects.toThrow("Too long");
        });
});

