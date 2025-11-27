import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Search, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Badge } from '../../components/ui/badge';

const vehiculosData = [
  { id: 1, matricula: 'ABC-123', marca: 'Toyota', modelo: 'Corolla', año: 2020, estado: 'En taller', cliente: 'Carlos Ruiz', kilometraje: 45000 },
  { id: 2, matricula: 'XYZ-789', marca: 'Honda', modelo: 'Civic', año: 2019, estado: 'Disponible', cliente: 'Ana López', kilometraje: 62000 },
  { id: 3, matricula: 'DEF-456', marca: 'Ford', modelo: 'Focus', año: 2021, estado: 'Mantenimiento', cliente: 'Luis Martínez', kilometraje: 28000 },
  { id: 4, matricula: 'GHI-321', marca: 'Mazda', modelo: '3', año: 2022, estado: 'En taller', cliente: 'María González', kilometraje: 15000 },
  { id: 5, matricula: 'JKL-654', marca: 'Nissan', modelo: 'Sentra', año: 2018, estado: 'Disponible', cliente: 'Pedro Sánchez', kilometraje: 89000 },
];

const getEstadoBadge = (estado: string) => {
  switch (estado) {
    case 'Disponible':
      return <Badge className="bg-green-500 text-white hover:bg-green-600">Disponible</Badge>;
    case 'En taller':
      return <Badge className="bg-blue-500 text-white hover:bg-blue-600">En taller</Badge>;
    case 'Mantenimiento':
      return <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">Mantenimiento</Badge>;
    default:
      return <Badge>{estado}</Badge>;
  }
};

export function VehiculosView() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVehiculos = vehiculosData.filter(vehiculo =>
    vehiculo.matricula.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehiculo.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehiculo.cliente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 dark:text-white">Vehículos</h1>
          <p className="text-gray-500 dark:text-gray-400">Gestión de vehículos registrados</p>
        </div>
        
        <Button className="bg-[#007BFF] hover:bg-[#0056b3] text-white">
          <Plus className="mr-2 size-4" />
          Nuevo Vehículo
        </Button>
      </div>

      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
              <Input
                placeholder="Buscar por matrícula, modelo o cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left p-3 text-gray-600 dark:text-gray-400">Matrícula</th>
                  <th className="text-left p-3 text-gray-600 dark:text-gray-400">Vehículo</th>
                  <th className="text-left p-3 text-gray-600 dark:text-gray-400">Año</th>
                  <th className="text-left p-3 text-gray-600 dark:text-gray-400">Kilometraje</th>
                  <th className="text-left p-3 text-gray-600 dark:text-gray-400">Estado</th>
                  <th className="text-left p-3 text-gray-600 dark:text-gray-400">Cliente</th>
                  <th className="text-left p-3 text-gray-600 dark:text-gray-400">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredVehiculos.map((vehiculo) => (
                  <tr 
                    key={vehiculo.id}
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="p-3 text-gray-900 dark:text-white">{vehiculo.matricula}</td>
                    <td className="p-3 text-gray-900 dark:text-white">
                      {vehiculo.marca} {vehiculo.modelo}
                    </td>
                    <td className="p-3 text-gray-600 dark:text-gray-400">{vehiculo.año}</td>
                    <td className="p-3 text-gray-600 dark:text-gray-400">{vehiculo.kilometraje.toLocaleString()} km</td>
                    <td className="p-3">{getEstadoBadge(vehiculo.estado)}</td>
                    <td className="p-3 text-gray-600 dark:text-gray-400">{vehiculo.cliente}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="hover:bg-blue-50 dark:hover:bg-blue-900">
                          <Eye className="size-4 text-blue-600 dark:text-blue-400" />
                        </Button>
                        <Button variant="ghost" size="sm" className="hover:bg-green-50 dark:hover:bg-green-900">
                          <Edit className="size-4 text-green-600 dark:text-green-400" />
                        </Button>
                        <Button variant="ghost" size="sm" className="hover:bg-red-50 dark:hover:bg-red-900">
                          <Trash2 className="size-4 text-red-600 dark:text-red-400" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
