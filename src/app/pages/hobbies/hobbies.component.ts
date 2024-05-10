import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hobbies } from '../../objects/hobbies';
import { ObjectsService } from '../../objects/objects.component';

@Component({
  selector: 'app-hobbies',
  templateUrl: './hobbies.component.html',
  styleUrl: '../../app.component.css'
})

export class HobbiesComponent implements OnInit {
  taskForm!: FormGroup;
  hobbiesList: Hobbies[] = [];
  n: number = 0;
  edit_n: number = -1;
  typeOptions: string[] = ['Рукоделие', 'Лепка', 'Роспись', 'Картины по номерам', 'Рисование', 'Мыловарение, свечи'];
  constructor(private formBuilder: FormBuilder, private taskService: ObjectsService) { }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      type: ['', Validators.required],
      amount: ['', Validators.required],
      brand: ['', Validators.required],
      color: ['', Validators.required],
      price: ['', [Validators.required]],
      comment: [''],
    });
    this.taskService.getHobbiesObjects().subscribe((tasks: Hobbies[]) => {
      this.hobbiesList = tasks;
    });
    this.loadTasks();
  }
  onSubmit(): void {
    if (this.taskForm.valid) {
      if (this.edit_n === -1) {
        const newTask: Hobbies =
        {
          id: this.n,
          orderDate: new Date(),
          ...this.taskForm.value
        };
        this.taskService.addHobbiesObject(newTask);
        this.taskForm.reset();
        this.n += 1
      }
      else {
        this.hobbiesList[this.edit_n].type = this.taskForm.value.type;
        this.hobbiesList[this.edit_n].amount = this.taskForm.value.amount;
        this.hobbiesList[this.edit_n].brand = this.taskForm.value.brand;
        this.hobbiesList[this.edit_n].color = this.taskForm.value.color;
        this.hobbiesList[this.edit_n].comment = this.taskForm.value.comment;
        this.hobbiesList[this.edit_n].price = this.taskForm.value.price;
        this.taskForm.reset();
        this.edit_n = -1;
      }
    }
  }
  loadTasks(): void {
    this.taskService.getHobbiesObjects().subscribe(tasks => {
      this.hobbiesList = tasks;
    });
  }
  deleteTask(id: number): void {
    this.taskService.deleteHobbiesObject(id);
  }
  editTask(id: number): void {
    const index = this.hobbiesList.findIndex(task => task.id === id);
    const taskToEdit = this.hobbiesList[index];
    this.edit_n = index;
    this.taskForm.patchValue({
      genre: taskToEdit.type,
      amount: taskToEdit.amount,
      name: taskToEdit.brand,
      author: taskToEdit.color,
      comment: taskToEdit.comment,
      price: taskToEdit.price
    });
  }
}