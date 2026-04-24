import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve,
} from "@angular/router";
import { Injectable } from "@angular/core";
import { InqService } from "../services/inq.service";

@Injectable()
export class GetAllTipResolver implements Resolve<any> {
  constructor(private inqService: InqService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let obj = {
      filter: [],
      limit: 10,
      skip: 0,
      sort: "DESC",
    };
    // return this.tipInfoService.getAllTips();
  }
}
