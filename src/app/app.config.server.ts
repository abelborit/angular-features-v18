/* Este código configura una aplicación Angular para Server-Side Rendering (SSR) combinando la configuración base de la aplicación con una configuración adicional específica para el servidor. Utiliza herramientas modernas de Angular como mergeApplicationConfig para fusionar configuraciones */
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

/* ApplicationConfig: Es la interfaz utilizada para definir la configuración de la aplicación, como proveedores globales */
/* serverConfig define una configuración adicional específica para el servidor. Incluye el proveedor provideServerRendering(), que asegura que Angular pueda manejar el proceso de renderizado en el servidor */
const serverConfig: ApplicationConfig = {
  providers: [
    /* provideServerRendering(): Es un proveedor que configura Angular para habilitar Server-Side Rendering (SSR). Incluye configuraciones específicas para que Angular funcione correctamente en un entorno de servidor, como la manipulación de HTML estático y la serialización de estados para el cliente */
    /* Este proveedor habilita características esenciales para SSR, como:

      - Renderizado del lado del servidor:
        - Permite que Angular genere HTML estático basado en las rutas y componentes de tu aplicación.
        - Esto mejora el SEO y acelera el tiempo de carga inicial en navegadores.

      - Estado compartido:
        - Serializa el estado de la aplicación en el HTML generado.
        - Cuando el cliente "hidrata" la aplicación, puede usar este estado para evitar cálculos redundantes.

      - Soporte de renderizado incremental:
        - Compatible con renderizado progresivo, donde partes del HTML se entregan mientras el servidor sigue procesando otras.
    */
    provideServerRendering(),
  ],
};

/* mergeApplicationConfig es una función de Angular que combina dos configuraciones de aplicación (ApplicationConfig) en una sola. Esto permite mantener configuraciones separadas (por ejemplo, para cliente y servidor) y fusionarlas según sea necesario */
/* appConfig: Es la configuración base de la aplicación, definida previamente (probablemente para el cliente) */
/* mergeApplicationConfig ayuda a:

    - Mantener configuraciones separadas para cliente y servidor permite:
      - Modularidad: Puedes definir configuraciones específicas para cada entorno y combinarlas cuando sea necesario.
      - Reutilización: Las configuraciones comunes, como las rutas o proveedores compartidos, se mantienen en un lugar central (appConfig), mientras que las configuraciones específicas del servidor están en otro (serverConfig).
*/
export const config = mergeApplicationConfig(appConfig, serverConfig);
