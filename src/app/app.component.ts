import { Component, OnInit } from '@angular/core';

import { Offers } from './Models/Offer';
import { OfferserviceService } from './Services/offerservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  mltime: string="9.00 A.M";
  mhtime: string="9.00 A.M";
  eltime: string="3.00 P.M";
  ehtime: string="3.00 P.M";
  offerVa: string="20";

  mlnewtime!: string;
  mhnewtime!: string;
  elnewtime!: string;
  ehnewtime!: string;
  offerValue!: string;
  responseData: any;

  time1: any;
  time2: any;
  time3: any;
  time4: any;
  offer: any;

  res: any;
  timeArray: { [key: string]: any; id: number }[] = [];

  constructor(private _offerservice: OfferserviceService) {}
  refreshPage(): void {
    location.reload();
  }

  ngOnInit(): void {
    this.showVariable();
  }
  updateVariable() {
    this.mltime = this.mlnewtime !== undefined ? this.mlnewtime : this.mltime;
    this.mhtime = this.mhnewtime !== undefined ? this.mhnewtime : this.mhtime;
    this.eltime = this.elnewtime !== undefined ? this.elnewtime : this.eltime;
    this.ehtime = this.ehnewtime !== undefined ? this.ehnewtime : this.ehtime;
    this.offerVa = this.offerValue !== undefined ? this.offerValue : this.offerVa;

    // Store values in the array
    this.timeArray.push({ id: 1, mltime: this.mltime });
    this.timeArray.push({ id: 2, mhtime: this.mhtime });
    this.timeArray.push({ id: 3, eltime: this.eltime });
    this.timeArray.push({ id: 4, ehtime: this.ehtime });
    this.timeArray.push({ id: 5, offerVa: this.offerVa });

    this._offerservice.GetUpdates(this.timeArray).subscribe({
      next: (val: any) => {
        location.reload();
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

  showVariable() {
    this._offerservice.GetData().subscribe({
      next: (ress) => {
        console.log(ress);
        this.res = ress[ress.length - 1];

        const item1 = this.res.find((item: any) =>
          item.hasOwnProperty('mltime')
        );
        this.time1 = item1 && item1.mltime ? String(item1.mltime) : '';

        const item2 = this.res.find((item2: any) =>
          item2.hasOwnProperty('mhtime')
        );
        this.time2 = item2 ? String(item2.mhtime) : '';

        const item3 = this.res.find((item3: any) =>
          item3.hasOwnProperty('eltime')
        );
        this.time3 = item3 ? String(item3.eltime) : '';

        const item4 = this.res.find((item4: any) =>
          item4.hasOwnProperty('ehtime')
        );
        this.time4 = item4 ? String(item4.ehtime) : '';

        const item5 = this.res.find((item5: any) =>
          item5.hasOwnProperty('offerVa')
        );
        this.offer = item5 ? String(item5.offerVa) : '';
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

  title = 'Reactiveform5';
}
