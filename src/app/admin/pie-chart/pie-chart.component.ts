import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { AdminService } from 'src/app/admin.service';


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})

export class PieChartComponent implements OnInit {
  courseName: Array<string> = [];
  enrollments = [];
  chooseCategory!: FormGroup
  selectedCategory: any;
  categories: any;
  courses: any;
  coursesByCat: any;
  coursesByCatCount: any;
  catName: any;
  all: any;
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels!: Label[];
  public pieChartData!: SingleDataSet;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  courseState: Array<any> = [];
  constructor(private as: AdminService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend(); 
  }
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
    this.enrollments = this.courses.map((data: { enrollments: any; }) => data.enrollments);
    
    this.pieChartLabels = this.courseName;
    this.pieChartData = this.enrollments;
  }

  getCoursesByCat(event: Event) {
    this.selectedCategory = (<HTMLSelectElement>event.target).value;
    if (this.selectedCategory == 'all') {
      this.getGraph();
    }
    else {
      this.coursesByCat = this.courses.filter((x: any) => { return x.category == this.selectedCategory });
      
      this.courseName = this.coursesByCat.map((data: { courseName: any; }) => data.courseName);
      this.enrollments = this.coursesByCat.map((data: { enrollments: any; }) => data.enrollments);
      
      this.pieChartLabels = this.courseName;
      this.pieChartData =  this.enrollments;

    }
  }


}
