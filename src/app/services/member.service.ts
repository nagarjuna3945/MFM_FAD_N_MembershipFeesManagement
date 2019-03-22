import { Member } from './../models/member';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class MemberService {
  members: FirebaseListObservable<any[]>;
  member: FirebaseObjectObservable<any>;

  constructor(public afDb: AngularFireDatabase) {
    this.members = this.afDb.list('/members') as FirebaseListObservable<Member[]>;
   }

   getMembers() {
     return this.members;
   }

   newMember(member: Member) {
     this.members.push(member);
   }

   getMember(id: string) {
     this.member = this.afDb.object('/members/' + id) as FirebaseObjectObservable<Member>;
     return this.member;
   }

   updateMember(id: string, member: Member) {
    return this.members.update(id, member);
   }

   deleteMember (id: string) {
     return this.members.remove(id);
   }

}
