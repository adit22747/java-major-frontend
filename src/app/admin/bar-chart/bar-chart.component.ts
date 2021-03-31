import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/admin.service';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})

export class BarChartComponent implements OnInit {

  data:any= [];
  courseName: Array<string> = [];
  likes :Array<any> = [];
  chooseCategory!: FormGroup
  selectedCategory: any;
  categories: any;
  courses: Array<any> = [];
  coursesByCat: any;
  coursesByCatCount: any;
  catName: any;
  all: any;

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels!: Label[] ;
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData!: ChartDataSets[] ;
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
    this.likes = this.courses.map((data: { likes: any; }) => data.likes);
    this.barChartLabels = this.courseName;
    this.barChartData = [{ data: this.likes, label: ' Likes' }];
  }


  getCoursesByCat(event: Event) {

    this.selectedCategory = (<HTMLSelectElement>event.target).value;
    if (this.selectedCategory == 'all') {
      this.getGraph();
    }
    else {

      this.coursesByCat = this.courses.filter((x: any) => { return x.category == this.selectedCategory });
     
      this.courseName = this.coursesByCat.map((data: { courseName: any; }) => data.courseName);
      this.likes = this.coursesByCat.map((data: { likes: any; }) => data.likes);


      this.barChartLabels = this.courseName;
      this.barChartData = [{ data: this.likes, label: 'Likes' }];
    }
  }
}