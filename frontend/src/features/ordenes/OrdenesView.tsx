import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Search, Plus, Eye } from 'lucide-react';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';

const ordenesData = [
  { 
    id: '#1289', 
    cliente: 'Carlos Ruiz', 
    vehiculo: 'Toyota Corolla', 
    placa: 'ABC-123', 
    estado: 'En curso', 
    fecha: '12/11/2025',
    descripcion: 'Cambio de aceite y filtros',
    monto: 120
  },
  { 
    id: '#1288', 
    cliente: 'Ana López', 
    vehiculo: 'Honda Civic', 
    placa: 'XYZ-789', 
    estado: 'Completado', 
    fecha: '11/11/2025',
    descripcion: 'Reparación de frenos',
    monto: 350
  },
  { 
    id: '#1287', 
    cliente: 'Luis Martínez', 
    vehiculo: 'Ford Focus', 
    placa: 'DEF-456', 
    estado: 'Pendiente', 
    fecha: '11/11/2025',
    descripcion: 'Diagnóstico de motor',
    monto: 80
  },
];

const piezasOrden = [
  { pieza: 'Filtro de aceite', cantidad: 1, precio: 15 },
  { pieza: 'Aceite sintético 5W-30', cantidad: 4, precio: 25 },
  { pieza: 'Filtro de aire', cantidad: 1, precio: 20 },
];

const historialOrden = [
  { fecha: '12/11/2025 09:30', accion: 'Orden creada', usuario: 'Juan Pérez' },
  { fecha: '12/11/2025 10:15', accion: 'Diagnóstico iniciado', usuario: 'Juan Pérez' },
  { fecha: '12/11/2025 11:00', accion: 'Piezas solicitadas', usuario: 'María García' },
  { fecha: '12/11/2025 14:30', accion: 'Trabajo en progreso', usuario: 'Juan Pérez' },
];

const getEstadoBadge = (estado: string) => {
  switch (estado) {
    case 'Completado':
      return <Badge className="bg-green-500 text-white hover:bg-green-600">Completado</Badge>;
    case 'En curso':
      return <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">En curso</Badge>;
    case 'Pendiente':
      return <Badge className="bg-red-500 text-white hover:bg-red-600">Pendiente</Badge>;
    default:
      return <Badge>{estado}</Badge>;
  }
};

export function OrdenesView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrden, setSelectedOrden] = useState(ordenesData[0]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredOrdenes = ordenesData.filter(orden =>
    orden.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    orden.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    orden.placa.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 dark:text-white">Órdenes de Trabajo</h1>
          <p className="text-gray-500 dark:text-gray-400">Gestión de órdenes del taller</p>
        </div>
        
        <Button className="bg-[#007BFF] hover:bg-[#0056b3] text-white">
          <Plus className="mr-2 size-4" />
          Nueva Orden
        </Button>
      </div>

      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
              <Input
                placeholder="Buscar por ID, cliente o matrícula..."
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
                  <th className="text-left p-3 text-gray-600 dark:text-gray-400">ID</th>
                  <th className="text-left p-3 text-gray-600 dark:text-gray-400">Cliente</th>
                  <th className="text-left p-3 text-gray-600 dark:text-gray-400">Vehículo</th>
                  <th className="text-left p-3 text-gray-600 dark:text-gray-400">Placa</th>
                  <th className="text-left p-3 text-gray-600 dark:text-gray-400">Descripción</th>
                  <th className="text-left p-3 text-gray-600 dark:text-gray-400">Estado</th>
                  <th className="text-left p-3 text-gray-600 dark:text-gray-400">Monto</th>
                  <th className="text-left p-3 text-gray-600 dark:text-gray-400">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrdenes.map((orden) => (
                  <tr 
                    key={orden.id}
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="p-3 text-gray-900 dark:text-white">{orden.id}</td>
                    <td className="p-3 text-gray-900 dark:text-white">{orden.cliente}</td>
                    <td className="p-3 text-gray-600 dark:text-gray-400">{orden.vehiculo}</td>
                    <td className="p-3 text-gray-600 dark:text-gray-400">{orden.placa}</td>
                    <td className="p-3 text-gray-600 dark:text-gray-400">{orden.descripcion}</td>
                    <td className="p-3">{getEstadoBadge(orden.estado)}</td>
                    <td className="p-3 text-gray-900 dark:text-white">€{orden.monto}</td>
                    <td className="p-3">
                      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="hover:bg-blue-50 dark:hover:bg-blue-900"
                            onClick={() => setSelectedOrden(orden)}
                          >
                            <Eye className="size-4 text-blue-600 dark:text-blue-400" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="dark:bg-gray-800 dark:border-gray-700 max-w-3xl">
                          <DialogHeader>
                            <DialogTitle className="dark:text-white">Orden {selectedOrden.id}</DialogTitle>
                          </DialogHeader>
                          
                          <Tabs defaultValue="general" className="w-full">
                            <TabsList className="grid w-full grid-cols-3 dark:bg-gray-700">
                              <TabsTrigger value="general" className="dark:data-[state=active]:bg-gray-600">Datos Generales</TabsTrigger>
                              <TabsTrigger value="piezas" className="dark:data-[state=active]:bg-gray-600">Piezas Usadas</TabsTrigger>
                              <TabsTrigger value="historial" className="dark:data-[state=active]:bg-gray-600">Historial</TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="general" className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-gray-500 dark:text-gray-400">Cliente</p>
                                  <p className="text-gray-900 dark:text-white">{selectedOrden.cliente}</p>
                                </div>
                                <div>
                                  <p className="text-gray-500 dark:text-gray-400">Vehículo</p>
                                  <p className="text-gray-900 dark:text-white">{selectedOrden.vehiculo}</p>
                                </div>
                                <div>
                                  <p className="text-gray-500 dark:text-gray-400">Matrícula</p>
                                  <p className="text-gray-900 dark:text-white">{selectedOrden.placa}</p>
                                </div>
                                <div>
                                  <p className="text-gray-500 dark:text-gray-400">Estado</p>
                                  {getEstadoBadge(selectedOrden.estado)}
                                </div>
                                <div>
                                  <p className="text-gray-500 dark:text-gray-400">Fecha</p>
                                  <p className="text-gray-900 dark:text-white">{selectedOrden.fecha}</p>
                                </div>
                                <div>
                                  <p className="text-gray-500 dark:text-gray-400">Monto Total</p>
                                  <p className="text-gray-900 dark:text-white">€{selectedOrden.monto}</p>
                                </div>
                                <div className="col-span-2">
                                  <p className="text-gray-500 dark:text-gray-400">Descripción</p>
                                  <p className="text-gray-900 dark:text-white">{selectedOrden.descripcion}</p>
                                </div>
                              </div>
                            </TabsContent>
                            
                            <TabsContent value="piezas">
                              <table className="w-full">
                                <thead>
                                  <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <th className="text-left p-2 text-gray-600 dark:text-gray-400">Pieza</th>
                                    <th className="text-left p-2 text-gray-600 dark:text-gray-400">Cantidad</th>
                                    <th className="text-left p-2 text-gray-600 dark:text-gray-400">Precio Unit.</th>
                                    <th className="text-left p-2 text-gray-600 dark:text-gray-400">Total</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {piezasOrden.map((pieza, index) => (
                                    <tr key={index} className="border-b border-gray-100 dark:border-gray-700">
                                      <td className="p-2 text-gray-900 dark:text-white">{pieza.pieza}</td>
                                      <td className="p-2 text-gray-600 dark:text-gray-400">{pieza.cantidad}</td>
                                      <td className="p-2 text-gray-600 dark:text-gray-400">€{pieza.precio}</td>
                                      <td className="p-2 text-gray-900 dark:text-white">€{pieza.cantidad * pieza.precio}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </TabsContent>
                            
                            <TabsContent value="historial">
                              <div className="space-y-3">
                                {historialOrden.map((item, index) => (
                                  <div key={index} className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <div className="w-2 bg-[#007BFF] rounded"></div>
                                    <div className="flex-1">
                                      <p className="text-gray-900 dark:text-white">{item.accion}</p>
                                      <p className="text-gray-500 dark:text-gray-400">{item.fecha} - {item.usuario}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </TabsContent>
                          </Tabs>
                        </DialogContent>
                      </Dialog>
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
