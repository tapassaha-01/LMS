export interface Breadcrumb {
    bcName?: string;
    bcRouterLink?: string;
    bcCurrent: boolean;
    bcChild?: Breadcrumb;
}
