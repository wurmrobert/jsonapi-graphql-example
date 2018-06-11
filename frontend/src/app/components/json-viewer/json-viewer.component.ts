import { JsonViewerService } from './json-viewer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-json-viewer',
  templateUrl: './json-viewer.component.html',
  styleUrls: ['./json-viewer.component.scss']
})
export class JsonViewerComponent implements OnInit {

  editorOptions = {
    theme: 'vs-dark',
    language: 'json',
    readOnly: true
  };

  constructor(
    private jsonViewerService: JsonViewerService
  ) { }

  ngOnInit() {
  }


  get code(): string {
    if(!this.jsonViewerService.Model) {
      return '{}';
    }
    return JSON.stringify(this.jsonViewerService.Model.asJson(), null, "\t");
  }

}
