import { environment } from "assets/environments/environment";
import { OrderStatus } from "../enums/order-status";

export class Utils {
    static readonly apiEnpoint: string = environment.apiEndpoint;

    static isInt(value: any): boolean {
        return !isNaN(value) &&
            parseInt(value) == value &&
            !isNaN(parseInt(value, 10));
    }

    static shiftAndPopArray(array: any[]): any {
        array.shift();
        array.pop();
        return array;
    }

    static validateNumberIsPositive(number: any): boolean {
        const re2 = /^\d+$/;
        if (re2.test(String(number))) {
            return parseInt(number) > 0;
        }
        return false;
    }

    static validateNumberIsGreaterOrEqualThan(number: any, comparator: number): boolean {
        const re2 = /^\d+$/;
        if (re2.test(String(number))) {
            return parseInt(number) >= comparator;
        }
        return false;
    }

    static validateIsEmail(email: string): boolean {
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return re.test(String(email).toLowerCase());
    }

    static stringIsEmpty(str: string): boolean {
        return str.length == 0;
    }

    static stringHasLength(str: string, x: number): boolean {
        return (str.length === x) ? true : false;
    }

    static stringHasLessLengthThan(str: string, x: number): boolean {
        return (str.length < x) ? true : false;
    }

    static stringHasMoreLengthThan(str: string, x: number): boolean {
        return (str.length > x) ? true : false;
    }

    static stringHasNumber(myString: string): boolean {
        return /\d/.test(myString);
    }

    static validateNumberIsNegative(number: number): boolean {
        return number < 0;
    }

    static validatePrice(num: number): boolean {
        let regex = /^[1-9]\d*((\.\d{0,2})?)$/;
        return regex.test(String(num));
    }

    static validateYear(year: string): boolean {
        let regex = /^[12][0-9]{3}$/;
        return regex.test(year);
    }

    public static validatePercentage(value: string): boolean {
        const parsedValue = parseInt(value, 10);
        return !isNaN(parsedValue) && Number.isInteger(parsedValue) && parsedValue >= 1 && parsedValue <= 100;
    }

    static getURL(route: any): string {
        return `${this.apiEnpoint}${route}`;
    }

    static formatDate(rangoFechas: any): any {
        return rangoFechas.format('YYYY-MM-DD');
    }

    static prepareDateTimeToSendBack(value: any): any {
        return value.toISOString();
    }

    static removeByAttr(arr: any[], attr: any, value: any) {
        let i = arr.length;
        while (i--) {
            if (arr[i]
                && arr[i].hasOwnProperty(attr)
                && (arguments.length > 2 && arr[i][attr] === value)) {

                arr.splice(i, 1);

            }
        }
        return arr;
    }

    static updateByAttr(arr: any[], attr: string, value: any, updatedAttr: string, updatedValue: any): any[] {
        return arr.map((element) => {
            if (element && element.hasOwnProperty(attr) && element[attr] === value) {
                return { ...element, [updatedAttr]: updatedValue };
            }
            return element;
        });
    }

    static removeBy4Attributes(arrayX: any[], atributos: any[], values: any[]) {
        let i = arrayX.length;
        while (i--) {
            if (arrayX[i] &&
                arrayX[i].hasOwnProperty(atributos[0]) &&
                arrayX[i].hasOwnProperty(atributos[1]) &&
                arrayX[i].hasOwnProperty(atributos[2]) &&
                arrayX[i].hasOwnProperty(atributos[3]) &&
                (
                    arguments.length > 2 &&
                    arrayX[i][atributos[0]] == values[0] &&
                    arrayX[i][atributos[1]] == values[1] &&
                    arrayX[i][atributos[2]] == values[2] &&
                    arrayX[i][atributos[3]] == values[3]
                )
            ) {

                arrayX.splice(i, 1);
            }
        }
        return arrayX;
    }

    static prepareTotalRecords(total: number): number {
        return Math.ceil(total / 10);
    }

    static generatePagesUIArray(totalPages: number, page: number): any[] {
        let arr: any = [];
        if (totalPages === 0) {
            arr = ['-'];
        } else if (totalPages === 1) {
            arr = [1];
        } else if (totalPages === 2) {
            arr = [1, 2];
        } else if (totalPages === 3) {
            arr = [1, 2, 3];
        } else if (totalPages === 4) {
            arr = [1, 2, 3, 4];
        } else if (totalPages === 5) {
            arr = [1, 2, 3, 4, 5];
        } else if (totalPages > 5) {
            if (page === 1) {//1
                arr = [1, 2, 3, '...', totalPages];
            } else if (page === 2) {
                arr = [1, 2, 3, '...', totalPages];
            } else if (page == 3) {
                arr = [1, 2, 3, '...', totalPages];
            } else if (page > 3 && page < totalPages - 2) {//x
                arr = [1, '...', page, '...', totalPages];
            } else if (page == totalPages - 2) {
                arr = [1, '...', totalPages - 2, totalPages - 1, totalPages];
            } else if (page == totalPages - 1) {
                arr = [1, '...', totalPages - 2, totalPages - 1, totalPages];
            } else if (page == totalPages) {//n
                arr = [1, '...', totalPages - 2, totalPages - 1, totalPages];
            }
        }
        return arr;
    }

    static parseNumberTo2Decimals(n: number): number {
        return parseFloat(parseFloat(`${n}`).toFixed(2))
    }

    static loadFromLocalStorage(name: string): any {
        const storedCart = localStorage.getItem(name);
        if (storedCart) return JSON.parse(storedCart)
    }

    static updateInLocalStorage(name: string, value: any): void {
        localStorage.setItem(name, JSON.stringify(value));
    }

    static deleteInLocalStorage(name: string): void {
        localStorage.removeItem(name);
    }

    static getByAttr(arr: any[], attr: string, value: any): any {
        return arr.find((element) => element[attr] === value);
    }

    static multiply(a: number, b: number): number {
        if (isNaN(a) || isNaN(b)) {
            throw new Error('Invalid operands. Both operands must be valid numbers.');
        }

        const result = a * b;
        const roundedResult = Math.round(result * 100) / 100; // Round to 2 decimal places
        return roundedResult;
    }


    static validateFileHasValidExtension(value: string, extensions: string[]): boolean {
        let ext = value.slice((value.lastIndexOf(".") - 1 >>> 0) + 2);
        ext = ext.toLowerCase();
        return extensions.includes(ext);
    }

    static getDescriptionByOrderStatus(value: string): string {
        if (value === OrderStatus.PENDING.getCode()) {
            return 'Pendiente'
        } else if (value === OrderStatus.PAYMENT_IN_PROCESS.getCode()) {
            return 'Pago en proceso'
        } else if (value === OrderStatus.PAYMENT_CONFIRMED.getCode()) {
            return 'Pago confirmado'
        } else if (value === OrderStatus.SHIPPED.getCode()) {
            return 'En camino'
        } else if (value === OrderStatus.DELIVERED.getCode()) {
            return 'Entregado';
        } else if (value === OrderStatus.CANCELLED.getCode()) {
            return 'Cancelado';
        } else {
            return ''
        }
    }

    static getClassByOrderStatus(value: string): string {
        if (value === OrderStatus.PENDING.getCode()) {
            return 'bg-color-1 text-white';
        } else if (value === OrderStatus.PAYMENT_IN_PROCESS.getCode()) {
            return 'bg-cyan text-white';
        } else if (value === OrderStatus.PAYMENT_CONFIRMED.getCode()) {
            return 'bg-orange text-white';
        } else if (value === OrderStatus.SHIPPED.getCode()) {
            return 'bg-blue text-white';
        } else if (value === OrderStatus.DELIVERED.getCode()) {
            return 'bg-green text-white';
        } else if (value === OrderStatus.CANCELLED.getCode()) {
            return 'bg-red text-white';
        } else {
            return ''
        }
    }

}
