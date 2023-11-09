export interface BillItem{
    id : number;
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
    total_amount: string|number;
    employee_id: number;
    store_id: number;
    id: string;
  
    constructor(total_amount: string, employee_id: number, store_id: number, id: string) {
      this.employee_id = employee_id;
      this.store_id = store_id;
      this.total_amount = total_amount;
      this.id = id;
    }
  }