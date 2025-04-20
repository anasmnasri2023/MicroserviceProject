import { Component, OnInit } from '@angular/core';
import { BaladeserviceService, Balade } from '../../services/baladeservice.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-listbalade',
  standalone: false,
  templateUrl: './listbalade.component.html',
  styleUrls: ['./listbalade.component.css']
})
export class ListbaladeComponent implements OnInit {
  balades: Balade[] = [];
  qrCodeUrls: Map<string, SafeUrl> = new Map();
  loadingQR: Map<string, boolean> = new Map();

  constructor(
    private baladeService: BaladeserviceService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadBalades();
  }

  loadBalades(): void {
    this.baladeService.getAllBalades().subscribe({
      next: (data) => {
        this.balades = data;
        // Réinitialiser les maps de QR codes
        this.qrCodeUrls = new Map();
        this.loadingQR = new Map();
      },
      error: (err) => console.error('Erreur chargement des balades', err)
    });
  }

  deleteBalade(id: string): void {
    this.baladeService.deleteBalade(id).subscribe(() => {
      this.loadBalades(); // refresh après suppression
    });
  }

  // Générer le QR code pour une balade spécifique
  generateQRCode(balade: Balade): void {
    if (!balade.id) return;
    
    // Marquer comme en cours de chargement
    this.loadingQR.set(balade.id, true);
    
    this.baladeService.getQRCode(balade.id).subscribe({
      next: (blob) => {
        const objectUrl = URL.createObjectURL(blob);
        this.qrCodeUrls.set(balade.id!, this.sanitizer.bypassSecurityTrustUrl(objectUrl));
        this.loadingQR.set(balade.id!, false);
      },
      error: (err) => {
        console.error('Erreur lors de la génération du QR code', err);
        this.loadingQR.set(balade.id!, false);
      }
    });
  }

  // Vérifier si un QR code est en cours de chargement
  isLoadingQR(id: string): boolean {
    return this.loadingQR.get(id) === true;
  }

  // Vérifier si un QR code a déjà été généré
  hasQRCode(id: string): boolean {
    return this.qrCodeUrls.has(id);
  }
}