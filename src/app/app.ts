import { Component, OnInit } from '@angular/core';
import { StorageService } from './services/storage.service'; 
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './core/components/header/header';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true,
  imports: [RouterModule ,HeaderComponent]
})
export class AppComponent implements OnInit {
  
  
  constructor(private storageService: StorageService) {}

  ngOnInit() {
   
    console.log('Uygulama başlatıldı, StorageService tetiklendi.');
  }
}