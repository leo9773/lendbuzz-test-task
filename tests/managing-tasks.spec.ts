import { test, expect } from '@playwright/test';
import BasePage from '../pages/BasePage';


test.describe('Tasks management', () => {

  test('User completes task', async ({ page }) => {
    const basePage = new BasePage(page);
    await basePage.navigateToPage(page, 'https://todomvc.com/examples/react/dist/#/');
    await basePage.createNewTask('text-input', 'example test task 123');
    await basePage.isElementVisible('[data-testid="todo-item-label"]', 'example test task 123');
    await basePage.completeTask('[data-testid="todo-item-label"]', '[class="toggle"]')
    expect(await basePage.isTaskCompleted('[data-testid="todo-item"]')).toBeTruthy(); // Making sure the task has been marked as done
  });

  test('User removes task', async ({ page }) => {
    const basePage = new BasePage(page);
    await basePage.navigateToPage(page, 'https://todomvc.com/examples/react/dist/#/');
    await basePage.createNewTask('text-input', 'example test task 123');
    await basePage.isElementVisible('[data-testid="todo-item-label"]', 'example test task 123');
    await basePage.removeTask('[data-testid="todo-item-label"]', '[class="destroy"]')
    expect (await basePage.isElementNotVisible(page, '[data-testid="todo-item-label"]')); // Making sure the task has been removed
  });

});
