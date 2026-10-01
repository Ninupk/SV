import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as L from 'leaflet';
import { Device, DeviceStatus } from '../../core/models/device.model';

type StatusFilter = 'All' | DeviceStatus;

const STATUS_COLOR: Record<DeviceStatus, string> = {
  Online: '#16a34a',
  Alert: '#dc2626',
  Offline: '#9ca3af',
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

function timeAgo(date: Date): string {
  const minutes = Math.round((Date.now() - date.getTime()) / 60_000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} h ago`;
  return `${Math.round(hours / 24)} d ago`;
}

/**
 * Plots devices that have been mapped to a location on a Leaflet/OpenStreetMap
 * map (no API key needed). Pass `devices` (any list — unmapped ones are ignored)
 * and optionally `unmappedCount` to show how many still need a location.
 */
@Component({
  selector: 'app-device-map',
  standalone: true,
  imports: [],
  templateUrl: './device-map.component.html',
  styleUrl: './device-map.component.scss',
})
export class DeviceMapComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() devices: Device[] = [];
  @Input() unmappedCount = 0;
  @ViewChild('mapContainer', { static: true }) private readonly mapContainer!: ElementRef<HTMLDivElement>;

  readonly filters: StatusFilter[] = ['All', 'Online', 'Alert', 'Offline'];
  activeFilter: StatusFilter = 'All';

  private map?: L.Map;
  private markers: L.CircleMarker[] = [];
  private viewInitialized = false;

  get mapped(): Device[] {
    return this.devices.filter((d) => d.location !== null);
  }

  get visible(): Device[] {
    return this.mapped.filter((d) => this.activeFilter === 'All' || d.status === this.activeFilter);
  }

  countFor(filter: StatusFilter): number {
    return filter === 'All' ? this.mapped.length : this.mapped.filter((d) => d.status === filter).length;
  }

  setFilter(filter: StatusFilter): void {
    this.activeFilter = filter;
    this.renderMarkers();
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    this.map = L.map(this.mapContainer.nativeElement, { worldCopyJump: true, scrollWheelZoom: false }).setView([20, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(this.map);
    this.renderMarkers();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['devices'] && this.viewInitialized) {
      this.renderMarkers();
    }
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  private renderMarkers(): void {
    if (!this.map) return;

    this.markers.forEach((m) => m.remove());
    this.markers = [];

    const bounds = L.latLngBounds([]);
    for (const device of this.visible) {
      const { lat, lng, label } = device.location!;
      const color = STATUS_COLOR[device.status];
      const marker = L.circleMarker([lat, lng], {
        radius: device.status === 'Alert' ? 10 : 8,
        color: '#ffffff',
        weight: 2,
        fillColor: color,
        fillOpacity: 0.95,
      })
        .bindPopup(
          `<strong>${escapeHtml(device.name)}</strong><br>` +
            `${escapeHtml(device.type)} · ${escapeHtml(device.entity)}<br>` +
            `${escapeHtml(label)}<br>` +
            `<span style="color:${color};font-weight:600">${device.status}</span> · seen ${timeAgo(device.lastSeen)}`
        )
        .addTo(this.map);
      this.markers.push(marker);
      bounds.extend([lat, lng]);
    }

    if (bounds.isValid()) {
      this.map.fitBounds(bounds.pad(0.35), { maxZoom: 5 });
    }
  }
}
