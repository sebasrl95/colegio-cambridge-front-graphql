export default function Loader({ text = "Cargando..." }) {
    return (
        <div className="container mt-4 text-center">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">{text}</span>
            </div>
            <p className="mt-2">{text}</p>
        </div>
    );
}
