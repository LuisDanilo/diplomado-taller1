# Patrones de diseño
Taller #1: Implementacion de patrones Singleton, Factory Method, Prototype y Observers.

## Ejecutar el proyecto
Para ejecutar el proyecto se debe tener instalado previamente `docker`.

Una vez descargado el codigo, basta con ir a la carpeta raiz del proyecto y ejecutar `docker-compose up`
La carpeta raiz del proyecto es donde se ubica el archivo `docker-compose.yaml`

Con ello se levantarán cuatro servicios:
1. `app`: Es una aplicación web hecha en React + Vite y sirve como interfaz gráfica de usuario.
2. `api`: Es una aplicación hecha y ejecutada con NodeJS + Express y sirve como backend de la aplicación web. 
          Es la aplicación que se conecta con las bases de datos y aplica los patrones de diseño Singleton y Factory Method para ello.
3. `db1`: Es una base de datos local de PostgreSQL con una tabla inicial y con registros inciales.
4. `db2`: Es una base de datos local de MongoDB con una colección inicial y con documentos iniciales.

### Por que con docker? 
Porque es una poderosa herramienta que permite fácilmente orquestar diferentes servicios como los requeridos para el ejercicio.

### Como se usa Singleton y Factory Method en este taller?
Para que `api` pueda comunicarse con las bases de datos `db1` y `db2`, se hace uso de Factory Method para crear varias fábricas únicas que
a su vez ofrecen instancias únicas de clientes de bases de datos. Por **únicas** se hace referencia a que dichos clientes y dichas 
fábricas son de hecho Singleton, lo cual garantiza que instancias únicas de estos objetos sean creadas.

### Como se usa Prototype y Observers en este taller?
A traves de la interfaz gráfica de usuario, es decir `app`, es posible la duplicación de productos a partir de existentes.

Asi mismo el resumen de productos y valor total se garantiza que esté actualizado con el uso de Observers que notifican a dicho
resumen reflejar las cifras "en tiempo real".
