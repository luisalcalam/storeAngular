import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cup } from '../../interfaces/cup.interface';
import { CupService } from '../../services/cup.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
  ]
})
export class ListComponent implements OnInit {
  cups: Cup[] = [];
  opened = false;

  constructor(public cupService: CupService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getCups();
  }

  close(status) {
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
    this.opened = false;
  }

  getCups() {
    this.cupService.getCups()
      .subscribe( cups => this.cups = cups);
  }

}
