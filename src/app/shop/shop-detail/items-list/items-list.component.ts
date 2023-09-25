import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cloudinary } from '@cloudinary/url-gen';
import { Item } from 'src/app/models/item.model';


@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css'],
})
export class ItemsListComponent implements OnInit {
  createMode: boolean = false;
 

  imageURL: string | null = null;
  @ViewChild('fileInput') fileInput: any;

  ngOnInit(): void {
   
  }

  onFileSelected(event: any) {
    const file = event.target.files[0] as File;
    if (file) {
      // Đọc tệp hình ảnh và cập nhật imageURL
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onCreate() {
    this.createMode = true;
  }

  onCancel() {
    this.createMode = false;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      console.log('form not valid');
      return;
    }
    const newItem: Item = {
      name: form.value.itemname,
      description: form.value.description,
      price: form.value.price,
      cost: form.value.cost,
      quantity: form.value.quantity,
      imglink: this.imageURL,
    };
    console.log(newItem);
  }
}
