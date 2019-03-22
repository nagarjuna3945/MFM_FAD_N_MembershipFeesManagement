import { Member } from './../../models/member';
import { FlashMessagesService } from 'angular2-flash-messages';
import { MemberService } from './../../services/member.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  id: string;
  member: Member;
  hasBalance = false;
  showBalanceUpdateInput = false;

  constructor(
    public memberService: MemberService,
    public flashMessagesService: FlashMessagesService,
    public router: Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.memberService.getMember(this.id).subscribe(member => {
      if (member.balance > 0) {
        this.hasBalance = true;
      }
      this.member = member;
    });
  }

  updateBalance(id: string) {
    this.memberService.updateMember(this.id, this.member);
    this.flashMessagesService.show('Balance has been updated successfully!', {cssClass: 'alert-success', timeout: 4000});
    this.router.navigate(['/member/' + this.id]);
    this.showBalanceUpdateInput = false;
  }

  onDelete() {
    if (confirm('Are you sure to delete this member?')) {
      this.memberService.deleteMember(this.id);
      this.flashMessagesService.show('Member has benn deleted successfully!', {cssClass: 'alert-danger', timeout: 4000});
      this.router.navigate(['/']);
    }
  }
}
