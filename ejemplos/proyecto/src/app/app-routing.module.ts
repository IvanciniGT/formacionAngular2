import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './components/app/app.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { ComponenteA } from './components/componente-a/a.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'listado', component: UserlistComponent },
  // Lazy load de un componente.
  // Ese componente no se cargará hasta que no lo necesite
  { path: 'componenteA', loadChildren: () => import('../app/app.module').then(m => m.AppModule) },
];

//   administracion

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


