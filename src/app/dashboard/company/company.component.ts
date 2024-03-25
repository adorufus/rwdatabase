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

  constructor(private db: AngularFirestore) {

  }

  ngOnInit(): void {
    this.companies = this.db.collection('companies').valueChanges()
  }

}
