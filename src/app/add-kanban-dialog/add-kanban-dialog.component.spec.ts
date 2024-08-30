import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKanbanDialogComponent } from './add-kanban-dialog.component';

describe('AddKanbanDialogComponent', () => {
  let component: AddKanbanDialogComponent;
  let fixture: ComponentFixture<AddKanbanDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddKanbanDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddKanbanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
