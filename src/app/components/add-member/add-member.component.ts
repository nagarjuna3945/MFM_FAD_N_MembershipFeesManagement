import { SettingsService } from './../../services/settings.service';
import { MemberService } from './../../services/member.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Member } from './../../models/member';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {
  member: Member = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };

  disableBalanceOnAdd = false;

  constructor(
    public flashMessagesService: FlashMessagesService,
    public router: Router,
    public memberService: MemberService,
    public settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }

  onSubmit({value, valid}: {value: Member, valid: boolean}) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }

    if (!valid) {
      this.flashMessagesService.show('All fields are required!', { cssClass: 'alert-danger', timeout: 4000 });
      this.router.navigate(['add-member']);
    } else {
      this.memberService.newMember(value);
      this.flashMessagesService.show('New member has been added successfully!', { cssClass: 'alert-success', timeout: 4000 });
      this.router.navigate(['/']);
    }
  }

}
