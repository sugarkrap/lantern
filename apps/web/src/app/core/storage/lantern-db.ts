import { InjectionToken } from '@angular/core';
import Dexie, { type EntityTable } from 'dexie';

/** The patient's AnyFace image. Only one exists at a time, and it never leaves the device. */
export interface MascotRecord {
  id: 'current';
  image: Blob;
  updatedAt: number;
}

export interface SettingRecord {
  key: string;
  value: unknown;
}

export class LanternDb extends Dexie {
  mascot!: EntityTable<MascotRecord, 'id'>;
  settings!: EntityTable<SettingRecord, 'key'>;

  constructor(name = 'lantern') {
    super(name);
    // Bump the version and add an upgrade step for every schema change;
    // never edit a released version, or existing patients' data is lost.
    this.version(1).stores({
      mascot: 'id',
      settings: 'key',
    });
  }
}

export const LANTERN_DB = new InjectionToken<LanternDb>('LANTERN_DB', {
  providedIn: 'root',
  factory: () => new LanternDb(),
});
