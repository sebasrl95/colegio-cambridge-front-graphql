import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="container mt-5">
            <div className="text-center">
                <h1>Bienvenido al Colegio Cambridge</h1>
                <p className="lead">
                    Plataforma de gestión de salones, oficinas, áreas, empleados y reportes.
                </p>
            </div>

            <div className="row mt-4">
                <div className="col-md-3 mb-3">
                    <div className="card shadow-sm h-100">
                        <div className="card-body text-center">
                            <h5 className="card-title">Áreas</h5>
                            <p className="card-text">Crea y organiza las áreas del colegio.</p>
                            <Link to="/areas" className="btn btn-primary">
                                Ir a Áreas
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card shadow-sm h-100">
                        <div className="card-body text-center">
                            <h5 className="card-title">Salones</h5>
                            <p className="card-text">Administra los salones del colegio.</p>
                            <Link to="/salones" className="btn btn-primary">
                                Ir a Salones
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card shadow-sm h-100">
                        <div className="card-body text-center">
                            <h5 className="card-title">Oficinas</h5>
                            <p className="card-text">Gestiona las oficinas disponibles.</p>
                            <Link to="/oficinas" className="btn btn-primary">
                                Ir a Oficinas
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card shadow-sm h-100">
                        <div className="card-body text-center">
                            <h5 className="card-title">Empleados</h5>
                            <p className="card-text">Administra empleados y profesores.</p>
                            <Link to="/empleados" className="btn btn-primary">
                                Ir a Empleados
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-12 mt-4">
                    <div className="card shadow-sm">
                        <div className="card-body text-center">
                            <h5 className="card-title">📊 Reportes</h5>
                            <p className="card-text">
                                Consulta reportes de áreas con empleados, salones y oficinas.
                            </p>
                            <Link to="/reportes" className="btn btn-success">
                                Ir a Reportes
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
