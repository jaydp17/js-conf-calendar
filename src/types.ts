interface BaseConfInfo {
  name: string;
  url?: string;
  city: string;
  country: string;
  twitter?: string;
}

export interface RawConfInfo extends BaseConfInfo {
  startDate: string;
  endDate: string;
}

export interface ConfInfo extends BaseConfInfo {
  startDate: Date;
  endDate: Date;
}
