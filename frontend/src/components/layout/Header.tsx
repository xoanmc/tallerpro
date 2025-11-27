import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Menu } from "lucide-react";
import { Bell } from "lucide-react";
import { User } from "lucide-react";
import { Settings } from "lucide-react";
import { LogOut } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface HeaderProps {
    sidebarOpen: boolean;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}


export function Header({ sidebarOpen, setSidebarOpen, setDarkMode }: HeaderProps) {
    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-50 transition-colors">
            <div className="h-full flex items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <Menu className="size-5" />
                    </Button>

                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#007BFF] rounded-lg flex items-center justify-center">
                            <span className="text-white">T</span>
                        </div>
                        <span className="text-gray-900 dark:text-white">TallerPro</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="relative hover:bg-gray-100 dark:hover:bg-gray-700">
                                <Bell className="size-5 text-gray-600 dark:text-gray-300" />
                                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white px-1.5 py-0 min-w-5 h-5 flex items-center justify-center">
                                    3
                                </Badge>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-80">
                            <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <div className="max-h-96 overflow-y-auto">
                                <div className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-l-4 border-yellow-500">
                                    <p className="text-gray-900 dark:text-white">Stock bajo: Filtro de aceite</p>
                                    <p className="text-gray-500 dark:text-gray-400">Quedan 3 unidades</p>
                                </div>
                                <div className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-l-4 border-green-500">
                                    <p className="text-gray-900 dark:text-white">Orden #1234 completada</p>
                                    <p className="text-gray-500 dark:text-gray-400">Vehículo ABC-123 listo</p>
                                </div>
                                <div className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-l-4 border-blue-500">
                                    <p className="text-gray-900 dark:text-white">Nuevo cliente registrado</p>
                                    <p className="text-gray-500 dark:text-gray-400">María González</p>
                                </div>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                                <div className="w-8 h-8 bg-[#007BFF] rounded-full flex items-center justify-center">
                                    <User className="size-4 text-white" />
                                </div>
                                <span className="text-gray-700 dark:text-gray-300">Juan Pérez</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <User className="mr-2 size-4" />
                                Perfil
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings className="mr-2 size-4" />
                                Configuración
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                                <LogOut className="mr-2 size-4" />
                                Cerrar sesión
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}