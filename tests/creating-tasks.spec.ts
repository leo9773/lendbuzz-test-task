import { test, expect } from '@playwright/test';
import BasePage from '../pages/BasePage';


test.describe('Tasks creation', () => {

  test('User creates new tasks', async ({ page }) => {
    const basePage = new BasePage(page);
    await basePage.navigateToPage(page, 'https://todomvc.com/examples/react/dist/#/');
    await basePage.createNewTask('text-input', 'example test task 123');
    expect (await basePage.isElementVisible('[data-testid="todo-item-label"]', 'example test task 123')); // Making sure the new task has been created
  });

});
