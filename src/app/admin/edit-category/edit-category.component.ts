import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/admin.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertmodelComponent } from 'src/app/usermodule/alertmodel/alertmodel.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  id: any
  categories: any
  categoryById: any
  editCategoryForm!: FormGroup;
  uploadForm: any;
  path: any;
  oldLogo: any
  url!: string | ArrayBuffer | null;
  constructor(private route: ActivatedRoute, private as: AdminService, private router: Router, public dialog: MatDialog) { }
  ngOnInit(): void {
    //Get ID from View-Category
    this.id = atob(this.route.snapshot.params['id'])
    //Get Categories by ID
    this.as.getCategoriesById(this.id).subscribe((data) => {
      this.categoryById = data;
      this.editCategoryForm = new FormGroup({
        categoryId: new FormControl(this.categoryById.categoryId),
        categoryName: new FormControl(this.categoryById.categoryName, [Validators.required, Validators.minLength(5)]),
        categoryDesc: new FormControl(this.categoryById.categoryDesc, [Validators.required, Validators.minLength(10)]),
        oldcategoryLogo: new FormControl({ value: this.categoryById.categoryLogo, disabled: true }),
        categoryLogo: new FormControl('')
      })
      this.oldLogo = this.categoryById.categoryLogo
    },
      error => {
        this.dialog.open(AlertmodelComponent, {
          data: { value: error }
        });
      }
    );
  }
  //Function for updating category
  updateCategory() {
    //remove fakepath from image url
    //ASSUMPTION: SELECT IMAGE FROM ASSETS ONLY!
    if (this.editCategoryForm.value.categoryLogo === "") {
      this.path = this.oldLogo
    }
    else {
      this.path = this.editCategoryForm.value.categoryLogo
      this.path = this.path.replace(/^.*\\/, "")
    }
    this.as.editCategory(this.editCategoryForm.value.categoryName, this.editCategoryForm.value.categoryDesc, this.path, this.editCategoryForm.value.categoryId).subscribe((data) => {
      this.as.getCategories()
        .subscribe((data) => {
          this.categories = data;
          this.dialog.open(AlertmodelComponent, {
            data: { value: "Successfully Updated Category" }
          });
          this.router.navigate(['/categories'])
        },
          error => {
            this.dialog.open(AlertmodelComponent, {
              data: { value: error }
            });
          }
        );
    })
  }
  //Function to set image preview
  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  

}