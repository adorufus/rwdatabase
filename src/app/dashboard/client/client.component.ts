import { Component, inject, OnInit } from '@angular/core'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Timestamp, where } from '@angular/fire/firestore'
import { Observable } from 'rxjs'

import { Dropdown, DropdownInterface, initDropdowns, initFlowbite } from 'flowbite'
import { FilterSysService } from '../../services/filter-sys.service'

declare var Datepicker: any
declare var DateRangePicker: any

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
  type$: Observable<any[]> | undefined
  clientCompany$: Observable<any[]> | undefined

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
  selectedType: string = ''
  city: string = ''
  state: string = ''
  postalCode: string = ''
  searchQuery: string = ''

  companyNameSearch: string = ''
  addNewCompanyName: string = ''

  isFilterShown: boolean = false
  isFiltering: boolean = false

  dropdown: DropdownInterface | undefined

  clients$: Observable<any[]> | undefined

  constructor(private db: AngularFirestore, private filterSys: FilterSysService) {}

  // filter fields var
  selectedCompanyFilter: string = ''
  selectedTypeFilter: string = ''
  selectedIndustryFilter: string = ''
  selectedStartDateFilter: Date | undefined
  selectedEndDateFilter: Date | undefined

  ngOnInit(): void {

    initFlowbite()
    // this.company$ = collectionData(
    //   collection(this.firestore, 'companies'),
    // ) as Observable<Company[]>

    // this.dropdown = new Dropdown(document.getElementById('dropdown-filter'))

    this.company$ = this.db.collection<Company>('companies').valueChanges()
    this.clientCompany$ = this.db.collection('client_companies').valueChanges()
    this.clients$ = this.db
      .collection('clients', (q) => q.orderBy('created_at', 'desc'))
      .valueChanges()
    this.type$ = this.db.collection('types').valueChanges()
    
  }

  onAddNewClientCompany() {
    this.companyName = this.addNewCompanyName
  }

  clientCompanySelect(company: string) {
    this.companyName = company
  }

  searchForCompany() {
    this.clientCompany$ = this.db.collection('client_companies', ref => ref.where('name', '>=', this.companyNameSearch).where('name', '<=', this.companyNameSearch + '\uf8ff')).valueChanges()
  }

  saveClientCompany() {
    let ref = this.db.collection('client_companies', ref => ref.where('name', '!=', this.companyName)).doc().ref

    if(this.companyName && this.companyName != ""){
      this.db.collection('client_companies').doc(ref.id).set({
        name: this.companyName
      })
    }
  }

  onSearch() {
    console.log('onSearchEntry')
    this.isFilterShown = false
    this.isFiltering = true

    this.clients$ = this.filterSys.filterSearch({type: this.selectedTypeFilter, company: this.selectedCompanyFilter, industry: this.selectedIndustryFilter}, this.selectedStartDateFilter!, this.selectedEndDateFilter!, this.searchQuery)
  }

  onFilterClose() {
    console.log('onFilterCloseEntry')
    this.isFilterShown = false
    this.isFiltering = false
    this.selectedCompanyFilter = ''
    this.selectedIndustryFilter = ''
    this.selectedTypeFilter = ''
    this.selectedStartDateFilter = undefined
    this.selectedEndDateFilter = undefined
  }

  onClearFilter() {
    console.log('onClearEntry')
    this.isFiltering = false
    this.selectedCompanyFilter = ''
    this.selectedIndustryFilter = ''
    this.selectedTypeFilter = ''
    this.selectedStartDateFilter = undefined
    this.selectedEndDateFilter = undefined
    this.clients$ = this.db
      .collection('clients', (q) => q.orderBy('created_at', 'desc'))
      .valueChanges()
    // this.isFilterShown = !this.isFilterShown
  }

  onFilter() {
    console.log(`onFilterEntry & isFiltering: `, this.isFiltering)
    if(this.isFiltering) {
      this.onClearFilter()
    } else {
      this.isFilterShown = !this.isFilterShown
    }
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

  onCompanySelect(e: Event) {
    this.selectedCompany = (e.target as HTMLSelectElement).value
  }

  onTypeSelect(e: Event) {
    this.selectedType = (e.target as HTMLSelectElement).value
  }

  onCompanyFilterSelect(e: Event) {
    this.selectedCompanyFilter = (e.target as HTMLSelectElement).value
  }

  onIndustryFilterSelect(e: Event) {
    this.selectedIndustryFilter = (e.target as HTMLSelectElement).value
  }

  onTypeFilterSelect(e: Event) {
    this.selectedTypeFilter = (e.target as HTMLSelectElement).value
  }

  deleteData(id: string) {
    this.db.collection('clients').doc(id).delete()
  }

  validateInput() {
    if(!this.name || this.name == '') {
      return false
    }

    if(!this.phoneNumber || this.phoneNumber == 0) {
      return false
    }

    return true
  }

  async saveData() {

    let dbRef = this.db.collection('clients').doc().ref
    console.log(await this.checkIfValueExists())

    if(this.validateInput()) {
      if (!(await this.checkIfValueExists())) {

        this.saveClientCompany()

        this.db
          .collection('clients').doc(dbRef.id)
          .set({
            id: dbRef.id,
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
            type: this.selectedType,
            created_at: Timestamp.fromDate(new Date(Date.now())),
          })
          .then((ref) => {
            console.log(ref)

            this.addNewCompanyName = ''
            this.companyName = ''
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        ///TODO: Add error handling
      }
    } else {
      ///TODO: Add error handling
    }
  }
}
