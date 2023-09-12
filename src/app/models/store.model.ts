export class Store {
  id: number;
  shopname: string;
  description: string;
  phone: string;
  address: string;
  category: number;
  image_url: string | null;

  constructor(
    id: number,
    shopname: string,
    description: string,
    phone: string,
    address: string,
    category: number,
    image_url: string | null
  ) {
    this.id = id;
    this.shopname = shopname;
    this.description = description;
    this.phone = phone;
    this.address = address;
    this.category = category;
    this.image_url = image_url;
  }
}
export interface PaidStoreData {
  shopname: string;
  description: string;
  address: string;
  phone: string;
  category: string;
  verify_code: string;
}
