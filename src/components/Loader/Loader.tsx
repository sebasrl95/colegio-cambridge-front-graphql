export default function Loader({ text = "Cargando..." }) {
    return (
        <div className="flex flex-col items-center mt-8">
            <div className="animate-spin rounded-full border-t-4 border-blue-600 w-16 h-16 mb-4"></div>
            <p className="text-lg text-gray-600">{text}</p>
        </div>
    );
}
