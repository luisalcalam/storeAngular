import { Component, OnInit } from '@angular/core';
import { CupService } from '../../services/cup.service';
import { Cup } from '../../interfaces/cup.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
  .container {
      margin: 10px;
    }`
  ]
})
export class HomeComponent implements OnInit {
  cups: Cup[] = [];

  constructor(private cupService: CupService) { }

  ngOnInit(): void {

    this.cupService.getCups()
      .subscribe( cups => this.cups = cups);
  }

}
