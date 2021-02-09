import { Component, OnInit } from '@angular/core';
import { CupService } from '../../services/cup.service';
import { Cup, cupSale } from '../../interfaces/cup.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styles: [
  ]
})
export class ReceiptsComponent implements OnInit {
  cups: Cup[] = [];
  opened = false;
  orderOpened = false;
  cantidad: number = 1
  cup: Cup;

  constructor(public cupService: CupService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getCups();
  }

  getCups() {
    this.cupService.getCups()
      .subscribe( cups => this.cups = cups);
  }

  openPanel(cup: Cup) {
    this.cup = cup;
    this.opened = true;
  }

  close(status) {
    if( status === 'confirm') {
      const res = this.cup.cupsnumber + this.cantidad;
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

  closeOrder(status) {
    if( status === 'confirm') {
      this.cupService.updateNumbers().subscribe((data: any) => {
        this.snackBar.open('Stock actualizado', 'Proceso exitoso', {
          duration: 2000,
        });
        this.cupService.cupsSale = [];
        this.getCups();
      })
    } else if (status === 'cancel') {
      this.cupService.cupsSale = [];
    }
    this.orderOpened = false;
  }

}
