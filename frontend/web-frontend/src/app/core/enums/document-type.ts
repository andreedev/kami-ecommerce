export class DocumentType {
    public static DNI = new DocumentType(1, 'DNI', 8);
    public static CE = new DocumentType(4, 'CARNET EXT.', 8);
    public static RUC = new DocumentType(6, 'RUC', 11);
    public static PS = new DocumentType(8, 'PASAPORTE', 10);

    private code: number;
    private name: string;
    private minLength: number;
    

    private constructor(code: number, name: string, minLength: number) {
        this.code = code;
        this.name = name;
        this.minLength = minLength;
    }

    public getCode(): number {
        return this.code;
    }

    public getName(): string {
        return this.name;
    }

    public getMinLength(): number{
        return this.minLength;
    }

    public static values() {
        return [
            this.DNI,
            this.CE,
            this.RUC,
            this.PS
        ];
    }

}