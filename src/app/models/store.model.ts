export class Store {
  id: number;
  shopname: string;
  description: string;
  phone: string;
  address: string;
  category: number;
  image: string | null;

  constructor(
    id: number,
    shopname: string,
    description: string,
    phone: string,
    address: string,
    category: number,
    image: string | null
  ) {
    this.id = id;
    this.shopname = shopname;
    this.description = description;
    this.phone = phone;
    this.address = address;
    this.category = category;
    this.image = image;
  }
}


export class PaidStoreData {
  shopname: string;
  description: string;
  address: string;
  phone: string;
  category: number;
  verify_code: string | null;

  constructor(
    shopname: string,
    description: string,
    address: string,
    phone: string,
    category: number,
    verify_code: string
  ) {
    this.shopname = shopname;
    this.description = description;
    this.address = address;
    this.phone = phone;
    this.category = category;
    this.verify_code = verify_code;
  }
}
