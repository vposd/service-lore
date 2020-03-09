import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import {
  MasterDataConfig,
  MasterDataSource
} from './config/master-data-config.service';

@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html',
  styleUrls: ['./master-data.component.scss']
})
export class MasterDataComponent implements OnInit {
  dataSource$: Observable<MasterDataSource<any>>;

  constructor(
    private masterDataConfig: MasterDataConfig,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.dataSource$ = this.route.params.pipe(
      map(({ source }) => this.masterDataConfig.getSource(source))
    );
  }
}
