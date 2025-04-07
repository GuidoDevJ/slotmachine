export enum StatusUser {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
export interface ISendEmail {
  to: string;
  subject: string;
  html: string;
}
