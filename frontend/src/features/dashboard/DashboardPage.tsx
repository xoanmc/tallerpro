import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { ClipboardList, Car, Users, Package, TrendingUp, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Badge } from '../../components/ui/badge';

const metricsData = [
  { title: 'Órdenes Abiertas', value: '24', icon: ClipboardList, color: 'bg-blue-500', trend: '+12%' },
  { title: 'Vehículos en Taller', value: '18', icon: Car, color: 'bg-green-500', trend: '+5%' },
  { title: 'Clientes Activos', value: '142', icon: Users, color: 'bg-purple-500', trend: '+8%' },
  { title: 'Piezas Stock Bajo', value: '7', icon: Package, color: 'bg-red-500', trend: '-3' },
];

const ordenesPorMes = [
  { mes: 'Ene', ordenes: 45, completadas: 38 },
  { mes: 'Feb', ordenes: 52, completadas: 45 },
  { mes: 'Mar', ordenes: 48, completadas: 42 },
  { mes: 'Abr', ordenes: 61, completadas: 55 },
  { mes: 'May', ordenes: 55, completadas: 48 },
  { mes: 'Jun', ordenes: 67, completadas: 60 },
];

const ultimasOrdenes = [
  { id: '#1289', cliente: 'Carlos Ruiz', vehiculo: 'Toyota Corolla', placa: 'ABC-123', estado: 'En curso', fecha: '12/11/2025' },
  { id: '#1288', cliente: 'Ana López', vehiculo: 'Honda Civic', placa: 'XYZ-789', estado: 'Completado', fecha: '11/11/2025' },
  { id: '#1287', cliente: 'Luis Martínez', vehiculo: 'Ford Focus', placa: 'DEF-456', estado: 'Pendiente', fecha: '11/11/2025' },
  { id: '#1286', cliente: 'María González', vehiculo: 'Mazda 3', placa: 'GHI-321', estado: 'En curso', fecha: '10/11/2025' },
  { id: '#1285', cliente: 'Pedro Sánchez', vehiculo: 'Nissan Sentra', placa: 'JKL-654', estado: 'Completado', fecha: '10/11/2025' },
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

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">Resumen general del taller</p>
        </div>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricsData.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">{metric.title}</p>
                    <p className="text-gray-900 dark:text-white mt-2">{metric.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="size-4 text-green-500" />
                      <span className="text-green-500">{metric.trend}</span>
                    </div>
                  </div>
                  <div className={`${metric.color} p-3 rounded-lg`}>
                    <Icon className="size-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Órdenes por Mes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ordenesPorMes}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="mes" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="ordenes" fill="#007BFF" name="Total Órdenes" radius={[8, 8, 0, 0]} />
                <Bar dataKey="completadas" fill="#10b981" name="Completadas" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Tendencia de Órdenes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ordenesPorMes}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="mes" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="ordenes" stroke="#007BFF" strokeWidth={2} name="Total Órdenes" />
                <Line type="monotone" dataKey="completadas" stroke="#10b981" strokeWidth={2} name="Completadas" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Últimas Órdenes */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Últimas Órdenes</CardTitle>
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
                  <th className="text-left p-3 text-gray-600 dark:text-gray-400">Estado</th>
                  <th className="text-left p-3 text-gray-600 dark:text-gray-400">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {ultimasOrdenes.map((orden, index) => (
                  <tr 
                    key={index} 
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  >
                    <td className="p-3 text-gray-900 dark:text-white">{orden.id}</td>
                    <td className="p-3 text-gray-900 dark:text-white">{orden.cliente}</td>
                    <td className="p-3 text-gray-600 dark:text-gray-400">{orden.vehiculo}</td>
                    <td className="p-3 text-gray-600 dark:text-gray-400">{orden.placa}</td>
                    <td className="p-3">{getEstadoBadge(orden.estado)}</td>
                    <td className="p-3 text-gray-600 dark:text-gray-400">{orden.fecha}</td>
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
