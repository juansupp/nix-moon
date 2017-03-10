
go
use mastodonx
go 

alter view cliente_completo
as
select distinct nombre_empresa + ' ' +  cliente.nombre_sede nombre, id_cliente from cliente

go

alter view tecnicos
as
select 
	usuario.apellido + ' ' + usuario.nombre nombre,
	usuario.id_usuario
from usuario where rol like '%tec%'



go

alter view lastTicket 
as
select top(1) N_Ticket from ticket order by N_Ticket desc


go

alter  view full_ticket
as
select 
	ticket.id_ticket id_full_ticket,
	ticket.id_ticket,  
	ticket.N_ticket,

	cliente.id_cliente cliente,
	cliente.nombre_empresa + ' ' + cliente.nombre_sede cliente_nombre,

	tecnico.apellido + ' ' + tecnico.nombre tecnico_nombre,
	tecnico.id_usuario tecnico,
	
	ticket.usuario_final,
	ticket.servicio + ' de ' +  _tipo_activo titulo,
	creador.apellido + ' ' + creador.nombre creador,
	documentacion.fecha,
	documentacion.hora,
	ticket.estado,
	ticket.servicio,
	tipo
from ticket
inner join usuario tecnico on tecnico.id_usuario = ticket.fk_id_tecnico 
inner join usuario creador on creador.id_usuario = ticket.fk_id_creador
inner join documentacion on documentacion.fk_id_ticket = ticket.id_ticket
inner join activo on activo.id_activo =  ticket.fk_id_activo
inner join area on area.id_area = activo.fk_id_area
inner join cliente on cliente.id_cliente = area.fk_id_cliente
inner join tipo_activo on tipo_activo.id_tipo_activo = activo.fk_id_tipo_activo
-- ii tipo

--select * from full_ticket where fecha <= '2017-01-31' and fecha >= '2017-01-25'
 --select * from  full_ticket where  fecha between  '31/01/2017' and '31/01/2017' and 1= 1


 go 

 alter view full_pregunta
 as
 select * from respuesta 
	inner join pregunta on pregunta.id_pregunta =respuesta.fk_id_pregunta

go


alter view full_images 
as 
select ticket.id_ticket,imagen.data_image, documentacion.id_documentacion from ticket
inner join documentacion on documentacion.fk_id_ticket = ticket.id_ticket
inner join imagen on imagen.fk_id_documentacion = documentacion.id_documentacion


go 



alter view full_out_ticket 
as
select  id_ticket,
		N_Ticket,
        estado,
        fecha,
        hora,
        servicio,
        origen,
        usuario_final,
		cliente.nombre_empresa + ' ' + cliente.nombre_sede cliente, 
		area.nombre area,
		direccion,
		telefono,
		nombre_contacto contacto, 
		correo_contacto,
		_tipo_activo activo,
		serial,
		marca,
		modelo,
		inventario,
		seguridad ,
	tipo

from ticket
inner join documentacion on documentacion.fk_id_ticket = ticket.id_ticket
inner join activo on activo.id_activo =  ticket.fk_id_activo
inner join area on area.id_area = activo.fk_id_area
inner join cliente on cliente.id_cliente = area.fk_id_cliente
inner join tipo_activo on tipo_activo.id_tipo_activo = activo.fk_id_tipo_activo

go

alter view full_activo 
as
select * from activo 
inner join area on area.id_area = activo.fk_id_area
inner join cliente on cliente.id_cliente = area.fk_id_cliente
inner join tipo_activo on tipo_activo.id_tipo_activo = activo.fk_id_tipo_activo

go
--select * from ticket

/*select * from ticket
select count(*) from ticket

select * from ticket order by id_ticket offset 0 rows fetch next 10 Rows Only

select count(id_ticket)  from ticket
select * from ticket  where 1=1 order  by id_ticket offset 0 rows fetch next 10 Rows Only*/



