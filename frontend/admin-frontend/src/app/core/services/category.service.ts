import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Endpoints } from '../constants';
import { Utils } from '../helpers/utils';
import { DynamicReport } from '../models';
import { Category } from './../models/category';
import { AuthService } from './auth.service';
import { DataService } from './data/data.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private authService: AuthService
  ) { }

  async categoryReport(query: string, page: number): Promise<DynamicReport<Category> | null> {
    try {
      const headers = this.dataService.getAuthHeaders();
      const body = { query, page }
      const response: any = await firstValueFrom(
        this.http.post(Utils.getURL(Endpoints.CATEGORY_REPORT), body, { headers })
      );
      return response;

    } catch (error: any) {
      if (error.status === 401) {
        const tokenRefreshed = await this.authService.refreshToken();
        if (!tokenRefreshed) return null;
        return await this.categoryReport(query, page);
      }
      throw error;
    }
  }



}
