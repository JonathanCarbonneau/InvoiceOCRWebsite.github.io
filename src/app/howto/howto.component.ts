import { Component, Input } from "@angular/core";

@Component ({
    templateUrl: "howto.component.html",
    styleUrls: ["../shared/card.css"]
})
export class HowtoComponent {
    title: string = "How To";
    progress: number = 0;
    width: string = "0%";
    private addition: number = 100;
    private loading: boolean = true;
    load():void {
        this.progress = 0; 
        for (let i : number = 0; i < 1000; i++){
            if (i%10 == 0) {
                //console.log(this.progress);
                this.progress ++; 
                this.width = this.progress + "%";
            }
        }
    }
}

