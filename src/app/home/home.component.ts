import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  fecha : number = Date.now();
  hora : any;
  

  constructor() {     
  }
  
  ngOnInit(): void {
    this.mostrarHora();
  }  

  mostrarHora(){
    this.hora = new Date();

    setInterval(()=>{

      this.hora = new Date();

    },1000)

  }

}
