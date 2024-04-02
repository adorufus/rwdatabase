import { Injectable } from '@angular/core'
import { AngularFirestore, QueryFn } from '@angular/fire/compat/firestore'
import { CollectionReference, Timestamp } from '@angular/fire/firestore'
import { Observable } from 'rxjs'

export interface FilterField {
  company: string
  industry: string
  type: string
}

@Injectable({
  providedIn: 'root',
})
export class FilterSysService {
  constructor(private db: AngularFirestore) {}

  private timestamper(date: Date) {
    return Timestamp.fromDate(date)
  }

  filterSearch(data: FilterField, startDate: Date | undefined, endDate: Date | undefined, searchQuery: string): Observable<any> {
    console.log(data)

    // if(!data.startDate && !data.endDate) {
    //   return this.db.collection('clients', (query) => query.orderBy('created_at', 'desc').where('company', '==', data.holdingCompany).where('industry', '==', data.industry).where('type', '==', data.type)).valueChanges()
    // }

    // if(!data.holdingCompany) {
    //   return this.db.collection('clients', (query) => query.orderBy('created_at', 'desc').where('created_at', '>', this.timestamper(data.startDate)).where('created_at', '<', this.timestamper(data.endDate)).where('industry', '==', data.industry).where('type', '==', data.type)).valueChanges()
    // }

    // if(!data.industry) {
    //   return this.db.collection('clients', (query) => query.orderBy('created_at', 'desc').where('created_at', '>', this.timestamper(data.startDate)).where('created_at', '<', this.timestamper(data.endDate)).where('company', '==', data.holdingCompany).where('type', '==', data.type)).valueChanges()
    // }

    // if(!data.type) {
    //   return this.db.collection('clients', (query) => query.orderBy('created_at', 'desc').where('created_at', '>', this.timestamper(data.startDate)).where('created_at', '<', this.timestamper(data.endDate)).where('company', '==', data.holdingCompany).where('industry', '==', data.industry)).valueChanges()
    // }

    let query = this.db.collection('clients', (ref) => {
      let q: any = ref

      console.log(searchQuery)

      Object.keys(data).forEach((key) => {
        if (
          data[key as keyof FilterField] != '' &&
          data[key as keyof FilterField] != undefined
        ) {
          q = q.where(key, '==', data[key as keyof FilterField])
        }
      })

      if(searchQuery != '' && searchQuery != undefined) {
       q = q.where('name', '>=', searchQuery).where('name', '<=', searchQuery + '\uf8ff')
      }

      if(startDate && endDate) {
        q = q.where('created_at', '>', this.timestamper(startDate)).where('created_at', '<', this.timestamper(endDate))
      }

      return q
    })

    return query.valueChanges()
  }
}
