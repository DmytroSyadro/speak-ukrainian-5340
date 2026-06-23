import { test, expect } from '@/fixtures/modal-fixture';
//import * as allure from 'allure-js-commons';

test ('Verify the "Зареєструватись" button visibility and routing', async ({ challengePage,  }) => {
    
    await challengePage.goto(4);
    await challengePage.waitForPageLoad();
    await expect(challengePage.isRegisterButtonVisible()).resolves.toBeTruthy();

    await challengePage.clickRegisterButton();
    await expect(challengePage.getCurrentUrl()).resolves.toContain('https://speak-ukrainian.org.ua/challenges/registration/4');


}) 
    