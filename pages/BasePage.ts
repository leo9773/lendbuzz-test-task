import * as process from 'node:process';

import { expect, Page } from '@playwright/test';

class BasePage {
  protected page: Page;
  private readonly baseUrl: string;

  constructor(page: Page, baseUrl?: string) {
    this.page = page;
    this.baseUrl = baseUrl ?? process.env.BASE_URL ?? '';
  }

  async open(url?: string) {
    return await this.page.goto(url || this.baseUrl);
  }

  async pause() {
    return await this.page.pause();
  }

  async isElementVisible(locator: string, expectedText: string) {
    const element = this.page.locator(locator);
    try {
      const isVisible = await element.isVisible();
      expect(isVisible).toBeTruthy();

      const textContent = await element.textContent();
      expect(textContent).toContain(expectedText);
    } catch (error) {
      throw new Error(`Element: ${locator} is not visible or does not contain text: ${expectedText}`);
    }
  }

  async isElementNotVisible(page: Page, locator: string): Promise<void> {
    const element = page.locator(locator);
    try {
      const isVisible = await element.isVisible();
      expect(isVisible).toBeFalsy();
    } catch (error) {
      throw new Error(`Element: ${locator} is visible when it should not be`);
    }
  }

  async isTaskCompleted(locator: string): Promise<boolean> {
    const element = this.page.locator(locator);
    const hasClass = await element.evaluate((el: HTMLElement) => el.classList.contains('completed'));
    return hasClass;
  }

  async navigateToPage(page: Page, url: string): Promise<void> {
    await page.goto(url);
  }

  async createNewTask(testId: string, text: string): Promise<void> {
    const element = this.page.locator(`[data-testid="${testId}"]`);
    await element.click();
    await element.fill(text);
    await element.press('Enter');
  }

  async removeTask(elementLocator: string, targetLocator: string): Promise<void> {
    const element = this.page.locator(elementLocator);
    const targetElement = this.page.locator(targetLocator);
    await element.hover();
    await this.page.waitForTimeout(500);
    await targetElement.click();
  }

  async completeTask(elementLocator: string, targetLocator: string): Promise<void> {
    const element = this.page.locator(elementLocator);
    const targetElement = this.page.locator(targetLocator);
    await element.hover();
    await targetElement.click();
  }

}

export default BasePage;
