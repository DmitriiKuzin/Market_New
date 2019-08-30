import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { OperationResult } from 'src/app/models/operationResult';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
  @ViewChild('closeBtn', { static: false }) closeBtn: ElementRef;

  constructor(private apiService: ApiService) { }

  ngOnInit() {

  }
  async onSubmit(form: NgForm) {
    if (form.valid) {
      this.apiService.updateItem()
        .toPromise()
        .then(
          (res: OperationResult) => {
            if (res.succeeded)
              this.closeBtn.nativeElement.click()
            else
              this.apiService.makeAlert("Не удалось обновить товар")
          }
        )
        .then(() => this.apiService.getItems())
    }
  }

  onDelete() {
    this.apiService.deleteItem()
      .toPromise()
      .then((res: OperationResult) => {
        if (res.succeeded)
          this.closeBtn.nativeElement.click()
        else
          this.apiService.makeAlert("Не удалось обновить товар")
      })
      .then(() => this.apiService.getItems())
  }

  del(image) {
    this.apiService.images = this.apiService.images.filter(im => im != image)
  }

}
