import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiService, CalculatedValue } from '../api.service';
import { FormControl, FormGroup } from '@angular/forms';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  calculatedValues$: Observable<CalculatedValue[]>;
  indexes$: Observable<string>;
  form: FormGroup;
  private destroy$ = new Subject<boolean>();

  constructor(
    private apiService: ApiService,
  ) {
    this.calculatedValues$ = this.apiService.calculatedValues$;
    this.indexes$ = this.apiService.indexes$
      .pipe(
        map((values: number[]) => {
          return values.join(', ');
        })
      );
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      indexToCalculate: new FormControl('')
    });
    this.apiService.fetchIndexes();
    this.apiService.fetchValues();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.apiService.calculateIndex(this.form.get('indexToCalculate').value)
        .pipe(takeUntil(this.destroy$))
        .subscribe();
      this.form.reset();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
