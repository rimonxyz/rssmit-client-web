export class Transaction {
  id: number;
  created: Date;
  lastUpdated: Date;
  balance: number;
  debit: number;
  credit: number;
  reference: string;
  explanation: string;
  fromDate: Date;
  toDate: Date;
  payment: boolean;
}
