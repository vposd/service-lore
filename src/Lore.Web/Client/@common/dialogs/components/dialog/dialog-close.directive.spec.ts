import { Component, Injectable, ElementRef, NgModule } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'lib/test-utils';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { DialogsService } from '../dialogs.service';
import { ModalDialogsModule } from '../../dialogs.module';

@Component({
  template: `
    <div coreDialogClose></div>
  `
})
class DialogComponent {
  constructor(public el: ElementRef) {}
}

@Injectable()
class OpenService {
  constructor(private dialogs: DialogsService) {}

  open() {
    return this.dialogs.open<DialogComponent, any>({
      component: DialogComponent
    });
  }
}

@NgModule({
  imports: [ModalDialogsModule, NoopAnimationsModule],
  declarations: [DialogComponent],
  exports: [DialogComponent],
  providers: [OpenService]
})
class TestModule {}

describe('[Core] DialogCloseDirective', () => {
  let service: OpenService;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ModalDialogsModule, TestModule, NoopAnimationsModule]
    }).compileComponents();

    service = TestBed.get(OpenService);
  }));

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });

  it('should close dialog', () => {
    const dialogRef = service.open();
    spyOn(dialogRef, 'close');

    dialogRef.componentInstance.el.nativeElement
      .querySelector('[coreDialogClose]')
      .click();
    expect(dialogRef.close).toHaveBeenCalled();
  });
});
