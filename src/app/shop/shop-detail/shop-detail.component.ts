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
    const currentShopActive: string = this.shopId?.toString()?? ''
    localStorage.setItem('currentShopActive', currentShopActive)
    this.menuItems = [
      { label: 'Back', link: `/ohome/store/${this.shopId}/` },
      { label: 'Staff', link: `/ohome/store/${this.shopId}/staffs` },
      { label: 'Items', link: `/ohome/store/${this.shopId}/items` },
      { label: 'Store', link: '/store' },
      { label: 'Work schedule', link: '/store' },
    ]
  }
  ngOnDestroy(): void {}
}
