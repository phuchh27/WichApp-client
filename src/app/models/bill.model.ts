export interface BillItem{
    name: string;
    price: number;
    quantity: number;
    total: number;
}

export interface Bill {
    id: string;
    items: BillItem[];
    Total: number;
}
  