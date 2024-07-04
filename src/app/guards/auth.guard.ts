import { CanActivateFn, Router } from '@angular/router';
import { AdminService } from '../adminServices/admin.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AdminService)
  const router = inject(Router)

  if(authService.isLoggedin()){
    return true; 
  }else{
    alert('operation denied...Plese Login!!!')
    router.navigateByUrl("")
    return false;
  }
};
//admin service ivde venam..
//dependency inje venem
//2 um cls allallo
//so another methd
