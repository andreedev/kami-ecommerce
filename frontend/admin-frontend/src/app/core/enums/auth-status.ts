export class AuthStatus {
    public static LOADING = new AuthStatus(0, 'loading');
    public static NONE = new AuthStatus(1, 'none');
    public static LOGGED_IN = new AuthStatus(2, 'loggedIn');

    private code: number;
    private name: string;

    private constructor(code: number, name: string) {
        this.code = code;
        this.name = name;
    }

    public getCode(): number {
        return this.code;
    }

    public getName(): string {
        return this.name;
    }

    public static values() {
        return [
            this.NONE,
            this.LOGGED_IN,
        ];
    }

}