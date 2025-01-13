/*
- ChangeDetectionStrategy: Permite configurar cómo Angular detecta y actualiza los cambios en el componente.
- Component: Decorador que marca la clase como un componente de Angular y permite configurar sus propiedades (como plantilla, estilos, etc.).
*/
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { firstValueFrom, Observable } from 'rxjs';
import { CharacterInterface } from '../../interfaces';
import { CharacterCardComponent } from '../character-card';

/*
- selector: Define el nombre del selector del componente, que será usado como una etiqueta HTML para incluir este componente en plantillas de otros componentes.
- standalone: Indica que el componente es independiente (standalone component), es decir, no necesita ser declarado en un módulo de Angular. Esto es una característica de Angular moderna para simplificar la estructura de los proyectos.
- imports: Especifica otros componentes, directivas o pipes que el componente utiliza. Como este componente no utiliza nada externo, el arreglo está vacío.
- templateUrl: Especifica el archivo que contiene el HTML del componente.
- styleUrl: Define la ubicación del archivo de estilos (en este caso, SCSS) asociado al componente.
- changeDetection: Configura la estrategia de detección de cambios del componente:
  - OnPush: Indica que Angular solo verificará los cambios en este componente si:
    - Las entradas (@Input) del componente cambian.
    - Se emiten eventos en el componente.
    - Se llama manualmente a markForCheck() o detectChanges().
    Esta estrategia mejora el rendimiento, especialmente en aplicaciones con muchos componentes, ya que reduce la frecuencia de las comprobaciones.
*/

@Component({
  selector: 'app-characters-container',
  standalone: true,
  imports: [AsyncPipe, CharacterCardComponent],
  templateUrl: './characters-container.component.html',
  styleUrl: './characters-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersContainerComponent {
  /* las propiedades de aquí tiene una relación con el -- ...component.html -- es por eso que se puede llamar o utilizar con doble llave {{}} y hacer referencia a las propiedades que coloquemos aquí */
  // public title: string = 'Characters Container Component';

  /* -- VERSIONES ANTES DE LA v18: para inyectar un servicio -- */
  /* en versiones anteriores a la v18 para usar el servicio en un componente se tenía que inyectar el servicio que vayamos a usar en el constructor y luego crear una variable e inicializarla ya sea en el constructor o sino en otras directivas como en el ngOnInit y estar al tanto del ciclo de los componentes de Angular y que el servicio esté instanciado antes de que el componente se renderice, etc */
  // charactersResponse$: Observable<CharacterInterface[]>; // se coloca con el $ porque como es algo asíncrono entonces es como un standard usarlo de esa forma

  // constructor(private charactersService: CharactersService) {
  //   this.charactersResponse$ = this.charactersService.getAllCharacters();
  // }

  // ngOnInit(): void {
  //   /* lo que iría aquí se podría colocar en el constructor pero en el constructor es más que todo para inyección de dependencias y no tanto para cargar cosas del servicio, para eso usamos el OnInit y ngOnInit, igualmente hay varias formas de hacerlo y formas de mantener un orden */
  // }

  /* -- VERSIÓN v18: para inyectar un servicio -- */
  /* nosotros podemos convertir un observable a una señal porque por mientras Angular trabaja fuertemente con los observables pero puede ser que en un futuro use plenamente las señales pero en este caso queremos usar las señales para poder optimizar el rendimiento aunque tranquilamente se podría seguir trabajando con los observables como la FORMA TRADICIONAL */
  /* hacer tests con inject: https://www.youtube.com/watch?v=Tvsa4OMUGXs&ab_channel=RainerHahnekamp */
  private readonly charactersService = inject(CharactersService);

  public readonly characters$: Observable<CharacterInterface[]> =
    this.charactersService.getAllCharacters();

  public readonly characterInfo: Record<string, CharacterInterface> = {};

  public async makeApiCall(url: string): Promise<void> {
    /* "firstValueFrom" es un método de RxJs que convierte un observable en una promesa, en este caso el observable retornado por el servicio, luego espera (usando await) a que la promesa se resuelva y guarda el valor en la variable character. Como "firstValueFrom" devuelve una promesa entonces se puede usar el "async/await" para esperar a que la promesa se resuelva.

    - Lo que realiza es:
      - Se suscribe al observable proporcionado.
      - Espera al primer valor emitido por el observable.
      - Una vez que recibe el primer valor, automáticamente:
        - Resuelve la promesa con ese valor.
        - Se desuscribe del observable.

    - Por ejemplo:
        const myObservable = of(1, 2, 3); // Un observable que emite 1, 2 y 3.
        const firstValue = await firstValueFrom(myObservable);
        console.log(firstValue); // Salida: 1

    - Beneficios:
      - Limpieza del código: El uso de await evita la necesidad de encadenar múltiples suscripciones al observable con subscribe.
      - Evita fugas de memoria: firstValueFrom asegura que la suscripción se cierra automáticamente después de recibir el primer valor, eliminando la necesidad de manejar manualmente la desuscripción.
      - Compatibilidad con código basado en promesas: Si ya estás utilizando async/await en otras partes del código, este enfoque lo mantiene consistente.

    - Consideraciones importantes
      - Errores no manejados: Si ocurre un error durante la llamada HTTP, la promesa será rechazada. Se debería manejar este caso con un bloque try...catch.
      -Solo el primer valor: Si el observable emite múltiples valores, este enfoque solo capturará el primero y luego se desuscribirá. Si necesitas manejar múltiples valores, deberías usar un enfoque diferente (como toArray o trabajar directamente con el observable).
      -Uso con HttpClient: Angular HttpClient ya emite un único valor por defecto (la respuesta HTTP). Por lo tanto, usar firstValueFrom con observables de HttpClient es perfectamente adecuado.
    */
    try {
      const character = await firstValueFrom(
        this.charactersService.getCharacterInformation(url)
      );

      if (character?.id) {
        /* ahora se tiene un arreglo con la información de cada character y ese character se irá haciendo mendiante se vaya llamando al makeApiCall */
        this.characterInfo[character.id] = character;

        // console.log("character", character);
        // console.log("this.characterInfo", this.characterInfo);
      } else {
        console.warn('Character ID is missing in the response:', character);
      }
    } catch (error) {
      console.error('Error in makeApiCall:', error);
    }
  }
}

/* ************************************************************************************************************************ */
/* FORMA TRADICIONAL: sin señales y sin inject() */
/*
export class UserPageComponent implements OnInit {
  user$: Observable<User>;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.user$ = this.route.params.pipe(
      switchMap(params => this.usersService.getUserById(params['id']))
    );
  }
}
*/
