import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminService } from '../adminServices/admin.service';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent  implements OnInit{
 adminProfile:string = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKLr1iECOyi54wARPGCKASsT-fXyDczY-8YkeA1g1Nkszd7oTQsmOglEE2uqtgqXqLONM&usqp=CAU"

 editAdminStatus:boolean=false

 adminDetails:any = {}
 @Output() onAdminChange = new EventEmitter()

 constructor(private adminAPI:AdminService){}

 ngOnInit(): void {
   this.adminAPI.getAdminDetailsAPI().subscribe((result:any)=>{
    this.adminDetails = result
    if(result.profile){
      this.adminProfile = result.profile
    }
   })
 }

 editAdminBtnClicked(){
  this.editAdminStatus = true
 }

 getFile(event:any){
  let uploadFile = event.target.files[0]
  //img to its url 
  let fr = new FileReader() //it gives url from event target
  fr.readAsDataURL(uploadFile)
  fr.onload=(event:any)=>{
    this.adminProfile = event.target.result
    this.adminDetails.profile = this.adminProfile //also inserted in adminDetails.profile
  }
 }

 cancel(){
  this.editAdminStatus = false
 }

 updateAdmin(){
  if(this.adminDetails.name && this.adminDetails.password){
    this.adminAPI.editAdminAPI(this.adminDetails).subscribe({
      next:(result:any)=>{
        this.editAdminStatus = false
        alert("Admin Details Updated successfully!!!")
        sessionStorage.setItem("admin",JSON.stringify(result))
        this.onAdminChange.emit(result.name)
      },
      error:(reason:any)=>{
        console.log(reason);
        alert("updation failed..Please try after some time!!!")
      }
    })
   }else{
    alert("please fill the form completely")
   }
  }
}
