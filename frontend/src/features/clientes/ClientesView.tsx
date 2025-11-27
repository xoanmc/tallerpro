import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Search, UserPlus, Edit, Trash2, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Badge } from '../../components/ui/badge';

const clientesData = [
	{
		id: 1,
		nombre: 'Carlos Ruiz',
		telefono: '+34 612 345 678',
		email: 'carlos@email.com',
		vehiculos: 2,
		ultimaVisita: '05/11/2025',
	},
	{
		id: 2,
		nombre: 'Ana López',
		telefono: '+34 623 456 789',
		email: 'ana@email.com',
		vehiculos: 1,
		ultimaVisita: '10/11/2025',
	},
	{
		id: 3,
		nombre: 'Luis Martínez',
		telefono: '+34 634 567 890',
		email: 'luis@email.com',
		vehiculos: 1,
		ultimaVisita: '08/11/2025',
	},
	{
		id: 4,
		nombre: 'María González',
		telefono: '+34 645 678 901',
		email: 'maria@email.com',
		vehiculos: 3,
		ultimaVisita: '12/11/2025',
	},
	{
		id: 5,
		nombre: 'Pedro Sánchez',
		telefono: '+34 656 789 012',
		email: 'pedro@email.com',
		vehiculos: 1,
		ultimaVisita: '01/11/2025',
	},
];

export function ClientesView() {
	const [searchTerm, setSearchTerm] = useState('');
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [formData, setFormData] = useState({
		nombre: '',
		telefono: '',
		email: '',
		direccion: '',
		vehiculo: '',
	});

	const filteredClientes = clientesData.filter(cliente =>
		cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
		cliente.telefono.includes(searchTerm) ||
		cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Guardar cliente:', formData);
		setIsDialogOpen(false);
		setFormData({ nombre: '', telefono: '', email: '', direccion: '', vehiculo: '' });
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-gray-900 dark:text-white">Clientes</h1>
					<p className="text-gray-500 dark:text-gray-400">Gestión de clientes del taller</p>
				</div>

				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button className="bg-[#007BFF] hover:bg-[#0056b3] text-white">
							<UserPlus className="mr-2 size-4" />
							Nuevo Cliente
						</Button>
					</DialogTrigger>
					<DialogContent className="dark:bg-gray-800 dark:border-gray-700 max-w-md">
						<DialogHeader>
							<DialogTitle className="dark:text-white">Agregar Nuevo Cliente</DialogTitle>
						</DialogHeader>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<Label htmlFor="nombre" className="dark:text-gray-300">Nombre completo</Label>
								<Input
									id="nombre"
									value={formData.nombre}
									onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
									placeholder="Juan Pérez"
									className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
									required
								/>
							</div>
							<div>
								<Label htmlFor="telefono" className="dark:text-gray-300">Teléfono</Label>
								<Input
									id="telefono"
									type="tel"
									value={formData.telefono}
									onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
									placeholder="+34 600 000 000"
									className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
									required
								/>
							</div>
							<div>
								<Label htmlFor="email" className="dark:text-gray-300">Email</Label>
								<Input
									id="email"
									type="email"
									value={formData.email}
									onChange={(e) => setFormData({ ...formData, email: e.target.value })}
									placeholder="cliente@email.com"
									className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
									required
								/>
							</div>
							<div>
								<Label htmlFor="direccion" className="dark:text-gray-300">Dirección</Label>
								<Input
									id="direccion"
									value={formData.direccion}
									onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
									placeholder="Calle Principal 123"
									className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
								/>
							</div>
							<div>
								<Label htmlFor="vehiculo" className="dark:text-gray-300">Vehículo asociado (opcional)</Label>
								<Input
									id="vehiculo"
									value={formData.vehiculo}
									onChange={(e) => setFormData({ ...formData, vehiculo: e.target.value })}
									placeholder="Toyota Corolla - ABC-123"
									className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
								/>
							</div>
							<div className="flex gap-3 pt-4">
								<Button type="submit" className="flex-1 bg-[#007BFF] hover:bg-[#0056b3] text-white">
									Guardar
								</Button>
								<Button
									type="button"
									variant="outline"
									className="flex-1 dark:border-gray-600 dark:text-gray-300"
									onClick={() => setIsDialogOpen(false)}
								>
									Cancelar
								</Button>
							</div>
						</form>
					</DialogContent>
				</Dialog>
			</div>

			<Card className="dark:bg-gray-800 dark:border-gray-700">
				<CardHeader>
					<div className="flex items-center gap-4">
						<div className="relative flex-1">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
							<Input
								placeholder="Buscar por nombre, teléfono o email..."
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
									<th className="text-left p-3 text-gray-600 dark:text-gray-400">Nombre</th>
									<th className="text-left p-3 text-gray-600 dark:text-gray-400">Teléfono</th>
									<th className="text-left p-3 text-gray-600 dark:text-gray-400">Email</th>
									<th className="text-left p-3 text-gray-600 dark:text-gray-400">Vehículos</th>
									<th className="text-left p-3 text-gray-600 dark:text-gray-400">Última Visita</th>
									<th className="text-left p-3 text-gray-600 dark:text-gray-400">Acciones</th>
								</tr>
							</thead>
							<tbody>
								{filteredClientes.map((cliente) => (
									<tr
										key={cliente.id}
										className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
									>
										<td className="p-3 text-gray-900 dark:text-white">{cliente.nombre}</td>
										<td className="p-3 text-gray-600 dark:text-gray-400">{cliente.telefono}</td>
										<td className="p-3 text-gray-600 dark:text-gray-400">{cliente.email}</td>
										<td className="p-3">
											<Badge className="bg-[#007BFF] text-white hover:bg-[#0056b3]">
												{cliente.vehiculos} vehículo{cliente.vehiculos !== 1 ? 's' : ''}
											</Badge>
										</td>
										<td className="p-3 text-gray-600 dark:text-gray-400">{cliente.ultimaVisita}</td>
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
