import { BaseApi } from './base.api';

export class SpaceApi extends BaseApi {
  async createSpace(team_id: string, name: string) {
    const response = await this.request.post(`${this.baseUrl}/team/${team_id}/space`, {
      data: {
        name: name,
        multiple_assignees: true, // Example optional field
      },
    });
    return response;
  }

  async getSpace(spaceId: string) {
    return await this.request.get(`${this.baseUrl}/space/${spaceId}`);
  }

  async getMySpaces(team_id: string) {
    const response =  await this.request.get(`${this.baseUrl}/team/${team_id}/space`);
    const body = await response.json();
    return body.spaces || [];
  }

  async deleteSpace(spaceId: string) {
    return await this.request.delete(`${this.baseUrl}/space/${spaceId}`);
  }
}
