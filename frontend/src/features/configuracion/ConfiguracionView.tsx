import { useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { Moon, Sun } from 'lucide-react';

export function ConfiguracionView() {
  // Estado local SOLO para mostrar el toggle dentro del card
  const [localDarkMode, setLocalDarkMode] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 dark:text-white">Configuración</h1>
        <p className="text-gray-500 dark:text-gray-400">Ajustes de la aplicación</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Apariencia */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Apariencia</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {localDarkMode ? (
                  <Moon className="size-5 text-gray-600 dark:text-gray-400" />
                ) : (
                  <Sun className="size-5 text-gray-600 dark:text-gray-400" />
                )}

                <div>
                  <Label className="dark:text-white">Modo oscuro</Label>
                  <p className="text-gray-500 dark:text-gray-400">Cambia el tema de la aplicación</p>
                </div>
              </div>

              <Switch checked={localDarkMode} onCheckedChange={setLocalDarkMode} />
            </div>
          </CardContent>
        </Card>

        {/* Notificaciones */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Notificaciones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="dark:text-white">Stock bajo</Label>
                <p className="text-gray-500 dark:text-gray-400">Alertas de inventario</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="dark:text-white">Órdenes completadas</Label>
                <p className="text-gray-500 dark:text-gray-400">Notificar trabajos finalizados</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="dark:text-white">Nuevos clientes</Label>
                <p className="text-gray-500 dark:text-gray-400">Alertas de registro</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Información del taller */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Información del Taller</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Nombre</p>
              <p className="text-gray-900 dark:text-white">TallerPro Workshop</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Dirección</p>
              <p className="text-gray-900 dark:text-white">Calle Principal 123, Madrid</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Teléfono</p>
              <p className="text-gray-900 dark:text-white">+34 912 345 678</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Email</p>
              <p className="text-gray-900 dark:text-white">contacto@tallerpro.es</p>
            </div>
          </CardContent>
        </Card>

        {/* Sistema */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Sistema</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Versión</p>
              <p className="text-gray-900 dark:text-white">v1.0.0</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Última actualización</p>
              <p className="text-gray-900 dark:text-white">12/11/2025</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Licencia</p>
              <p className="text-gray-900 dark:text-white">Profesional</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}