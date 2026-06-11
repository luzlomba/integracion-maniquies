CREATE DATABASE fabrica_maniquies;
USE fabrica_maniquies;

CREATE TABLE material (
    id_material INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE color (
    id_color INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE modelo_pieza (
    id_modelo INT PRIMARY KEY AUTO_INCREMENT,
    tipo VARCHAR(20) NOT NULL,
    genero VARCHAR(30) NOT NULL,
    talle VARCHAR(20) NOT NULL,
    id_material INT NOT NULL,
    id_color INT NOT NULL,
    FOREIGN KEY (id_material) REFERENCES material(id_material),
    FOREIGN KEY (id_color) REFERENCES color(id_color)
);

CREATE TABLE modelo_extremidad (
    id_modelo INT PRIMARY KEY AUTO_INCREMENT,
    tipo VARCHAR(20) NOT NULL,
    lado VARCHAR(20) NOT NULL CHECK (lado IN ('izquierdo', 'derecho')),
    id_material INT NOT NULL,
    id_color INT NOT NULL,
    FOREIGN KEY (id_material) REFERENCES material(id_material),
    FOREIGN KEY (id_color) REFERENCES color(id_color)
);

CREATE TABLE cabeza (
    id_cabeza INT PRIMARY KEY AUTO_INCREMENT,
    nro_serie VARCHAR(20) NOT NULL,
    fecha_fabricacion DATE NOT NULL,
    id_modelo INT NOT NULL,
    tipo VARCHAR(20) NOT NULL,
    FOREIGN KEY (id_modelo) REFERENCES modelo_pieza(id_modelo)
);

CREATE TABLE torso (
    id_torso INT PRIMARY KEY AUTO_INCREMENT,
    nro_serie VARCHAR(20) NOT NULL,
    fecha_fabricacion DATE NOT NULL,
    id_modelo INT NOT NULL,
    tipo VARCHAR(20) NOT NULL,
    FOREIGN KEY (id_modelo) REFERENCES modelo_pieza(id_modelo)
);

CREATE TABLE brazo (
    id_brazo INT PRIMARY KEY AUTO_INCREMENT,
    nro_serie VARCHAR(20) NOT NULL,
    fecha_fabricacion DATE NOT NULL,
    id_modelo INT NOT NULL,
    tipo VARCHAR(20) NOT NULL,
    FOREIGN KEY (id_modelo) REFERENCES modelo_extremidad(id_modelo)
);

CREATE TABLE pierna (
    id_pierna INT PRIMARY KEY AUTO_INCREMENT,
    nro_serie VARCHAR(20) NOT NULL,
    fecha_fabricacion DATE NOT NULL,
    id_modelo INT NOT NULL,
    tipo VARCHAR(20) NOT NULL,
    FOREIGN KEY (id_modelo) REFERENCES modelo_extremidad(id_modelo)
);

CREATE TABLE maniqui (
    id_maniqui INT PRIMARY KEY AUTO_INCREMENT,
    codigo VARCHAR(20) NOT NULL,
    fecha_ensamblaje DATE NOT NULL,
    id_cabeza INT NOT NULL,
    id_torso INT NOT NULL,
    id_brazo_izq INT NOT NULL,
    id_brazo_der INT NOT NULL,
    id_pierna_izq INT NOT NULL,
    id_pierna_der INT NOT NULL,
    FOREIGN KEY (id_cabeza) REFERENCES cabeza(id_cabeza),
    FOREIGN KEY (id_torso) REFERENCES torso(id_torso),
    FOREIGN KEY (id_brazo_izq) REFERENCES brazo(id_brazo),
    FOREIGN KEY (id_brazo_der) REFERENCES brazo(id_brazo),
    FOREIGN KEY (id_pierna_izq) REFERENCES pierna(id_pierna),
    FOREIGN KEY (id_pierna_der) REFERENCES pierna(id_pierna)
);