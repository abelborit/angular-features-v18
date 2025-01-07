/*
- ChangeDetectionStrategy: Permite configurar cómo Angular detecta y actualiza los cambios en el componente.
- Component: Decorador que marca la clase como un componente de Angular y permite configurar sus propiedades (como plantilla, estilos, etc.).
*/
import { ChangeDetectionStrategy, Component } from '@angular/core';

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
  imports: [],
  templateUrl: './characters-container.component.html',
  styleUrl: './characters-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersContainerComponent {}
