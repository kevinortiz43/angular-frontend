import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  monsterForm!: FormGroup;
  actionBtn: string = 'Save';
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.monsterForm = this.formBuilder.group({
      creature: ['', Validators.required],
      challenge: ['', Validators.required],
      classification: ['', Validators.required],
      size: ['', Validators.required],
      armor: ['', Validators.required],
      health: ['', Validators.required],
      alignment: ['', Validators.required],
      legendary: ['', Validators.required],
      portrait: [
        'https://pbs.twimg.com/profile_images/1082330444845277187/eRmykg4g_400x400.jpg',
        Validators.required,
      ],
    });
    if (this.editData) {
      this.actionBtn = 'Update';
      this.monsterForm.controls['creature'].setValue(this.editData.creature);
      this.monsterForm.controls['challenge'].setValue(this.editData.challenge);
      this.monsterForm.controls['classification'].setValue(
        this.editData.classification
      );
      this.monsterForm.controls['size'].setValue(this.editData.size);
      this.monsterForm.controls['armor'].setValue(this.editData.armor);
      this.monsterForm.controls['health'].setValue(this.editData.health);
      this.monsterForm.controls['alignment'].setValue(this.editData.alignment);
      this.monsterForm.controls['legendary'].setValue(this.editData.legendary);
      this.monsterForm.controls['portrait'].setValue(this.editData.portrait);
    }
  }
  newMonster() {
    if (!this.editData) {
      if (this.monsterForm.valid) {
        this.api.addMonster(this.monsterForm.value).subscribe({
          next: (response) => {
            alert("Added")
            this.monsterForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert('Error');
          },
        });
      }
    } else {
      this.updateMonster();
    }
  }
  updateMonster() {
    this.api.editMonster(this.monsterForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert("updated")
        this.monsterForm.reset();
        this.dialogRef.close('updated');
      },
    });
  }
}
