import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">Colegio Cambridge</Link>
                <div>
                    <ul className="navbar-nav">
                        <li className="nav-item"><Link className="nav-link" to="/areas">Áreas</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/salones">Salones</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/oficinas">Oficinas</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/empleados">Empleados</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/reportes">Reportes</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}