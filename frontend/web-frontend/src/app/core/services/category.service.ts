import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Endpoints } from '../constants';
import { Utils } from '../helpers/utils';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  async getCategories(): Promise<Category[] | null> {
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
