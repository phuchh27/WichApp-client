import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-page',
  templateUrl: './staff-page.component.html',
  styleUrls: ['./staff-page.component.css']
})
export class StaffPageComponent implements OnInit {
  checkStaff: boolean |undefined;

  constructor(private router: Router) {}
 

  ngOnInit() {
    const userdata = localStorage.getItem('userData')

    if(userdata){
      const getstaff = JSON.parse(userdata);
      this.checkStaff = getstaff.is_staff
    }

    if(this.checkStaff){
      console.log('isStaff')
    }else{
      this.router.navigate(['/not-found'])
    }
  }

} 


