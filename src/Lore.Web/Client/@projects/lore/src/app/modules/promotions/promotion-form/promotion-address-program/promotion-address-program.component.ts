import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input
} from '@angular/core';

import { FadeIn } from '@common/animations/fade-in-out.animation';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { tap, debounceTime, switchMap, pluck, startWith } from 'rxjs/operators';
import { isEmpty, flatMap } from 'lodash';
import { Observable, of, combineLatest } from 'rxjs';

import { Outlet } from '@contracts/master-data/entities/outlet.class';
import { RequestProgress } from '@common/utils/request-progress/request-progress.class';
import { Product } from '@contracts/master-data/entities/product.class';
import { Entity } from '@contracts/master-data/entity.class';
import { Classifier } from '@contracts/master-data/entities/classifier.class';
import { InformationService } from '@common/information/information.service';

import {
  MasterDataConfig,
  MasterDataSource
} from '../../../master-data/config/master-data-config.service';
import { QueryRequestBuilder } from '../../../master-data/master-data-service/query-request-builder.class';
import { MasterDataService } from '../../../master-data/master-data-service/master-data.service';
import { PropertyExpression } from '../../../master-data/master-data-service/filter-expression';
import { QueryResult } from '@contracts/master-data/query-result.class';

export class PromotionAddressProgram {
  constructor(
    readonly outlets: Outlet[],
    readonly products: Product[],
    readonly outletsClassifiers: Classifier[],
    readonly productsClassifiers: Classifier[]
  ) {}
}

@Component({
  selector: 'app-promotion-address-program',
  templateUrl: './loretion-address-program.component.html',
  styleUrls: ['./loretion-address-program.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [FadeIn]
})
export class PromotionAddressProgramComponent implements OnInit {
  form: FormGroup;
  outlets$: Observable<Outlet[]>;
  products$: Observable<Product[]>;
  outletsRequestProgress = new RequestProgress();
  productsRequestProgress = new RequestProgress();

  @Input()
  set clientId(clientId: string) {
    this.clientIdControl.setValue(clientId);
  }

  @Output() selected = new EventEmitter<PromotionAddressProgram>();

  private get clientIdControl() {
    return this.form.get('clientId');
  }

  private get outletsClassifiersControl() {
    return this.form.get('outletsClassifiers');
  }

  private get productsClassifiersControl() {
    return this.form.get('productsClassifiers');
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly masterDataConfig: MasterDataConfig,
    private readonly information: InformationService,
    private readonly masterData: MasterDataService
  ) {
    this.form = this.formBuilder.group({
      clientId: new FormControl(''),
      outletsClassifiers: new FormControl([], Validators.required),
      productsClassifiers: new FormControl([], Validators.required)
    });
  }

  ngOnInit() {
    this.productsClassifiersControl.disable();

    this.outlets$ = combineLatest([
      this.clientIdControl.valueChanges.pipe(startWith('')),
      this.outletsClassifiersControl.valueChanges
    ]).pipe(
      tap(([_, classifiers]) => {
        if (isEmpty(classifiers)) {
          return this.disableProducts();
        }
        this.productsClassifiersControl.enable({ emitEvent: false });
      }),
      debounceTime(500),
      switchMap(([_, classifiers]) => {
        this.outletsRequestProgress.start();
        return this.retrieveData(classifiers, 'outlets');
      }),
      tap(
        (result: QueryResult<Outlet>) => {
          const empty = result.count === 0;
          this.outletsRequestProgress.stop(empty);

          if (empty) {
            this.disableProducts();
          }
        },
        error => {
          this.information.error(RequestProgress.formatError(error));
          this.outletsRequestProgress.error(error);
        }
      ),
      pluck('results')
    );

    this.products$ = this.productsClassifiersControl.valueChanges.pipe(
      debounceTime(500),
      switchMap((classifiers: Classifier[]) => {
        this.productsRequestProgress.start();
        return this.retrieveData(classifiers, 'products');
      }),
      tap(
        (result: QueryResult<Product>) => {
          const empty = result.count === 0;
          this.productsRequestProgress.stop(empty);
        },
        error => {
          this.information.error(RequestProgress.formatError(error));
          this.productsRequestProgress.error(error);
        }
      ),
      pluck('results')
    );

    combineLatest([
      this.outlets$,
      this.products$
    ]).subscribe(([outlets, products]) =>
      this.selected.emit(
        new PromotionAddressProgram(
          outlets,
          products,
          this.form.value.outletsClassifiers,
          this.form.value.productsClassifiers
        )
      )
    );
  }

  private disableProducts() {
    this.productsClassifiersControl.setValue([], { emitEvent: false });
    this.productsClassifiersControl.disable({ emitEvent: false });
  }

  private retrieveData<T extends Entity>(
    classifiers: Classifier[],
    source: string
  ): Observable<QueryResult<T>> {
    const selectedIds = flatMap(classifiers, o => o.values.map(v => v.id));
    const dataSource = this.masterDataConfig.getSource(
      source
    ) as MasterDataSource<T>;
    if (!selectedIds.length) {
      return of({ results: [], count: null });
    }

    const query = new QueryRequestBuilder();

    if (source === 'outlets') {
      query.setFilter(
        new PropertyExpression('client.id')
          .equals(this.form.value.clientId)
          .toString()
      );
    }

    query.setParam('classifiersIds', selectedIds).setPageSize(Infinity);

    return this.masterData.query<T>(dataSource.endpoint, query.request);
  }
}
