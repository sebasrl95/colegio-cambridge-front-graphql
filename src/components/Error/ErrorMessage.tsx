import { AlertTriangle } from 'lucide-react';

export default function ErrorMessage({ message }: { message: string }) {
    return (
        <div className="mt-4 mb-4">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-sm flex items-center" role="alert">
                <AlertTriangle size={20} className="mr-2" />
                <span>{message}</span>
            </div>
        </div>
    );
}
