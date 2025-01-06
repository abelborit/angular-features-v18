/* Este código utiliza la API de arranque (bootstrap) introducida en Angular 15 para inicializar una aplicación Angular. Es una forma más moderna y simplificada de arrancar aplicaciones, eliminando la necesidad de un módulo raíz (AppModule) si no es necesario */
/* Ventajas del nuevo enfoque:

  - Menos complejidad: No se necesita un módulo raíz (AppModule) si no es necesario.
  - Mejor rendimiento: Reduce la sobrecarga inicial de crear y procesar un módulo.
  - Más modularidad: Se alinea mejor con el diseño basado en componentes, lo que permite una estructura más simple y directa.
*/
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

/* bootstrapApplication es la función que inicia la aplicación usando el componente raíz AppComponent y aplica las configuraciones definidas en appConfig. Esta función reemplaza el método tradicional platformBrowserDynamic().bootstrapModule(AppModule) que se usaba con AppModule. Ahora permite arrancar la aplicación directamente con un componente raíz (AppComponent), ofreciendo un enfoque más modular */
/* appConfig contiene la configuración de la aplicación, como proveedores, rutas y otros ajustes necesarios para arrancar la aplicación. Es una alternativa al decorador NgModule, que previamente era obligatorio para definir configuraciones a nivel de módulo */
/* AppComponent es el componente raíz que representa el punto de entrada de la aplicación */
bootstrapApplication(AppComponent, appConfig).catch((err) => {
  /* Captura y maneja errores que puedan ocurrir durante el arranque de la aplicación. Esto asegura que si hay un problema, como una dependencia no encontrada o un error de configuración, el error se registra en la consola */
  return console.error(err);
});
