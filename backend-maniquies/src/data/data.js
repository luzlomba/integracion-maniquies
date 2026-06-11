export const materiales = [
  { id_material: 1, nombre: 'Plastico' },
  { id_material: 2, nombre: 'Fibra de vidrio' },
  { id_material: 3, nombre: 'Madera' }
];

export const colores = [
  { id_color: 1, nombre: 'Blanco' },
  { id_color: 2, nombre: 'Celeste' },
  { id_color: 3, nombre: 'Amarillo' },
  { id_color: 4, nombre: 'Gris' },
  { id_color: 5, nombre: 'Rosa' }
];

export const modelosPieza = [
  { id_modelo: 1, tipo: 'cabeza', genero: 'Femenino', talle: 'S', id_material: 1, id_color: 1 },
  { id_modelo: 2, tipo: 'cabeza', genero: 'Masculino', talle: 'M', id_material: 2, id_color: 4 },
  { id_modelo: 3, tipo: 'torso', genero: 'Femenino', talle: 'M', id_material: 1, id_color: 1 },
  { id_modelo: 4, tipo: 'torso', genero: 'Masculino', talle: 'L', id_material: 3, id_color: 3 }
];

export const modelosExtremidad = [
  { id_modelo: 1, tipo: 'brazo', lado: 'izquierdo', id_material: 1, id_color: 1 },
  { id_modelo: 2, tipo: 'brazo', lado: 'derecho', id_material: 1, id_color: 1 },
  { id_modelo: 3, tipo: 'pierna', lado: 'izquierdo', id_material: 2, id_color: 4 },
  { id_modelo: 4, tipo: 'pierna', lado: 'derecho', id_material: 2, id_color: 4 }
];

export const cabezas = [
  { id_cabeza: 1, tipo: 'cabeza', nro_serie: 'CAB-001', fecha_fabricacion: '2025-03-01', id_modelo: 1 },
  { id_cabeza: 2, tipo: 'cabeza', nro_serie: 'CAB-002', fecha_fabricacion: '2025-04-15', id_modelo: 2 },
  { id_cabeza: 3, tipo: 'cabeza', nro_serie: 'CAB-003', fecha_fabricacion: '2025-06-20', id_modelo: 1 }
];

export const torsos = [
  { id_torso: 1, tipo: 'torso', nro_serie: 'TOR-001', fecha_fabricacion: '2025-03-01', id_modelo: 3 },
  { id_torso: 2, tipo: 'torso', nro_serie: 'TOR-002', fecha_fabricacion: '2025-04-15', id_modelo: 4 },
  { id_torso: 3, tipo: 'torso', nro_serie: 'TOR-003', fecha_fabricacion: '2025-06-20', id_modelo: 3 }
];

export const brazos = [
  { id_brazo: 1, tipo: 'brazo', nro_serie: 'BRA-001', fecha_fabricacion: '2025-03-01', id_modelo: 1 },
  { id_brazo: 2, tipo: 'brazo', nro_serie: 'BRA-002', fecha_fabricacion: '2025-04-15', id_modelo: 2 },
  { id_brazo: 3, tipo: 'brazo', nro_serie: 'BRA-003', fecha_fabricacion: '2025-06-20', id_modelo: 1 },
  { id_brazo: 4, tipo: 'brazo', nro_serie: 'BRA-004', fecha_fabricacion: '2025-07-10', id_modelo: 2 }
];

export const piernas = [
  { id_pierna: 1, tipo: 'pierna', nro_serie: 'PIE-001', fecha_fabricacion: '2025-03-01', id_modelo: 3 },
  { id_pierna: 2, tipo: 'pierna', nro_serie: 'PIE-002', fecha_fabricacion: '2025-04-15', id_modelo: 4 },
  { id_pierna: 3, tipo: 'pierna', nro_serie: 'PIE-003', fecha_fabricacion: '2025-06-20', id_modelo: 3 },
  { id_pierna: 4, tipo: 'pierna', nro_serie: 'PIE-004', fecha_fabricacion: '2025-07-10', id_modelo: 4 }
];

export const maniquies = [
  {
    id_maniqui: 1,
    codigo: 'MAN-001',
    fecha_ensamblaje: '2026-03-23',
    id_cabeza: 1,
    id_torso: 1,
    id_brazo_izq: 1,
    id_brazo_der: 2,
    id_pierna_izq: 1,
    id_pierna_der: 2
  },
  {
    id_maniqui: 2,
    codigo: 'MAN-002',
    fecha_ensamblaje: '2026-04-01',
    id_cabeza: 2,
    id_torso: 2,
    id_brazo_izq: 3,
    id_brazo_der: 4,
    id_pierna_izq: 3,
    id_pierna_der: 4
  }
];