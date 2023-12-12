export interface BillItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export interface Bill {
  items: BillItem[];
  Total: number;
}

export interface BillData {
  total_amount: string;
  bill_details: Array<{ product: number; quantity: number }>;
  employee_id?: number;
}

export interface CartItem {
  product: {
    id: string;
    name: string;
    price: string;
  };
  quantity: number;
}

export class Bills {
  total_amount: string | number;
  employee_id: number;
  store_id: number;
  id: string;

  constructor(
    total_amount: string,
    employee_id: number,
    store_id: number,
    id: string
  ) {
    this.employee_id = employee_id;
    this.store_id = store_id;
    this.total_amount = total_amount;
    this.id = id;
  }
}

export class BillsForOwner {
  bill_id: string;
  date_create: string;
  date_paid: string;
  total_amount: string;
  store_id: number;
  employee_name: string;
  total_profit: number;

  constructor(
    bill_id: string,
    date_create: string,
    date_paid: string,
    total_amount: string,
    store_id: number,
    employee_name: string,
    total_profit: number
  ) {
    this.bill_id = bill_id;
    this.date_create = date_create;
    this.date_paid = date_paid;
    this.total_amount = total_amount;
    this.store_id = store_id;
    this.employee_name = employee_name;
    this.total_profit = total_profit;
  }
}

export class BillDetailProductItem {
  name: string;
  price: string;
  image_link: string;
  quantity: number;

  constructor(name: string, price: string, image_link: string, quantity: number) {
    this.name = name;
    this.price = price;
    this.image_link = image_link;
    this.quantity = quantity;
  }
}
