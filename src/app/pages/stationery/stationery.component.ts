import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Stationery } from '../../objects/stationery';
import { ObjectsService } from '../../objects/objects.component';

@Component({
  selector: 'app-hobbies',
  templateUrl: './stationery.component.html',
  styleUrl: '../../app.component.css'
})
export class StationeryComponent implements OnInit {
  taskForm!: FormGroup;
  stationeryList: Stationery[] = [];
  n: number = 0;
  edit_n: number = -1;

  constructor(private formBuilder: FormBuilder, private taskService: ObjectsService) { }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      type: ['', Validators.required],
      amount: ['', Validators.required],
      brand: ['', Validators.required],
      color: ['', Validators.required],
      isForChildren: ['', Validators.required],
      comment: [''],
      price: ['', [Validators.required]]
    });
    this.taskService.getHobbiesObjects().subscribe((tasks: Stationery[]) => {
      this.stationeryList = tasks;
    });
    this.loadTasks();

  }
  onSubmit(): void {
    if (this.taskForm.valid) {
      if (this.edit_n === -1) {
        const newTask: Stationery =
        {
          id:this.n,
          orderDate: new Date(),
          ...this.taskForm.value
        };
        this.taskService.addStationeryObject(newTask);
        this.taskForm.reset();
        this.n += 1
      }
      else {
        // console.log(this.edit_n)
        this.stationeryList[this.edit_n].type = this.taskForm.value.type;
        this.stationeryList[this.edit_n].amount = this.taskForm.value.amount;
        this.stationeryList[this.edit_n].brand = this.taskForm.value.brand;
        this.stationeryList[this.edit_n].color = this.taskForm.value.color;
        this.stationeryList[this.edit_n].comment = this.taskForm.value.comment;
        this.stationeryList[this.edit_n].price = this.taskForm.value.price;
        this.taskForm.reset();
        this.edit_n = -1;
      }
    }
  }
  loadTasks(): void {
    this.taskService.getStationeryObjects().subscribe(tasks => {
      this.stationeryList = tasks;
    });
  }
  deleteTask(id: number): void {
    this.taskService.deleteStationeryObject(id);
  }
  editTask(id: number): void {
    console.log(id)
    const index = this.stationeryList.findIndex(task => task.id === id);
    const taskToEdit = this.stationeryList[index];
    this.edit_n = index;
    console.log(this.edit_n)
    this.taskForm.patchValue({
      product: taskToEdit.type,
      amount: taskToEdit.amount,
      brand: taskToEdit.brand,
      color: taskToEdit.color,
      comment: taskToEdit.comment,
      price: taskToEdit.price
    });
  }
}
