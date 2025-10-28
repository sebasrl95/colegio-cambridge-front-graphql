import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-800">
                    Bienvenido al Colegio Cambridge
                </h1>
                <p className="text-gray-600 text-lg mt-2">
                    Plataforma de gestión de salones, oficinas, áreas, empleados y reportes.
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
                    <h5 className="text-lg font-semibold text-gray-800 mb-2">Áreas</h5>
                    <p className="text-gray-600 mb-4">
                        Crea y organiza las áreas del colegio.
                    </p>
                    <Link
                        to="/areas"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                        Ir a Áreas
                    </Link>
                </div>
                <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
                    <h5 className="text-lg font-semibold text-gray-800 mb-2">Salones</h5>
                    <p className="text-gray-600 mb-4">
                        Administra los salones del colegio.
                    </p>
                    <Link
                        to="/salones"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                        Ir a Salones
                    </Link>
                </div>
                <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
                    <h5 className="text-lg font-semibold text-gray-800 mb-2">Oficinas</h5>
                    <p className="text-gray-600 mb-4">
                        Gestiona las oficinas disponibles.
                    </p>
                    <Link
                        to="/oficinas"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                        Ir a Oficinas
                    </Link>
                </div>
                {/* Empleados */}
                <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
                    <h5 className="text-lg font-semibold text-gray-800 mb-2">Empleados</h5>
                    <p className="text-gray-600 mb-4">
                        Administra empleados y profesores.
                    </p>
                    <Link
                        to="/empleados"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                        Ir a Empleados
                    </Link>
                </div>
            </div>

            <div className="mt-10">
                <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                    <h5 className="text-lg font-semibold text-gray-800 mb-2">📊 Reportes</h5>
                    <p className="text-gray-600 mb-4">
                        Consulta reportes de áreas con empleados, salones y oficinas.
                    </p>
                    <Link
                        to="/reportes"
                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                        Ir a Reportes
                    </Link>
                </div>
            </div>
        </div>
    );
}
