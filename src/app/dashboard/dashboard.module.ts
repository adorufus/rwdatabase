import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { provideRouter, RouterModule, Routes } from '@angular/router'
import { DashboardComponent } from './dashboard.component'
import { NavbarComponent } from './layouts/navbar/navbar.component'
import { SidebarComponent } from './layouts/sidebar/sidebar.component'
import { ClientComponent } from './client/client.component'
import { BaseComponent } from './layouts/base/base.component'
import { FormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component'
import { HttpClientModule } from '@angular/common/http';
import { CompanyComponent } from './company/company.component'

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'client',
        component: ClientComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'companies',
        component: CompanyComponent
      }
    ]
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
  ],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule, HttpClientModule],
  providers: []
})
export class DashboardModule {}
