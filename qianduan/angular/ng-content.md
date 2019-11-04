<div #tableBodyElement>
  <table class="table">
    <ng-content select='thead'></ng-content>
    <ng-content select='tbody'></ng-content>
  </table>
</div>

投影 select可选  
组件中投影 table > thead+tbody