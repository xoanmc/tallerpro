import { createBrowserRouter } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { Dashboard } from '../features/dashboard/DashboardPage';
import { ClientesView } from '../features/clientes/ClientesView';
import { VehiculosView } from '../features/vehiculos/VehiculosView';
import { OrdenesView } from '../features/ordenes/OrdenesView';
import { InventarioView } from '../features/inventario/InventarioView';
import { ConfiguracionView } from '../features/configuracion/ConfiguracionView';

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <AppShell>
                <Dashboard />
            </AppShell>
        ),
    },
    {
        path: '/clientes',
        element: (
            <AppShell>
                <ClientesView />
            </AppShell>
        ),
    },
    {
        path: '/vehiculos',
        element: (
            <AppShell>
                <VehiculosView />
            </AppShell>
        ),
    },
    {
        path: '/ordenes',
        element: (
            <AppShell>
                <OrdenesView />
            </AppShell>
        ),
    },
    {
        path: '/inventario',
        element: (
            <AppShell>
                <InventarioView />
            </AppShell>
        ),
    },
    {
        path: '/configuracion',
        element: (
            <AppShell>
                <ConfiguracionView />
            </AppShell>
        ),
    },
]);
