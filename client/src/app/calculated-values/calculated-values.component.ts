import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculated-values',
  templateUrl: './calculated-values.component.html',
  styleUrls: ['./calculated-values.component.css']
})
export class CalculatedValuesComponent implements OnInit {
  @Input() index: number;
  @Input() value: number;
  constructor() { }

  ngOnInit(): void {
  	let test = 'true';
  }

}
