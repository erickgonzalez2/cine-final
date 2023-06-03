import { Component, OnInit } from '@angular/core';
import { Rol } from 'src/app/models/rol';
import { UsuariosService } from '../usuarios.service';
import { User } from 'src/app/models/users';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.scss']
})
export class TableroComponent implements OnInit {

  totalUsuarios = 0;
  currentPage = 0;

  roles: Rol[] = [];
  users: User[] = [];

  selectedRoles: [] = [];
  selectedNames: string;
  filter: string = '';

  constructor(
    private _userService: UsuariosService
  ) { }

  ngOnInit(): void {


    this._userService.getRoles().subscribe({
      next: (response: any) => {
        this.roles = response;
      }
    })

    this.search();

  }



  search() {

    let names: string[] = this.filter.trim().split(/\s+/);

    console.log(names);
    
    
    names = names.filter(element => {
      return element != '' && element != ' '
    })

    this.selectedNames = names.join(',')

    this._userService.getUsers(this.selectedNames, this.selectedRoles, this.currentPage, 20).subscribe({
      next: (response: any) => {
        this.users = response.users;
        this.totalUsuarios = response.count;
      }
    })


  }

}
