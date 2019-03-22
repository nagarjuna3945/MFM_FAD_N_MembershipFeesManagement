import { Settings } from './../../models/settings';
import { FlashMessagesService } from 'angular2-flash-messages/module';
import { SettingsService } from './../../services/settings.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  settings: Settings;

  constructor(
    public settingsService: SettingsService,
    public router: Router,
    public flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.settings = this.settingsService.getSettings();
  }

  onSubmit() {
    this.settingsService.changeSettings(this.settings);
    this.flashMessagesService.show('Settings has been changed successfully', { cssClass: 'alert-success', timeout: 4000 });
    this.router.navigate(['/settings']);
  }

}
