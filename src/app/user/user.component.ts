import { Component, OnInit } from '@angular/core';
import { merge } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {User} from "../shared/types/user.type";
import {UsersService} from "../shared/services/users.service";
import {filter, mergeMap} from "rxjs/operators";


@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  /**
   * Component constructor
   */
  constructor(private _userService: UsersService, private _route: ActivatedRoute) {
    this._user = {} as User;
  }

  // private property to store person value
  private _user: User;

  /**
   * Returns private property _person
   */
  get user(): User {
    return this._user;
  }

  /**
   * OnInit implementation
   */
  ngOnInit(): void {
    merge(
      this._route.params.pipe(
        filter((params: any) => !!params.id),
        mergeMap((params: any) => this._userService.fetchOne(params.id)),
      ),
    )
      .subscribe({
        next: (user: User) => this._user = user,
        error: () => {
          // manage error when user doesn't exist in DB
          this._user = this._userService.defaultUser;
        }
      });
  }
}
