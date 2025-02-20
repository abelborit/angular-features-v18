import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  InputSignal,
  OnDestroy,
  EventEmitter,
  Output,
  // OnInit,
  // output,
  // OutputEmitterRef,
} from '@angular/core';
import { CharacterInterface } from '../../interfaces';
import { JsonPipe, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [NgOptimizedImage, JsonPipe],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterCardComponent
  implements /* OnInit, */ AfterViewInit, OnDestroy
{
  /* sintaxis antigua */
  /* antes para pasarle información a este componente desde el exterior, se tenía que colocar el decorador @Input() el cual se utiliza para la comunicación entre componentes que define una propiedad que puede ser enviada desde el componente padre hacia el componente hijo y se podía cambiar el nombre de la propidad por ejemplo usando @Input('otroNombre') */
  // @Input()
  // public character: CharacterInterface = {}

  /* sintaxis nueva  */
  /* ahora es más facil usando la nueva sintaxis usando "input()" y también le podemos decir que sea una propiedad requerida. Ahora de esta forma nos dice que "input" será una señal o un signal. Aquí ya se detecta automáticamente que es un "InputSignal<CharacterInterface>" pero igual se está colocando de forma explícita */
  public readonly character: InputSignal<CharacterInterface> =
    input.required<CharacterInterface>();

  /* este "characterInfo" puede ser opcional en una primera instancia por eso no se le coloca el ".required" y por eso también tiene el "undefined" */
  public readonly characterInfo: InputSignal<CharacterInterface | undefined> =
    input<CharacterInterface>();

  /* nueva forma de utilizar el "output()" para mandar información desde el hijo hacia el padre */
  // public readonly loaded: OutputEmitterRef<string> = output<string>();

  /* en este caso se quiere que cuando el card reciba la información del character desde el padre entonces emitirá al padre la url de ese character */
  // ngOnInit(): void {
  //   this.loaded.emit(this.character().url);

  //   console.log(this.characterInfo() ?? 'No character info available');
  //   console.log('this.characterInfo()', this.characterInfo());
  // }

  /* FORMA 3: usando IntersectionObserver y @Output() */
  @Output() visible = new EventEmitter<string>();

  private observer?: IntersectionObserver;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.visible.emit(this.character().url);
          this.observer?.disconnect(); // Desconectar para evitar múltiples emisiones
        }
      },
      { threshold: 0.1 } // Cuando el 10% del elemento sea visible
    );

    this.observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
