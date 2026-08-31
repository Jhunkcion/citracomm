export type CatalogItem = {
  id: string;
  name: string;
  category: string;
  accent: string;
};

export type GalleryItem = {
  id: string;
  label: string;
  tone: number;
};

export const catalogDefaults: CatalogItem[] = [
  { id: "catalog-1", name: "Elegant Rose Gold", category: "Pernikahan", accent: "template-style-1" },
  { id: "catalog-2", name: "Floral Garden", category: "Pernikahan", accent: "template-style-2" },
  { id: "catalog-3", name: "Royal Classic", category: "Pernikahan", accent: "template-style-3" },
  { id: "catalog-4", name: "Modern Minimalist", category: "Pernikahan", accent: "template-style-4" },
  { id: "catalog-5", name: "Rustic Vintage", category: "Pernikahan", accent: "template-style-5" },
  { id: "catalog-6", name: "Luxury Navy", category: "Pernikahan", accent: "template-style-6" },
  { id: "catalog-7", name: "Islamic Geometric", category: "Khitanan", accent: "template-style-khitan-1" },
  { id: "catalog-8", name: "Tosca Mandala", category: "Khitanan", accent: "template-style-khitan-2" },
  { id: "catalog-9", name: "Blue Arabesque", category: "Khitanan", accent: "template-style-khitan-3" },
  { id: "catalog-10", name: "Rainbow Party", category: "Ulang Tahun", accent: "template-style-ultah-1" },
  { id: "catalog-11", name: "Superhero Blast", category: "Ulang Tahun", accent: "template-style-ultah-2" },
  { id: "catalog-12", name: "Sweet Seventeen", category: "Ulang Tahun", accent: "template-style-ultah-3" },
  { id: "catalog-13", name: "Corporate Elegant", category: "Formal", accent: "template-style-formal-1" },
  { id: "catalog-14", name: "Executive Gold", category: "Formal", accent: "template-style-formal-2" },
];

export const galleryDefaults: GalleryItem[] = [
  { id: "gallery-1", label: "Undangan Pernikahan", tone: 1 },
  { id: "gallery-2", label: "Stempel Otomatis", tone: 2 },
  { id: "gallery-3", label: "Spanduk Promosi", tone: 3 },
  { id: "gallery-4", label: "Undangan Khitanan", tone: 4 },
  { id: "gallery-5", label: "Stiker Custom", tone: 5 },
  { id: "gallery-6", label: "Undangan Ulang Tahun", tone: 6 },
];

const catalogStorageKey = "citra_catalog_items";
const galleryStorageKey = "citra_gallery_items";

function readFromStorage<T>(storageKey: string, fallbackValue: T): T {
  if (typeof window === "undefined") {
    return fallbackValue;
  }

  try {
    const storedValue = window.localStorage.getItem(storageKey);
    if (!storedValue) {
      return fallbackValue;
    }

    return JSON.parse(storedValue) as T;
  } catch {
    return fallbackValue;
  }
}

function writeToStorage<T>(storageKey: string, value: T) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(storageKey, JSON.stringify(value));
}

export function getCatalogItems() {
  return readFromStorage<CatalogItem[]>(catalogStorageKey, catalogDefaults);
}

export function saveCatalogItems(items: CatalogItem[]) {
  writeToStorage(catalogStorageKey, items);
}

export function getGalleryItems() {
  return readFromStorage<GalleryItem[]>(galleryStorageKey, galleryDefaults);
}

export function saveGalleryItems(items: GalleryItem[]) {
  writeToStorage(galleryStorageKey, items);
}
