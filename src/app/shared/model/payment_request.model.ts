import {IUser} from "./user.model";
import {Transaction} from "./transactions.model";

export class PaymentRequest {
  id: number;
  created: Date;
  lastUpdated: Date;
  paymentMethod: string;
  accountNumber: string;
  requestAmount: number;
  user: IUser;
  trnx: Transaction;
  paid: boolean;
}
