import dotenv from 'dotenv';
dotenv.config();

export const URLS = {
    BASE_URL: 'https://app.clickup.com',
    LOGIN: '/login',
    WORKSPACE: process.env.WORKSPACE_ID ?? ''
};

export const CREDENTIALS = {
  EMAIL: process.env.VALID_EMAIL ?? '',
  PASSWORD: process.env.VALID_PASSWORD ?? ''
};

export const DEFAULT_TIMEOUT = 15000;

export const WORKSPACE_TITLE = {
  NAME: "Francisca chulim's Workspace"
};
