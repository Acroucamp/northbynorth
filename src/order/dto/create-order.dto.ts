export class CreateOrderDto {
  order_id: string;
  order_number: string;
  order_date: Date;
  order_status: string;
  order_total: number;
  user_address: Record<string, any>;
}
