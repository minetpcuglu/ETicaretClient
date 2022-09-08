import { MatDialogRef } from "@angular/material/dialog";

export class BaseDialog<DialogComponent> {  //generic yapıyoruz
    constructor(public dialogRef:MatDialogRef<DialogComponent>){
    }
    close(){
        this.dialogRef.close();
    }
}
