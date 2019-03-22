import { MemberService } from '../../services/member.service';
import { Component, OnInit } from '@angular/core';
import { Member } from '../../models/member';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  members:any[];
  totalBalance:number;

  constructor(public memberService:MemberService) {}

  ngOnInit() {
    this.memberService.getMembers().subscribe(members => {
      this.members = members;
      this.getTotalBalance();
    });
  }

  getTotalBalance() {
    let total = 0;
    for(let i = 0; i < this.members.length; i++){
      total += parseFloat(this.members[i].balance);
    }
    this.totalBalance = total;
    console.log(this.totalBalance);
  }

}
