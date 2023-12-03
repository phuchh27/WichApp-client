export class Item {
  category? : number;
  id?: number;
  name: string;
  code: string | null;
  description: string;
  cost: any;
  price: number;
  quantity: number;
  image: string | null;
  image_link?: any | null;

  constructor(
    category:number,
    id: number,
    name: string,
    code: string | null,
    description: string,
    cost: any,
    price: any,
    quantity: number,
    image: string | null,
    image_link: any | null,

  ) {
    this.category = category;
    this.id = id;
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
