// const db = require('../../db-connect');
import jwt from "jsonwebtoken";
import differenceInHours from "date-fns/differenceInHours";

export default class TodoServerice {
    static jwtVerify(token: string, privateKey: string): Record<string, any> {
        return jwt.verify(token, privateKey);
    }

    static jwtSign(data: Record<string, any>, privateKey: string): string {
        return jwt.sign(data, privateKey);
    }

    static dateFnsDifferenceInHours(date1: Date, date2: Date): number {
        return differenceInHours(date1, date2);
    }

    static createToken(username: string, password: string, dateCreated: Number, privateKey: string): string {
        const data = {  
            username,
            password,
            dateCreated,
        };
        
        try {
            var token = this.jwtSign(data, privateKey);
    
            return token;
        } catch (e) {
            return '';
        }
    }

    static checkIsUserValid(username: string, token: string, privateKey: string): boolean {
        const decoded = this.jwtVerify(token, privateKey);

        

        return username === decoded.username;
    }

    static checkIsTokenValid(token: string, privateKey: string): boolean {
        const decoded = this.jwtVerify(token, privateKey);
        const createdAt = new Date(decoded.dateCreated);
        const now = new Date();
        const diff = this.dateFnsDifferenceInHours(now, createdAt);
        const isTokenValid = diff <= 1;
    
        return isTokenValid;
    }
}
