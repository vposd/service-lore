import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  HostListener
} from '@angular/core';
import { Observable } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { map } from 'rxjs/operators';

import { FadeInOut } from '@common/animations/fade-in-out.animation';
import { RequestProgressState } from '@common/utils/request-progress/request-progress.class';

import { AuthenticationService } from '../auth-service/authentication.service';

@Component({
  selector: 'auth-login-form',
  templateUrl: './auth-login-form.component.html',
  styleUrls: ['./auth-login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [FadeInOut]
})
export class LoginFormComponent implements OnInit {
  productName = 'ST Promo';
  error = '';
  credentials: FormGroup;
  requestState$: Observable<RequestProgressState>;

  constructor(
    private readonly authService: AuthenticationService,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.requestState$ = this.authService.state$.pipe(
      map(state => state.authProgress)
    );
  }

  @HostListener('document:keyup.enter')
  async signIn() {
    if (this.credentials.valid) {
      await this.authService.signIn(this.credentials.value);
    }
  }
}
