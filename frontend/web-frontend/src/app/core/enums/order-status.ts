export class OrderStatus {
    public static PENDING = new OrderStatus('pending');
    public static PAYMENT_IN_PROCESS = new OrderStatus('payment_in_process');
    public static PAYMENT_CONFIRMED = new OrderStatus('payment_confirmed');
    public static SHIPPED = new OrderStatus('shipped');
    public static DELIVERED = new OrderStatus('delivered');
    public static CANCELLED = new OrderStatus('canceled');

    private code: string;
    

    private constructor(code: string) {
        this.code = code;
    }

    public getCode(): string {
        return this.code;
    }

    public static values() {
        return [
            this.PENDING,
            this.PAYMENT_IN_PROCESS,
            this.PAYMENT_CONFIRMED,
            this.SHIPPED,
            this.DELIVERED,
            this.CANCELLED
        ];
    }

}