import {Transaction} from "./transactions.model";

export class TransactionPage {
  content: Transaction[];
  last: boolean;
  totalPages: number;
  totalElements: number;
  sort: any[];
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
}
