import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '@core/services/api.service';
import { SliderState } from '@shared/components/phanolink-slider/phanolink-slider.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private sliderSubject = new BehaviorSubject<SliderState[]>([]);
  slideList$ = this.sliderSubject.asObservable();

  constructor(private readonly api: ApiService) {}

  getSlides() {
    return this.api.get('slides').subscribe((response: any) => {
      this.sliderSubject.next([...response.body.data]);
    });
  }
}
