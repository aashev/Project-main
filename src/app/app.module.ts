import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BooksComponent } from './pages/books/books.component';
import { HobbiesComponent } from './pages/hobbies/hobbies.component';
import { StationeryComponent } from './pages/stationery/stationery.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: "books", component: BooksComponent},
  { path: "hobbies", component: HobbiesComponent},
  { path: "stationery", component: StationeryComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BooksComponent,
    HobbiesComponent,
    StationeryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }