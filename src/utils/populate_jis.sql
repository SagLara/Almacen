
--- Insercion de datos de tabla CATEGORIA

INSERT INTO `almacen_jis`.`categoria`(`NOMBRE`,`DESCRIPCION`)
VALUES ('Dulces','Todos los productos relacionados a dulces.');

INSERT INTO `almacen_jis`.`categoria`(`NOMBRE`,`DESCRIPCION`)
VALUES ('Cosméticos','Productos relacionados a belleza y cuidado personal');

INSERT INTO `almacen_jis`.`categoria`(`NOMBRE`,`DESCRIPCION`)
VALUES ('Confección','Productos relacionados a costuras, confección, telas.');


--- Insercion de datos de tabla PRODUCTO

INSERT INTO `almacen_jis`.`producto`(`NOMBRE`,`PRECIO`,`STOCK`,`MARCA`,`DESCRIPCION`,`REFERENCIA`,`ID_CATEGORIA`)
VALUES ('Bon Bon Bum',300,52,'Colombina','','',1);

INSERT INTO `almacen_jis`.`producto`(`NOMBRE`,`PRECIO`,`STOCK`,`MARCA`,`DESCRIPCION`,`REFERENCIA`,`ID_CATEGORIA`)
VALUES ('Esmalte Lila',2800,12,'','','',2);

INSERT INTO `almacen_jis`.`producto`(`NOMBRE`,`PRECIO`,`STOCK`,`MARCA`,`DESCRIPCION`,`REFERENCIA`,`ID_CATEGORIA`)
VALUES ('Aguja Maquina Familiar',850,16,'Singer','','12/80',3);


--- Insercion de datos de tabla INFORME

INSERT INTO `almacen_jis`.`informe`(`FECHA`,`CANT_VENTAS`,`TOTAL_VENDIDO`)
VALUES ('2021-05-01',3,268000);

INSERT INTO `almacen_jis`.`informe`(`FECHA`,`CANT_VENTAS`,`TOTAL_VENDIDO`)
VALUES ('2021-05-10',1,22000);

--- Insercion de datos de tabla FACTURA

INSERT INTO `almacen_jis`.`factura`(`FECHA`,`VALOR_FACTURA`)
VALUES ('2021-04-01',268000);

INSERT INTO `almacen_jis`.`factura`(`FECHA`,`VALOR_FACTURA`)
VALUES ('2021-04-10',212000);

--- Insercion de datos de tabla DETALLE FACTURA

INSERT INTO `almacen_jis`.`detalle_factura`(`ID_FACTURA`,`ID_PRODUCTO`,`CANTIDAD_X_PRODUCTO`,`VALOR_PRODUCTO`,`GANANCIA`)
VALUES (1,1,36,68000,50);

INSERT INTO `almacen_jis`.`detalle_factura`(`ID_FACTURA`,`ID_PRODUCTO`,`CANTIDAD_X_PRODUCTO`,`VALOR_PRODUCTO`,`GANANCIA`)
VALUES (1,2,36,200000,40);

INSERT INTO `almacen_jis`.`detalle_factura`(`ID_FACTURA`,`ID_PRODUCTO`,`CANTIDAD_X_PRODUCTO`,`VALOR_PRODUCTO`,`GANANCIA`)
VALUES (2,3,16,212000,35);

--- Insercion de datos de tabla REGISTRO VENTA

INSERT INTO `almacen_jis`.`registro_venta`(`FECHA`,`NOMBRE_CLIENTE`,`VALOR_TOTAL_VENTA`,`ID_INFORME`)
VALUES ('2021-05-01 12:15:10','',100000,1);

INSERT INTO `almacen_jis`.`registro_venta`(`FECHA`,`NOMBRE_CLIENTE`,`VALOR_TOTAL_VENTA`,`ID_INFORME`)
VALUES ('2021-05-01 17:30:00','Jose Perea',100000,1);

INSERT INTO `almacen_jis`.`registro_venta`(`FECHA`,`NOMBRE_CLIENTE`,`VALOR_TOTAL_VENTA`,`ID_INFORME`)
VALUES ('2021-05-01 18:15:36','Doña Dilis',68000,1);

INSERT INTO `almacen_jis`.`registro_venta`(`FECHA`,`NOMBRE_CLIENTE`,`VALOR_TOTAL_VENTA`,`ID_INFORME`)
VALUES ('2021-05-10 10:15:15','Sergio',22000,2);

--- Insercion de datos de tabla DETALLE VENTA

INSERT INTO `almacen_jis`.`detalle_venta`(`ID_REGISTRO`,`ID_PRODUCTO`,`CANTIDAD`,`VALOR_X_CANT`)
VALUES (1,1,6,50000);

INSERT INTO `almacen_jis`.`detalle_venta`(`ID_REGISTRO`,`ID_PRODUCTO`,`CANTIDAD`,`VALOR_X_CANT`)
VALUES (1,2,2,50000);

INSERT INTO `almacen_jis`.`detalle_venta`(`ID_REGISTRO`,`ID_PRODUCTO`,`CANTIDAD`,`VALOR_X_CANT`)
VALUES (2,2,2,50000.00);

INSERT INTO `almacen_jis`.`detalle_venta`(`ID_REGISTRO`,`ID_PRODUCTO`,`CANTIDAD`,`VALOR_X_CANT`)
VALUES (2,3,4,50000);

INSERT INTO `almacen_jis`.`detalle_venta`(`ID_REGISTRO`,`ID_PRODUCTO`,`CANTIDAD`,`VALOR_X_CANT`)
VALUES (3,3,6,68000);

INSERT INTO `almacen_jis`.`detalle_venta`(`ID_REGISTRO`,`ID_PRODUCTO`,`CANTIDAD`,`VALOR_X_CANT`)
VALUES (4,2,2,11000);

INSERT INTO `almacen_jis`.`detalle_venta`(`ID_REGISTRO`,`ID_PRODUCTO`,`CANTIDAD`,`VALOR_X_CANT`)
VALUES (4,1,2,11000);


--- Insercion de datos de tabla USUARIO

INSERT INTO `almacen_jis`.`usuario`(`NOMBRE_USUARIO`,`PASSWORD`,`ID_ROL`)
VALUES ('cristina','1234','user');

INSERT INTO `almacen_jis`.`usuario`(`NOMBRE_USUARIO`,`PASSWORD`,`ID_ROL`)
VALUES ('cecilia','admin123','admin');
