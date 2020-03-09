import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material';
import { configureTestSuite } from 'lib/test-utils';

import { DialogHeaderComponent } from './dialog-header.component';

class DialogRef {
  _containerInstance = {
    _config: {}
  };
  addPanelClass() {}
  removePanelClass() {}
}

describe('[Core] DialogHeaderComponent', () => {
  let component: DialogHeaderComponent;
  let fixture: ComponentFixture<DialogHeaderComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogHeaderComponent],
      providers: [{ provide: MatDialogRef, useClass: DialogRef }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add class when dialog is maximized', () => {
    spyOn(component['dialogRef'], 'addPanelClass');
    expect((component.maximized = false));
    component.maximized = true;

    expect(component.maximized).toBe(true);
    expect(component['dialogRef'].addPanelClass).toHaveBeenCalledWith(
      'dialog-fullscreen'
    );
  });

  it('should remove class when dialog is not maximized', () => {
    spyOn(component['dialogRef'], 'removePanelClass');
    component.maximized = true;
    component.maximized = false;
    expect(component.maximized).toBe(false);
    expect(component['dialogRef'].removePanelClass).toHaveBeenCalledWith(
      'dialog-fullscreen'
    );
  });

  it('should be maximized by default if fullscreen option is true', () => {
    component['dialogRef']._containerInstance._config['fullscreen'] = true;
    component.ngOnInit();
    expect(component.maximized).toBe(true);
  });

  describe('.toggleMaximize', () => {
    it('should toggle maximize', () => {
      expect((component.maximized = false));
      component.toggleMaximize();
      expect((component.maximized = true));
      component.toggleMaximize();
      expect((component.maximized = false));
    });

    it('should not change maximize prop in component could not be maximized', () => {
      component.canMaximize = false;
      expect((component.maximized = false));
      component.toggleMaximize();
      expect((component.maximized = false));
      component.toggleMaximize();
      expect((component.maximized = false));
    });
  });
});
