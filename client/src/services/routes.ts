import Create from '../pages/create';

export const ROUTES = (from?: number, to?: number) => {
    const ROUTES = [
        { link: '/create', exact: true, component: Create}
    ];

    return ROUTES;
}