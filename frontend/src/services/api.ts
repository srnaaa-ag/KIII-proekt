const API_URL = "http://localhost:8080/api/plants";

export async function fetchPlants() {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Грешка при вчитување растенија");
    return res.json();
}

export async function addPlant(data: { name: string; lastWatered: string; comment?: string }) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Грешка при додавање растение");
    return res.json();
}

export async function deletePlant(id: number) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Грешка при бришење растение");
}
