import { APIResponse } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { BaseClient } from './base-client';
import type {
  CertificateByTemplateTransferDto,
  CertificateTemplatePreviewDto,
} from '@/api/dto/certificate-by-template';

export class CertificateByTemplateClient extends BaseClient {
  async validateExcel(payload: CertificateByTemplateTransferDto): Promise<APIResponse> {
    return allure.step('Validate certificate excel file via API', async () => {
      const response = await this.post('/dev/api/certificate-by-template/validate', payload);
      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });
      return response;
    });
  }

  async saveGoogleForm(payload: CertificateByTemplateTransferDto): Promise<APIResponse> {
    return allure.step('Save Google Form results via API', async () => {
      const response = await this.post('/dev/api/certificate-by-template/save-gf', payload);
      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });
      return response;
    });
  }

  async generatePdf(payload: CertificateTemplatePreviewDto): Promise<APIResponse> {
    return allure.step('Process template and generate PDF via API', async () => {
      const response = await this.post('/dev/api/certificate-by-template/pdf', payload);
      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });
      return response;
    });
  }

  async loadToDb(payload: CertificateByTemplateTransferDto): Promise<APIResponse> {
    return allure.step('Load certificate data to DB via API', async () => {
      const response = await this.post('/dev/api/certificate-by-template/load-to-db', payload);
      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });
      return response;
    });
  }

  async getInvalidCertificatesExcel(payloadString: string): Promise<APIResponse> {
    return allure.step('Get invalid certificates excel via API', async () => {
      const response = await this.post(
        '/dev/api/certificate-by-template/get-invalid-certificates-excel',
        payloadString
      );
      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });
      return response;
    });
  }

  async uploadExcel(base64Payload: { 'excel-file': string }): Promise<APIResponse> {
    return allure.step('Upload excel file for parsing via API', async () => {
      const response = await this.post('/dev/api/certificate-by-template/excel', base64Payload);
      await allure.attachment('Response status', String(response.status()), {
        contentType: 'text/plain',
      });
      return response;
    });
  }
}
