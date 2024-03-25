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

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  email: string = ''
  password: string = ''
  isError: boolean = false

  private auth: Auth = inject(Auth)

  user$ = user(this.auth)
  userSubscription: Subscription

  constructor(private router: Router, private toastr: ToastrService) {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      console.log(aUser)
    })
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
    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCred) => {
        console.log(userCred.user)

        this.router.navigate(['dashboard'])
      })
      .catch((e: AuthError) => {
        console.log(e)
        this.isError = true

        setTimeout(() => {
          this.isError = false
        }, 3000)
      })

    
  }
}
