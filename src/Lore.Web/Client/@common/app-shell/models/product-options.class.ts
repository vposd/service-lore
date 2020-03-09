class ProductOptionsProperties {
  iconClass: string;
  productName: string;
}

export class ProductOptions extends ProductOptionsProperties {
  constructor(input?: ProductOptionsProperties) {
    super();
    Object.assign(this, input);
  }
}
