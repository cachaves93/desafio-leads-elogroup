import { Injectable } from '@angular/core';
import { leadsListMockData } from '../mock-data/leads-list';
import { usersMockData } from '../mock-data/user-list';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
    if (!localStorage.getItem('eloGroupUsers')) {
      localStorage.setItem('eloGroupUsers', JSON.stringify(usersMockData));
    }

    if (!localStorage.getItem('eloGroupLeads')) {
      localStorage.setItem('eloGroupLeads', JSON.stringify(leadsListMockData));
    }
  }

  getItem(
    item: string
  ): string {
    return localStorage.getItem(item);
  }

  setObject(object: any): void {

    const firstKey: string = Object.keys(object)[0];

    localStorage.setItem( firstKey , object[firstKey] );
  }

  setToken(
    token: string
  ): void {
    localStorage.setItem( 'jwtTokenEloGroup', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwtTokenEloGroup');
  }

  removeToken(): void {
    localStorage.removeItem('jwtTokenEloGroup');
  }

}
