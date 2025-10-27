export default function ErrorMessage({ message }) {
    return (
        <div className="mt-3">
            <div className="alert alert-danger">{message}</div>
        </div>
    );
}
