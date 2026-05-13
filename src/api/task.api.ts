import { BaseApi } from './base.api';

export class TaskApi extends BaseApi {
  async createTask(listId: string, name: string, description: string, status: string ) {
    const response = await this.request.post(`${this.baseUrl}/list/${listId}/task`, {
      data: {
        name: name,
        description: description, 
        status: status, 
      },
    });
    return response;
  }

  async getTask(taskId: string) {
    return await this.request.get(`${this.baseUrl}/task/${taskId}`);
  }

  async updateTask(taskId: string , priority: string) {
    return await this.request.put(`${this.baseUrl}/task/${taskId}`, { 
        data: { 
            priority: priority 
        } 
    });
  }

  async deleteTask(taskId: string) {
    return await this.request.delete(`${this.baseUrl}/task/${taskId}`);
  }
}