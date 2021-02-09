import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CupService } from '../../services/cup.service';
import { Cup, Type, Color } from '../../interfaces/cup.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TypeService } from '../../services/type.service';
import { ColorService } from '../../services/color.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styles: [`
  table {
  width: 100%;
}

.mat-form-field {
  font-size: 14px;
  width: 100%;
}

td, th {
  width: 10%;
}`
  ]
})
export class SaleComponent implements OnInit, AfterViewInit {
  cups: Cup[] = [];
  dataSource: MatTableDataSource<Cup>;
  types: Type[] = [];
  colors: Color[] = [];
  opened = false;
  image;

  cupForm: FormGroup = this.fb.group({
    name: [ , [ Validators.required, Validators.minLength(3) ]   ],
    volume: [ , [ Validators.required, Validators.minLength(2)] ],
    material: [ , [ Validators.required, Validators.minLength(2)] ],
    image: [ , Validators.required ],
    type: [ , Validators.required ],
    color: [ , Validators.required ]
  })

  constructor(private cupService: CupService,
    private typeService: TypeService,
    private colorService: ColorService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'name', 'volume', 'material', 'fullname', 'cupsnumber', 'type.name', 'color.name', 'color.code'];

  ngOnInit(): void {
    this.getCups();
    this.getColors();
    this.getTypes();
  }

  ngAfterViewInit() {
    
  }

  getCups() {
    this.cupService.getCups()
      .subscribe( cups => {
        this.cups = cups
        this.dataSource = new MatTableDataSource(cups);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = function(data, filter: string): boolean {
          return data.name.toLowerCase().includes(filter) || data.fullname.toString().includes(filter);
      };
      });
  }

  getColors() {
    this.colorService.getColors().subscribe( colors => {
      this.colors = colors;
    })
  }
  
  getTypes() {
    this.typeService.getTypes().subscribe( types => {
      this.types = types;
    })
  }

  openNewCup() {
    this.opened = true;
  }

  close(status) {
    this.opened = false;
    this.cupForm.reset();
  }

  saveCup() {
    if(this.cupForm.invalid) {
      this.cupForm.markAllAsTouched();
      return;
    }
    this.cupService.uploadImage(this.image).getDownloadURL().subscribe(urlImage => {
      const values = this.cupForm.value;
      const newCup: Cup = {
        name: values.name,
        material: values.material,
        volume: values.volume,
        fullname: `${values.name} ${values.color.name} ${values.volume} ${values.material}`,
        imageurl: urlImage,
        cupsnumber: 10,
        typeId: values.type.id,
        colorId: values.color.id
      }
      this.createNewCup(newCup);
      this.cupForm.reset();
      this.opened = false;
    });
  }

  campoEsValido( campo: string ) {

    return this.cupForm.controls[campo].errors 
            && this.cupForm.controls[campo].touched;
  }

  handleImage(event: any): void {
    this.image = event.target.files[0];
    if(this.image.type !== 'image/png' && this.image.type !== 'image/jpg') {
      this.cupForm.controls.image.setValue('');
      this.image = undefined;
      this.snackBar.open('Formato no permitido', 'Error', {
        duration: 2000,
      });
      return;
    }
  }

  createNewCup(newCup: Cup) {
    this.cupService.createCup(newCup).subscribe( () => {
      this.snackBar.open(`Producto insertado con exito`, 'Proceso exitoso', {
        duration: 2000,
      });
      this.getCups();
    })
  }

}
