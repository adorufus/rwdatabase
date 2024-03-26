import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './dashboard/layouts/navbar/navbar.component';
import { SidebarComponent } from './dashboard/layouts/sidebar/sidebar.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp({"projectId":"rwdb-e39ec","appId":"1:627545772296:web:6efddacc80add8c8fadcbd","storageBucket":"rwdb-e39ec.appspot.com","apiKey":"AIzaSyDpUAg8qxQrmvbszBqk_5Cl60UUzIMG_GU","authDomain":"rwdb-e39ec.firebaseapp.com","messagingSenderId":"627545772296","measurementId":"G-7VPE1RNE6T"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp({"projectId":"rwdb-e39ec","appId":"1:627545772296:web:6efddacc80add8c8fadcbd","storageBucket":"rwdb-e39ec.appspot.com","apiKey":"AIzaSyDpUAg8qxQrmvbszBqk_5Cl60UUzIMG_GU","authDomain":"rwdb-e39ec.firebaseapp.com","messagingSenderId":"627545772296","measurementId":"G-7VPE1RNE6T"}),
    AngularFirestoreModule,
    ToastrModule.forRoot(),
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: NZ_I18N, useValue: en_US },
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
