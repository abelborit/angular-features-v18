## Signals

- Los signals o las señales son básicamente una forma de llegar directamente a donde estamos usando una variable o valor de una variable y actualizarla, tomarla y renderizarla, etc. Es como crear una conexión en dónde se está usando la variable que pueden ser varios lugares y con la señal o el signal al cambiar la variable entonces ya sabe directamente qué variable cambió y en dónde cambió y la actualiza.
- Formas de cambiar y actualizar los valores de los signals o las señales:

  - `set` para establecer un valor
  - `update` para actualizar un valor
  - `mutate` para mutar el valor (desde Angular 17 a más retiraron el mutate)

- También hay señales de solo lectura que son generadas mediante el método computer y la opción de lanzar efectos secundarios. El usar los efectos secundarios con las señales en Angular es como usar un useEffect() de React pero más optimizado y mejorado porque:

  - El useEffect() que es para efectos secundarios se disparan también efectos secundarios innecesarios algunas veces perjudicando el rendimiento por las re-renderizaciones, también tiene un arreglo de dependencias para lanzar el efecto, se tiene que llamar a una función para limpiar el efecto cuando se destruya el componente, etc.
  - Los efectos secundarios con la señales no tiene un arreglo de dependencias, solo se le dice directamente qué se quiere hacer y ese efecto se va a disparar si una de sus señales internas cambia o se actualiza, es decir, si se utiliza una señal que está dentro de un efecto secundario y la señal cambia o se actualiza entonces el efecto secundario se dispara, también que estos efectos con las señales tienen una limpieza automática, es decir, cuando ya no se está usando esa señal y se destruye el componente donde se está usando la señal y ya no vamos a usar más ese efecto secundario entonces automáticamente se limpia.

- Los signals son una buena opción para la comunicación entre componentes y también entre componentes y el DOM. Pueden ser usados tanto en el archivo HTML como en el archivo TypeScript. En general, es recomendable usar variables si el estado es simple y no necesita ser compartido con otros componentes. Por ejemplo, si tienes una variable que almacena el título de una página, puedes usar una variable simple. Los signals son una buena opción si el estado es más complejo o si necesita ser compartido con otros componentes.

- Una señal es un espacio en memoria que apunta o sabe en todo momento en dónde se está usando. Por ejemplo, estamos usando un menuItems que lo estamos usando en la directiva ngFor="let item of menuItems" en el HTML pero al transformarlo como una señal se le puede decir a Angular que esa señal se está usando en un determinado lugar o lugares y que cuando la señal cambie entonces actualiza todos los lugares y todas las dependencias donde se esté usando esta señal en vez de decirle a Angular que alguna propiedad cambió y entonces que realice toda la verificación de su ciclo de verificación de cambios de los componentes, que dispare todos los métodos, etc y que revise todo para saber en qué lugar se vió afectado con el cambio de esa propiedad. Eso quiere decir que con las señales se le dice a Angular exactamente dónde están trabajando y qué tiene que cambiar o qué cambió y si no se usan las señales entonces Angular utiliza un montón de pasos para verificar y determinar qué lugares fueron afectados. Se podría decir que las señales son una forma simplificada de un tipo de programación reactiva lo cual también simplifica los operadores RxJS, etc. Al trabajar con señales ayudará a Angular a que sea más rápido a la hora de trabajar por ejemplo en propiedades computadas, renderizaciones, etc porque va a requerir menos pasos del ciclo de vida de los componentes para hacer las actualizaciones

## ¿Cuándo es conveniente usar una señal y cuando no? Si usamos señales ¿Se sigue disparando el ciclo de vida de Angular?

Las señales en Angular son una forma de manejar la reactividad en las aplicaciones/proyectos. Es conveniente usar señales en Angular cuando se necesita manejar cambios de estado complejos que dependen de múltiples fuentes. Por ejemplo, si estás construyendo un juego de cifrado, puedes usar señales para manejar los cambios en el estado del juego.

Por otro lado, puede que no sea necesario usar señales para casos más sencillos. Por ejemplo, si solo se necesita mostrar un modal, se puede pasar directamente el valor como parámetro en el selector sin necesidad de emitir una señal.

En cuanto al ciclo de vida de Angular, las señales no deberían afectar directamente a este. El ciclo de vida de un componente en Angular incluye etapas como la creación del componente, la actualización cuando se detectan cambios y la destrucción final del componente. Estas etapas se manejan independientemente de si se está usando señales o no.

## ¿Los signals son una alternativa a los RxJS?

Los Signals son una característica en Angular hechos para simplificar el desarrollo y ayudar a construir aplicaciones más rápidas por defecto. En cuanto a si los Signals son una alternativa a los RxJS, no se puede decir con certeza ya que RxJS es una librería para programación reactiva usando observables que hacen más fácil la creación de código asíncrono o basado en callbacks. Los Signals y RxJS pueden llegar a tener algunas similitudes, pero también tienen sus propias características y usos únicos.
