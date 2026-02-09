import { useState } from "react";

interface PlantFormProps {
    onAdd: (plant: { name: string; lastWatered: string; comment?: string }) => void;
}

export default function PlantForm({ onAdd }: PlantFormProps) {
    const [name, setName] = useState("");
    const [lastWatered, setLastWatered] = useState("");
    const [comment, setComment] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd({ name, lastWatered, comment });
        setName("");
        setLastWatered("");
        setComment("");
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded shadow-lg bg-green-50">
            <div className="mb-2">
                <label className="block font-semibold">Име на растение:</label>
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    className="w-full border rounded p-1"
                />
            </div>
            <div className="mb-2">
                <label className="block font-semibold">Последно наводнување:</label>
                <input
                    type="date"
                    value={lastWatered}
                    onChange={e => setLastWatered(e.target.value)}
                    required
                    className="w-full border rounded p-1"
                />
            </div>
            <div className="mb-2">
                <label className="block font-semibold">Коментар (опционално):</label>
                <textarea
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    className="w-full border rounded p-1"
                />
            </div>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Додади растение
            </button>
        </form>
    );
}
