import { test, expect } from '@fixtures/fixture';
import { SPACE_DETAILS } from '@utils/constants'; 
import { TitleGenerator } from '@utils/data-helper';
import { description, tag, severity } from "allure-js-commons";

test.describe('ClickUp API - Space Flow', () => {

  test('As a user, I want to retrive all my spaces for a specific team', async ({ spaceApi }) => {
    await description("Retrive all team spaces using the API ");
    await tag("REQ-06");
    await severity("Major");

    const spaces = await spaceApi.getMySpaces(SPACE_DETAILS.TEAM_ID);
    expect(Array.isArray(spaces)).toBe(true);
  });

  test('@smoke As a user, I want to Create, Retrieve, and Delete a Space', async ({ spaceApi }) => {
    await description("Validate the Space flow using the API ");
    await tag("REQ-06");
    await severity("Major");

    let createdSpaceId: string;
    const spaceTitle = TitleGenerator.getSpaceTitle();

    await test.step('1.- Create a new space', async () => {
      const response = await spaceApi.createSpace(SPACE_DETAILS.TEAM_ID, spaceTitle);
      expect(response.ok()).toBe(true);
    
      const body = await response.json();
      // Store for next tests
      createdSpaceId = body.id;
      expect(body.name).toBe(spaceTitle);
    });   

    await test.step('2.- Retrieve the newly created space', async () => {
      const response = await spaceApi.getSpace(createdSpaceId);
      expect(response.ok()).toBe(true);
      const body = await response.json();
      expect(body.id).toBe(createdSpaceId);
    });

    await test.step('3.- Delete the created space', async () => {
      const response = await spaceApi.deleteSpace(createdSpaceId);
      expect(response.status()).toBe(200);

      // 3. Verify Deletion
      const getResponse = await spaceApi.getSpace(createdSpaceId);
      expect(getResponse.status()).toBe(404); // Expecting 404 Not Found after deletion
    });
  });
});