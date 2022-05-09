import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InboxComponent } from './pages/inbox/inbox.component';

const routes: Routes = [
  {
    path: '',
    component: InboxComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessageRoutingModule {}
