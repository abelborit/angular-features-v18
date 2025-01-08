## SERVICES

Hay que tener en cuenta cuál es el lugar correcto para mantener nuestra información, es decir, la data o el estado que se va generando a lo largo que los usuarios usan esta aplicación, entonces por ejemplo, si hay varios elementos donde utilizan la misma data o funciones o lógica, entonces sería conveniente tenerlo en un lugar específico y de ahí poder utilizarlo, en Angular lo trabaja con los 'services' o 'servicios' (https://angular.io/guide/singleton-services) y lo maneja como un singleton pero el singleton no es comúnmente utilizado pero la forma en que lo trabaja Angular es a través de la inyección de dependencias, es decir, nosotros no nos preocupamos de crear una única instancia del servicio sino que nostros la inyectamos y Angular se encarga de proporcionar ese servicio o esa misma instancia de ese servicio a lo largo de la aplicación y utilizar este patrón de inyección de dependencias es muy bueno ya que fomenta hacer la composición en lugar de la herencia entre otras cosas. La función de los servicios es que ahí esté la lógica de negocio para poder manejarla a lo largo de la aplicación.

Un service básicamente es una clase que se utiliza para encapsular y separar la lógica de negocio y las operaciones de datos de los componentes. Los servicios permiten modularizar y reutilizar la funcionalidad de una aplicación, lo que mejora la organización y mantenimiento del código.

En lugar de tener toda la lógica en los componentes, se puede trasladar a los servicios y luego inyectar esos servicios en los componentes que los necesitan. Esto ayuda a mantener los componentes limpios y enfocados en la presentación visual, mientras que la lógica y las operaciones relacionadas con los datos se gestionan en los servicios.

Por ejemplo, si se necesita realizar peticiones HTTP para obtener datos de un servidor, se puede crear un servicio para manejar esas peticiones. Luego, desde los componentes, simplemente se inyecta el servicio y se utilizan sus métodos para obtener los datos. Esto hace que los componentes sean más sencillos y fáciles de mantener.

La idea de crear los servicios es que se tenga la data que se quiera manejar. Como se sabe en javascript los objetos se pasan por referencia entonces cualquier acción o modificación que suceda a este objeto del estado que se vaya a tener (array, objeto, string, etc) (por más que sea un array, en forma general igual se considera como objeto ya que todo es un objeto en javascript) entonces lo modificará y eso algo que en ocasiones no se requiere o no se necesite o no se quiera hacer es por eso que en Angular hay formas de trabajarlos.

## OBSERVABLES

En RxJS, los operadores no modifican el Observable original, lo que hacen es devolver un nuevo Observable. Los operadores de RxJS son funciones puras que toman un Observable como entrada y generan otro Observable como salida. Al suscribirte al Observable de salida también te suscribes al Observable de entrada. Entonces, aunque los objetos en JavaScript se pasen por referencia, los operadores de RxJS están diseñados para no modificar el Observable original. Así que sí, aún tienes un Observable original después de aplicar un operador de RxJS.

Aunque los objetos en JavaScript se pasan por referencia, los Observables en RxJS tienen un comportamiento especial. Cuando aplicas un operador a un Observable, no modificas el Observable original, en su lugar, como se mencionó anteriormente, se crea un nuevo Observable. Así que el Observable original se mantiene sin cambios. En cuanto a ¿Los Observables se pasan por referencia?, la respuesta es sí. Pero debido a la forma en que están diseñados los operadores de RxJS, no modifican el Observable original. En vez de hacer eso, crean un nuevo Observable, por lo tanto, aunque el Observable se pasa por referencia, el Observable original no se modifica.

## EJEMPLO PARA USAR UN SERVICE

La lógica que tenía cada archivo que se mencionará abajo, tenía la información de un endpoint X a usar, una ventaja era de que todo estaba encapsulado por componente y funcionalidad según lo que se necesite pero el problema es que al cambiar de ruta entonces el componente se va destruyendo y creando lo cual hace que al regresar a la ruta en la que se estaba, la información se destruya también y se inicialice de nuevo el componente desde cero.

- Para solucionar eso entonces se podría pasar toda esa lógica a un servicio ya que este se inicializa la primera vez y se crea su instancia y luego se puede utilizar como un estado general de la información de esta parte de la aplicación y como está proveído en el root -- ({ providedIn: 'root' }) -- entonces sobrevive al cambio de rutas porque al cambiar entre ruta y ruta usa la misma instancia de esta clase que vendría a ser un servicio.

- Otra forma sería hacer uso de los pipes ya que como se tienen observables y en los archivos mencionados abajo recién se suscriben entonces aquí en el servicio podemos hacer uso de RxJS para ir manejando la información que emite estos observables.

- Otra forma también sería utilizar el localStorage ya que la información se guarda como en una base de datos interna del navegador lo cual hará que se conserve la información y luego mandar a llamar desde localStorage al cambiar entre rutas y al recargar la página.

Archivos:

1. by-capital-page.component.ts
2. by-country-page.component.ts
3. by-region-page.component.ts

## DIFERENCIAS DE LOS TIPOS DE "providedIn"

La diferencia entre "providedIn: root" - "providedIn: platform" - "providedIn: any" está relacionada directamente con la forma en que se proporciona una instancia de un servicio y cómo se comparte esa instancia entre los componentes y módulos en una aplicación. (https://angular.io/guide/providers)

- providedIn: root: Singleton, una única instancia para toda la aplicación.
- providedIn: platform: Crea una instancia única para cada plataforma en la que se ejecute la aplicación.
- providedIn: any: Transitorio, crea una nueva instancia para cada componente que lo solicite.

La elección de cuál debes usar depende de la lógica de negocio y los requisitos de la aplicación. Normalmente, providedIn: root es la opción más común y recomendada para la mayoría de las aplicaciones, ya que proporciona una única instancia global que puede ser compartida y reutilizada eficientemente en toda la aplicación. Sin embargo, las otras opciones pueden ser útiles en casos específicos donde se necesite tener diferentes instancias del servicio según la plataforma o el componente que lo solicite.

## ¿Cómo determinamos cuando es el caso mas indicado de usar el constructor y cuando el ngOnInit?

- El constructor se utiliza para inicializar las propiedades de una clase.
- El ngOnInit se utiliza para realizar tareas que deben realizarse una vez que el componente se ha inicializado.

En general, se recomienda utilizar el constructor para inicializar propiedades que son necesarias para que el componente funcione correctamente. Por ejemplo, si el componente necesita una conexión a la base de datos, entonces se debe inicializar la propiedad de la conexión en el constructor.

El ngOnInit se debe utilizar para realizar tareas que no son necesarias para el funcionamiento básico del componente. Por ejemplo, si el componente necesita cargar datos de un servidor o base de datos, entonces se puede realizar esta tarea en el ngOnInit.

En resumen, se recomienda seguir las siguientes reglas para determinar cuándo utilizar el constructor y cuándo utilizar el ngOnInit:

- Utilice el constructor para inicializar propiedades que son necesarias para el funcionamiento básico del componente.
- Utilice el ngOnInit para realizar tareas que no son necesarias para el funcionamiento básico del componente.
