import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPendingApproveComponent } from './user-pending-approve.component';

describe('UserPendingApproveComponent', () => {
  let component: UserPendingApproveComponent;
  let fixture: ComponentFixture<UserPendingApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPendingApproveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPendingApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
