import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-scrollable',
  templateUrl: './scrollable.component.html',
  styleUrls: ['./scrollable.component.css'],
})
export class ScrollableComponent implements OnInit {

  @Input() categoriesMenu: {id: number; name: string; store: number}[]=[]
  @Output() categorySelected: EventEmitter<number> = new EventEmitter();
  
  constructor() {}

  ngOnInit(): void {
    const stabsbox: any = document.querySelector('.tab-box');
    const arrowIcons  = document.querySelectorAll('.icon img');

    let isdragging: boolean = false;

    arrowIcons.forEach((icon) => {
      icon.addEventListener("click", () => {
        stabsbox.scrollLeft += icon.id ==="left" ? -350 : 350;
      });
    });

    const dragging = (event: MouseEvent) => {
      if (!isdragging) return;
      
      stabsbox.scrollLeft -= event.movementX;
    };

    const dragStop = () => {
      isdragging = false;
      
    };

    stabsbox.addEventListener('mousedown', () => (isdragging = true));
    stabsbox.addEventListener('mousemove', dragging);
    document.addEventListener('mouseup', dragStop);

    setTimeout(() => {console.log('from scroll bar: ',this.categoriesMenu)},350)
    
  }

  

  onCategoryClick(categoryId: number): void {
    this.categorySelected.emit(categoryId);
  }
}
