import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }


  createEstabelecimento(estabelecimentoData: any): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8800/creatEstabelicimento', estabelecimentoData);
  }
  
  getCustomers(): Observable<any[]> {
    return this.httpClient.get<any[]>('http://localhost:8800/getcustomers');
  }

  getCategorias(): Observable<any[]> {
    return this.httpClient.get<any[]>('http://localhost:8800/getCategorias');
  }

  getRoles(): Observable<any[]> {
    return this.httpClient.get<any[]>('http://localhost:8800/getRoles');
  }

  deleteEstabelecimento(deletedCustomer: any): Observable<any> {
    return this.httpClient.put<any>('http://localhost:8800/deleteCustomer', deletedCustomer);
  }

  getAddressByCep(cep: string): Observable<any> {
    const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;
    return this.httpClient.get(apiUrl);
  }
}
