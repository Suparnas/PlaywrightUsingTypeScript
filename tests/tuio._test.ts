import { test, expect } from '@playwright/test';

test.describe('test TUIO Create Transfer', () => {

test('Create Transfer', async ({ page }) => {
  await page.goto('https://qa.interview.tuio.dev/?page=1&limit=25&sortName=id&sortDirection=desc');
  await page.getByRole('button', { name: 'Create Transfer'}).click();
  await page.getByRole('textbox', { name: 'Details' }).fill('Annual pro subscription fee');
  await page.getByRole('textbox', { name: 'price' }).fill('$10.00');
  //await page.getByRole('radio', { name: 'None - 0%' }).check();
  //await (page.getByRole('radio', { name: 'sales-tax' }).nth(1)).click();
  await (page.locator('.mat-radio-container').nth(1)).click(); //

  
  await page.getByRole('button', { name: 'Add'}).click();
 
  const firstRow = page.getByRole('row').nth(1); // nth(1) to skip the header row and select the first data row
  await expect(firstRow.getByRole('gridcell').nth(0)).toHaveText('24');
  await expect(firstRow.getByRole('gridcell').nth(1)).toHaveText('Mar 20, 2025');
  await expect(firstRow.getByRole('gridcell').nth(2)).toHaveText('Annual pro subscription fee');
  });
});
