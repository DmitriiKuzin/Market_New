import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OperationResult } from 'src/app/models/operationResult';


@Component({
  selector: 'app-register-manager',
  templateUrl: './register-manager.component.html',
  styleUrls: ['./register-manager.component.css']
})
export class RegisterManagerComponent implements OnInit {
  message: string
  constructor(private apiService: ApiService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.http.post(this.apiService.apiURI + "Auth/CreateManager", form.value)
      .subscribe((res: OperationResult) => {
        if (res.data!=null) {
          form.reset()
          this.apiService.hideAlert = false
          location.href = 'manager-panel'
        }
        else
          this.message = res.message
      }
      )
    }

}
