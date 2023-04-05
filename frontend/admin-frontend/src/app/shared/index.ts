import { LoadingComponent } from "./components/loading/loading-component";
import { LogoutComponent } from "./components/logout/logout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { MainLayoutComponent } from "./layouts/main-layout/main-layout.component";
import { SidebarMainLayoutComponent } from './layouts/sidebar-main-layout/sidebar-main-layout.component';

export const components: any[] = [
    AuthLayoutComponent,
    LoadingComponent,
    LogoutComponent,
    MainLayoutComponent,
    SidebarMainLayoutComponent
];