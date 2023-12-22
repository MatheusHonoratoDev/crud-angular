import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { Observable, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { DialogDetailsComponent } from 'src/app/shared/components/dialog-details/dialog-details.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {

  cardDataList: any[] = []
    

  constructor(
     public dialog: MatDialog,
     public coursesService: CoursesService
    ) {
  }

  banana: any;

  openDialog(cardData?: any): void {
    console.log(cardData)
    const dialogRef = this.dialog.open(DialogDetailsComponent, {
      width: '500px',
      height: '300px',
      data: {
        value: cardData,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnInit(): void {
    this.coursesService.list().
    subscribe(data =>{
      this.cardDataList = data;

    })

  }
}
