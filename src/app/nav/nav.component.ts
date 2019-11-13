import { Component, OnInit ,Input } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  
  @Input() userId: string = "";
  @Input() ssoId: string = "";
  @Input() features: string[] = [];

  constructor() { }

  ngOnInit() {
  }

  hasRoleByName(name: string) {
   // return this.features.indexOf(name.toUpperCase()) >= 0; 
   return true;
  }

}
