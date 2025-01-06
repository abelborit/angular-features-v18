## SE AGREGÓ: "changeDetection": "OnPush"

Los `@schematics` son los que utiliza Angular a la hora de crear componentes. Entonces vamos a agregar el `"changeDetection": "OnPush"` y esto es la `detección de cambios on push`, es decir, que antes lo que sucedía con la detección de cambios de angular era que si un componente cambiaba entonces lo que hacía era que se preguntaba si todos los demás (componente por componente) habían cambiado, y lo que hace esta nueva propiedad es que solo va a detectar los cambios en los componentes si:

1. El usuario haya interactuado con algo en la página
2. Cuando cambia un parámetro de entrada de un input
3. Cuando hay un evento asíncrono (observable, llamada a API, etc)

Una estrategia un poco arriesgada para proyectos grandes es que se meta todo en un on push, y si hay algún cambio entonces solo ese es el que cambia.

## SE ELIMINO: "zone.js", "zone.js/testing" DENTRO DE polyfills DE test

El `zone.js` es lo que utilizaba Angular para la detección de cambios y a partir de angular 18 podemos colocar `zoneless`, es decir, si se tiene un proyecto que es compatible con el `"changeDetection": "OnPush"` entonces también es compatible con el `zoneless`.

Ahora agregado también el `provideExperimentalZonelessChangeDetection()` hará que en vez de que todo se maneje con `zone.js` se manejará con los `signals`. Esto es que por ejemplo, si tenemos una señal o signal que se usará en solo dos lugares, entonces si en uno de esos dos lugares modifica una señal, entonces el otro componente que está ligado a esa señal (que muy posiblemente será un componente que tendrá un cambio) entonces angular se va a preguntar si cada componente (de los que tienen la señal) cambió o no lo cual lo hace muy eficiente y eso es lo que se llama como `zoneless`.
