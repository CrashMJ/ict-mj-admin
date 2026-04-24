import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-vod-summary',
  templateUrl: './vod-summary.component.html',
  styleUrls: ['./vod-summary.component.scss']
})
export class VodSummaryComponent implements OnInit {
  @Input() title: string;
  constructor() { }

  ngOnInit(): void {
    console.log(this.title)
  }

}
