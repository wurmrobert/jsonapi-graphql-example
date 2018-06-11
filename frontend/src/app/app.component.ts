import { JsonViewerService } from './components/json-viewer/json-viewer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  

  public constructor(
    public jsonViewerService: JsonViewerService
  ) { }

  
  public ngOnInit() {
    
  }

  
}
