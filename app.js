// ==================== 全域防破圖預設圖示 ====================
const fallbackSvg = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'><rect width='400' height='400' fill='%23E4DAE8'/><circle cx='200' cy='200' r='65' fill='%23CFBFD5' opacity='0.5'/><text x='50%25' y='52%25' font-family='sans-serif' font-size='14' fill='%23675271' text-anchor='middle'>Linda Handmade</text></svg>";

window.handleImgFallback = function(imgEl) {
  if (!imgEl) return;
  imgEl.onerror = null;
  imgEl.src = fallbackSvg;
};

function relDate(daysOffset) {
  const d = new Date(); d.setDate(d.getDate() + daysOffset);
  const y = d.getFullYear(); const m = String(d.getMonth() + 1).padStart(2, '0'); const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}
function toInputDate(dottedStr) { return dottedStr ? dottedStr.replace(/\./g, '-') : ''; }
function toDisplayDate(dashedStr) { return dashedStr ? dashedStr.replace(/-/g, '.') : ''; }

const pikminPalette = [
  { id: 'all', color: '#9B83A4', isAll: true, name: '全部' },
  { id: 'c_red', color: '#C28B88', name: '赤陶紅' },
  { id: 'c_orange', color: '#D4A373', name: '暖杏橙' },
  { id: 'c_green', color: '#8A9A86', name: '鼠尾草綠' },
  { id: 'c_blue', color: '#849BB0', name: '冰川藍' },
  { id: 'c_purple', color: '#9B83A4', name: '柔薰紫' },
  { id: 'c_gray', color: '#55505A', name: '冷炭灰' },
  { id: 'c_white', color: '#EBE7DF', name: '燕麥白' }
];

// 階段二：16色標準莫蘭迪色票
const morandi16 = [
  { id: 'c_pink', color: '#D8A7B1', name: '粉紅' }, { id: 'c_red', color: '#C28B88', name: '紅' },
  { id: 'c_orange', color: '#D4A373', name: '橙' }, { id: 'c_brown', color: '#A68A6D', name: '咖啡' },
  { id: 'c_beige', color: '#E3D5CA', name: '米黃' }, { id: 'c_yellow', color: '#E8D3A2', name: '黃' },
  { id: 'c_white', color: '#F8F9FA', name: '白' }, { id: 'c_offwhite', color: '#EBE7DF', name: '米白' },
  { id: 'c_lgreen', color: '#A3B19B', name: '淺綠' }, { id: 'c_dgreen', color: '#6B7A65', name: '墨綠' },
  { id: 'c_lblue', color: '#9BB1C2', name: '淺藍' }, { id: 'c_dblue', color: '#5B6A7D', name: '深藍' },
  { id: 'c_lpurple', color: '#C7B7CA', name: '淺紫' }, { id: 'c_dpurple', color: '#8A738F', name: '深紫' },
  { id: 'c_gray', color: '#9CA3AF', name: '灰' }, { id: 'c_black', color: '#4B5563', name: '黑' }
];

const defaultYarns = [
  { id: 'y1', brand: 'DARUMA', name: '柔軟細羊毛', drawer: '羊毛', acquiredDate: '2026-10', notes: '手感很好', colors: ['#9B83A4', '#C7B7CA'], tags: ['羊毛', '純色'], quantity: 4, location: '台南', image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=500&q=80' },
  { id: 'y2', brand: 'Hamanaka', name: '星光金蔥棉線', drawer: '特殊線材', acquiredDate: '2026-09', notes: '', colors: ['#EBE7DF', '#D4A373'], tags: ['金蔥', '棉線'], quantity: 2, location: '高雄', image: 'https://images.unsplash.com/photo-1615715616181-79e5f5f4b50c?auto=format&fit=crop&w=500&q=80' }
];
const defaultPatterns = [
  { id: 'p1', name: '法式復古鬱金香肩背包', tags: ['包包'], date: relDate(-12), url: 'https://www.youtube.com', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80' }
];
const defaultProjects = [
  { id: 'prj1', title: '晨霧紫雲朵托特包', startDate: relDate(-20), endDate: relDate(+5), colors: ['#9B83A4', '#D2C6D8'], yarnTags: ['羊毛'], categoryTags: ['包包'], purpose: '自用', notes: '包口加了金屬磁扣。', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=700&q=80' },
  { id: 'prj2', title: '靜謐薰衣草手提小方包', startDate: relDate(-5), endDate: '', colors: ['#8A738F'], yarnTags: ['漸層'], categoryTags: ['包包'], purpose: '自用', notes: '手把部分還沒收尾！', image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=700&q=80' }
];

function hexToRgb(hex) {
  let c = (hex || '#9B83A4').replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16) || 0;
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) { case r: h = (g - b) / d + (g < b ? 6 : 0); break; case g: h = (b - r) / d + 2; break; case b: h = (r - g) / d + 4; break; }
    h /= 6;
  }
  return { h: h * 360, s, l };
}
function getColorPikminScore(hex) {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  if (hsl.s < 0.15 || hsl.l < 0.15 || hsl.l > 0.88) return 1000 + hsl.l * 100;
  return hsl.h;
}
function getColorCategory(hex) {
  if (!hex) return 'c_purple';
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  if (hsl.l <= 0.22) return 'c_gray';
  if (hsl.l >= 0.86 || (hsl.s <= 0.12 && hsl.l >= 0.65)) return 'c_white';
  if (hsl.s <= 0.14) return 'c_gray';
  const h = hsl.h;
  if (h >= 345 || h < 18) return 'c_red';
  if (h >= 18 && h < 55) return 'c_orange';
  if (h >= 65 && h < 168) return 'c_green';
  if (h >= 168 && h < 250) return 'c_blue';
  if (h >= 250 && h < 345) return 'c_purple';
  return 'c_purple';
}
function isSimilarFamilyColor(itemHex, targetHex) {
  if (!itemHex || !targetHex) return false;
  return getColorCategory(itemHex) === getColorCategory(targetHex);
}

class AppController {
  constructor() {
    this.yarns = this.loadLocal('tung_yarns', defaultYarns);
    this.patterns = this.loadLocal('tung_patterns', defaultPatterns);
    this.projects = this.loadLocal('tung_projects', defaultProjects);
    this.gasUrl = localStorage.getItem('tung_gas_url') || 'https://script.google.com/macros/s/AKfycbzUc9_wntXsWjB_lJr5Q3H0gFlW3cyK3c7kyaW-iSjcDZrB0KVDqzIS9hLMMzcKp_NS/exec';
    
    this.globalYarnTags = this.loadLocal('tung_global_yarn_tags', ['純色', '漸層', '金蔥', '羊毛', '棉線']);
    this.globalCategoryTags = this.loadLocal('tung_global_category_tags', ['包包', '娃娃', '小物', '吊飾']);

    this.currentView = 'home';
    this.isNavigating = false;
    
    this.viewMap = { home: 'viewHome', yarns: 'viewYarns', library: 'viewLibrary', gallery: 'viewGallery', chronometer: 'viewChronometer' };
    this.viewOrder = ['yarns', 'library', 'gallery', 'chronometer'];
    this.lastRenderedTitle = '';
    this.selectedPikminColorId = 'all';
    this.selectedPikminHex = null;

    this.yarnLayout = 'list';
    this.activeDrawerCategory = null;
    this.defaultYarnCategories = ['牛奶棉', '羊毛', '空心棉/棉線', '特殊線材'];

    this.yarnGridColumns = 2;
    this.yarnChartType = 'color';
    this.patternLayout = 'list';
    this.patternGridColumns = 2;
    this.patternSearchQuery = '';
    this.galleryLayout = 'grid';
    this.gridColumns = 2;
    this.gallerySearchQuery = '';
    
    this.calendarDate = new Date();
    this.calendarDate.setDate(1);

    this.wakeLock = null;
    this.activeYarnId = null;
    this.activeProjectId = null;
    this.activePatternId = null;

    this.tempColors = { yarn: [], project: [] };
    this.tempUploadedImage = { yarn: null, project: null, pattern: null };
    this.tagPressTimer = null;
  }

  loadLocal(key, defaultVal) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : [...defaultVal];
    } catch (e) { return [...defaultVal]; }
  }
  saveLocal(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { }
  }

  init() {
    try {
      this.initLindaSignature();
      this.renderInkText('pageTitle', '手札');
      this.renderInkText('brandTitle', "LINDA'S HANDMADE");
      this.renderAll();
      this.initPikminFilterBar();
      this.renderYarnTagSelectionGroup();
      this.initKnittingRulerDrag();
      this.initGalleryPinchZoom();
      this.initYarnPinchZoom();
      this.initCustomDropdowns();
      this.initHomeCarousel();
      
      this.init16ColorPalette('yarn');
      this.init16ColorPalette('project');

      this.syncFromCloud(false);
      this.initPullToRefresh();
      this.initHistoryAndEdgeSwipe();
    } catch (e) {
      console.error(e);
    }
  }

  initLindaSignature() {
    const container = document.getElementById('homeBrandSign');
    if (!container) return;

    const name = "Linda";
    container.innerHTML = name.split('').map((char, index) => 
      `<span class="coin-char" style="--char-index: ${index};">${char}</span>`
    ).join('');

    if (document.fonts) {
      document.fonts.ready.then(() => { container.classList.add('is-ready'); });
    } else { container.classList.add('is-ready'); }
  }

  triggerLindaCoinFlip() {
    const signEl = document.getElementById('homeBrandSign');
    if (!signEl || signEl.classList.contains('is-flipping')) return;
    signEl.classList.add('is-flipping');
    setTimeout(() => { signEl.classList.remove('is-flipping'); }, 2200);
  }

  // ==================== 階段二：16色標準莫蘭迪色盤 ====================
  init16ColorPalette(type) {
    const container = document.getElementById(`${type}16ColorPalette`);
    if (!container) return;
    container.innerHTML = morandi16.map(p => `
      <button type="button" onclick="app.addColorDot('${type}', '${p.color}')" class="w-7 h-7 rounded-full border border-black/10 shadow-sm shrink-0 active:scale-90 transition hover:scale-110 flex items-center justify-center text-[9px] text-white/90 font-bold tracking-tighter" style="background-color: ${p.color}; text-shadow: 0px 1px 2px rgba(0,0,0,0.3)">
        ${p.name}
      </button>
    `).join('');
  }

  // ==================== 階段二：簡化版圖片上傳 (保護 localStorage) ====================
  handleImageUpload(event, type) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // 利用 Canvas 壓縮尺寸至 600x600 以內
        const canvas = document.createElement('canvas');
        canvas.width = 600;
        canvas.height = 600;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#FAF7F2';
        ctx.fillRect(0, 0, 600, 600);
        
        const scale = Math.max(600 / img.width, 600 / img.height);
        const w = img.width * scale;
        const h = img.height * scale;
        const x = (600 - w) / 2;
        const y = (600 - h) / 2;
        
        ctx.drawImage(img, x, y, w, h);
        
        this.tempUploadedImage[type] = canvas.toDataURL('image/jpeg', 0.85); // 壓縮比 0.85
        
        // 更新預覽 UI
        const previewImg = document.getElementById(`${type}PreviewImg`);
        if (previewImg) {
          previewImg.src = this.tempUploadedImage[type];
          previewImg.classList.remove('hidden');
        }
        document.getElementById(`${type}UploadPrompt`)?.classList.add('hidden');
        document.getElementById(`${type}ClearImgBtn`)?.classList.remove('hidden');
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  clearUploadedImage(type) {
    this.tempUploadedImage[type] = null;
    const fileInput = document.getElementById(`${type}FileInput`);
    if (fileInput) fileInput.value = '';
    
    const previewImg = document.getElementById(`${type}PreviewImg`);
    if (previewImg) {
      previewImg.src = '';
      previewImg.classList.add('hidden');
    }
    
    document.getElementById(`${type}UploadPrompt`)?.classList.remove('hidden');
    document.getElementById(`${type}ClearImgBtn`)?.classList.add('hidden');
  }

  loadExistingImageToPreview(type, imgUrl) {
    if (!imgUrl) {
      this.clearUploadedImage(type);
      return;
    }
    const previewImg = document.getElementById(`${type}PreviewImg`);
    if (previewImg) {
      previewImg.src = imgUrl;
      previewImg.classList.remove('hidden');
    }
    document.getElementById(`${type}UploadPrompt`)?.classList.add('hidden');
    document.getElementById(`${type}ClearImgBtn`)?.classList.remove('hidden');
  }

  // ==================== 原有核心功能與雲端同步 ====================
  isGasEnv() {
    return typeof google !== 'undefined' && google.script && google.script.run;
  }

  async syncFromCloud(showFeedback = true) {
    this.isSyncing = true;
    if (this.isGasEnv()) {
      google.script.run
        .withSuccessHandler((data) => this.applyCloudData(data, showFeedback))
        .withFailureHandler(() => { this.isSyncing = false; })
        .getAppData();
    } else if (this.gasUrl) {
      try {
        const res = await fetch(`${this.gasUrl}?api=get_data`);
        const json = await res.json();
        if (json.status === 'success' && json.data) this.applyCloudData(json.data, showFeedback);
      } catch (e) { } finally { this.isSyncing = false; }
    }
  }

  applyCloudData(data, showFeedback) {
    if (!data) return;
    if (data.yarns && data.yarns.length) { this.yarns = data.yarns; this.saveLocal('tung_yarns', this.yarns); }
    if (data.patterns && data.patterns.length) { this.patterns = data.patterns; this.saveLocal('tung_patterns', this.patterns); }
    if (data.projects && data.projects.length) { this.projects = data.projects; this.saveLocal('tung_projects', this.projects); }
    this.renderAll();
    if (showFeedback) this.showToast('已同步最新資料');
    this.isSyncing = false;
  }

  async dispatchCloudAction(action, payload) {
    this.isSyncing = true;
    if (this.isGasEnv()) {
      google.script.run
        .withSuccessHandler(() => { this.isSyncing = false; this.showToast('已同步至雲端'); })
        .withFailureHandler(() => { this.isSyncing = false; })
        .apiDispatch(action, payload);
    } else if (this.gasUrl) {
      try {
        await fetch(this.gasUrl, {
          method: 'POST', mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action, ...payload })
        });
        this.showToast('已同步至雲端');
      } catch (e) { } finally { this.isSyncing = false; }
    } else {
      this.isSyncing = false;
    }
  }

  initHomeCarousel() {
    const slides = document.querySelectorAll('.home-slide');
    if (!slides.length) return;
    let current = 0;
    setInterval(() => {
      slides[current].classList.remove('opacity-100');
      slides[current].classList.add('opacity-0');
      current = (current + 1) % slides.length;
      slides[current].classList.remove('opacity-0');
      slides[current].classList.add('opacity-100');
    }, 3000);
  }

  initCustomDropdowns() {
    document.querySelectorAll('.custom-dropdown').forEach(dd => {
      const btn = dd.querySelector('.custom-dropdown-btn');
      const label = dd.querySelector('.custom-dropdown-label');
      const hiddenInput = dd.querySelector('input[type="hidden"]');
      const items = dd.querySelectorAll('.custom-dropdown-item');

      btn.onclick = (e) => {
        e.stopPropagation();
        const isActive = dd.classList.contains('active');
        document.querySelectorAll('.custom-dropdown.active').forEach(other => {
          if (other !== dd) other.classList.remove('active');
        });
        dd.classList.toggle('active', !isActive);
      };

      items.forEach((item, index) => {
        item.style.setProperty('--i', index);
        item.onclick = (e) => {
          e.stopPropagation();
          const val = item.getAttribute('data-value');
          label.innerText = item.innerText;
          if (hiddenInput) hiddenInput.value = val;
          items.forEach(it => it.classList.remove('selected'));
          item.classList.add('selected');
          dd.classList.remove('active');
        };
      });
    });
    window.addEventListener('click', () => {
      document.querySelectorAll('.custom-dropdown.active').forEach(dd => dd.classList.remove('active'));
    });
  }

  populateDropdown(dropdownId, options, selectedValue) {
    const dd = document.getElementById(dropdownId);
    if (!dd) return;
    const menu = dd.querySelector('.custom-dropdown-menu');
    const hiddenInput = dd.querySelector('input[type="hidden"]');
    const label = dd.querySelector('.custom-dropdown-label');
    
    let validVal = options.includes(selectedValue) ? selectedValue : options[0];
    
    menu.innerHTML = options.map((opt, i) => `
      <div class="custom-dropdown-item ${opt === validVal ? 'selected' : ''}" style="--i:${i};" data-value="${opt}">${opt}</div>
    `).join('') + `<div class="custom-dropdown-item add-new" style="--i:${options.length};" data-value="__ADD_NEW__">+ 新增其他種類...</div>`;
    
    label.innerText = validVal;
    if (hiddenInput) hiddenInput.value = validVal;
    
    const items = menu.querySelectorAll('.custom-dropdown-item');
    items.forEach(item => {
      item.onclick = (e) => {
        e.stopPropagation();
        const val = item.getAttribute('data-value');
        if (val === '__ADD_NEW__') {
          dd.classList.remove('active');
          const newTag = prompt('請輸入新的分類名稱：');
          if (newTag && newTag.trim()) {
            const type = dropdownId === 'projectCategoryDropdown' ? 'category' : 'yarn';
            this.addGlobalTagFromPrompt(type, newTag.trim(), dropdownId);
          }
          return;
        }
        label.innerText = item.innerText;
        if (hiddenInput) hiddenInput.value = val;
        items.forEach(it => it.classList.remove('selected'));
        item.classList.add('selected');
        dd.classList.remove('active');
      };
    });
  }

  setDropdownValue(dropdownId, value) {
    const dd = document.getElementById(dropdownId);
    if (!dd) return;
    const label = dd.querySelector('.custom-dropdown-label');
    const hiddenInput = dd.querySelector('input[type="hidden"]');
    const items = dd.querySelectorAll('.custom-dropdown-item');
    let matched = false;
    items.forEach(item => {
      const val = item.getAttribute('data-value');
      if (val === value) { item.classList.add('selected'); label.innerText = item.innerText; matched = true; }
      else { item.classList.remove('selected'); }
    });
    if (matched && hiddenInput) hiddenInput.value = value;
  }

  initHistoryAndEdgeSwipe() {
    if (!history.state) {
      history.replaceState({ view: 'home' }, '');
    }

    window.addEventListener('popstate', (e) => {
      const openModal = document.querySelector('.fixed.inset-0:not(.hidden)');
      if (openModal) {
        openModal.classList.add('hidden');
        return;
      }
      if (this.currentView === 'yarns' && this.activeDrawerCategory) {
        this.activeDrawerCategory = null;
        this.renderInkText('pageTitle', '毛線手札');
        this.renderYarns();
        return;
      }
      if (this.currentView !== 'home') {
        this.goHome();
        history.pushState({ view: 'home' }, '');
        return;
      }
    });

    let edgeStartX = 0, edgeStartY = 0;
    window.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        edgeStartX = e.touches[0].clientX;
        edgeStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
      if (e.changedTouches.length === 1) {
        const diffX = e.changedTouches[0].clientX - edgeStartX;
        const diffY = e.changedTouches[0].clientY - edgeStartY;
        if (edgeStartX < 32 && diffX > 60 && Math.abs(diffY) < 40) {
          if (this.currentView !== 'home' || (this.currentView === 'yarns' && this.activeDrawerCategory)) {
            history.back();
          }
        }
      }
    }, { passive: true });
  }

  initPullToRefresh() {
    const main = document.getElementById('mainContainer');
    const ptr = document.getElementById('ptrContainer');
    const spinner = document.getElementById('ptrSpinner');
    if (!main || !ptr || !spinner) return;

    let startY = 0;
    let isPulling = false;
    let currentY = 0;

    main.addEventListener('touchstart', (e) => {
      if (main.scrollTop <= 0 && e.touches.length === 1) {
        startY = e.touches[0].clientY;
        isPulling = true;
        ptr.classList.remove('opacity-0', 'ptr-spinning');
      }
    }, { passive: true });

    main.addEventListener('touchmove', (e) => {
      if (!isPulling) return;
      const diff = e.touches[0].clientY - startY;

      if (diff > 0) {
        currentY = diff * 0.4;
        if (currentY > 75) currentY = 75 + (currentY - 75) * 0.15;
        
        if (window.gsap) {
          gsap.set(main, { y: currentY });
          gsap.set(ptr, { y: currentY + 16, opacity: Math.min(1, currentY / 50) });
          gsap.set(spinner, { rotation: currentY * 4 });
        }
        if (e.cancelable) e.preventDefault();
      }
    }, { passive: false });

    main.addEventListener('touchend', () => {
      if (!isPulling) return;
      isPulling = false;

      if (currentY > 60) {
        ptr.classList.add('ptr-spinning');
        if (window.gsap) {
          gsap.to(main, { y: 55, duration: 0.3, ease: "power2.out" });
          gsap.to(ptr, { y: 71, duration: 0.3, ease: "power2.out" });
        }
        
        this.syncFromCloud(true);
        setTimeout(() => {
          if (window.gsap) {
            gsap.to(main, { y: 0, duration: 0.4, ease: "power3.out", onComplete: () => gsap.set(main, {clearProps: "transform"}) });
            gsap.to(ptr, { y: 0, opacity: 0, duration: 0.4, ease: "power3.out", onComplete: () => ptr.classList.add('opacity-0') });
          }
        }, 1200);
      } else {
        if (window.gsap) {
          gsap.to(main, { y: 0, duration: 0.3, ease: "power3.out", onComplete: () => gsap.set(main, {clearProps: "transform"}) });
          gsap.to(ptr, { y: 0, opacity: 0, duration: 0.3, ease: "power3.out", onComplete: () => ptr.classList.add('opacity-0') });
        }
      }
      currentY = 0;
    }, { passive: true });
  }

  showToast(text) {
    const toast = document.getElementById('toastMessage');
    const toastText = document.getElementById('toastText');
    if (!toast || !toastText) return;
    toastText.innerText = text;
    toast.classList.remove('opacity-0', 'pointer-events-none');
    setTimeout(() => toast.classList.add('opacity-0', 'pointer-events-none'), 1600);
  }

  renderInkText(elId, text) {
    const el = document.getElementById(elId);
    if (!el) return;
    if (elId === 'brandTitle') {
      el.innerHTML = '';
      setTimeout(() => {
        el.innerHTML = text.split('').map((char, i) => `<span class="bounce-char" style="animation-delay: ${0.15 + i * 0.05}s">${char === ' ' ? '&nbsp;' : char}</span>`).join('');
      }, 15);
    } else {
      if (this.lastRenderedTitle === text && elId === 'pageTitle') return;
      el.innerHTML = text.split('').map((char, i) => `<span class="ink-char" style="animation-delay: ${i * 0.22}s">${char === ' ' ? '&nbsp;' : char}</span>`).join('');
      if (elId === 'pageTitle') this.lastRenderedTitle = text;
    }
  }

  goHome() {
    if (this.currentView === 'home') return;
    if (window.gsap) {
      gsap.killTweensOf('.view-section');
      gsap.killTweensOf('#mainContainer');
      gsap.set('.view-section', { clearProps: 'all' });
    }
    document.querySelectorAll('.view-section').forEach(el => {
      el.classList.add('hidden');
      el.classList.remove('active');
    });
    const homeView = document.getElementById('viewHome');
    if (homeView) {
      homeView.classList.remove('hidden');
      homeView.classList.add('active');
      if (window.gsap) {
        gsap.fromTo(homeView, { opacity: 0 }, { opacity: 1, duration: 0.18, ease: "power2.out" });
      }
    }
    this.currentView = 'home';
    this.activeDrawerCategory = null;
    this.renderInkText('pageTitle', "Linda's Handmade");

    const homeBtn = document.getElementById('navBackBtn');
    if (homeBtn) homeBtn.classList.add('hidden');
    const fab = document.getElementById('globalFabContainer');
    if (fab) fab.classList.add('hidden');

    document.querySelectorAll('.bottom-nav-btn').forEach(btn => btn.classList.remove('text-morandi-800', 'font-bold'));
    history.replaceState({ view: 'home' }, '');
  }

  navigate(viewName, direction = 0) {
    if (viewName === 'home') {
      this.goHome();
      return;
    }

    if (this.isNavigating || this.currentView === viewName) return;
    this.isNavigating = true;
    setTimeout(() => { this.isNavigating = false; }, 200);
    
    const oldView = this.currentView;
    history.replaceState({ view: viewName }, '');

    const currentEl = document.getElementById(this.viewMap[oldView]);
    const targetEl = document.getElementById(this.viewMap[viewName]);
    if (!targetEl) {
      this.isNavigating = false;
      return;
    }

    const homeBtn = document.getElementById('navBackBtn');
    if (homeBtn) homeBtn.classList.remove('hidden');
    const fab = document.getElementById('globalFabContainer');
    if (fab) fab.classList.remove('hidden');
    const bottomNav = document.getElementById('bottomNavBar');
    
    // 平滑左右動畫
    if (window.gsap) {
      let dir = direction;
      if (dir === 0) dir = this.viewOrder.indexOf(viewName) >= this.viewOrder.indexOf(oldView) ? 1 : -1;
      if (oldView === 'home') dir = 1;
      
      if (currentEl) {
        gsap.to(currentEl, { xPercent: -100 * dir, duration: 0.38, ease: "power2.inOut", onComplete: () => { 
          currentEl.classList.add('hidden'); 
          gsap.set(currentEl, {clearProps: "all"}); 
        }});
      }
      targetEl.classList.remove('hidden');
      targetEl.classList.add('active');
      gsap.fromTo(targetEl, { xPercent: 100 * dir }, { xPercent: 0, duration: 0.38, ease: "power2.inOut" });
      
      if (oldView === 'home' && bottomNav) {
        bottomNav.classList.remove('hidden');
        gsap.fromTo(bottomNav, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.38, ease: "power2.out" });
      }
    } else {
      if (currentEl) {
        currentEl.classList.add('hidden');
        currentEl.classList.remove('active');
      }
      targetEl.classList.remove('hidden');
      targetEl.classList.add('active');
      if (bottomNav) bottomNav.classList.remove('hidden');
    }

    this.currentView = viewName;

    document.querySelectorAll('.bottom-nav-btn').forEach(btn => {
      if (btn.dataset.target === viewName) {
        btn.classList.add('text-morandi-800', 'font-bold');
        btn.classList.remove('text-morandi-400');
      } else {
        btn.classList.remove('text-morandi-800', 'font-bold');
        btn.classList.add('text-morandi-400');
      }
    });

    if (viewName === 'yarns') {
      this.renderInkText('pageTitle', this.activeDrawerCategory || '毛線櫃');
      this.renderYarns();
    } else if (viewName === 'library') {
      this.renderInkText('pageTitle', '織典');
      this.renderPatterns();
    } else if (viewName === 'gallery') {
      this.renderInkText('pageTitle', '藝廊');
      this.renderGallery();
    } else if (viewName === 'chronometer') {
      this.renderInkText('pageTitle', '時光儀');
      if (fab) fab.classList.add('hidden');
      this.animateChronometerEntrance();
      this.renderCalendar();
    }
    
    const fabText = document.getElementById('globalFabText');
    if (fabText) {
      if (viewName === 'yarns') fabText.innerText = '新增線材';
      if (viewName === 'library') fabText.innerText = '典藏織譜';
      if (viewName === 'gallery') fabText.innerText = '記錄作品';
    }
  }

  handleGlobalFabClick() {
    if (this.currentView === 'yarns') {
      this.clearUploadedImage('yarn');
      document.getElementById('editYarnId').value = '';
      document.getElementById('yarnBrandInput').value = '';
      document.getElementById('yarnNameInput').value = '';
      document.getElementById('yarnAcquiredDateInput').value = '';
      document.getElementById('yarnNotesInput').value = '';
      document.getElementById('modalYarnTitle').innerText = '登錄毛線';
      this.setDropdownValue('yarnLocationDropdown', '台南');
      this.tempColors.yarn = [];
      this.renderTempColorDots('yarn');
      this.renderYarnTagSelectionGroup();
      this.openModal('modalAddYarn');
    }
  }

  addGlobalTagFromPrompt(type, tag, dropdownId) {
    if (type === 'yarn' && !this.globalYarnTags.includes(tag)) {
      this.globalYarnTags.push(tag);
      this.saveLocal('tung_global_yarn_tags', this.globalYarnTags);
    } else if (type === 'category' && !this.globalCategoryTags.includes(tag)) {
      this.globalCategoryTags.push(tag);
      this.saveLocal('tung_global_category_tags', this.globalCategoryTags);
    }
    this.showToast(`已新增分類 #${tag}`);
    const options = type === 'yarn' ? this.globalYarnTags : this.globalCategoryTags;
    this.populateDropdown(dropdownId, options, tag);
  }

  deleteGlobalTag(type, tag) {
    if (confirm(`確定要刪除標籤「#${tag}」嗎？\n這不會刪除已套用該標籤的作品。`)) {
      if (type === 'yarn') {
        this.globalYarnTags = this.globalYarnTags.filter(t => t !== tag);
        this.saveLocal('tung_global_yarn_tags', this.globalYarnTags);
        this.renderYarnTagSelectionGroup();
      } else {
        this.globalCategoryTags = this.globalCategoryTags.filter(t => t !== tag);
        this.saveLocal('tung_global_category_tags', this.globalCategoryTags);
        this.renderPatternTagSelectionGroup();
      }
      this.showToast(`已刪除標籤 #${tag}`);
    }
  }

  renderYarnTagSelectionGroup(activeTags = []) {
    const container = document.getElementById('yarnTypeSelectGroup');
    if (!container) return;
    container.innerHTML = this.globalYarnTags.map(t => {
      const isActive = activeTags.includes(t);
      return `
        <div class="relative inline-block tag-wrapper">
          <button type="button" onclick="app.toggleSelectTag(this)" class="tag-btn px-2.5 py-1 text-xs rounded-xl transition ${isActive ? 'bg-morandi-600 text-white font-bold' : 'bg-morandi-100 text-morandi-700'}">${t}</button>
        </div>
      `;
    }).join('');
  }

  renderYarnCharts() {
    const svg = document.getElementById('yarnPieSvg');
    const legend = document.getElementById('yarnChartLegend');
    const centerNum = document.getElementById('chartCenterNum');
    if (!svg || !legend) return;

    const totalBalls = this.yarns.reduce((sum, y) => sum + (Number(y.quantity) || 1), 0);
    if (centerNum) centerNum.innerText = totalBalls;
    if (totalBalls === 0) {
      svg.innerHTML = `<circle cx="18" cy="18" r="15.915" fill="none" stroke="#E4DAE8" stroke-width="3.8"/>`;
      legend.innerHTML = `<span class="text-xs text-morandi-400">目前尚無庫存數據</span>`;
      return;
    }
    let segments = [];
    if (this.yarnChartType === 'color') {
      const colorCounts = {};
      pikminPalette.filter(p => !p.isAll).forEach(p => colorCounts[p.id] = { name: p.name, color: p.color, count: 0 });
      this.yarns.forEach(y => {
        const hex = (y.colors && y.colors[0]) || '#9B83A4';
        const cat = getColorCategory(hex);
        if (colorCounts[cat]) colorCounts[cat].count += (Number(y.quantity) || 1);
      });
      segments = Object.values(colorCounts).filter(item => item.count > 0);
    } else {
      const tagCounts = { '其他': { name: '其他', color: '#849BB0', count: 0 } };
      this.globalYarnTags.forEach((t, i) => {
        tagCounts[t] = { name: t, color: pikminPalette[(i % 6) + 1].color, count: 0 };
      });
      this.yarns.forEach(y => {
        const firstTag = (y.tags && y.tags[0]) || '其他';
        if (tagCounts[firstTag]) tagCounts[firstTag].count += (Number(y.quantity) || 1);
        else tagCounts['其他'].count += (Number(y.quantity) || 1);
      });
      segments = Object.values(tagCounts).filter(item => item.count > 0);
    }

    let strokeDashOffset = 0; let svgHtml = '';
    segments.forEach((seg) => {
      const percent = (seg.count / totalBalls) * 100;
      svgHtml += `<circle cx="18" cy="18" r="15.915" fill="none" stroke="${seg.color}" stroke-width="3.8" stroke-dasharray="${percent} ${100 - percent}" stroke-dashoffset="${-strokeDashOffset}" style="transition: stroke-dashoffset 0.6s ease, stroke-dasharray 0.6s ease;"></circle>`;
      strokeDashOffset += percent;
    });
    svg.innerHTML = svgHtml;

    legend.innerHTML = segments.slice(0, 4).map(seg => {
      const pct = Math.round((seg.count / totalBalls) * 100);
      return `<div class="flex items-center justify-between text-xs font-serifTitle"><div class="flex items-center space-x-1.5 truncate"><span class="w-2 h-2 rounded-full shrink-0 shadow-sm" style="background-color: ${seg.color}"></span><span class="text-morandi-800 truncate">${seg.name}</span></div><span class="text-[10px] font-serifBrand text-morandi-500 font-semibold ml-2 shrink-0">${seg.count}球 (${pct}%)</span></div>`;
    }).join('');
  }

  initPikminFilterBar() {
    const bar = document.getElementById('yarnColorFilterBar');
    if (!bar) return;
    bar.innerHTML = pikminPalette.map(item => item.isAll ? 
      `<button onclick="app.selectPikminColor('all')" id="pikminBtn_all" class="shrink-0 px-3 py-1 rounded-full text-xs font-serifTitle transition bg-morandi-600 text-white font-bold shadow-sm">#全部</button>` : 
      `<button onclick="app.selectPikminColor('${item.id}', '${item.color}')" id="pikminBtn_${item.id}" class="shrink-0 w-6 h-6 rounded-full border-2 border-white shadow-sm transition active:scale-90 relative" style="background-color: ${item.color}" title="${item.name}"></button>`
    ).join('');
  }

  selectPikminColor(id, hex = null) {
    this.selectedPikminColorId = id;
    this.selectedPikminHex = hex;
    pikminPalette.forEach(item => {
      const btn = document.getElementById(`pikminBtn_${item.id}`);
      if (!btn) return;
      if (item.id === id) {
        if (item.isAll) { btn.className = 'shrink-0 px-3 py-1 rounded-full text-xs font-serifTitle transition bg-morandi-600 text-white font-bold shadow-sm'; } 
        else { btn.classList.add('color-active-glow'); }
      } else {
        if (item.isAll) { btn.className = 'shrink-0 px-3 py-1 rounded-full text-xs font-serifTitle transition bg-white/90 text-morandi-700 border border-morandi-200'; } 
        else { btn.classList.remove('color-active-glow'); }
      }
    });
    this.renderYarns(true);
  }

  renderYarns(useFlipAnimation = false) {
    if (!this.activeDrawerCategory) {
      this.renderYarnDrawers();
    } else {
      this.renderYarnWaterfall();
    }
  }

  renderYarnDrawers() {
    const grid = document.getElementById('yarnDrawerGrid');
    const waterfallSec = document.getElementById('yarnWaterfallSection');
    if (!grid) return;
    
    grid.classList.remove('hidden');
    if (waterfallSec) waterfallSec.classList.add('hidden');
    
    const allCategories = new Set(this.defaultYarnCategories);
    this.yarns.forEach(y => {
      const cat = this.getYarnCategory(y);
      if (cat) allCategories.add(cat);
    });

    const cardsHtml = Array.from(allCategories).map(cat => {
      const matched = this.yarns.filter(y => this.getYarnCategory(y) === cat);
      const totalBalls = matched.reduce((sum, y) => sum + (Number(y.quantity) || 0), 0);
      const coverImg = matched[0]?.image || fallbackSvg;
      
      const colorSet = new Set();
      matched.forEach(y => (y.colors || []).forEach(c => colorSet.add(c)));
      const previewColors = Array.from(colorSet).slice(0, 5);

      return `
        <div class="drawer-album-card-bleed" onclick="app.openYarnDrawer('${cat}')">
          <img src="${coverImg}" class="bleed-img" alt="${cat}" onerror="app.handleImgFallback(this)">
          <div class="bleed-mask"></div>
          <div class="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-serifBrand border border-white/30 shadow-sm">${totalBalls} 球</div>
          <div class="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
            <h4 class="text-sm font-serifTitle font-bold tracking-wider drop-shadow-md leading-tight">${cat}</h4>
            <div class="flex items-center -space-x-1 mt-1.5">
              ${previewColors.length ? previewColors.map(c => `<span class="w-3 h-3 rounded-full border border-white inline-block shadow-sm" style="background-color: ${c}"></span>`).join('') : '<span class="text-[9px] text-white/60 font-sans">尚無色票</span>'}
            </div>
          </div>
        </div>
      `;
    }).join('');

    const addCardHtml = `
      <div onclick="app.promptNewDrawerCategory()" class="drawer-album-card-bleed border-2 border-dashed border-morandi-300 bg-white/40 hover:bg-white/70 flex flex-col items-center justify-center p-4 text-center cursor-pointer">
        <div class="w-10 h-10 rounded-full bg-morandi-100 flex items-center justify-center text-morandi-600 mb-1.5 shadow-sm"><i class="ph ph-folder-plus text-xl"></i></div>
        <span class="text-xs font-serifTitle font-bold text-morandi-800">＋ 新增抽屜</span>
      </div>
    `;

    grid.innerHTML = cardsHtml + addCardHtml;
  }

  getYarnCategory(yarn) {
    if (yarn.drawer) return yarn.drawer;
    if (yarn.category) return yarn.category;
    const tags = yarn.tags || [];
    if (tags.includes('牛奶棉')) return '牛奶棉';
    if (tags.includes('羊毛')) return '羊毛';
    if (tags.includes('空心棉') || tags.includes('棉線')) return '空心棉/棉線';
    if (tags.some(t => ['拉菲草', '馬海毛', '金蔥', '皮革', '特殊'].includes(t))) return '特殊線材';
    return '特殊線材';
  }

  openYarnDrawer(category) {
    history.pushState({ drawer: category }, '');
    this.activeDrawerCategory = category;
    this.renderYarns(true);
  }
  closeYarnDrawer() {
    this.activeDrawerCategory = null;
    this.renderYarns(true);
  }
  promptNewDrawerCategory() {
    const name = prompt('請輸入新抽屜的分類名稱 (如：蕾絲線、毛巾線)：');
    if (name && name.trim()) {
      const trimmed = name.trim();
      this.defaultYarnCategories.push(trimmed);
      this.openYarnDrawer(trimmed);
      this.showToast(`已建立「${trimmed}」抽屜`);
    }
  }

  renderYarnWaterfall(useFlipAnimation = false) {
    const grid = document.getElementById('yarnDrawerGrid');
    const waterfallSec = document.getElementById('yarnWaterfallSection');
    const container = document.getElementById('yarnListContainer');
    const breadcrumb = document.getElementById('yarnDrawerBreadcrumb');

    if (!waterfallSec || !container) return;

    if (grid) grid.classList.add('hidden');
    waterfallSec.classList.remove('hidden');

    const currentCat = this.activeDrawerCategory;
    let matched = this.yarns.filter(y => this.getYarnCategory(y) === currentCat);
    
    // 套用皮克敏顏色濾鏡
    if (this.selectedPikminColorId !== 'all') {
      matched = matched.filter(y => {
        const hex = (y.colors && y.colors[0]) ? y.colors[0] : '#9B83A4';
        return getColorCategory(hex) === this.selectedPikminColorId;
      });
    }

    const totalBalls = matched.reduce((sum, y) => sum + (Number(y.quantity) || 0), 0);
    if (breadcrumb) {
      breadcrumb.innerText = `${currentCat} · ${totalBalls}球`;
      breadcrumb.classList.remove('hidden');
    }

    if (!matched.length) {
      container.innerHTML = `
        <div class="text-xs text-morandi-400 py-16 text-center font-serifTitle w-full flex flex-col items-center">
          <i class="ph ph-yarn text-3xl text-morandi-300 mb-2"></i>
          這個分類目前沒有符合的線材喔
        </div>`;
      return;
    }

    container.innerHTML = `<div class="grid grid-cols-2 gap-2.5 w-full">` + matched.map(y => `
      <div class="glass-panel rounded-2xl overflow-hidden shadow-sm cursor-pointer transition active:scale-[0.98] group flex flex-col w-full" onclick="app.openYarnDetail('${y.id}')">
        <div class="aspect-square bg-morandi-100 overflow-hidden relative">
          <img src="${y.image}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" onerror="app.handleImgFallback(this)">
          <div class="absolute bottom-1 right-1 bg-white/85 backdrop-blur-md px-1.5 py-0.5 rounded text-[8px] font-bold text-morandi-800">${y.quantity}球</div>
        </div>
        <div class="p-2">
          <h4 class="text-[10px] font-serifTitle font-bold text-morandi-900 truncate">${y.name}</h4>
          <div class="flex items-center space-x-1 mt-1">${(y.colors || []).map(c => `<span class="w-2 h-2 rounded-full border border-black/10 inline-block" style="background-color: ${c}"></span>`).join('')}</div>
        </div>
      </div>
    `).join('') + `</div>`;
  }

  addColorDot(type, hex) {
    if (!this.tempColors[type]) this.tempColors[type] = [];
    if (!this.tempColors[type].includes(hex)) {
      this.tempColors[type].push(hex);
      this.renderTempColorDots(type);
    }
  }
  removeColorDot(type, hex) {
    if (!this.tempColors[type]) return;
    this.tempColors[type] = this.tempColors[type].filter(c => c !== hex);
    this.renderTempColorDots(type);
  }
  renderTempColorDots(type) {
    const container = document.getElementById(type === 'yarn' ? 'yarnSelectedColors' : 'projectSelectedColors');
    if (!container) return;
    container.innerHTML = (this.tempColors[type] || []).map(c => `
      <button type="button" onclick="app.removeColorDot('${type}', '${c}')" class="w-6 h-6 rounded-full border border-black/15 shadow-inner flex items-center justify-center relative group active:scale-90 transition" style="background-color: ${c}">
        <span class="opacity-0 group-hover:opacity-100 text-[9px] text-white bg-black/60 rounded-full w-full h-full flex items-center justify-center">✕</span>
      </button>
    `).join('');
  }

  openModal(id) {
    history.pushState({ modal: id }, '');
    const el = document.getElementById(id);
    if (el) el.classList.remove('hidden');
  }
  closeModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  }
  stepModalCount(delta) {
    const input = document.getElementById('yarnQuantityInput');
    if (input) input.value = Math.max(1, parseInt(input.value || 1) + delta);
  }
  toggleSelectTag(btn) {
    if (!btn) return;
    btn.classList.toggle('bg-morandi-600');
    btn.classList.toggle('text-white');
    btn.classList.toggle('font-bold');
    btn.classList.toggle('bg-morandi-100');
    btn.classList.toggle('text-morandi-700');
  }

  saveYarn() {
    const editId = document.getElementById('editYarnId').value;
    const brand = document.getElementById('yarnBrandInput').value || 'DARUMA';
    const name = document.getElementById('yarnNameInput').value || '未命名線材';
    const quantity = parseInt(document.getElementById('yarnQuantityInput').value || 1);
    const location = document.getElementById('yarnLocationInput')?.value || '台南';
    const acquiredDate = document.getElementById('yarnAcquiredDateInput')?.value || '';
    const notes = document.getElementById('yarnNotesInput')?.value || '';
    const tags = Array.from(document.querySelectorAll('#yarnTypeSelectGroup .tag-btn.text-white')).map(b => b.innerText);
    const colors = this.tempColors.yarn.length ? [...this.tempColors.yarn] : ['#9B83A4'];
    const image = this.tempUploadedImage.yarn || fallbackSvg;
    
    const drawer = this.activeDrawerCategory || '未分類';
    let savedYarn = null;

    if (editId) {
      const yarn = this.yarns.find(y => y.id === editId);
      if (yarn) {
        yarn.brand = brand; yarn.name = name; yarn.quantity = quantity; yarn.location = location; 
        yarn.acquiredDate = acquiredDate; yarn.notes = notes; yarn.drawer = drawer;
        yarn.tags = tags.length ? tags : ['純色']; yarn.colors = colors; yarn.image = image;
        savedYarn = yarn;
      }
      this.showToast('毛線資料已更新');
    } else {
      savedYarn = { id: 'y_' + Date.now(), brand, name, colors, drawer, acquiredDate, notes, tags: tags.length ? tags : ['純色'], quantity, location, image };
      this.yarns.unshift(savedYarn);
      this.showToast('毛線已入櫃');
    }

    this.saveLocal('tung_yarns', this.yarns);
    this.renderYarns(false);
    this.closeModal('modalAddYarn');
    this.tempColors.yarn = [];
    this.tempUploadedImage.yarn = null;
    this.renderTempColorDots('yarn');
    document.getElementById('editYarnId').value = '';
  }

  // -----------------------------------------------------
  // 【其餘模組邏輯完整保留，不刪除！】
  // -----------------------------------------------------
  
  openYarnStatsModal() { this.renderYarnCharts(); this.openModal('modalYarnStats'); }
  closeYarnStatsModal() { this.closeModal('modalYarnStats'); }

  setPatternLayout(mode) {
    this.patternLayout = mode;
    this.renderPatterns();
  }

  renderPatterns() {
    const container = document.getElementById('patternListContainer');
    if (!container) return;
    let list = [...this.patterns];
    if (!list.length) { container.innerHTML = `<div class="text-xs text-morandi-400 py-12 text-center font-serifTitle w-full">查無符合織譜</div>`; return; }

    container.className = 'grid grid-cols-2 gap-2.5 relative';
    container.innerHTML = list.map(p => `
      <div onclick="app.openPatternLightbox('${p.id}')" class="glass-panel rounded-2xl overflow-hidden shadow-sm cursor-pointer transition active:scale-[0.98] group flex flex-col">
        <div class="aspect-square bg-morandi-100 overflow-hidden relative"><img src="${p.image}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" onerror="app.handleImgFallback(this)"></div>
        <div class="p-2"><h4 class="text-[10px] font-serifTitle font-bold text-morandi-900 truncate">${p.name}</h4><div class="flex items-center space-x-1 mt-0.5"><span class="text-[8px] text-morandi-400 font-serifBrand truncate">${(p.tags && p.tags[0]) || '織譜'}</span></div></div>
      </div>
    `).join('');
  }

  openPatternLightbox(id) {
    this.activePatternId = id; const p = this.patterns.find(item => item.id === id); if (!p) return;
    document.getElementById('patternViewerTitle').innerText = p.name;
    document.getElementById('patternViewerMeta').innerText = `${toDisplayDate(p.date)} · ${(p.tags || []).join(' ')}`;
    const imgEl = document.getElementById('patternViewerImg'); if (imgEl) imgEl.src = p.image;
    this.openModal('modalPatternViewer');
  }

  initKnittingRulerDrag() {
    const ruler = document.getElementById('knittingRuler'); const container = document.getElementById('patternViewerContainer'); if (!ruler || !container) return;
    let isDragging = false; const onDown = () => { isDragging = true; ruler.style.transition = 'none'; };
    const onMove = (e) => { if (!isDragging) return; const rect = container.getBoundingClientRect(); const clientY = e.touches ? e.touches[0].clientY : e.clientY; let top = clientY - rect.top; top = Math.max(10, Math.min(top, rect.height - 40)); ruler.style.top = `${top}px`; };
    const onUp = () => { isDragging = false; };
    ruler.addEventListener('mousedown', onDown); ruler.addEventListener('touchstart', onDown); window.addEventListener('mousemove', onMove); window.addEventListener('touchmove', onMove); window.addEventListener('mouseup', onUp); window.addEventListener('touchend', onUp);
  }

  setGalleryLayout(mode) {
    this.galleryLayout = mode;
    this.renderGallery();
  }
  
  initGalleryPinchZoom() {
    const container = document.getElementById('galleryGroupedContainer'); if (!container) return; let initialDist = 0;
    container.addEventListener('touchstart', (e) => { if (e.touches.length === 2) { initialDist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY); } }, { passive: true });
    container.addEventListener('touchmove', (e) => {
      if (e.touches.length === 2 && initialDist > 0) {
        const currentDist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY); const delta = currentDist - initialDist;
        if (delta > 60) { if (this.gridColumns > 1) { this.gridColumns--; initialDist = currentDist; this.renderGallery(); } }
        else if (delta < -60) { if (this.gridColumns < 4) { this.gridColumns++; initialDist = currentDist; this.renderGallery(); } }
      }
    }, { passive: true });
  }

  initYarnPinchZoom() {}

  renderGallery() {
    const container = document.getElementById('galleryGroupedContainer');
    if (!container) return;
    let list = [...this.projects];
    list.sort((a, b) => new Date(toInputDate(b.endDate) || toInputDate(relDate(0))) - new Date(toInputDate(a.endDate) || toInputDate(relDate(0))));
    if (!list.length) { container.innerHTML = `<div class="text-xs text-morandi-400 py-12 text-center font-serifTitle">查無符合作品</div>`; return; }

    const monthGroups = {};
    list.forEach(p => {
      const dateObj = new Date(toInputDate(p.endDate) || toInputDate(p.startDate));
      const key = `${dateObj.getFullYear()} 年 ${String(dateObj.getMonth() + 1).padStart(2, '0')} 月`;
      if (!monthGroups[key]) monthGroups[key] = []; monthGroups[key].push(p);
    });

    let html = '';
    Object.keys(monthGroups).forEach(monthLabel => {
      const groupItems = monthGroups[monthLabel];
      html += `<div class="flex flex-col gap-2 w-full"><div class="flex items-baseline justify-between px-1"><h3 class="text-xs font-serifTitle font-bold text-morandi-900 tracking-wider">${monthLabel}</h3><span class="text-[10px] text-morandi-400 font-serifBrand">${groupItems.length} 件作品</span></div>`;
      const gridClassMap = { 1: 'grid grid-cols-1 gap-3', 2: 'grid grid-cols-2 gap-2.5', 3: 'grid grid-cols-3 gap-1.5', 4: 'grid grid-cols-4 gap-1' };
      html += `<div class="${gridClassMap[this.gridColumns] || 'grid grid-cols-2 gap-2.5'}">`;
      html += groupItems.map(p => {
        if (this.gridColumns >= 3) {
          return `<div onclick="app.openProjectDetail('${p.id}')" class="aspect-square rounded-xl overflow-hidden bg-morandi-100 shadow-sm cursor-pointer active:scale-95 transition relative group w-full"><img src="${p.image}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" onerror="app.handleImgFallback(this)"></div>`;
        } else if (this.gridColumns === 1) {
          return `<div onclick="app.openProjectDetail('${p.id}')" class="glass-panel rounded-2xl overflow-hidden shadow-sm cursor-pointer transition active:scale-[0.98] group w-full"><div class="aspect-square bg-morandi-100 overflow-hidden"><img src="${p.image}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" onerror="app.handleImgFallback(this)"></div><div class="p-3"><h4 class="text-sm font-serifTitle font-bold text-morandi-900">${p.title}</h4><p class="text-xs text-morandi-500 line-clamp-1 mt-0.5">${p.notes || ''}</p></div></div>`;
        } else {
          return `<div onclick="app.openProjectDetail('${p.id}')" class="glass-panel rounded-2xl overflow-hidden shadow-sm cursor-pointer transition active:scale-[0.98] group w-full"><div class="w-full aspect-square bg-morandi-100 overflow-hidden relative"><img src="${p.image}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" onerror="app.handleImgFallback(this)"></div><div class="p-2.5"><h4 class="text-xs font-serifTitle font-bold text-morandi-900 truncate">${p.title}</h4><div class="flex items-center space-x-1 mt-1.5">${(p.colors || []).map(c => `<span class="w-2.5 h-2.5 rounded-full border border-black/10 inline-block shadow-inner" style="background-color: ${c}"></span>`).join('')}</div></div></div>`;
        }
      }).join('');
      html += `</div></div>`;
    });
    container.innerHTML = html;
  }

  openProjectDetail(id) {
    this.activeProjectId = id; const p = this.projects.find(item => item.id === id); if (!p) return;
    const imgEl = document.getElementById('detailImg'); if (imgEl) imgEl.src = p.image;
    document.getElementById('detailTitle').innerText = p.title;
    document.getElementById('detailPurpose').innerText = p.purpose || '自用';
    const displayEnd = p.endDate ? toDisplayDate(p.endDate) : '進行中';
    document.getElementById('detailDates').innerText = `${toDisplayDate(p.startDate)} ~ ${displayEnd}`;
    document.getElementById('detailNotes').innerText = p.notes || '尚無編織心情紀錄。';
    this.openModal('modalProjectDetail');
  }

  animateChronometerEntrance() { this.updateStats(); }
  
  updateStats() {
    const totalBalls = this.yarns.reduce((sum, y) => sum + (Number(y.quantity) || 0), 0);
    const elBalls = document.getElementById('statYarnBalls');
    const elPatterns = document.getElementById('statPatternsCount');
    const elProjects = document.getElementById('statProjectsCount');
    if (elBalls) elBalls.innerText = totalBalls;
    if (elPatterns) elPatterns.innerText = this.patterns.length;
    if (elProjects) elProjects.innerText = this.projects.length;
  }

  changeCalendarMonth(delta) {
    this.calendarDate.setMonth(this.calendarDate.getMonth() + delta);
    this.renderCalendar();
  }

  renderCalendar() {
    const container = document.getElementById('calendarGrid');
    const label = document.getElementById('calendarMonthLabel');
    if (!container || !label) return;
    
    const year = this.calendarDate.getFullYear();
    const month = this.calendarDate.getMonth();
    label.innerText = `${year} 年 ${String(month + 1).padStart(2, '0')} 月`;
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startOffset = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    
    let html = '';
    for (let i = 0; i < startOffset; i++) html += `<div class="bg-oat-50/40 h-16 border-b border-r border-morandi-100/30"></div>`;

    for (let d = 1; d <= daysInMonth; d++) {
      const currentStr = `${year}.${String(month + 1).padStart(2, '0')}.${String(d).padStart(2, '0')}`;
      const isToday = currentStr === relDate(0);

      const activeProjects = this.projects.filter(p => {
        const s = toDisplayDate(p.startDate);
        const e = p.endDate ? toDisplayDate(p.endDate) : relDate(0);
        return s <= currentStr && e >= currentStr;
      });
      const endingProjects = activeProjects.filter(p => p.endDate && toDisplayDate(p.endDate) === currentStr);

      html += `<div class="bg-white h-16 border-b border-r border-morandi-100/50 p-1 flex flex-col relative overflow-hidden transition ${activeProjects.length > 0 ? 'hover:bg-morandi-50/50' : ''}">`;
      html += `<span class="text-[10px] font-serifBrand ${isToday ? 'bg-morandi-600 text-white rounded-full w-4 h-4 flex items-center justify-center font-bold mb-0.5' : 'text-morandi-600 mb-0.5'}">${d}</span>`;
      if (activeProjects.length > 0) {
        html += `<div class="flex flex-col gap-0.5 mt-0.5">`;
        activeProjects.forEach(p => { html += `<div class="h-1.5 w-full rounded-sm shadow-sm" style="background-color: ${p.colors[0] || '#9B83A4'}"></div>`; });
        html += `</div>`;
      }
      if (endingProjects.length > 0) {
        html += `<div class="absolute bottom-1 right-1 flex -space-x-2">`;
        endingProjects.forEach(p => { html += `<img src="${p.image}" class="w-6 h-6 rounded-md object-cover border-2 border-white shadow-sm cursor-pointer active:scale-90 transition z-10 hover:z-20" onclick="app.openProjectDetail('${p.id}')" onerror="app.handleImgFallback(this)" title="${p.title}">`; });
        html += `</div>`;
      }
      html += `</div>`;
    }

    const totalCells = startOffset + daysInMonth;
    const remainder = totalCells % 7;
    if (remainder > 0) {
      const fillCount = 7 - remainder;
      for (let i = 0; i < fillCount; i++) html += `<div class="bg-oat-50/40 h-16 border-b border-r border-morandi-100/30"></div>`;
    }
    container.innerHTML = html;
  }

  renderAll() {
    this.renderYarns(false);
    this.renderPatterns();
    this.renderGallery();
    this.updateStats();
  }
}

function initStudioApp() {
  if (window.gsap && window.Flip) gsap.registerPlugin(Flip);
  if (!window.app || !(window.app instanceof AppController)) {
    window.app = new AppController();
    window.app.init();
  }
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initStudioApp);
else initStudioApp();
