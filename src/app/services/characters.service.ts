import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { CharacterInterface, CharactersApiResponse } from '../interfaces';
import { CharacterAdapter } from '../adapters';

/* desde Angular 6 se añadió el providedIn: 'root'. Entonces nuestro servicio va a ser un singleton en toda nuestra aplicación, es decir, que podemos utilizar este servicio en cualquier parte de nuestra aplicación las veces que sean necesarias pero mediante la inyección de dependencias y con eso se tendrá el valor actual, es decir, el valor como se encuentra en ese momento */
@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  /* para trabajar con HTTP con lo propio de Angular aquí se utilizará el servicio propio de HttpClient. HttpClient es la clase con la que realizamos las request la cual es basicamente un servicio */
  /* se dijo que en el constructor es más que todo para la inyección de dependencias o inyectar un servicio pero en este caso como no es un componente y es un servicio entonces se tiene que hacer la carga inicial de algo aquí porque es parte de lo que quiero que se ejecute cuando se inicializa esta clase o servicio muy aparte que aquí en el CharactersService no tenemos el OnInit de los componentes, tener en cuenta que los Component Lifecycle son exclusivos de los componentes y ahora estamos trabajando en un servicio, de ahí que inicialicemos en el constructor y en este caso se podría cargar la data del localStorage (si es que se implementó esa funcionalidad de guardar en el localStorage). Ahora, perfectamente se podría ir al app.component.ts por ejemplo, implementar el servicio y ahí si en un OnInit llamarlo, ya que ahora sí estamos dentro de un componente y estos ya tienen el Component Lifecycle. Pero al final vamos a lograr lo mismo, y estamos sacando el código fuera, haciendo más engorrosa la app, de ahí que aquí dejemos todo dentro del propio servicio */
  constructor(private httpClient: HttpClient) {
    /* cuando mi servicio sea inyectado la primera vez y solo ahí se ejecutará lo siguiente: */
    // console.log('first time');
  }

  /* aquí ya no sería tan necesario tiparlo explícitamente porque ya lo reconoce como un string y también las reglas de eslint agregadas nos menciona lo mismo */
  private readonly mainApiUrl = 'https://rickandmortyapi.com/api/';
  private readonly charactersApiUrl: string = this.mainApiUrl + 'character';

  /* para hacer las peticiones HTTP se podría trabajar como normalmente se haría usando fetch nativo de javascript o con axios pero con Angular al hacer peticiones HTTP vamos a querer usar los interceptores, suscriptores, etc... */
  /* en la mayoría de los casos en los que puede usar promesas, los observables pueden hacerlo mejor. Una ventaja clave de los observables es que se pueden cancelar (dando de baja la suscripción). Esa es una característica que también es útil cuando solo se devuelve un único valor. Además, todas las funciones de operador de observables que manejan múltiples solicitudes asíncronas paralelas son mucho más fáciles de usar que elaborar manualmente algunas promesas de manejo juntas. */
  // fetch(
  //   `https://api.giphy.com/v1/gifs/search?api_key=${environment.GIPHY_API_KEY}&q=${searchValue}&limit=10`
  // )
  //   .then((response) => response.json())
  //   .then((data) => console.log(data));

  /* aquí no se trabajará como promesa sino se trabajará como un observable y este es un objeto en el cual a lo largo del tiempo puede estar emitiendo diferentes valores. Usualmente cuando hablamos de “suscribirnos a los observables”, significa estar escuchando las emisiones que ese objeto estará emitiendo a lo largo de su vida. En este caso este observable emitirá un valor cuando tengamos la respuesta pero hay observables que son continuos, es decir, siempre están emitiendo valores y nosotros trabajamos en base a esas emisiones. Para escuchar la respuesta nos tenemos que suscribir a este observable. El (observer) => {...} sería como colocar (response) => {...}. También se trabajará con el HttpParams que viene de Angular */
  /**
   * Obtiene todos los personajes desde la API de https://rickandmortyapi.com/api/character.
   * @returns Observable que maneja datos de tipo CharacterInterface[].
   */
  public getAllCharacters(): Observable<CharacterInterface[]> {
    /* este this.httpClient.get() regresa un Observable entonces si se hace un return de eso hay que definir que la función getAllCharacters retornará algo de tipo Observable con un dato de tipo X que en este caso sería CharacterInterface[]. Este Observable es como si fuera un Promise pero aquí lo trabajaremos de tipo Observable que es de la programación reactiva de RxJs */
    /* hasta ahí estamos configurando y definiendo la solicitud que haremos y el Observable que vamos a emitir pero hasta no suscribirse a ese Observable entonces no se ejecuta esa solicitud ni escucharemos los cambios que tenga, entonces se podría hacer suscripción si se requiere en este mismo servicio o sino en el archivo .ts que lo necesite */

    /* los observables tienen un método llamado pipe que es poderoso y tiene varias cosas, por ejemplo, es un método donde se puede especificar diferentes operadores de RxJs. Se puede usar el tab, map, catchError, etc.... de RxJs */
    return this.httpClient
      .get<CharactersApiResponse>(this.charactersApiUrl)
      .pipe(
        /* map(...) sirve para transformar la información que recibe y retornar la información modificada o transformada. Se puede tipar todo o sino que TypeScript lo infiera */
        // map(
        //   (characterApiResponse: CharactersApiResponse): CharacterInterface[] =>
        //     CharacterAdapter(characterApiResponse)
        // ),
        map((characterApiResponse) => CharacterAdapter(characterApiResponse)),

        // catchError(() => of([])) // forma corta con return implícito y sin usar el error
        catchError((error) => {
          console.log('error in getAllCharacters', error);
          /* regresar un nuevo observable usando el of() de RxJs que sirve para construir un nuevo observable a partir del argumento que se le manda, es decir, en este caso si hay un error entonces va a regresar un nuevo observable pero este será un arreglo vacío */
          return of([]);
        })
      );
  }

  /**
   * Obtiene la información de un personaje específico a partir de una URL que se le tiene que pasar como prop.
   * @param url URL del personaje.
   * @returns Observable que maneja la información del personaje o `null` en caso de error.
   */
  /* se está quitando el null porque sino luego en "makeApiCall" daría un error porque el index no podría ser un undefined */
  public getCharacterInformation(url: string): Observable<CharacterInterface> {
    // console.log('url - getCharacterInformation', url);
    return this.httpClient.get<CharacterInterface>(url);
  }
}
