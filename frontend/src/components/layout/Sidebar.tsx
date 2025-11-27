import { LayoutDashboard, Users, Car, ClipboardList, Package, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, to: '/' },
  { id: 'clientes', label: 'Clientes', icon: Users, to: '/clientes' },
  { id: 'vehiculos', label: 'Vehículos', icon: Car, to: '/vehiculos' },
  { id: 'ordenes', label: 'Órdenes', icon: ClipboardList, to: '/ordenes' },
  { id: 'inventario', label: 'Inventario', icon: Package, to: '/inventario' },
  { id: 'configuracion', label: 'Configuración', icon: Settings, to: '/configuracion' },
];

export function Sidebar({ isOpen }: SidebarProps) {
  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-40 ${
        isOpen ? 'w-64' : 'w-0'
      } overflow-hidden`}
    >
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.id}
              to={item.to}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 rounded-lg px-4 py-2 text-sm transition-colors',
                  isActive
                    ? 'bg-[#007BFF] text-white shadow-md'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
                ].join(' ')
              }
            >
              <Icon className="size-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
