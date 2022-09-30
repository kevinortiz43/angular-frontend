import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Monster } from './monster';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  monsters: Monster[] = [];
  constructor(private httpClient: HttpClient) {}

  getMonsters() {
    return this.httpClient.get<any>(
      `http://localhost:8080/monster/allmonsters`
    );
  }
  addMonster(data: any) {
    return this.httpClient.post<any>(
      `http://localhost:8080/monster/addmonsters`,
      data
    );
  }
  editMonster(data: any, id: number) {
    return this.httpClient.put<any>(
      `http://localhost:8080/monster/monsterId/${id}`,
      data
    );
  }
  deleteMonster(id: number) {
    return this.httpClient.delete<any>(
      `http://localhost:8080/monster/monsterId/${id}`
    );
  }
}
