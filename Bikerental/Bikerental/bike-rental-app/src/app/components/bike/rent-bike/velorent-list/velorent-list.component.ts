import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {RentBikeService, Velorent} from "../../../../services/rent-bike.service";


@Component({
  selector: 'app-velorent-list',
  templateUrl: './velorent-list.component.html',
  styleUrls: ['./velorent-list.component.css']
})
export class VelorentListComponent implements OnInit {
  velorents: Velorent[] = [];
  form: Velorent = {
    veloId: 0,
    userId: '',
    startRentDate: '',
    endRentDate: '',
    fromLocation: '',
    toLocation: '',
  };
  submitted = false;  // Submitted flag to manage form validation

  constructor(private velorentService: RentBikeService) {}

  ngOnInit(): void {
    this.loadVelorents();
  }

  loadVelorents(): void {
    this.velorentService.getAll().subscribe(data => (this.velorents = data));
  }

  submit(): void {
    this.submitted = true;
    if (!this.form.veloId || !this.form.userId || !this.form.startRentDate || !this.form.endRentDate || !this.form.fromLocation || !this.form.toLocation) {
      alert('Tous les champs sont requis.');
      return;
    }
    if (new Date(this.form.startRentDate) > new Date(this.form.endRentDate)) {
      alert('La date de début ne peut pas être après la date de fin.');
      return;
    }

    if (this.form.id) {
      this.velorentService.update(this.form).subscribe(() => this.loadVelorents());
    } else {
      this.velorentService.create(this.form).subscribe(() => this.loadVelorents());
    }
    this.resetForm();
  }

  edit(velorent: Velorent): void {
    this.form = { ...velorent };
  }

  delete(id?: number): void {
    if (id) {
      this.velorentService.delete(id).subscribe(() => this.loadVelorents());
    }
  }

  resetForm(): void {
    this.form = {
      veloId: 0,
      userId: '',
      startRentDate: '',
      endRentDate: '',
      fromLocation: '',
      toLocation: '',
    };
    this.submitted = false;  // Reset the submitted flag
  }
}
