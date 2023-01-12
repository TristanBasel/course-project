export  class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,// the underscore name is just generally used for private class objects.
    // We also want to automatically check validity using the getter below
    private _tokenExpirationDate: Date
  ) {// using accessor: public or private: makes the arguments automatically storable.
  }

  get token() {// access like a property, special type that runs code while accessing property, can't overwrite this type of property.
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
      return null;// this case means token is in the past thus expired.
    }
    return this._token;
  }
}
