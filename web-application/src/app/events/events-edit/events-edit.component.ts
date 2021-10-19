import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { countries } from 'src/app/shared/country-data-store';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-events-edit',
  templateUrl: './events-edit.component.html',
  styleUrls: ['./events-edit.component.css'],
})
export class EventsEditComponent implements OnInit {
  id: number;
  editMode = false;
  eventForm: FormGroup;
  public countries:any = countries
  today = new Date();
  
  dd = String(this.today.getDate() + 1).padStart(2, '0');
  dd2 = String(this.today.getDate() + 2).padStart(2, '0');
  mm = String(this.today.getMonth() + 1).padStart(2, '0'); 
  yyyy = this.today.getFullYear();

  

  public todayString =  this.yyyy + '-' + this.mm + '-' + this.dd;
  public todayString2 =  this.yyyy + '-' + this.mm + '-' + this.dd2;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  /**
   * @name onSubmit()
   * @description Depending if its edit mode or add new song mode it will update or add the current song.
   */
  onSubmit() {
    if (this.eventForm.value.multiplayer) {
      this.eventForm.value.multiplayer = 1;
    } else {
      this.eventForm.value.multiplayer = 0;
    }
    if (this.editMode) {
      //this.dataStorageService.updateCancion(this.cancionForm.value);
    } else {
      //this.dataStorageService.storeSong(this.cancionForm.value);
    }
    this.dataStorageService.storeEvent(this.eventForm.value);


    this.onCancel();
  }

  /**
   * @name onCancel()
   * @description Returns the link to its previous link.
   */
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  /**
   * @name initForm()
   * @description If it's edit mode it will load the inputs of the form with the preexistent values of the song. Otherwise
   * it will just set thes values 'empty' for the user to fill.
   */
  private initForm() {
    let number = 0;
    let event_key = '';
    let event_code = '';
    let name = '';
    let initial_date = '';
    let final_date = '';
    let initial_time = '';
    let final_time = '';
    let board_columns = 10;
    let board_rows = 10;
    let country = '';
    let location = '';
    let multiplayer = false;
    let client_name = '';
    let shooting_time = 10;

    if (this.editMode) {
      const event = this.eventService.getEvent(this.id);
      number = event.number;
      event_key = event.event_key;
      event_code = event.event_code.toString();
      name = event.name;
      initial_date = event.initial_date;
      final_date = event.final_date;
      initial_time = event.initial_time;
      final_time = event.final_time;
      board_columns = event.board_columns;
      board_rows = event.board_rows;
      country = event.country;
      location = event.location;
      if (event.multiplayer == 1) {
        multiplayer = true;
      } else {
        multiplayer = false;
      }
      
      client_name = event.client_name;
      shooting_time = event.shooting_time;
    }

    this.eventForm = new FormGroup({
      number: new FormControl(number),
      name: new FormControl(name, Validators.required),
      event_code: new FormControl(event_code, Validators.required),
      event_key: new FormControl(event_key),
      initial_date: new FormControl(initial_date, Validators.required),
      final_date: new FormControl(final_date, Validators.required),
      initial_time: new FormControl(initial_time, Validators.required),
      final_time: new FormControl(final_time, Validators.required),
      board_columns: new FormControl(board_columns, Validators.required),
      board_rows: new FormControl(board_rows, Validators.required),
      country: new FormControl(country, Validators.required),
      location: new FormControl(location, Validators.required),
      multiplayer: new FormControl(multiplayer, Validators.required),
      client_name: new FormControl(client_name, Validators.required),
      shooting_time: new FormControl(shooting_time, Validators.required),

      
    });
  }
}
