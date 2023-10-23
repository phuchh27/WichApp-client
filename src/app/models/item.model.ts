export class Item {
  
    name: string;
    code : string | null;
    description: string;
    cost: any;
    price: number;
    quantity: number;
    image :string | null;
    image_link?: any |null;
    
    constructor(
    
      name: string,
      code : string |null,
      description: string,
      cost: any,
      price: any,
      quantity: number,
      image :string | null,
      image_link: any |null
    ) {

      this.name = name;
      this.code = code;
      this.description = description;
      this.cost = cost;
      this.price = price;
      this.quantity = quantity;
      this.image = image;
      this.image_link = image_link;
    }
  }
  