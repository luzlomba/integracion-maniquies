const API_BASE_URL = import.meta.env.VITE_API_URL;

async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };
  
  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export const maniquiAPI = {
  getAll: () => apiRequest('/maniquies'),
  getById: (id) => apiRequest(`/maniquies/${id}`),
  create: (maniqui) => apiRequest('/maniquies', {
    method: 'POST',
    body: JSON.stringify(maniqui),
  }),
  update: (id, maniqui) => apiRequest(`/maniquies/${id}`, {
    method: 'PUT',
    body: JSON.stringify(maniqui),
  }),
  delete: (id) => apiRequest(`/maniquies/${id}`, {
    method: 'DELETE',
  }),
};

/*export const piezasAPI = {
  getCabezas: () => apiRequest('/cabezas'),
  getTorsos: () => apiRequest('/torsos'),
  getBrazos: () => apiRequest('/brazos'),
  getPiernas: () => apiRequest('/piernas'),
};*/

export const catalogoAPI = {
  getMateriales: () => apiRequest('/materiales'),
  getColores: () => apiRequest('/colores'),

  createMaterial: (material) => apiRequest('/materiales', {
    method: 'POST',
    body: JSON.stringify(material)
  }),

  deleteMaterial: (id) => apiRequest(`/materiales/${id}`, {
    method: 'DELETE'
  }),

  createColor: (color) => apiRequest('/colores', {
    method: 'POST',
    body: JSON.stringify(color)
  }),

  deleteColor: (id) => apiRequest(`/colores/${id}`, {
    method: 'DELETE'
  })
}

export const modelosAPI = {
  getModelosPieza: () => apiRequest('/modelos-pieza'),
  getModelosExtremidad: () => apiRequest('/modelos-extremidad'),
  
  createModeloPieza: (modelo) => apiRequest('/modelos-pieza', {
    method: 'POST',
    body: JSON.stringify(modelo),
  }),
  updateModeloPieza: (id, modelo) => apiRequest(`/modelos-pieza/${id}`, {
    method: 'PUT',
    body: JSON.stringify(modelo),
  }),
  deleteModeloPieza: (id) => apiRequest(`/modelos-pieza/${id}`, {
    method: 'DELETE',
  }),
  
  createModeloExtremidad: (modelo) => apiRequest('/modelos-extremidad', {
    method: 'POST',
    body: JSON.stringify(modelo),
  }),
  updateModeloExtremidad: (id, modelo) => apiRequest(`/modelos-extremidad/${id}`, {
    method: 'PUT',
    body: JSON.stringify(modelo),
  }),
  deleteModeloExtremidad: (id) => apiRequest(`/modelos-extremidad/${id}`, {
    method: 'DELETE',
  }),
};

export const piezaAPI = {
  getCabezas: () => apiRequest('/cabezas'),
  createCabeza: (cabeza) => apiRequest('/cabezas', {
    method: 'POST',
    body: JSON.stringify(cabeza),
  }),
  updateCabeza: (id, cabeza) => apiRequest(`/cabezas/${id}`, {
    method: 'PUT',
    body: JSON.stringify(cabeza),
  }),
  deleteCabeza: (id) => apiRequest(`/cabezas/${id}`, {
    method: 'DELETE',
  }),
  getTorsos: () => apiRequest('/torsos'),
  createTorso: (torso) => apiRequest('/torsos', {
    method: 'POST',
    body: JSON.stringify(torso),
  }),
  updateTorso: (id, torso) => apiRequest(`/torsos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(torso),
  }),
  deleteTorso: (id) => apiRequest(`/torsos/${id}`, {
    method: 'DELETE',
  }),
  getBrazos: () => apiRequest('/brazos'),
  createBrazo: (brazo) => apiRequest('/brazos', {
    method: 'POST',
    body: JSON.stringify(brazo),
  }),
  updateBrazo: (id, brazo) => apiRequest(`/brazos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(brazo),
  }),
  deleteBrazo: (id) => apiRequest(`/brazos/${id}`, {
    method: 'DELETE',
  }),
  getPiernas: () => apiRequest('/piernas'),
  createPierna: (pierna) => apiRequest('/piernas', {
    method: 'POST',
    body: JSON.stringify(pierna),
  }),
  updatePierna: (id, pierna) => apiRequest(`/piernas/${id}`, {
    method: 'PUT',
    body: JSON.stringify(pierna),
  }),
  deletePierna: (id) => apiRequest(`/piernas/${id}`, {
    method: 'DELETE',
  }),
};

