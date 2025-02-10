import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserorderlistAdminviewComponent } from './userorderlist-adminview.component';

describe('UserorderlistAdminviewComponent', () => {
  let component: UserorderlistAdminviewComponent;
  let fixture: ComponentFixture<UserorderlistAdminviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserorderlistAdminviewComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserorderlistAdminviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
