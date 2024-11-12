# CRUD-AUTH

## Descripcion

Proyecto sencillo el cual trata de un gestor de areas el cual contiene de un login para que cada usuario tenga sus tareas en especifico, el cual se manejan el token de autenticacion cookies, cada que va a una ruta protegida verifica que cada token sea valido, las tareas se guardan en una BD mongoBD

## flujo de trabajo

_FrontEnd_

- axios -> para peticiones
- dayjs -> formateador de fechas
- js-cookie -> manejar cookies del navegador
- react -> biblioteca front
- react-hook-form -> manejar los formulario
- react-router-dom -> manejar el enrutado

_BackEnd_

- bcryptjs -> encriptar contraseñas
- cookie-parser -> middleware para manejar cookies
- cors -> manejador de diferentes urls
- dotenv -> manejar variables de entorno
- express -> servidor web
- jsonwebtoken -> tokens
- mongoose -> poder manejar BD mongo
- morgan -> middleware para visualizar las peticiones en consola
- zod -> libreria para validaciones
