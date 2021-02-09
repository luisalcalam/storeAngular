import { Component, Input, Inject } from '@angular/core';
import { Cup, Color, Type, cupSale } from '../../interfaces/cup.interface';
import { CupService } from '../../services/cup.service';

export interface DialogData {
  cantidad: number;
}

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styles: [`
    mat-card {
      margin-top: 20px
    }
    .example-full-width {
      width: 100%;
    }
  `]
})
export class ProductCardComponent {
  @Input() cup: Cup
  opened: boolean = false
  cantidad: number = 1;

  constructor(private cupService: CupService) {}

  close(status) {
    if( status === 'confirm') {
      const res = this.cup.cupsnumber - this.cantidad;
      const cupS: cupSale = {
        cup: this.cup,
        cupsnum: this.cantidad,
        total: res,
        type: this.cup.type
      };
      this.cupService.cupsSale.push(cupS);
    }
    this.opened = false;
  }
}

