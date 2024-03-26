import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss'
})
export class CompanyComponent implements OnInit {

  companies: Observable<any[]> | undefined

  companyName: string = ''

  constructor(private db: AngularFirestore) {

  }

  ngOnInit(): void {
    this.companies = this.db.collection('companies').valueChanges()
  }

  onDelete(id: string) {
    this.db.collection('companies').doc(id).delete()
  }

  onCreate() {
    let dbRef = this.db.collection('companies').doc().ref

    this.db.collection('companies').doc(dbRef.id).set({
      id: dbRef.id,
      name: this.companyName
    })
  }

}
