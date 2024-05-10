import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Books } from '../../objects/books';
import { ObjectsService } from '../../objects/objects.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: '../../app.component.css'
  // styleUrl: './care.component.css'
})

export class BooksComponent implements OnInit {
  taskForm!: FormGroup;
  booksList: Books[] = [];
  n: number = 0;
  edit_n: number = -1;
  genreOptions: string[] = ['Художественная литература', 'Комиксы', 'Филология', 'Детские книги', 'Образование', 'Психология'];
  constructor(private formBuilder: FormBuilder, private taskService: ObjectsService) { }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      genre: ['', Validators.required],
      amount: ['', Validators.required],
      name: ['', Validators.required],
      author: ['', Validators.required],
      year: ['', Validators.required],
      publishingHouse: ['', Validators.required],
      price: ['', [Validators.required]],
      comment: [''],
    });
    this.taskService.getBooksObjects().subscribe((tasks: Books[]) => {
      this.booksList = tasks;
    });
    this.loadTasks();
  }
  onSubmit(): void {
    if (this.taskForm.valid) {
      if (this.edit_n === -1) {
        const newTask: Books =
        {
          id: this.n,
          orderDate: new Date(),
          ...this.taskForm.value
        };
        this.taskService.addBooksObject(newTask);
        this.taskForm.reset();
        this.n += 1
      }
      else {
        this.booksList[this.edit_n].genre = this.taskForm.value.genre;
        this.booksList[this.edit_n].amount = this.taskForm.value.amount;
        this.booksList[this.edit_n].name = this.taskForm.value.name;
        this.booksList[this.edit_n].author = this.taskForm.value.author;
        this.booksList[this.edit_n].year = this.taskForm.value.year;
        this.booksList[this.edit_n].publishingHouse = this.taskForm.value.publishingHouse;
        this.booksList[this.edit_n].comment = this.taskForm.value.comment;
        this.booksList[this.edit_n].price = this.taskForm.value.price;
        this.taskForm.reset();
        this.edit_n = -1;
      }
    }
  }
  loadTasks(): void {
    this.taskService.getBooksObjects().subscribe(tasks => {
      this.booksList = tasks;
    });
  }
  deleteTask(id: number): void {
    this.taskService.deleteBooksObject(id);
  }
  editTask(id: number): void {
    const index = this.booksList.findIndex(task => task.id === id);
    const taskToEdit = this.booksList[index];
    this.edit_n = index;
    this.taskForm.patchValue({
      genre: taskToEdit.genre,
      amount: taskToEdit.amount,
      name: taskToEdit.name,
      author: taskToEdit.author,
      year: taskToEdit.year,
      publishingHouse: taskToEdit.publishingHouse,
      comment: taskToEdit.comment,
      price: taskToEdit.price
    });
  }
}