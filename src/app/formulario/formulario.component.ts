import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-formulario',
  imports: [CommonModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {
  tipo: string = "ingresoOperacion";

  tipoOperacion(event: Event){
    const elementoSelect = event.target as HTMLSelectElement;
    this.tipo = elementoSelect.value;
  }

}
