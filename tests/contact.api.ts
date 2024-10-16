import { test, expect, APIRequestContext } from '@playwright/test';
import { ContactPage } from '../src/pages/contactPage';
import { faker } from '@faker-js/faker';

test.describe('Contact', () => {
  let contactPage: ContactPage;
  let fakerAPI: APIRequestContext;

  test.beforeAll(async ({ playwright}) => {
        fakerAPI = await playwright.request.newContext({
      baseURL: 'https://jsonplaceholder.typicode.com/'
    });

    const response = await fakerAPI.get('users');
    console.log( await response.json());
  })
  test('Fill contact form and verify success message', async ({ page }) => {
    contactPage = new ContactPage(page);

    // open contact page
    await contactPage.navigate()

    //  fill out the input fields and submit
    await contactPage.submitForm(faker.person.fullName(), faker.internet.email(), faker.phone.number(), faker.lorem.paragraphs(2));

    // verify success message
    await expect(contactPage.successTxt).toHaveText('Thanks for contacting us! We will be in touch with you shortly')
  })
})

function async(arg0: { playwright: any; }): (args: import("playwright/test").PlaywrightTestArgs & import("playwright/test").PlaywrightTestOptions & import("playwright/test").PlaywrightWorkerArgs & import("playwright/test").PlaywrightWorkerOptions, testInfo: import("playwright/test").TestInfo) => Promise<any> | any {
  throw new Error('Function not implemented.');
}
