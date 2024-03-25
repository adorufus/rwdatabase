import { Component, OnInit } from '@angular/core';
import { RwdFiretoolsService } from '../../services/rwd-firetools.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  userList: [] = []

  constructor(private rwdFireTools: RwdFiretoolsService) {}

  ngOnInit(): void {
    this.rwdFireTools.getAllUsers().subscribe((res) => {
      console.log("users:", res)
      this.userList = res['users']

      console.log(this.userList)
    })
  }
}
