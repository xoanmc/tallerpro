import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Search, Plus, Edit, Trash2, AlertTriangle } from 'lucide-react';
import { Badge } from '../../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../components/ui/select';

const inventarioData = [
  { id: 1, codigo: 'FL-001', nombre: 'Filtro de aceite', categoria: 'Filtros', stock: 25, stockMin: 10, precio: 15, proveedor: 'AutoPartes SA' },
  { id: 2, codigo: 'AC-002', nombre: 'Aceite sintético 5W-30', categoria: 'Lubricantes', stock: 45, stockMin: 20, precio: 25, proveedor: 'LubriMax' },
  { id: 3, codigo: 'FR-003', nombre: 'Pastillas de freno', categoria: 'Frenos', stock: 3, stockMin: 8, precio: 65, proveedor: 'BrakePro' },
  { id: 4, codigo: 'FL-004', nombre: 'Filtro de aire', categoria: 'Filtros', stock: 18, stockMin: 10, precio: 20, proveedor: 'AutoPartes SA' },
  { id: 5, codigo: 'BA-005', nombre: 'Batería 12V 60Ah', categoria: 'Eléctrico', stock: 5, stockMin: 5, precio: 120, proveedor: 'PowerCell' },
  { id: 6, codigo: 'LL-006', nombre: 'Neumático 205/55R16', categoria: 'Neumáticos', stock: 2, stockMin: 8, precio: 85, proveedor: 'TireWorld' },
];

export function InventarioView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('todas');
  const [filtroStock, setFiltroStock] = useState('todos');

  const categorias = ['todas', ...new Set(inventarioData.map(item => item.categoria))];

  const filteredInventario = inventarioData.filter(item => {
    const matchesSearch = 
      item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.codigo.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategoria = filtroCategoria === 'todas' || item.categoria === filtroCategoria;
    
    const matchesStock = 
      filtroStock === 'todos' ||
      (filtroStock === 'bajo' && item.stock <= item.stockMin) ||
      (filtroStock === 'normal' && item.stock > item.stockMin);

    return matchesSearch && matchesCategoria && matchesStock;
  });

  const getStockBadge = (stock: number, stockMin: number) => {
    if (stock <= stockMin) {
      return (
        <div className="flex items-center gap-2">
          <Badge className="bg-red-500 text-white hover:bg-red-600">Stock Bajo</Badge>
          <AlertTriangle className="size-4 text-red-500" />
        </div>
      );
    } else if (stock <= stockMin * 1.5) {
      return <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">Advertencia</Badge>;
    } else {
      return <Badge className="bg-green-500 text-white hover:bg-green-600">Stock OK</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 dark:text-white">Inventario de Piezas</h1>
          <p className="text-gray-500 dark:text-gray-400">Gestión de stock y piezas</p>
        </div>
        
        <Button className="bg-[#007BFF] hover:bg-[#0056b3] text-white">
          <Plus className="mr-2 size-4" />
          Nueva Pieza
        </Button>
      </div>

      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
              <Input
                placeholder="Buscar por nombre o código..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            
            <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
              <SelectTrigger className="w-full md:w-48 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                {categorias.map(cat => (
                  <SelectItem key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filtroStock} onValueChange={setFiltroStock}>
              <SelectTrigger className="w-full md:w-48 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <SelectValue placeholder="Estado de stock" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="bajo">Stock Bajo</SelectItem>
                <SelectItem value="normal">Stock Normal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left p-3 text-gray-600 dark:text-gray-400">Código</th>
                  <th className="text-left p-3 text-gray-600 dark:text-gray-400">Nombre</th>
                  <th className="text-left p-3 text-gray-600 dark:text-gray-400">Categoría</th>
                  <th className="text-left p-3 text-gray-600 dark:text-gray-400">Stock Actual</th>
                  <th className="text-left p-3 text-gray-600 dark:text-gray-400">Stock Mín.</th>
                  <th className="text-left p-3 text-gray-600 dark:text-gray-400">Estado</th>
                  <th className="text-left p-3 text-gray-600 dark:text-gray-400">Precio</th>
                  <th className="text-left p-3 text-gray-600 dark:text-gray-400">Proveedor</th>
                  <th className="text-left p-3 text-gray-600 dark:text-gray-400">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventario.map((item) => (
                  <tr 
                    key={item.id}
                    className={`border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      item.stock <= item.stockMin ? 'bg-red-50 dark:bg-red-900/10' : ''
                    }`}
                  >
                    <td className="p-3 text-gray-900 dark:text-white">{item.codigo}</td>
                    <td className="p-3 text-gray-900 dark:text-white">{item.nombre}</td>
                    <td className="p-3">
                      <Badge variant="outline" className="dark:border-gray-600 dark:text-gray-300">
                        {item.categoria}
                      </Badge>
                    </td>
                    <td className="p-3 text-gray-900 dark:text-white">{item.stock}</td>
                    <td className="p-3 text-gray-600 dark:text-gray-400">{item.stockMin}</td>
                    <td className="p-3">{getStockBadge(item.stock, item.stockMin)}</td>
                    <td className="p-3 text-gray-900 dark:text-white">€{item.precio}</td>
                    <td className="p-3 text-gray-600 dark:text-gray-400">{item.proveedor}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
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

          {filteredInventario.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No se encontraron piezas que coincidan con los filtros
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resumen de stock bajo */}
      {inventarioData.filter(item => item.stock <= item.stockMin).length > 0 && (
        <Card className="dark:bg-gray-800 dark:border-gray-700 border-l-4 border-l-red-500">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-5 text-red-500" />
              <h3 className="text-gray-900 dark:text-white">Alerta de Stock Bajo</h3>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {inventarioData
                .filter(item => item.stock <= item.stockMin)
                .map(item => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div>
                      <p className="text-gray-900 dark:text-white">{item.nombre}</p>
                      <p className="text-gray-600 dark:text-gray-400">Stock actual: {item.stock} | Mínimo: {item.stockMin}</p>
                    </div>
                    <Button size="sm" className="bg-[#007BFF] hover:bg-[#0056b3] text-white">
                      Solicitar
                    </Button>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
