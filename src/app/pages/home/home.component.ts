import { Component, OnInit } from '@angular/core';
import { ObjectsService } from '../../objects/objects.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Books } from '../../objects/books';
import { Hobbies } from '../../objects/hobbies';
import { Stationery } from '../../objects/stationery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: '../../app.component.css'
})
export class HomeComponent {
  title = 'home';
  taskForm!: FormGroup;

  name = "";
  cellNumber = "";
  booksList!: Books[];
  hobbiesList!: Hobbies[];
  stationeryList!: Stationery[];

  sum = 0;
  constructor(private taskService: ObjectsService) { }

  loadTasks(): void {
    this.taskService.getBooksObjects().subscribe(tasks => {
      this.booksList = tasks;
    });
    this.taskService.getHobbiesObjects().subscribe(tasks => {
      this.hobbiesList = tasks;
    });
    this.taskService.getStationeryObjects().subscribe(tasks => {
      this.stationeryList = tasks;
    });
    this.sum = [
      ...this.booksList.map(item => item.price * item.amount),
      ...this.hobbiesList.map(item => item.price * item.amount),
      ...this.stationeryList.map(item => item.price)
    ].reduce((acc, curr) => acc + curr, 0);
  }
  delete(id: number, type: number): void {
    if (type == 0) {
      const index = this.booksList.findIndex(task => task.id === id);
      this.sum -= this.booksList[index].price * this.booksList[index].amount;
      this.taskService.deleteBooksObject(id);
    }
    else if (type == 1) {
      const index = this.hobbiesList.findIndex(task => task.id === id);
      this.sum -= this.hobbiesList[index].price * this.hobbiesList[index].amount;
      this.taskService.deleteHobbiesObject(id);
    }
    else {
      const index = this.stationeryList.findIndex(task => task.id === id);
      this.sum -= this.stationeryList[index].price;
      this.taskService.deleteStationeryObject(id)
    }
  }
  ngOnInit(): void {
    this.loadTasks();
  }

  logIn(): void {
    alert(this.name + ", Вы вошли на сайт");
    this.ngOnInit();
    console.log('User ' + this.name + ' ' + this.cellNumber + ' logged in');
  }
}