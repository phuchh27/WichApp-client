export interface Staff {
  email: string;
  username: string;
  password: string;
  phone: string;
}

export interface Staffs {
  id: number;
  username: string;
  email: string;
  phone: string;
  is_active: boolean;
}

export class AllStaffs {
  id?: number;
  username: string;
  email: string;
  address: string;
  phone: string;
  fullname: string;
  is_active: boolean;
  is_verified?: boolean;
  created_at?: string;

  constructor(
    id: number,
    username: string,
    email: string,
    address: string,
    phone: string,
    fullname: string,
    is_active: boolean,
    is_verified: boolean,
    created_at: string
  ) {
    this.id = id;
    this.username=username;
    this.email=email;
    this.address=address;
    this.phone=phone;
    this.fullname=fullname;
    this.is_active=is_active;
    this.is_verified=is_verified;
    this.created_at=created_at;
  }
}
