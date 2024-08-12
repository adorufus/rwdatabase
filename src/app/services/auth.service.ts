import { inject, Injectable } from '@angular/core';
import { Auth, AuthError, signInWithEmailAndPassword, User, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth)
  private user$ = user(this.auth)
  private userSubscription: Subscription

  constructor() {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      //set
    })
  }

  login(router: Router, email: string, password: string): Promise<boolean> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCred) => {
        console.log(userCred.user)

        router.navigate(['dashboard'])
        return true
      })
      .catch((e: AuthError) => {
        console.log(e)
        let isNotShowError = false;

        setTimeout(() => {
          isNotShowError = true
        }, 3000)

        return isNotShowError
      })
  }

  getCurrentUser() {
    return this.user$
  }
}
