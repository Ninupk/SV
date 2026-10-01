export type DeviceStatus = 'Online' | 'Offline' | 'Alert';

export interface Device {
  id: string;
  name: string;
  type: string;
  entity: string;
  status: DeviceStatus;
  lastSeen: Date;
  /** Null when the device hasn't been mapped to a location yet. */
  location: { lat: number; lng: number; label: string } | null;
}
