import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Carousel } from './carousel.model';

@Injectable()
export class CarouselService {

    constructor(private http: Http){}

    gettingImages(): Observable<any>{
        return this.http.get('./carousel-images.json')
                .map((response: Response) => response.json())
                .catch((error: Response) => Observable.throw(error.json()));
    }
}