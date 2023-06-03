import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
 
  opened = false;
  
  elementos : number;
  badgeMostrar : boolean

  selectedItem  : string;

  constructor(
    private _loginService : LoginService
  ) {

    this.badgeMostrar = true;
    this.elementos = 0;

   }

  ngOnInit(): void {
    
  }



  logOut(){
        this._loginService.logOut();
  }

}
