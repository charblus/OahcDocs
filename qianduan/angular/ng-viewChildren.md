
```ts

import { AfterViewInit, ViewChildren, QueryList, Component, OnInit, Input } from '@angular/core';
import {ZxTableComponent} from '../../shared/table/zx-table/zx-table.component'

@Component({
  selector: 'app-create-questionnaire',
  templateUrl: './create-questionnaire.component.html',
  styleUrls: ['./create-questionnaire.component.scss']
})
export class CreateQuestionnaireComponent implements OnInit, AfterViewInit {

  @ViewChildren(ZxTableComponent) ths: QueryList<ZxTableComponent>;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log(this.ths);
  }
}

```