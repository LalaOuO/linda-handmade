// data.js
import { relDate } from './utils.js';

export const fallbackSvg = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'><rect width='400' height='400' fill='%23E4DAE8'/><circle cx='200' cy='200' r='65' fill='%23CFBFD5' opacity='0.5'/><text x='50%25' y='52%25' font-family='sans-serif' font-size='14' fill='%23675271' text-anchor='middle'>Linda Handmade</text></svg>";

export const pikminPalette = [
  { id: 'all', color: '#9B83A4', isAll: true, name: '全部' },
  { id: 'c_red', color: '#C28B88', name: '赤陶紅' },
  { id: 'c_orange', color: '#D4A373', name: '暖杏橙' },
  { id: 'c_green', color: '#8A9A86', name: '鼠尾草綠' },
  { id: 'c_blue', color: '#849BB0', name: '冰川藍' },
  { id: 'c_purple', color: '#9B83A4', name: '柔薰紫' },
  { id: 'c_gray', color: '#55505A', name: '冷炭灰' },
  { id: 'c_white', color: '#EBE7DF', name: '燕麥白' }
];

export const morandi16 = [
  { id: 'c_pink', color: '#D8A7B1', name: '粉紅' }, { id: 'c_red', color: '#C28B88', name: '紅' },
  { id: 'c_orange', color: '#D4A373', name: '橙' }, { id: 'c_brown', color: '#A68A6D', name: '咖啡' },
  { id: 'c_beige', color: '#E3D5CA', name: '米黃' }, { id: 'c_yellow', color: '#E8D3A2', name: '黃' },
  { id: 'c_white', color: '#F8F9FA', name: '白' }, { id: 'c_offwhite', color: '#EBE7DF', name: '米白' },
  { id: 'c_lgreen', color: '#A3B19B', name: '淺綠' }, { id: 'c_dgreen', color: '#6B7A65', name: '墨綠' },
  { id: 'c_lblue', color: '#9BB1C2', name: '淺藍' }, { id: 'c_dblue', color: '#5B6A7D', name: '深藍' },
  { id: 'c_lpurple', color: '#C7B7CA', name: '淺紫' }, { id: 'c_dpurple', color: '#8A738F', name: '深紫' },
  { id: 'c_gray', color: '#9CA3AF', name: '灰' }, { id: 'c_black', color: '#4B5563', name: '黑' }
];

export const defaultYarns = [
  { id: 'y1', brand: 'DARUMA', name: '柔軟細羊毛', drawer: '羊毛', acquiredDate: '2026-10', notes: '手感很好', colors: ['#9B83A4', '#C7B7CA'], tags: ['羊毛', '純色'], quantity: 4, location: '台南', image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=500&q=80' },
  { id: 'y2', brand: 'Hamanaka', name: '星光金蔥棉線', drawer: '特殊線材', acquiredDate: '2026-09', notes: '', colors: ['#EBE7DF', '#D4A373'], tags: ['金蔥', '棉線'], quantity: 2, location: '高雄', image: 'https://images.unsplash.com/photo-1615715616181-79e5f5f4b50c?auto=format&fit=crop&w=500&q=80' }
];

export const defaultPatterns = [
  { id: 'p1', name: '法式復古鬱金香肩背包', tags: ['包包'], date: relDate(-12), url: 'https://www.youtube.com', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80' }
];

export const defaultProjects = [
  { id: 'prj1', title: '晨霧紫雲朵托特包', startDate: relDate(-20), endDate: relDate(+5), colors: ['#9B83A4', '#D2C6D8'], yarnTags: ['羊毛'], categoryTags: ['包包'], purpose: '自用', notes: '包口加了金屬磁扣。', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=700&q=80' },
  { id: 'prj2', title: '靜謐薰衣草手提小方包', startDate: relDate(-5), endDate: '', colors: ['#8A738F'], yarnTags: ['漸層'], categoryTags: ['包包'], purpose: '自用', notes: '手把部分還沒收尾！', image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=700&q=80' }
];
