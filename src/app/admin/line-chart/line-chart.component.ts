import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { AdminService } from 'src/app/admin.service';


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})

export class LineChartComponent implements OnInit {

  courseName: Array<string> = [];
  avgrating = [];
  chooseCategory!: FormGroup;
  categories: any;
  courses: any;
  selectedCategory: any;
  coursesByCat: any;


  lineChartData!: ChartDataSets[];

  lineChartLabels!: Label[];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType: ChartType = 'line';
  courseState: Array<any> = [];
  constructor(private as: AdminService) { }
  ngOnInit() {
    this.chooseCategory = new FormGroup({
      categoryName: new FormControl()
    })

    this.as.getCategories()
      .subscribe((data: any) => {
        this.categories = data;
      },
        (err: any) => {
        });

    this.as.getCourseState()
      .subscribe((data: any) => {
        this.courses = data;
        if (this.courses.length != 0)
        this.getGraph();
      },
        (err: any) => {
        });
  }

  getGraph() {
    this.courseName = this.courses.map((data: { courseName: any; }) => data.courseName);
    this.avgrating = this.courses.map((data: { avgrating: any; }) => data.avgrating);
    console.log(this.avgrating);
    
    this.lineChartLabels = this.courseName;
    this.lineChartData = [{ data: this.avgrating, label: ' Ratings' }];
  }

  getCoursesByCat(event: Event) {
    this.selectedCategory = (<HTMLSelectElement>event.target).value;
    if (this.selectedCategory == 'all') {
      this.getGraph();
    }
    else {
    this.coursesByCat = this.courses.filter((x: any) => { return x.category == this.selectedCategory });
    this.courseName = this.coursesByCat.map((data: { courseName: any; }) => data.courseName);
    this.avgrating = this.coursesByCat.map((data: { avgrating: any; }) => data.avgrating);
    this.lineChartLabels = this.courseName;
    this.lineChartData = [{ data: this.avgrating, label: 'Ratings' }];
    }
  }

}