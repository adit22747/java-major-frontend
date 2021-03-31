import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin.service';
import { AuthenticateService } from 'src/app/authenticate.service';
import { UserService } from 'src/app/user.service';
import { AlertmodelComponent } from '../alertmodel/alertmodel.component';
import { VerifyComponent } from '../verify/verify.component';


@Component({
  selector: 'app-createprofile',
  templateUrl: './createprofile.component.html',
  styleUrls: ['./createprofile.component.scss']
})
export class CreateprofileComponent implements OnInit {
  username: any;
  activated: any;
  title = 'ImageUploaderFrontEnd';
  isActivated: any
  isProfileCreated: any
  Profile
  public selectedFile;
  public event1;
  imgURL: any;
  receivedImageData: any;
  base64Data: any;
  convertedImage: any;
  occupations: Array<any> = ["Accountant ", "Actor", "Architect", "Astronomer ", "Author ", "Banker ", " Botanist", "Business person ", "Cardiologist", "Cook ", "Chemist", "Civil Engineer", "Computer Engineer", "Counseller", "Dentist", "Dancer", "Detective", "Disc Jockey", "Electrical Engineer", "Economist", "Ethical hacker", "Event Manager", "Fashion Designer", "Fitness Trainer", "Food Critic", "Geologist", "Gynecologist", "Human Resource Manager", "Image Consultant", "Insurance Agent", "Investment Manager", "Interior Designer", "Jounalist", "Judge", "Librarian", "Lawyer", "Makeup Artist", "Mechanical Engineer", "Musician", "Mathematician", "Neurologist", "Nurse", "Naturotherapist", "Nutritionist", "Orthodontist", "Painter", "Pediatrician", "Pathologist", "Photographer", "Physician", "Police", "QA Manager", "Radio Jockey", "Rubber Technician", "Radiologist", "Social Worker", "Statistician", "Surgeon","Student", "Teacher", "Technician", "Textile Engineer", "Tour Operator", "Video Jockey", "Web Designer", "Web Developer", "Yoga Trainer", "Zoologist"];
  occBySearch: any[];
  changePWd
  notmatch

  profileForm = new FormGroup({
    fullName: new FormControl("", [Validators.required, Validators.minLength(3)]),
    birthdate: new FormControl("", [Validators.required]),
    gender: new FormControl("", [Validators.required]),
    searchOccupation: new FormControl("", [Validators.required]),
    contact: new FormControl("", [Validators.required, Validators.pattern("[789][0-9]{9}")])
    // userImage: new FormControl(null),
  })

  

  constructor(private uservice: UserService, public dialog: MatDialog, private router : Router,private aservice:AdminService,private as:AuthenticateService) {
    this.username = sessionStorage.getItem("username")
    this.uservice.isActivated(sessionStorage.getItem("userId")).subscribe((x) => {
      this.activated = x
    })
    this.uservice.isProfileCreated(sessionStorage.getItem("userId")).subscribe((x) => {
      this.isProfileCreated = x
    })
  }


  ngOnInit(): void {
    this.uservice.isActivated(sessionStorage.getItem("userId")).subscribe((x) => {
      this.isActivated = x
    })
    this.uservice.isProfileCreated(sessionStorage.getItem("userId")).subscribe((x) => {
      this.isProfileCreated = x

      if (this.isProfileCreated == true) {
        this.uservice.getprofiledetails(sessionStorage.getItem('userId')).subscribe((x) => {
          this.Profile = x

          this.profileForm.patchValue(
            {
              fullName: this.Profile.fullName,
              birthdate: this.Profile.birthdate,
              gender: this.Profile.gender,
              searchOccupation:  this.Profile.searchOccupation,
              contact:  this.Profile.contact

            }
          );

        })
      }
    })
  }

  public onFileChanged(event) {

    this.selectedFile = event.target.files[0];
    this.selectedFile.name = this.selectedFile.name.replace(/^.*\\/, "../../../assets/")

    // Below part is used to display the selected image
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
      this.imgURL = this.imgURL.replace(/^.*\\/, "../../../assets/")

    };

  }
  createProfile() {
    const uploadData = new FormData();

    // uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
    // this.profileForm.value.userImage = this.profileForm.value.userImage.replace(/^.*\\/, "")
    this.uservice.createProfile(this.profileForm.value, sessionStorage.getItem("userId"), uploadData).subscribe((x) => {
      res => {
        this.receivedImageData = res;
        this.base64Data = this.receivedImageData.pic;
        this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data;
      }
    })
    this.dialog.open(AlertmodelComponent,{
      data: {value:"Profile updated successfully"}
    });
    this.router.navigate(['/user'])

  }

  updateProfile() {
    const uploadData = new FormData();
    this.uservice.createProfile(this.profileForm.value, sessionStorage.getItem("userId"), uploadData).subscribe((x) => {
      res => {
     
        this.receivedImageData = res;
        this.base64Data = this.receivedImageData.pic;
        this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data;
      }
    })
  }

  searchOccupation(e: Event) {
    let searchString = ((<HTMLSelectElement>e.target).value).toLowerCase();
   
    this.occBySearch = this.occupations.filter((occ: any) => occ.toLowerCase().includes(searchString));
   
  }

  sendotp(){
    this.dialog.open(VerifyComponent,{
      width: '800px',
    });
    this.uservice.sendregotp(sessionStorage.getItem('userId')).subscribe((x)=>{
      
      sessionStorage.setItem("otp",btoa(x))
    }
    )
  }

  changePwd(changePwdForm){
    if(changePwdForm.value.pwd===changePwdForm.value.npwd && changePwdForm.value.pwd!=""){
     this.uservice.changePassword(Number(sessionStorage.getItem('userId')),changePwdForm.value.pwd).subscribe((x)=>{
           this.as.logout()
           this.router.navigate(["/"])
     },
     (err)=>{
       
     })
    }
    else{
      this.notmatch=true
    }
    

  }



}