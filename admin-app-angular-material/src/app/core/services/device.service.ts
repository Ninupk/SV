import { Injectable, computed, signal } from '@angular/core';
import { Device } from '../models/device.model';

/**
 * Mock device service backed by an in-memory signal.
 * Swap the internals for real HTTP calls when you connect a backend.
 * Devices with `location: null` are "unmapped" and don't appear on the map.
 */
@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private readonly devicesSignal = signal<Device[]>([
    { id: 'd1', name: 'Temp Sensor 01', type: 'Temperature', entity: 'Warehouse North', status: 'Online', lastSeen: new Date(Date.now() - 2 * 60_000), location: { lat: 47.6062, lng: -122.3321, label: 'Seattle, WA' } },
    { id: 'd2', name: 'Temp Sensor 02', type: 'Temperature', entity: 'Warehouse North', status: 'Alert', lastSeen: new Date(Date.now() - 5 * 60_000), location: { lat: 47.6205, lng: -122.3493, label: 'Seattle, WA' } },
    { id: 'd3', name: 'GPS Tracker 07', type: 'GPS', entity: 'Delivery Van 12', status: 'Online', lastSeen: new Date(Date.now() - 1 * 60_000), location: { lat: 30.2672, lng: -97.7431, label: 'Austin, TX' } },
    { id: 'd4', name: 'GPS Tracker 08', type: 'GPS', entity: 'Delivery Van 12', status: 'Offline', lastSeen: new Date(Date.now() - 6 * 3_600_000), location: { lat: 41.8781, lng: -87.6298, label: 'Chicago, IL' } },
    { id: 'd5', name: 'Humidity Node 03', type: 'Humidity', entity: 'Book', status: 'Online', lastSeen: new Date(Date.now() - 3 * 60_000), location: { lat: 40.4168, lng: -3.7038, label: 'Madrid, Spain' } },
    { id: 'd6', name: 'Door Sensor 11', type: 'Contact', entity: 'Book', status: 'Online', lastSeen: new Date(Date.now() - 8 * 60_000), location: { lat: 19.076, lng: 72.8777, label: 'Mumbai, India' } },
    { id: 'd7', name: 'Vibration Node 02', type: 'Vibration', entity: 'Bag', status: 'Alert', lastSeen: new Date(Date.now() - 12 * 60_000), location: { lat: 51.5072, lng: -0.1276, label: 'London, UK' } },
    { id: 'd8', name: 'Temp Sensor 09', type: 'Temperature', entity: 'Bag', status: 'Offline', lastSeen: new Date(Date.now() - 2 * 86_400_000), location: null },
    { id: 'd9', name: 'GPS Tracker 09', type: 'GPS', entity: 'Bag', status: 'Online', lastSeen: new Date(Date.now() - 4 * 60_000), location: null },
  ]);

  readonly devices = this.devicesSignal.asReadonly();
  readonly mappedDevices = computed(() => this.devicesSignal().filter((d) => d.location !== null));
  readonly unmappedCount = computed(() => this.devicesSignal().filter((d) => d.location === null).length);
}
