import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UIComponent } from './components/ui/ui.component';

const routes: Routes = [  {path: '', component: UIComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
