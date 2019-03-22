import { SettingsService } from './../../services/settings.service';
import { Member } from './../../models/member';
import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { FlashMessagesService } from 'angular2-flash-messages/module';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.css']
})
export class EditMemberComponent implements OnInit {
  id: string;
  member: Member = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };

  disableBalanceOnEdit = true;

  constructor(
    public memberService: MemberService,
    public flashMessagesService: FlashMessagesService,
    public router: Router,
    public route: ActivatedRoute,
    public settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.memberService.getMember(this.id).subscribe(member => {
      this.member = member;
    });
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
  }

   onSubmit({value, valid}: {value: Member, valid: boolean}) {

    if (!valid) {
      this.flashMessagesService.show('All fields are required!', { cssClass: 'alert-danger', timeout: 4000 });
      this.router.navigate(['edit-member/' + this.id]);
    } else {
      this.memberService.updateMember(this.id, value);
      this.flashMessagesService.show('Member has been updated successfully!', { cssClass: 'alert-success', timeout: 4000 });
      this.router.navigate(['/member/' + this.id]);
    }
  }

}
