
export class User {
    constructor(
      public id: number,
      public email: string,
      public username: string,  
      private _tokens: {
        refresh: string;
        access: string;
      },
      public expiresIn: number,
      private __tokenExpirationDate: Date
    ) {}
  
    get token() {
      if (!this.__tokenExpirationDate || new Date() > this.__tokenExpirationDate) {
          return null;
        }
        return this._tokens;
    }
  }