import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  public productForm !: FormGroup // reactive form angular
  actionBtn: string = "Save" // button render variable
  parseList!: string[] // sentences parsed => string 
  isSubmit!: boolean
  sentence_title!:string

  constructor(
    private _formBuilder: FormBuilder, private _apiService: ApiService) {

  }

  ngOnInit() {
    this.productForm = new FormGroup({}) // create a FromGroup
    this._apiService.getText().subscribe({
      next: (res) => {
        this.sentence_title = res.text
        this._createFromGroup(res)
      },
      error: err => alert(err)
    })

  }

  // CREATE DYNAMIC FORM
  private _createFromGroup = (resFromGetText: any) => {
    this.parseList = this.splitStr(resFromGetText.text)
    for (let item of this.parseList) {
      this.productForm.addControl(item, new FormControl(`what is ${item}`, [Validators.required]))
    }
  }

  splitStr(str: string) {
    let temp = str.replace(/,/g, '')
    temp = temp.replace(/[!,?,-]/g, ' ')
    let fields = temp.split(' ')
    return fields
  }

  actionSubmit = () => {
    this.productForm.valid ? alert(1) : alert(2)

    if (this.productForm.valid) {
      console.table(this.productForm.value)
    }
  }
}
