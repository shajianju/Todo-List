import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashborad',
  templateUrl: './dashborad.component.html',
  styleUrls: ['./dashborad.component.css'],
})
export class DashboradComponent implements OnInit {
  constructor(private crudService: CrudService) {}

  taskObj: Task = new Task();
  taskArr: Task[] = [];

  addTaskValue: string = '';
  editTaskValue: string = '';

  ngOnInit(): void {
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
  }
  addTask() {
    this.taskObj.task_name = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe({
      next: (res) => {
        this.ngOnInit();
        this.addTaskValue = '';
      },
      error: (error) => {
        alert('Failed to add task');
      },
    });
  }

  getAllTask() {
    this.crudService.getAllTask().subscribe({
      next: (res) => {
        this.taskArr = res;
      },
      error: (error) => {
        alert('Unable to get the list');
      },
    });
  }

  editTask() {
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe({
      next: (res) => {
        console.log(res);
        this.ngOnInit();
      },
      error: (error) => {
        console.log(error);
        alert('Falied to edit task ');
      },
    });
  }
  deleteTask(dTask: Task) {
    this.crudService.deleteTask(dTask).subscribe({
      next: (res) => {
        this.ngOnInit();
      },
      error: (error) => {
        alert('Failed to delete the task');
      },
    });
  }
}
