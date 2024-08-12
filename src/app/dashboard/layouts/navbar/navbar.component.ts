import { Component, OnInit } from '@angular/core'
import { initFlowbite } from 'flowbite'
import { AuthService } from '../../../services/auth.service'
import { User } from '@angular/fire/auth'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {


  username: string = ''
  photo: string = '';

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {

    this.authService.getCurrentUser().subscribe((currentUser: User | null) => {
      this.username = currentUser?.displayName || currentUser?.email || ''
      this.photo = currentUser?.photoURL || ''
    })

    initFlowbite()
  }
}
