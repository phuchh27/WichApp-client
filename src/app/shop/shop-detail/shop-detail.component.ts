import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.css'],
})
export class ShopDetailComponent implements OnInit, OnDestroy {


  shopId: number | undefined;
  shopDetail: any;
  menuItems:any

  

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.shopId = this.route.snapshot.params['id']
    this.menuItems = [
      { label: 'Back', link: '/home' },
      { label: 'Staff', link: '/store' },
      { label: 'Items', link: '/store' },
      { label: 'Store', link: '/store' },
      { label: 'Work schedule', link: '/store' },
    ]

  }
  ngOnDestroy(): void {}
}
