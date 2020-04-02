
```html

 <div *ngFor="let tab of tableTitles; let i = index;" [ngSwitch]="i" [style.width]="tab.width" [style.min-width]="tab.title.length * 22+'px'" [class.firstTitle]="i === 0">
    <div *ngSwitchCase="'0'">
      <input type="checkbox" [(ngModel)]="isToggleChecked" [checked]= "isToggleChecked" (click)="selectAll(isToggleChecked)" /> {{tab.title}}
    </div>
    <div class="thead-item" *ngSwitchDefault> 
      {{tab.title}}
    </div>
  </div>
```