import cityImg from '../assets/themesImage/city.jpg';
import natureImg from '../assets/themesImage/nature.jpg';
import marbleImg from '../assets/themesImage/marble.jpg';

export type ThemePictureKey = 'city' | 'nature' | 'marble' | 'none';

export const themePictures: Record<ThemePictureKey, { url: string; overlay: number; type?: string }> = {
  city: { url: cityImg, overlay: 0.5, type: 'photo' },
  nature: { url: natureImg, overlay: 0.45, type: 'photo' },
  marble: { url: marbleImg, overlay: 0.35, type: 'pattern' },
  none: { url: '', overlay: 0, type: 'none' },
};

export const preloadThemeImage = (key: ThemePictureKey) => {
  const entry = themePictures[key];
  if (!entry || !entry.url) return;
  const img = new Image();
  img.src = entry.url;
};

export default themePictures;
