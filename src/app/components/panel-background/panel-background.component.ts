import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel-background',
  templateUrl: './panel-background.component.html',
  styleUrls: ['./panel-background.component.sass']
})
export class PanelBackgroundComponent implements OnInit {
  @Input() columnCount = 2;
  @Input() rowCount = 2;
  @Input() imageWidthPercentage = 1;
  horizontalCountLessCornersAsList: number[];
  verticalCountLessCornersAsList: number[];

  ngOnInit(): void {
    this.horizontalCountLessCornersAsList = new Array<number>(this.columnCount - 2);
    this.verticalCountLessCornersAsList = new Array<number>(this.rowCount - 2);
  }
}
