import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <Link
                            to="/"
                            className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                            Colegio Cambridge Graphql
                        </Link>
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden sm:flex space-x-6">
                        <Link to="/areas" className="text-gray-700 hover:text-blue-600">
                            Áreas
                        </Link>
                        <Link to="/salones" className="text-gray-700 hover:text-blue-600">
                            Salones
                        </Link>
                        <Link to="/oficinas" className="text-gray-700 hover:text-blue-600">
                            Oficinas
                        </Link>
                        <Link to="/empleados" className="text-gray-700 hover:text-blue-600">
                            Empleados
                        </Link>
                        <Link to="/reportes" className="text-gray-700 hover:text-blue-600">
                            Reportes
                        </Link>
                    </div>

                    {/* Mobile button */}
                    <div className="sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-blue-600 focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="sm:hidden bg-white border-t border-gray-100 shadow-sm">
                    <div className="px-4 py-3 space-y-2">
                        <Link
                            to="/areas"
                            className="block text-gray-700 hover:text-blue-600"
                            onClick={() => setIsOpen(false)}>
                            Áreas
                        </Link>
                        <Link
                            to="/salones"
                            className="block text-gray-700 hover:text-blue-600"
                            onClick={() => setIsOpen(false)}>
                            Salones
                        </Link>
                        <Link
                            to="/oficinas"
                            className="block text-gray-700 hover:text-blue-600"
                            onClick={() => setIsOpen(false)}>
                            Oficinas
                        </Link>
                        <Link
                            to="/empleados"
                            className="block text-gray-700 hover:text-blue-600"
                            onClick={() => setIsOpen(false)}>
                            Empleados
                        </Link>
                        <Link
                            to="/reportes"
                            className="block text-gray-700 hover:text-blue-600"
                            onClick={() => setIsOpen(false)}>
                            Reportes
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
