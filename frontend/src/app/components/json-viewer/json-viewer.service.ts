import { Injectable } from '@angular/core';
import { BaseModel } from '../../models/base/BaseModel';

@Injectable()
export class JsonViewerService {

  private model: BaseModel;

  public get Model(): BaseModel {
    return this.model;
  }

  public set Model(value: BaseModel) {
    this.model = value;
  }

}
