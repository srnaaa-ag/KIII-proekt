import { useEffect, useState } from 'react';
import './App.css';

interface Plant {
    id: number;
    name: string;
    type: string;
    description?: string;
    lastWatered?: string;
}

interface PlantForm {
    name: string;
    type: string;
    description: string;
    lastWatered: string;
}

function App() {
    const [plants, setPlants] = useState<Plant[]>([]);
    const [form, setForm] = useState<PlantForm>({
        name: '',
        type: '',
        description: '',
        lastWatered: ''
    });
    const [editingId, setEditingId] = useState<number | null>(null);

    const fetchPlants = async () => {
        try {
            const res = await fetch('/api/plants');
            const data: Plant[] = await res.json();
            setPlants(data);
        } catch (error) {
            alert('Failed to fetch plants');
        }
    };

    const resetForm = () => {
        setForm({ name: '', type: '', description: '', lastWatered: '' });
        setEditingId(null);
    };

    const addOrUpdatePlant = async () => {
        if (!form.name.trim() || !form.type.trim()) {
            alert('Please fill in at least Name and Type!');
            return;
        }

        try {
            if (editingId !== null) {
                await fetch(`/api/plants/${editingId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form),
                });
            } else {
                await fetch('/api/plants', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form),
                });
            }
            resetForm();
            fetchPlants();
        } catch (error) {
            alert(editingId ? 'Failed to update plant' : 'Failed to add plant');
        }
    };

    const deletePlant = async (id: number) => {
        try {
            await fetch(`/api/plants/${id}`, { method: 'DELETE' });
            if (editingId === id) resetForm();
            fetchPlants();
        } catch (error) {
            alert('Failed to delete plant');
        }
    };

    const startEdit = (plant: Plant) => {
        setForm({
            name: plant.name || '',
            type: plant.type || '',
            description: plant.description || '',
            lastWatered: plant.lastWatered ? plant.lastWatered.split('T')[0] : '',
        });
        setEditingId(plant.id);
    };

    useEffect(() => {
        fetchPlants();
    }, []);

    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return '-';
        const d = new Date(dateString);
        return d.toLocaleDateString('en-GB');
    };

    return (
        <div className="container">
            <h1>🌿 Plant Diary</h1>
            <div className="form">
                <input
                    type="text"
                    placeholder="Plant Name*"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Plant Type*"
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                />
                <textarea
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
                <input
                    type="date"
                    value={form.lastWatered}
                    onChange={(e) => setForm({ ...form, lastWatered: e.target.value })}
                />
                <button onClick={addOrUpdatePlant}>
                    {editingId ? 'Save Changes' : 'Add Plant'}
                </button>
                {editingId && (
                    <button
                        onClick={resetForm}
                        style={{ backgroundColor: '#d32f2f', marginTop: '0.5rem' }}
                    >
                        Cancel
                    </button>
                )}
            </div>

            <div className="plant-list">
                {plants.length === 0 ? (
                    <p style={{ textAlign: 'center', fontStyle: 'italic' }}>No plants found yet 🌱</p>
                ) : (
                    plants.map((plant) => (
                        <div key={plant.id} className="plant-card" tabIndex={0}>
                            <h2>{plant.name}</h2>
                            <p><strong>🌿 Type:</strong> {plant.type}</p>
                            <p><strong>📝 Description:</strong> {plant.description || '-'}</p>
                            <p><strong>💧 Last Watered:</strong> {formatDate(plant.lastWatered)}</p>
                            <button
                                onClick={() => startEdit(plant)}
                                style={{ marginRight: '0.5rem', backgroundColor: '#4caf50' }}
                            >
                                Edit
                            </button>
                            <button
                                className="delete"
                                onClick={() => {
                                    if (window.confirm(`Delete "${plant.name}"?`)) deletePlant(plant.id);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default App;
