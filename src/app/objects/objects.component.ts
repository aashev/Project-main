import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Books } from './books';
import { Hobbies } from './hobbies';
import { Stationery } from './stationery';

@Injectable({
  providedIn: 'root'
})

export class ObjectsService 
{
   books: Books[] = [];
   booksObjects: BehaviorSubject<Books[]> = new BehaviorSubject<Books[]>([]);
  
   hobbies: Hobbies[] = [];
   hobbiesObjects: BehaviorSubject<Hobbies[]> = new BehaviorSubject<Hobbies[]>([]);
  
   stationery: Stationery[] = [];
   stationeryObjects: BehaviorSubject<Stationery[]> = new BehaviorSubject<Stationery[]>([]);

  constructor() { }

  addBooksObject(obj: Books): void 
  {
    this.books.push(obj);
    this.booksObjects.next(this.books);
  }
  getBooksObjects(): Observable<Books[]> 
  {
    return this.booksObjects.asObservable();
  }
  deleteBooksObject(id: number): void {
    const index = this.books.findIndex(task => task.id === id);
    if (index !== -1) {
      this.books.splice(index, 1);
    }
  }
  
  addHobbiesObject(obj: Hobbies): void 
  {
    this.hobbies.push(obj);
    this.hobbiesObjects.next(this.hobbies);
  }
  getHobbiesObjects(): Observable<Hobbies[]> 
  {
    return this.hobbiesObjects.asObservable();
  }
  deleteHobbiesObject(id: number): void {
    const index = this.hobbies.findIndex(task => task.id === id);
    if (index !== -1) {
      this.hobbies.splice(index, 1);
    }
  }

  addStationeryObject(obj: Stationery): void 
  {
    this.stationery.push(obj);
    this.stationeryObjects.next(this.stationery);
  }
  getStationeryObjects(): Observable<Stationery[]> 
  {
    return this.stationeryObjects.asObservable();
  }
  deleteStationeryObject(id: number): void {
    const index = this.stationery.findIndex(task => task.id === id);
    if (index !== -1) {
      this.stationery.splice(index, 1);
    }
  }
}