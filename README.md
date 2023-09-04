# TO DO LIST - BACK

## Descripcion General:
El proyecto consiste en una app de "Lista de Tareas". El usuario puede visualizar las tareas pendientes, cargar nuevas, marcar como completadas, editar lo necesario y eliminarlas.

 Siguiendo el modelo "Cliente - Servidor", tanto el front como el back se trabajaron por separado. En resumen, para el front se uso Typescript, y para el back, JAVA, conectando a una base de datos MySQL.

 La dirección de la app es: https://to-do-list-front.netlify.app/

 IMPORTANTE: al usarse un servidor de pruebas (Clever Cloud) se debe tener paciencia en cuanto a la carga de información ya que puede tener demoras.

## Back:
El back se puede ver en el siguiente repositorio: https://github.com/eugeniogimenez/to-do-list-back

## Front:
El presente frontend se penso a modo de prueba del backend, ya que si bien existe la documentación en postman para hacerlo vía APIs (ver abajo), el navegador requiere de otros recaudos como puede ser las políticas de "cors", que son necesarias tener en cuenta para su correcto despliegue.

Por tanto, se pensó más en funcionalidad, dejando la parte de diseño para un trabajo posterior. Se utliza TYPESCRIPT para darle un tipado más estricto y poder tener así un mejor control del funcionamiento.

## Arquitectura:
Se utiliza una arquitectura de Single Page App (SPA), con "Pages y Components" que se van renderizando de acuerdo a la necesidad del usuario, vía un "router" que direcciona las peticiones de los  mismos.

## Postman:
La dirección de la documentación postman para hacer uso de la app vía APIs se brinda aquí:

https://documenter.getpostman.com/view/21827106/2s9Y5eNeve.
