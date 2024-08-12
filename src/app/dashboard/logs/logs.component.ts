import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.scss'
})
export class LogsComponent {
  
  @Input() logs: Observable<any> | undefined

  isMinimized = false
  minimizeButtonText = '-'

  logSize = '20rem'

  onMinimize() {
    if(!this.isMinimized) {
      this.minimizeButtonText = '+'
      this.logSize = '0rem'
    } else {
      this.minimizeButtonText = '-'
      this.logSize = '20rem'
    }

    this.isMinimized = !this.isMinimized
  }
}
