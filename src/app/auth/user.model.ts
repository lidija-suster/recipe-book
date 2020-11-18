export class User {
    constructor(public email: string, public id: string,
        private _token: string, private _tokekExpirationDate: Date) { }

    get token() {
        if (!this._tokekExpirationDate || new Date() > this._tokekExpirationDate) {
            return null;
        }
        return this._token;
    }
}