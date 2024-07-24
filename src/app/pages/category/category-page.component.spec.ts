import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryPageComponent } from './category-page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule} from '@angular/router';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { of } from 'rxjs';
import { SectionService } from 'src/app/shared/services/section.service';
import { Category } from 'src/app/shared/models/category.model';

describe('CategoryPageComponent', () => {
  let component: CategoryPageComponent;
  let fixture: ComponentFixture<CategoryPageComponent>;
  let sectionService: jasmine.SpyObj<SectionService>;

  beforeEach(() => {
    const sectionServiceSpy = jasmine.createSpyObj('SectionService', ['getCategoriesBySection']);

    TestBed.configureTestingModule({
      declarations: [CategoryPageComponent],
      imports: [HttpClientTestingModule,
        RouterModule.forRoot([]), ButtonComponent],
      providers: [
        { provide: SectionService, useValue: sectionServiceSpy },
      ]
    });

    fixture = TestBed.createComponent(CategoryPageComponent);
    component = fixture.componentInstance;
    sectionService = TestBed.inject(SectionService) as jasmine.SpyObj<SectionService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch categories by section', () => {
    const mockCategories: Category[] = [{ id: '1', name: 'Category 1' }, { id: '2', name: 'Category 2' }] as Category[];
    sectionService.getCategoriesBySection.and.returnValue(of(mockCategories));

    component.getCategoriesBySection('1');
    expect(sectionService.getCategoriesBySection).toHaveBeenCalledWith('1');
    expect(component.categories).toBe(mockCategories);
  });
});
