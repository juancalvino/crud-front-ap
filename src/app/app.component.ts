import { Component } from '@angular/core';
import { faList, faPlus } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  listIcon = faList;
  plusIcon = faPlus;
}
