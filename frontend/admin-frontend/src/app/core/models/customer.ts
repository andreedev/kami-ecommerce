import { Address } from "./address"
import { Cart } from "./cart";

export interface Customer {
    id?: string;
    name?: string;
    lastName?: string;
    password?: string;
    email?: string;
    status?: string;
    documentType?: number;
    documentNumber?: string;
    phoneNumber?: string;
    addresses: Array<Address>;
    createdAt?: string;
    updatedAt?: string;
    cart?: Cart;
    isLinkedToGoogleAccount?: boolean;

    //doesn't persist
    passwordConfirm?: string
    googleIdToken?: string
}
