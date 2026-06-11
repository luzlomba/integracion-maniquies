/*1-Listado de Stock: Obtener el número de serie, material y color de todas 
las piernas que pertenezcan al lado derecho.*/

SELECT pierna.id_pierna, pierna.nro_serie, material.nombre, color.nombre
FROM pierna
JOIN modelo_extremidad ON pierna.id_modelo = modelo_extremidad.id_modelo
JOIN material ON modelo_extremidad.id_material = material.id_material
JOIN color ON modelo_extremidad.id_color = color.id_color
WHERE modelo_extremidad.lado = 'derecho';

/*2-Cabezas por fechas: Mostrar todas las cabezas que fueron fabricadas después 
de una fecha específica (ej. '2026-01-01').*/

SELECT cabeza.nro_serie 
FROM cabeza 
WHERE cabeza.fecha_fabricacion > '2026-01-01';

/*Lo mismo pero devuelve más info*/

SELECT cabeza.nro_serie, cabeza.fecha_fabricacion, modelo_pieza.genero, modelo_pieza.talle, material.nombre, color.nombre
FROM cabeza
JOIN modelo_pieza ON cabeza.id_modelo = modelo_pieza.id_modelo
JOIN material ON material.id_material = modelo_pieza.id_material
JOIN color ON color.id_color = modelo_pieza.id_color
WHERE cabeza.fecha_fabricacion > '2026-01-01';

/*3-Modelos por talla: Listar todos los torsos cuyo talle sea 'mediano' o 
‘largo', ordenados por material de forma alfabética.*/

SELECT torso.nro_serie, torso.id_torso, material.nombre
FROM torso
JOIN modelo_pieza ON torso.id_modelo = modelo_pieza.id_modelo
JOIN material ON material.id_material = modelo_pieza.id_material
WHERE modelo_pieza.talle IN ('mediano', 'largo')
ORDER BY material.nombre ASC;

/*4-Conteo de Materiales: Realizar un conteo total de cuántas piezas hay en la base de datos 
agrupadas por su material (ej. cuántas de madera, cuántas de plástico).*/

SELECT nombre, SUM(total) as total_piezas
FROM (
    SELECT material.nombre, COUNT(*) as total
    FROM cabeza
    JOIN modelo_pieza ON cabeza.id_modelo = modelo_pieza.id_modelo
    JOIN material ON modelo_pieza.id_material = material.id_material
    GROUP BY material.nombre

    UNION ALL

    SELECT material.nombre, COUNT(*) as total
    FROM torso
    JOIN modelo_pieza ON torso.id_modelo = modelo_pieza.id_modelo
    JOIN material ON modelo_pieza.id_material = material.id_material
    GROUP BY material.nombre

    UNION ALL

    SELECT material.nombre, COUNT(*) as total
    FROM brazo
    JOIN modelo_extremidad ON brazo.id_modelo = modelo_extremidad.id_modelo
    JOIN material ON modelo_extremidad.id_material = material.id_material
    GROUP BY material.nombre

    UNION ALL

    SELECT material.nombre, COUNT(*) as total
    FROM pierna
    JOIN modelo_extremidad ON pierna.id_modelo = modelo_extremidad.id_modelo
    JOIN material ON modelo_extremidad.id_material = material.id_material
    GROUP BY material.nombre
) AS conteo
GROUP BY nombre;

/*5-Consulta de Ensamble: Mostrar el código del Maniquí Completo junto con la fecha 
de ensamblaje y el ID/serie de la cabeza que se le asignó.*/

SELECT maniqui.codigo, maniqui.fecha_ensamblaje, cabeza.nro_serie
FROM maniqui
JOIN cabeza ON maniqui.id_cabeza = cabeza.id_cabeza

/*6-Disponibilidad Personalizada: Buscar todas las piezas (de cualquier tipo) 
que tengan un color o acabado específico (ej. "Negro Mate").*/

SELECT nombre, SUM(total) as total_piezas
FROM (
    SELECT color.nombre, COUNT(*) as total
    FROM cabeza
    JOIN modelo_pieza ON cabeza.id_modelo = modelo_pieza.id_modelo
    JOIN color ON modelo_pieza.id_color = color.id_color
    WHERE color.nombre = 'Blanco'
    GROUP BY color.nombre

    UNION ALL

    SELECT color.nombre, COUNT(*) as total
    FROM torso
    JOIN modelo_pieza ON torso.id_modelo = modelo_pieza.id_modelo
    JOIN color ON modelo_pieza.id_color = color.id_color
    WHERE color.nombre = 'Blanco'
    GROUP BY color.nombre

    UNION ALL

    SELECT color.nombre, COUNT(*) as total
    FROM brazo
    JOIN modelo_extremidad ON brazo.id_modelo = modelo_extremidad.id_modelo
    JOIN color ON modelo_extremidad.id_color = color.id_color
    WHERE color.nombre = 'Blanco'
    GROUP BY color.nombre

    UNION ALL

    SELECT color.nombre, COUNT(*) as total
    FROM pierna
    JOIN modelo_extremidad ON pierna.id_modelo = modelo_extremidad.id_modelo
    JOIN color ON modelo_extremidad.id_color = color.id_color
    WHERE color.nombre = 'Blanco'
    GROUP BY color.nombre
) AS conteo
GROUP BY nombre;