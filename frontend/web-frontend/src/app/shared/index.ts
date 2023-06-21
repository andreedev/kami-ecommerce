import { AddressAddComponent } from "./components/address-add/address-add.component";
import { AddressesModalComponent } from "./components/addresses-modal/addresses-modal.component";
import { CartComponent } from "./components/cart/cart.component";
import { CheckoutHeaderComponent } from "./components/checkout-header/checkout-header.component";
import { LoadingComponent } from "./components/loading/loading-component";
import { MainFooterComponent } from "./components/main-footer/main-footer.component";
import { MainHeaderComponent } from "./components/main-header/main-header.component";
import { ProductCardComponent } from "./components/product-card/product-card.component";
import { ProductModalComponent } from "./components/product-modal/product-modal.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { CheckoutLayoutComponent } from "./layouts/checkout-layout/checkout-layout.component";
import { MainLayoutComponent } from "./layouts/main-layout/main-layout.component";

export const components: any[] = [
    AuthLayoutComponent,
    CartComponent,
    LoadingComponent,
    MainLayoutComponent,
    MainFooterComponent,
    MainHeaderComponent,
    ProductCardComponent,
    ProductModalComponent,
    CheckoutLayoutComponent,
    CheckoutHeaderComponent,
    AddressesModalComponent,
    AddressAddComponent
];