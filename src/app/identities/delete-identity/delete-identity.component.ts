import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Identity} from '../identity/identity';
import {IdentityService} from '../identities.service';

@Component({
  selector: 'app-delete-identity',
  templateUrl: './delete-identity.component.html',
  styleUrls: ['./delete-identity.component.css']
})
export class DeleteIdentityComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private identityService: IdentityService
  ) { }

  ngOnInit(): void {
    this.removeIdentity(this.route.snapshot.data['identity']);
  }

  public removeIdentity (identity: Identity): void {
    this.identityService.deleteIdentity(identity)
      .subscribe(
        data => {
          return this.router.navigate(['/identities']);
        }
      );
  }

}
