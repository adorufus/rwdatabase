import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { provideRouter, RouterModule, Routes } from '@angular/router'
import { DashboardComponent } from './dashboard.component'
import { NavbarComponent } from './layouts/navbar/navbar.component'
import { SidebarComponent } from './layouts/sidebar/sidebar.component'
import { ClientComponent } from './client/client.component'
import { BaseComponent } from './layouts/base/base.component'
import { FormsModule } from '@angular/forms'
import { UsersComponent } from './users/users.component'
import { HttpClientModule } from '@angular/common/http'
import { CompanyComponent } from './company/company.component'
import { DatabaseTypeComponent } from './database-type/database-type.component'
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker'
import { provideNativeDateAdapter } from '@angular/material/core'
import { MatFormFieldModule } from '@angular/material/form-field'
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap'
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { LogsComponent } from './logs/logs.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'client',
        component: ClientComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'companies',
        component: CompanyComponent,
      },
      {
        path: 'types',
        component: DatabaseTypeComponent,
      },
    ],
  },
]

@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    SidebarComponent,
    ClientComponent,
    BaseComponent,
    UsersComponent,
    CompanyComponent,
    DatabaseTypeComponent,
    LogsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatFormFieldModule,
    NgbDatepickerModule,
    NzDatePickerModule
  ],
  providers: [
    provideNativeDateAdapter()
  ],
})
export class DashboardModule {}
