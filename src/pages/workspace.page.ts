import { BasePage } from '@pages/base.page';
import { Page, Locator } from '@playwright/test';

export class WorkspacePage extends BasePage {
  public readonly pickerToggleBtn: Locator;
  private readonly addTaskBtn: Locator;
  private readonly taskTitleInput: Locator;
  private readonly itemDropdown: Locator;
  private readonly taskDescriptionInput: Locator;
  private readonly recurringDateToggle: Locator;
  private readonly tomorrowOption: Locator;
  private readonly priorityButton: Locator;
  private readonly priorityOption: Locator;
  private readonly quickCreateButton: Locator;
  private readonly statusListBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.pickerToggleBtn = page.locator('[data-test="workspace-picker-toggle__button"]');
    this.addTaskBtn = page.locator('[data-test="create-task-menu__new-task-button"]');
    this.taskTitleInput = page.locator('[data-test="draft-view__title-task"]');
    this.itemDropdown = page.locator('[data-test="dropdown-list-item__blank"]');
    this.taskDescriptionInput = page.locator('.ql-editor');
    this.recurringDateToggle = page.locator('[data-test="draft-view__container"] [data-test="recurring-date-dropdown__dropdown__toggle"]');
    this.tomorrowOption = page.locator('[data-test="quick-date-options__Tomorrow"]');
    this.priorityButton = page.locator('[data-test="draft-view__container"] button').filter({ hasText: 'Priority' });
    this.priorityOption = page.locator('[data-test="priorities-list__item-Normal"]');
    this.quickCreateButton = page.locator('[data-test="draft-view__quick-create-create"]');
    this.statusListBtn = page.locator('.cu-draft-view__status.cu-dropdown__toggle');
  }

  async waitForPageReady() {
      await this.waitUntilStable(this.pickerToggleBtn);
  }
    
  async navigateTo(url: string) {
    await this.page.goto(url);
  }

  getTaskRow(taskName: string) {
    return this.page.locator(`[data-test="task-row-main__${taskName}"]`);
  }

  async setTaskStatus(statusName: string) {
    await this.statusListBtn.click();
    await this.page.locator(`[data-test="status-list__${statusName}"]`).click();
  }

  async setTaskDueDate() {
    await this.recurringDateToggle.click();
    await this.tomorrowOption.click();  
  }

  async setTaskPriority() {
    await this.priorityButton.click();
    await this.priorityOption.click();
  }

  async addNewTask(statusList: string, title: string, description: string) {   
    await this.addTaskBtn.click();
    await this.taskTitleInput.fill(title);
    await this.itemDropdown.click();
    await this.taskDescriptionInput.fill(description);
    await this.setTaskStatus(statusList);
    await this.setTaskDueDate();
    await this.setTaskPriority();
    await this.quickCreateButton.click();
  }

  async getTaskId(taskName: string) {
    const row = this.page.locator(`[data-test="task-row__container__${taskName}"]`);
    const taskId = await row.getAttribute('data-task');
    if (!taskId) {
      console.error(`Could not find task with title: ${taskName}`);
      return null;
    }
    return taskId;
  }
}