import { Component } from "@angular/core"
import { Router } from "@angular/router";
import { UserData } from './user-data';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as CryptoJS from "crypto-js";

@Component ({
    templateUrl: "login.component.html",
    styleUrls: ["../shared/card.css"]
})

export class LoginComponent {
    userModel = new UserData('')
    title: string = 'Enter Credentials';
    private _username: string = "";
    private _password: string = "";
    private username_hash: string = "";
    private password_hash: string = "";

    constructor(private router: Router){
    }
    

    authenticate(): void {
        console.log(this.userModel.primaryAddress);
        if (this.userModel.primaryAddress.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            this._username = "username";
            this._password = "password";
        }
        this.username_hash = CryptoJS.SHA256(this._username).toString(CryptoJS.enc.Hex);
        this.password_hash = CryptoJS.SHA256(this._password).toString(CryptoJS.enc.Hex);
        this.router.navigate(['/adminmenu',this.username_hash,this.password_hash]);
    }
}