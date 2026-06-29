export interface CertificateTypeDto {
  id: number;
  codeNumber: number;
  name: string;
}

export interface CertificateTemplatePreviewDto {
  id: number;
  name: string;
  filePath: string;
  certificateType: CertificateTypeDto;
  courseDescription: string;
  projectDescription: string;
  picturePath: string;
  properties: string;
  used: boolean;
}
