import dotenv from 'dotenv';
dotenv.config();

export const URLS = {
    BASE_URL: 'https://app.clickup.com',
    LOGIN: '/login',
    WORKSPACE: process.env.WORKSPACE_ID ?? '',
    API_BASE_URL: 'https://api.clickup.com/api/v2',
};

export const CREDENTIALS = {
  EMAIL: process.env.VALID_EMAIL ?? '',
  PASSWORD: process.env.VALID_PASSWORD ?? '',
  API_TOKEN: process.env.API_TOKEN ?? ''
};

export const WORKSPACE = {
  TITLE_NAME: "Francisca chulim's Workspace"
};

export const SPACE_DETAILS = {
  TEAM_ID: process.env.TEAM_ID ?? ''
};

export const TASK_DETAILS = {
  TASK_LIST_ID: process.env.TASK_LIST_ID ?? '' ,
  UI_DESCRIPTION: 'This is an Automated task created via UI',
  API_DESCRIPTION:'This is a test task created via API',
  STATUS_TODO: 'to do',
  STATUS_IN_PROGRESS: 'in progress',
  PRIORITY: '2',
};

export const DEFAULT_TIMEOUT = 45000;