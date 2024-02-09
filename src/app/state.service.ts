import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  addressAs: string = 'Sir';
  constructor() { }

  public setAddressAs(addressAs: string) {
    this.addressAs = addressAs;
  }

  public getAddressAs(): string {
    return this.addressAs;
  }
}
