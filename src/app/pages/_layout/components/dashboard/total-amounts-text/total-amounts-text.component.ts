import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-total-amounts-text',
  templateUrl: './total-amounts-text.component.html',
  styleUrls: ['./total-amounts-text.component.scss']
})
export class TotalAmountsTextComponent implements OnInit {
  @Input() title: string;
  @Input() amount: string;
  constructor() { }

  ngOnInit(): void {
  }

}
