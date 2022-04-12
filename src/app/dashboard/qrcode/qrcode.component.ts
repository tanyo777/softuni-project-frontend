import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { userSelector } from 'src/app/+store/selectors/user';
import { IUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})
export class QrcodeComponent implements OnInit {


  qrCode!: string;

  loading!: boolean;

  constructor(private store: Store, private userService: UserService) { }

  ngOnInit(): void {
    
    this.loading = true;


    this.userService.getUser().subscribe({
      next: (user: any) => {
        const otpauth_url = user.user.otpauth_url;
        this.userService.getProfileQrcode(otpauth_url).subscribe({
          next: (qrcode: any) => {
            this.qrCode = qrcode.qrcode;
            this.loading = false;
          }
        })
      }
    })

   
  }

}
