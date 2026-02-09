interface Plant {
    id: number;
    name: string;
    lastWatered: string;
    comment?: string;
}

interface PlantListProps {
    plants: Plant[];
    onDelete: (id: number) => void;
}

export default function PlantList({ plants, onDelete }: PlantListProps) {
    return (
        <table className="w-full border-collapse border border-gray-300 shadow-md">
            <thead className="bg-green-200">
            <tr>
                <th className="border border-gray-300 p-2">Име</th>
                <th className="border border-gray-300 p-2">Последно наводнување</th>
                <th className="border border-gray-300 p-2">Коментар</th>
                <th className="border border-gray-300 p-2">Акција</th>
            </tr>
            </thead>
            <tbody>
            {plants.map(({ id, name, lastWatered, comment }) => (
                <tr key={id} className="hover:bg-green-100">
                    <td className="border border-gray-300 p-2">{name}</td>
                    <td className="border border-gray-300 p-2">{lastWatered}</td>
                    <td className="border border-gray-300 p-2">{comment || "-"}</td>
                    <td className="border border-gray-300 p-2 text-center">
                        <button
                            onClick={() => onDelete(id)}
                            className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                        >
                            Избриши
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}
