export class CreateTransactionDto {
  reference: string;
  amount: number;
  currency: string;
  status: string;
  gateway_response: string;
  channel: string;
  customer_id: string;
  customer_email: string;
  customer_code: string;
  authorization_code: string;
  last4: string;
  card_type: string;
  card_brand: string;
  reusable: number;
  fees: number;
}
