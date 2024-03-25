import { Component, inject, OnInit } from '@angular/core'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Timestamp } from '@angular/fire/firestore'
import { Observable } from 'rxjs'

export interface Company {
  name: string
}

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss',
})
export class ClientComponent implements OnInit {
  company$: Observable<Company[]> | undefined

  name: string = ''
  title: string = ''
  companyName: string = ''
  phoneNumber: number | undefined
  websiteUrl: string = ''
  department: string = ''
  emailAddress: string = ''
  companyAddress: string = ''
  streetAddress2: string = ''
  selectedCompany: string = ''
  city: string = ''
  state: string = ''
  postalCode: string = ''

  clients$: Observable<any[]> | undefined

  constructor(private db: AngularFirestore) {}

  ngOnInit(): void {
    // this.company$ = collectionData(
    //   collection(this.firestore, 'companies'),
    // ) as Observable<Company[]>

    this.company$ = this.db.collection<Company>('companies').valueChanges()
    this.clients$ = this.db
      .collection('clients', (q) => q.orderBy('created_at', 'desc'))
      .valueChanges()
  }

  async checkIfValueExists() {
    return !(
      await this.db
        .collection('clients')
        .ref.where('email', '==', this.emailAddress)
        .where('phone_number', '==', this.phoneNumber)
        .get()
    ).empty
  }

  async saveData() {
    console.log(await this.checkIfValueExists())

    if (!(await this.checkIfValueExists())) {
      this.db
        .collection('clients')
        .add({
          name: this.name,
          title: this.title,
          company_name: this.companyName,
          phone_number: this.phoneNumber,
          website_url: this.websiteUrl,
          department: this.department,
          email: this.emailAddress,
          company_address: this.companyAddress,
          second_address: this.streetAddress2,
          company: this.selectedCompany,
          city: this.city,
          state: this.state,
          postal_code: this.postalCode,
          created_at: Timestamp.fromDate(new Date(Date.now())),
        })
        .then((ref) => {
          console.log(ref)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      
    }
  }
}
