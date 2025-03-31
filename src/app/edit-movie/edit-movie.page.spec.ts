import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditMoviePage } from './edit-movie.page';

describe('EditMoviePage', () => {
  let component: EditMoviePage;
  let fixture: ComponentFixture<EditMoviePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMoviePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
