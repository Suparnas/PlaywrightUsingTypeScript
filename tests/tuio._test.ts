import { test, expect } from '@playwright/test';

test.describe('test TUIO Create Transfer', () => {

test('Create Transfer', async ({ page }) => {
  await page.goto('https://qa.interview.tuio.dev/?page=1&limit=25&sortName=id&sortDirection=desc');
  await page.getByRole('button', { name: 'Create Transfer'}).click();
  await page.getByRole('textbox', { name: 'Details' }).fill('Annual pro subscription fee');
  await page.getByRole('textbox', { name: 'price' }).fill('$10.00');
  
  const checkbox = page.getByRole('radiogroup').nth(0); // nth(1) to skip the header row and select the first data row
  await checkbox.getByText(' GST - 5% ').check();

  await page.getByRole('button', { name: 'Add'}).click();
 
  const firstRow = page.getByRole('rowgroup').nth(1); // nth(1) to skip the header row and select the first data row
  await expect(firstRow.getByRole('gridcell').nth(0)).toHaveText('24');
  await expect(firstRow.getByRole('gridcell').nth(1)).toHaveText('Mar 20, 2025');
  await expect(firstRow.getByRole('gridcell').nth(2)).toHaveText('Annual pro subscription fee');
  });
});


// //verify from browser console

// // Verify the first data row
// const firstRow = document.querySelectorAll('[role="rowgroup"]')[1]; // nth(1) to skip the header row and select the first data row
// console.log(firstRow);

// // Verify the first cell in the first data row
// const firstCell = firstRow.querySelectorAll('[role="gridcell"]')[0];
// console.log(firstCell.textContent);

// // Verify the second cell in the first data row
// const secondCell = firstRow.querySelectorAll('[role="gridcell"]')[1];
// console.log(secondCell.textContent);

// // Verify the third cell in the first data row
// const thirdCell = firstRow.querySelectorAll('[role="gridcell"]')[2];
// console.log(thirdCell.textContent);
