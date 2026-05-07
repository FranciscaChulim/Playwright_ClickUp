import { getTimestamp } from '@utils/data-helper';
import dotenv from 'dotenv';
dotenv.config();

export const URLS = {
    BASE_URL: 'https://app.clickup.com',
    LOGIN: '/login',
    WORKSPACE: process.env.WORKSPACE_ID ?? ''
};

export const CREDENTIALS = {
  EMAIL: process.env.VALID_EMAIL ?? '',
  PASSWORD: process.env.VALID_PASSWORD ?? '',
  API_KEY: process.env.API_KEY ?? ''
};

export const DEFAULT_TIMEOUT = 15000;

export const WORKSPACE_TITLE = {
  NAME: "Francisca chulim's Workspace"
};

export const TASK_DETAILS = {
    TITLE: `Automated Task ${getTimestamp()}`,
    DESCRIPTION: 'This is my description of the task',
    STATUS: ['to do', 'in progress']
};