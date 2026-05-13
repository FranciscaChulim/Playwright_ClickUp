import { APIRequestContext } from '@playwright/test';
import { URLS } from '@utils/constants';

export class BaseApi {
  protected request: APIRequestContext;
  protected readonly baseUrl = URLS.API_BASE_URL;

  constructor(request: APIRequestContext) {
    this.request = request;
  }
}