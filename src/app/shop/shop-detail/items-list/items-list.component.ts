import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cloudinary } from '@cloudinary/url-gen';
import { Item } from 'src/app/models/item.model';
import { apiKey } from '../../../../environments/environment.prod';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css'],
})
export class ItemsListComponent implements OnInit {
  createMode: boolean = false;
  cld: any;

  imageURL: string | null = null;
  @ViewChild('fileInput') fileInput: any;

  ngOnInit(): void {
    this.cld = new Cloudinary({
      cloud: { cloudName: 'dm4renyes', apiKey: apiKey },
    });
    console.log('Cloudinary initialized:', this.cld);
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

    // this.cld.v2.uploader.upload(
    //   this.imageURL,
    //   { public_id: 'item_' + newItem.name},
    //   function (error: any, result: any) {
    //     console.log(result);
    //   }
    // );

    this.cld.v2.uploader.upload(
      'https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg',
      { public_id: 'olympic_flag' },
      function (error: any, result: any) {
        console.log(result);
      }
    );
  }
}
