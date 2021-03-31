import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  categoryForm!: FormGroup;
  path!: any
  url: any
  constructor(private as:AdminService,private router:Router) { }

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      categoryName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      categoryDesc: new FormControl('', [Validators.required, Validators.minLength(10)]),
      categoryLogo: new FormControl('', [Validators.required]),
    })
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }


  addCategory() {
    //remove fakepath from image url
    //ASSUMPTION: SELECT IMAGE FROM ASSETS ONLY!
    this.path = this.categoryForm.value.categoryLogo
    this.categoryForm.value.categoryLogo = this.path.replace(/^.*\\/, "")
    this.as.addCategory(this.categoryForm.value.categoryName, this.categoryForm.value.categoryDesc, this.categoryForm.value.categoryLogo).subscribe((data) => {
      this.router.navigate(['/categories'])

    })
  }

}
