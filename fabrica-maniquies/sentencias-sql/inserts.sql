USE fabrica_maniquies;

INSERT INTO material (nombre) VALUES
('Plastico'),
('Fibra de vidrio'),
('Madera');

INSERT INTO color (nombre) VALUES
('Blanco'),
('Celeste'),
('Amarillo'),
('Gris'),
('Rosa');

INSERT INTO modelo_pieza (tipo, genero, talle, id_material, id_color) VALUES
('cabeza', 'Femenino', 'S', 1, 1),
('cabeza', 'Masculino', 'XL', 3, 5),
('cabeza', 'Femenino', 'L', 2, 3),
('cabeza', 'Masculino', 'S', 1, 2),
('cabeza', 'Femenino', 'L', 2, 2),
('torso', 'Masculino', 'M', 2, 4),
('torso', 'Femenino', 'L', 3, 5),
('torso', 'Masculino', 'XL', 1, 2),
('torso', 'Femenino', 'M', 2, 3),
('torso', 'Masculino', 'S', 3, 1);

INSERT INTO modelo_extremidad (tipo, lado, id_material, id_color) VALUES
('brazo', 'izquierdo', 1, 1),
('brazo', 'derecho', 1, 1),
('brazo', 'izquierdo', 2, 4),
('brazo', 'derecho', 2, 4),
('brazo', 'izquierdo', 3, 5),
('pierna', 'derecho', 3, 5),
('pierna', 'izquierdo', 1, 2),
('pierna', 'derecho', 1, 2),
('pierna', 'izquierdo', 2, 3),
('pierna', 'derecho', 2, 3);

INSERT INTO cabeza (tipo, nro_serie, fecha_fabricacion, id_modelo) VALUES
('cabeza', 'CAB-001', '2025-03-01', 1),
('cabeza', 'CAB-002', '2025-04-15', 2),
('cabeza', 'CAB-003', '2025-06-20', 3),
('cabeza', 'CAB-004', '2025-07-10', 4),
('cabeza', 'CAB-005', '2025-08-05', 5),
('cabeza', 'CAB-006', '2025-09-12', 6),
('cabeza', 'CAB-007', '2025-11-30', 7),
('cabeza', 'CAB-008', '2026-01-08', 8),
('cabeza', 'CAB-009', '2026-02-14', 9),
('cabeza', 'CAB-010', '2026-03-22', 10);

INSERT INTO torso (tipo, nro_serie, fecha_fabricacion, id_modelo) VALUES
('torso', 'TOR-001', '2025-03-01', 1),
('torso', 'TOR-002', '2025-04-15', 2),
('torso', 'TOR-003', '2025-06-20', 3),
('torso', 'TOR-004', '2025-07-10', 4),
('torso', 'TOR-005', '2025-08-05', 5),
('torso', 'TOR-006', '2025-09-12', 6),
('torso', 'TOR-007', '2025-11-30', 7),
('torso', 'TOR-008', '2026-01-08', 8),
('torso', 'TOR-009', '2026-02-14', 9),
('torso', 'TOR-010', '2026-03-22', 10);

INSERT INTO brazo (tipo, nro_serie, fecha_fabricacion, id_modelo) VALUES
('brazo', 'BRA-001', '2025-03-01', 1),
('brazo', 'BRA-002', '2025-04-15', 2),
('brazo', 'BRA-003', '2025-06-20', 3),
('brazo', 'BRA-004', '2025-07-10', 4),
('brazo', 'BRA-005', '2025-08-05', 5),
('brazo', 'BRA-006', '2025-09-12', 6),
('brazo', 'BRA-007', '2025-11-30', 7),
('brazo', 'BRA-008', '2026-01-08', 8),
('brazo', 'BRA-009', '2026-02-14', 9),
('brazo', 'BRA-010', '2026-03-22', 10);

INSERT INTO pierna (tipo, nro_serie, fecha_fabricacion, id_modelo) VALUES
('pierna', 'PIE-001', '2025-03-01', 1),
('pierna', 'PIE-002', '2025-04-15', 2),
('pierna', 'PIE-003', '2025-06-20', 3),
('pierna', 'PIE-004', '2025-07-10', 4),
('pierna', 'PIE-005', '2025-08-05', 5),
('pierna', 'PIE-006', '2025-09-12', 6),
('pierna', 'PIE-007', '2025-11-30', 7),
('pierna', 'PIE-008', '2026-01-08', 8),
('pierna', 'PIE-009', '2026-02-14', 9),
('pierna', 'PIE-010', '2026-03-22', 10);

INSERT INTO maniqui (codigo, fecha_ensamblaje, id_cabeza, id_torso, id_brazo_izq, id_brazo_der, id_pierna_izq, id_pierna_der) VALUES
('MAN-001', '2026-03-23', 1, 1, 1, 2, 1, 2),
('MAN-002', '2026-02-12', 2, 2, 3, 4, 3, 4),
('MAN-003', '2026-01-15', 3, 3, 5, 6, 5, 6),
('MAN-004', '2025-12-10', 4, 4, 7, 8, 7, 8),
('MAN-005', '2025-11-05', 5, 5, 9, 10, 9, 10);