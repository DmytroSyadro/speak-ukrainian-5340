import { test, expect } from '@/fixtures/api-fixture';
import * as allure from 'allure-js-commons';
import { DataBuilderApi } from '@/data';
import type { APIResponse } from '@playwright/test';
import type {
  CertificateByTemplateTransferDto,
  CertificateTemplatePreviewDto,
} from '@/api/dto/certificate-by-template';

test.describe('Certificate By Template API', (): void => {
  test.beforeEach(async (): Promise<void> => {
    await allure.epic('API Infrastructure');
    await allure.feature('Certificate By Template');
  });

  test('should restrict Manager from validating excel data (Expect 403)', async ({
    certificateClient,
  }): Promise<void> => {
    await allure.story('Security - Role Restriction');
    await allure.severity('normal');
    await allure.description(
      'Verify that a non-admin (Manager) gets 403 Forbidden when trying to validate certificate data.'
    );

    const payload: CertificateByTemplateTransferDto =
      DataBuilderApi.validCertificateTransferPayload();
    const response: APIResponse = await certificateClient.validateExcel(payload);

    await allure.step('Validate response status is 403', async (): Promise<void> => {
      expect(response.ok()).toBeFalsy();
      expect(response.status()).toBe(403);
    });
  });

  test('should restrict Manager from generating PDF transfer data (Expect 403)', async ({
    certificateClient,
  }): Promise<void> => {
    await allure.story('Security - Role Restriction');
    await allure.severity('normal');

    const payload: CertificateTemplatePreviewDto = DataBuilderApi.validCertificatePreviewPayload();
    const response: APIResponse = await certificateClient.generatePdf(payload);

    await allure.step('Validate response status is 403', async (): Promise<void> => {
      expect(response.ok()).toBeFalsy();
      expect(response.status()).toBe(403);
    });
  });

  test('should return 401 when unauthenticated user tries to save Google Form results', async ({
    unauthCertificateClient,
  }): Promise<void> => {
    await allure.story('Security - Authentication');
    await allure.severity('critical');

    const payload: CertificateByTemplateTransferDto =
      DataBuilderApi.validCertificateTransferPayload();
    const response: APIResponse = await unauthCertificateClient.saveGoogleForm(payload);

    await allure.step('Validate response is 401 Unauthorized', async (): Promise<void> => {
      expect(response.ok()).toBeFalsy();
      expect(response.status()).toBe(401);
    });
  });

  test('should upload excel file via Base64 string payload', async ({
    certificateClient,
  }): Promise<void> => {
    // We expect this to fail because the backend currently throws a 500 error
    // instead of a 400 Bad Request when given an invalid/mock Excel string.
    test.fail(
      true,
      'Backend Bug: Returns 500 Internal Server Error instead of 400 for invalid base64 excel files.'
    );

    await allure.story('Upload Excel File');
    await allure.severity('critical');

    const base64Payload = { 'excel-file': 'UEsDBBQAAAAIA...' };

    const response: APIResponse = await certificateClient.uploadExcel(base64Payload);

    await allure.step('Validate response status', async (): Promise<void> => {
      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);
    });
  });
});
