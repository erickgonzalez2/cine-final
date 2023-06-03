import { Component, OnInit } from '@angular/core';
import { Rol } from 'src/app/models/rol';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-tablero-roles',
  templateUrl: './tablero-roles.component.html',
  styleUrls: ['./tablero-roles.component.scss']
})
export class TableroRolesComponent implements OnInit {

  totalRoles = 0;
  currentPage = 0;
  filter: string = '';

  roles : Rol[] = [];
  selectedNames: string;

  constructor(
    private _userService: UsuariosService
  ) { }

  ngOnInit(): void {

    this.search();
  }



  search(){

    let names : string[] = this.filter.trim().split(/\s+/);

    names = names.filter(element => {
      return element != '' && element != ' '
    })

    this.selectedNames = names.join(',')


    this._userService.findRoles(this.selectedNames,this.currentPage,20).subscribe({
      next : (response : any) => {
        this.roles = response.roles;
        this.totalRoles = response.count;
      }
    })

  }

}
