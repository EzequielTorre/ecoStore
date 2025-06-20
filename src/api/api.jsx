// url de mi MockApi:
const BASE_URL = "https://68100d8d27f2fdac24101f34.mockapi.io/productos"; 

// Funciones para interactuar con la API:
export async function getData(endpoint) {
  const response = await fetch(`${BASE_URL}/${endpoint}`);
  if (!response.ok) throw new Error("Error al obtener datos");
  return response.json();
}
// Función para obtener todos los productos:
export async function postData(endpoint, data) {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Error al enviar datos");
  return response.json();
}
// Función para eliminar un producto por su ID:
export async function deleteData(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error al eliminar el producto");
  return response.json();
}
