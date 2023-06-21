import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoints } from 'app/core/constants';
import { Utils } from 'app/core/helpers/utils';
import { Category } from 'app/core/models/category';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  async getCategories(): Promise<Category[]> {
    try {
      const response: any = await firstValueFrom(
        this.http.get(Utils.getURL(Endpoints.CATEGORIES))
      );
      return response;
    } catch (error: any) {
      throw error;
    }
  }


}
