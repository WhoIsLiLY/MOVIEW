import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageMoviePage } from './manage-movie.page';

describe('ManageMoviePage', () => {
  let component: ManageMoviePage;
  let fixture: ComponentFixture<ManageMoviePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMoviePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
