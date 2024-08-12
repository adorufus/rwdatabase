import { Component, inject, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import {
  Auth,
  User,
  user,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithCredential,
  AuthCredential,
  AuthError,
} from '@angular/fire/auth'
import { Subscription } from 'rxjs'
import { ToastrService } from 'ngx-toastr'
import { initFlowbite, Dismiss, DismissInterface, DismissOptions, InstanceOptions } from 'flowbite'
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  email: string = ''
  password: string = ''
  isError: boolean = false

  constructor(private router: Router, private toastr: ToastrService, private authService: AuthService) {
  }

  ngOnInit(): void {
    initFlowbite()
  }

  onErrorClose() {
    this.isError = false
  }

  onLogin() {
    console.log(this.email)
    console.log(this.password)

    this.authService.login(this.router, this.email, this.password).then((authNotError) => {
      if(!authNotError) {
        this.isError = true
      } else {
        this.isError = false;
      }
    })
    
  }
}
