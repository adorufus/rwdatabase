import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';

export enum Action {
  CREATE,
  EDIT,
  DELETE
}

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(private db: AngularFirestore, private authService: AuthService) { }

  getLog(type: string): Observable<any> {
    return this.db.collection('logs').doc(type).collection('data', (ref) => ref.orderBy('createdAt', 'desc')).valueChanges()
  }

  createLog(type: string, action: Action, clientName: string): void {
    this.authService.getCurrentUser().subscribe((currentUser: User | null) => {
      let username = currentUser?.displayName || currentUser?.email || ''

      let now = Timestamp.fromDate(new Date(Date.now()))

      this.db.collection('logs').doc(type).collection('data').add(
        {
          username: username,
          client_name: clientName,
          action: Action[action],
          createdAt: now
        }
      ).catch((reason) => {
        console.log(reason)
      })
    })
  }
}
