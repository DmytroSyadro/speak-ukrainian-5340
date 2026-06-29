export interface GoogleFormResultDto {
  userEmail: string;
  fullName: string;
  totalScore: number;
}

export interface CertificateByTemplateTransferDto {
  fieldsList: string[];
  fieldPropertiesList: string[];
  templateName: string;
  values: string;
  columnHeadersList: string[];
  excelContent: string[][];
  excelColumnsOrder: string[];
  googleFormResults: GoogleFormResultDto[];
}
