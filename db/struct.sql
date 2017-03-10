/*
	NEW DATABASE IVORY_ELPH


create database mastodonx
go
use mastodonx
go 
create table usuario (
	id_usuario int primary key identity(1,1),
	apellido varchar(100),
	nombre varchar(100),
	telefono varchar(20),
	correo varchar(100),
	pass varchar(100),
	rol varchar(50) 
)

go

create table cliente (
	id_cliente int primary key identity (1,1),
	nombre_empresa varchar(300),
	nombre_sede varchar(300),
	direccion varchar(100),
	telefono varchar(20),
	nombre_contacto varchar(200),
	correo_contacto varchar(200),
	pass_contacto varchar(100)	
)

go

create table area (
	id_area int primary key identity(1,1),
	nombre varchar(100),
	fk_id_cliente int foreign key references cliente (id_cliente)

)

go

--!! ALTER TABLE DROP especificaciones
--se remove tipo de activo 
--alter table tipo_activo add descripcion varchar(max)
create table tipo_activo (
	id_tipo_activo int primary key identity,
	_tipo_activo varchar(200),
	descripcion varchar(max)
)

go

create table caracteristica (
	id_caracteristica int primary key identity,
	_caracteristica varchar(100),
	fk_id_tipo_activo int foreign key references tipo_activo, 
)


go

--alter table activo drop column especificaciones
create table activo(
	id_activo int primary key identity(1,1),
	serial varchar(50),
	marca varchar(50),
	modelo varchar(50),
	inventario varchar(20),
	seguridad varchar(20),
	fk_id_tipo_activo int foreign key references tipo_activo (id_tipo_activo) ,
	fk_id_area int foreign key references area (id_area) 

)

go

create table caracteristica_valor (
	id_caracteristica_valor int primary key identity,
	_valor varchar(100),
	fk_id_caracteristica int foreign key references caracteristica (id_caracteristica)
)

go

create table caracteristica_activo (
	id_caracteristica_activo int primary key identity,
	fk_id_caracteristica_valor int foreign key references caracteristica_valor(id_caracteristica_valor),
	fk_id_activo int foreign key references activo (id_activo)
)

go
--alter table ticket drop column fecha_creacion
--alter table ticket drop column fecha_atencion
--alter table ticket add cierre char(1)
create table ticket (
	id_ticket int primary key identity(1,1),
	N_Ticket int , 
	estado char(1),
	origen varchar(50),
	servicio varchar(50),
	usuario_final varchar(200),
	cierre char(1),
	fk_id_tecnico int foreign key references usuario (id_usuario),
	fk_id_creador int foreign key references usuario (id_usuario),
	fk_id_activo int foreign key references activo (id_activo)
)

go 

/*ROOT MODULO TICKET*/
create table documentacion (
	id_documentacion int primary key identity(1,1),
	fecha date,
	hora time(0),
	texto varchar(max),
	tipo char(2),
	persona varchar(200),
	fk_id_ticket int foreign key references ticket (id_ticket)
)  
go

create table alerta (
	id_alerta int primary key  identity,
	fecha date,
	fk_id_ticket int foreign key references ticket (id_ticket)
) 


go

--alter table imagen drop column url_image
create table imagen (
	id_imagen int primary key identity(1,1),
	data_image varchar(max),
	fk_id_documentacion int foreign key references documentacion (id_documentacion)
) 

--INSERTS
insert into usuario values ('Pandora','Juan',487596,'juan@juan.com','juan123','master')

go

--MODULO ENCUESTA 
create table pregunta (
	id_pregunta int primary key identity(1,1),
	pregunta varchar(300),
	estado bit default 1
)
go

create table respuesta (
	id_respuesta int primary key identity,
	respuesta varchar(200),
	fk_id_pregunta int foreign key references pregunta (id_pregunta)
)

go

create table encuesta (
	id_encuesta int primary key identity,
	fk_id_respuesta int foreign key references respuesta (id_respuesta),
	fk_id_ticket int foreign key references ticket (id_ticket)
)

--DEFINICION DE ESPECIFICACIONES

/*
insert into pregunta values('¿El servicio se atendió dentro de los tiempos establecidos?',1)
insert into pregunta values('¿Qué tan buena fue la atención prestada?',1)
insert into pregunta values('¿Se resolvió satisfactoriamente el servicio?',1)


insert into respuesta values ('Si',1)
insert into respuesta values ('No',1)
--
insert into respuesta values ('Mala',2)
insert into respuesta values ('Buena',2)
insert into respuesta values ('Excelente',2)
--

insert into respuesta values ('Si',3)
insert into respuesta values ('No',3)

*/


go

--Modulo movimientos 

create table orden  (
	id_orden int primary key identity,
	n_orden int default null, 
	retiro bit default 0,
	fecha date default getdate(),
	fk_id_area int foreign key references area (id_area)
)

go
----- FIXXER
create table sub_orden(
	id_sub_orden  int primary key identity,
	fk_id_activo int foreign key references activo (id_activo)
) 


go

----modulo de versiones 

create table _version (
	id_version int primary key identity,
	desde date default getdate(),
	hasta  date default null,
	descripcion varchar(max),
	fk_id_activo int foreign key references activo(id_activo)
)

go

create table sub_version(
	id_sub_version int primary key identity,
	_key varchar(100),
	_value varchar(100),
	fk_id_version int foreign key references _version (id_version)
)

-- semaforo

go 

create table semaforo ( cantidad tinyint )

*/