import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, map} from 'rxjs/operators';


export interface CalculatedValue {
  index: number;
  value: number;
}

export interface Indexes {
  number: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public calculatedValues$: BehaviorSubject<CalculatedValue[]> = new BehaviorSubject<CalculatedValue[]>([
    {index: 7, value: 21},
    {index: 10, value: 89},
    {index: 5, value: 8}
  ]);
  public indexes$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([7, 10, 5]);

  constructor(private http: HttpClient) {
  }


  fetchValues(): void {
    this.http.get<CalculatedValue[]>('api/values/current')
      .pipe(
        map( (values) => {
          return Object.keys(values).map((key) => {
            return {
              index: parseInt(key),
              value: parseInt(values[key])
            }
          });
        }),
        tap(values => this.calculatedValues$.next(values))
      )
      .subscribe();
  }

  fetchIndexes(): void {
    this.http.get<Indexes[]>('api/values/all')
      .pipe(
        map(values => {
          return values.map(elem => elem.number);
        }),
        tap(values => this.indexes$.next(values))
      )
      .subscribe();
  }

  calculateIndex(index: number): Observable<any> {
    return this.http.post<any>('/api/values', {
      index
    })
      .pipe(tap(() => {
        this.fetchIndexes();
        this.fetchValues();
      }));
  }
}
