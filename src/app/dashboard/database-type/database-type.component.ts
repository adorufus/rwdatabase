import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { initFlowbite } from 'flowbite';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-database-type',
  templateUrl: './database-type.component.html',
  styleUrl: './database-type.component.scss'
})
export class DatabaseTypeComponent {
  types: Observable<any[]> | undefined

  typeName: string = ''

  constructor(private db: AngularFirestore) {

  }

  ngOnInit(): void {
    initFlowbite()
    this.types = this.db.collection('types').valueChanges()
  }

  onCreate() {

    let docRef = this.db.collection('types').doc().ref
    this.db.collection('types').doc(docRef.id).set({
      id: docRef.id,
      name: this.typeName,
      createdAt: Timestamp.fromDate(new Date(Date.now()))
    }).then(d => {
      console.log(d)
    })
  }

  onDelete(itemId: string) {
    this.db.collection('types').doc(itemId).delete()
  }
}
