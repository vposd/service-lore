import { Component, OnInit } from '@angular/core';

import { Promotion } from '@contracts/master-data/entities/loretion.class';

import {
  MasterDataConfig,
  MasterDataSource
} from '../../master-data/config/master-data-config.service';

@Component({
  selector: 'app-promotions-grid',
  templateUrl: './loretions-grid.component.html',
  styleUrls: ['./loretions-grid.component.scss']
})
export class PromotionsGridComponent implements OnInit {
  sourceParams: MasterDataSource<Promotion>;

  constructor(private readonly masterDataConfig: MasterDataConfig) {}

  ngOnInit() {
    this.sourceParams = this.masterDataConfig.getSource('promotions');
  }
}
