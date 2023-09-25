export class Item {
  
    name: string;
    description: string;
    cost: number;
    price: number;
    quantity: number;
    imglink :any | null;
    
    constructor(
    
      name: string,
      description: string,
      cost: number,
      price: number,
      quantity: number,
      imglink :any | null
    ) {

      this.name = name;
      this.description = description;
      this.cost = cost;
      this.price = price;
      this.quantity = quantity;
      this.imglink = imglink;
    }
  }
  