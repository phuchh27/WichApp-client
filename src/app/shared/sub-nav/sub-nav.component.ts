import { Component, Injectable, Input } from '@angular/core';


@Injectable( )
@Component({
  selector: 'app-sub-nav',
  templateUrl: './sub-nav.component.html',
  styleUrls: ['./sub-nav.component.css']
})
export class SubNavComponent {
  @Input() menuItems: { label: string; link: string }[] = [];
}
