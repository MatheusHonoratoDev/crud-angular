import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogDetailsComponent } from 'src/app/shared/components/dialog-details/dialog-details.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  cardDataList: any[] = [];
  filter: FormGroup;
  categorys: any;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public coursesService: CoursesService
  ) {
    this.filter = this.setInitialForm();
  }

  ngOnInit(): void {
    this.getAll();

    this.coursesService.getCategorias().subscribe((data) => {
      this.categorys = data;
    });
  }

  setInitialForm() {
    return this.formBuilder.group({
      name: [''],
      type: [''],
    });
  }

  openDialog(cardData?: any): void {
    const dialogRef = this.dialog.open(DialogDetailsComponent, {
      width: '500px',
      height: '300px',
      data: {
        value: cardData,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  getAll() {
    this.coursesService.list().subscribe((data) => {
      this.cardDataList = data;
    });
  }

  submite() {
    const values = this.filter.value;

    this.coursesService.filterByCategory(values).subscribe((data) => {
      this.cardDataList = data;
    });
  }

  clean() {
    this.filter = this.setInitialForm();
    this.getAll();
  }
}
