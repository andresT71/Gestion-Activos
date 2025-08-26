import { Injectable } from '@angular/core';

export interface Asset {
  id: string; // code
  name: string;
  location?: string;
  serial?: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class StorageService {
  private key(id?: string) { return id ? `asset:${id}` : 'asset'; }

  save(asset: Asset) {
    localStorage.setItem(this.key(asset.id), JSON.stringify(asset));
  }

  list(): Asset[] {
    const items: Asset[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)!;
      if (k.startsWith('asset:')) {
        const val = localStorage.getItem(k);
        if (val) items.push(JSON.parse(val));
      }
    }
    // sort newest first
    return items.sort((a,b)=> b.createdAt.localeCompare(a.createdAt));
  }
}
