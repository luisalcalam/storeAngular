import { Component, OnInit } from '@angular/core';
import { TypeService } from '../../services/type.service';
import { Type, Color } from '../../interfaces/cup.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ColorService } from '../../services/color.service';

@Component({
  selector: 'app-catalogs',
  templateUrl: './catalogs.component.html',
  styles: [
  ]
})
export class CatalogsComponent implements OnInit {
  types: Type[] = [];
  typeEdit: Type;
  opened = false;
  value: string;
  title: string = 'Nuevo tipo';
  operation = true;

  colors: Color[] = [];
  colorEdit: Color;
  colorOpened = false;
  nameColorValue;
  codeColorValue;
  titleColor: string = 'Nuevo color';
  operationColor = true;

  constructor(private typesService: TypeService,
    private colorService: ColorService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getTypes();
    this.getColors();
  }

  getTypes() {
    this.typesService.getTypes().subscribe( types => {
      this.types = types; 
    });
  }

  getColors() {
    this.colorService.getColors().subscribe( colors => {
      this.colors = colors;
    })
  }

  close(status) {
    if(status === 'cancel') {
      this.value = '';
    } else if(status === 'confirm') {
      if(this.operation === false) {
        this.typeEdit.name = this.value;
        this.typesService.updateType(this.typeEdit).subscribe(data => {
          this.snackBar.open('Categoria modificada', 'Proceso exitoso', {
            duration: 2000,
          });
          this.getTypes();
        })
      } else {
        const typeNew: Type = {
          name: this.value
        };
        this.typesService.createType(typeNew).subscribe(data => {
          this.snackBar.open('Categoria guardada', 'Proceso exitoso', {
            duration: 2000,
          });
          this.getTypes();
        })
      }
    }
    this.opened = false;
  }

  openNew() {
    this.operation = true;
    this.value = '';
    this.opened = true;
  }

  openEdit(type: Type) {
    this.typeEdit = type
    this.operation = false;
    this.title = 'Editar tipo';
    this.value = type.name;
    this.opened = true;
  }

  closeColor(status) {
    if(status === 'cancel') {
      this.nameColorValue = '';
      this.codeColorValue = '';
    } else if(status === 'confirm') {
      if(this.operationColor === false) {
        this.colorEdit.name = this.nameColorValue;
        this.colorEdit.code = this.codeColorValue;
        this.colorService.updateColor(this.colorEdit).subscribe(data => {
          this.snackBar.open('Color modificado', 'Proceso exitoso', {
            duration: 2000,
          });
          this.getColors();
        })
      } else {
        const colorNew: Color = {
          name: this.nameColorValue,
          code: this.codeColorValue
        };
        this.colorService.createColor(colorNew).subscribe( data => {
          this.snackBar.open('Color guardado', 'Proceso exitoso', {
            duration: 2000,
          });
          this.getColors();
        })
      }
    }
    this.colorOpened = false;
  }

  openNewColor() {
    this.operationColor = true;
    this.nameColorValue = '';
    this.codeColorValue = '';
    this.colorOpened = true;
  }

  openEditColor(color: Color) {
    this.colorEdit = color
    this.operationColor = false;
    this.titleColor = 'Editar color';
    this.nameColorValue = color.name;
    this.codeColorValue = color.code;
    this.colorOpened = true;
  }

}
