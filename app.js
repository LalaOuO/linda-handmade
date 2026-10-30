
    function relDate(daysOffset) {
      const d = new Date();
      d.setDate(d.getDate() + daysOffset);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
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

    const defaultYarns = [
      { id: 'y1', brand: 'DARUMA', name: '柔軟細羊毛', colors: ['#9B83A4', '#C7B7CA'], tags: ['羊毛', '純色'], quantity: 4, location: '台南', image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=500&q=80' },
      { id: 'y2', brand: 'Hamanaka', name: '星光金蔥棉線', colors: ['#EBE7DF', '#D4A373'], tags: ['金蔥', '棉線'], quantity: 2, location: '高雄', image: 'https://images.unsplash.com/photo-1615715616181-79e5f5f4b50c?auto=format&fit=crop&w=500&q=80' }
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
    function hslToHex(h, s, l) {
      l /= 100;
      const a = s * Math.min(l, 1 - l) / 100;
      const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
      };
      return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
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
        this.viewOrder = ['yarns', 'library', 'gallery', 'chronometer'];
        this.lastRenderedTitle = '';
        this.selectedPikminColorId = 'all';
        this.selectedPikminHex = null;

        this.yarnLayout = 'list';
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

        // 階段三：1:1 畫布縮放與滴管狀態機
        this.cropperState = {
          yarn: { img: null, scale: 1, minScale: 1, x: 0, y: 0, isEyedropper: false, pickedHex: null },
          project: { img: null, scale: 1, minScale: 1, x: 0, y: 0, isEyedropper: false, pickedHex: null }
        };
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
          this.initLindaSignature(); // 初始化手寫簽名
          this.renderInkText('pageTitle', '手札');
          this.renderInkText('brandTitle', "LINDA'S HANDMADE");
          this.renderAll();
          this.initPikminFilterBar();
          this.renderYarnTagSelectionGroup();
          this.initKnittingRulerDrag();
          this.initGalleryPinchZoom();
          this.initYarnPinchZoom();
          this.initCustomDropdowns();
          this.initPageSwipeGestures();
          this.initHomeCarousel();
          
          // 階段三初始化
          this.initPresetPalettes();
          this.initInteractiveCanvas('yarn');
          this.initInteractiveCanvas('project');

          this.syncFromCloud(false);
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
          document.fonts.ready.then(() => {
            container.classList.add('is-ready');
          });
        } else {
          container.classList.add('is-ready');
        }
      }

      triggerLindaCoinFlip() {
        const signEl = document.getElementById('homeBrandSign');
        if (!signEl || signEl.classList.contains('is-flipping')) return;

        signEl.classList.add('is-flipping');

        setTimeout(() => {
          signEl.classList.remove('is-flipping');
        }, 2200);
      }


        

      // ==================== 階段三：預設莫蘭迪色列與線性光譜 ====================
      initPresetPalettes() {
        const morandiPresets = pikminPalette.filter(p => !p.isAll);
        ['yarn', 'project'].forEach(type => {
          const container = document.getElementById(`${type}PresetPalette`);
          if (!container) return;
          container.innerHTML = morandiPresets.map(p => `
            <button type="button" onclick="app.addColorDot('${type}', '${p.color}')" class="w-6 h-6 rounded-full border-2 border-white shadow-sm shrink-0 active:scale-90 transition hover:scale-110" style="background-color: ${p.color}" title="${p.name}"></button>
          `).join('');
        });
      }

      toggleLinearSpectrum(type) {
        const el = document.getElementById(`${type}LinearSpectrum`);
        if (!el) return;
        el.classList.toggle('hidden');
        el.classList.toggle('flex');
        if (!el.classList.contains('hidden')) {
          this.onLinearSpectrumChange(type);
        }
      }

      onLinearSpectrumChange(type) {
        const hueEl = document.getElementById(`${type}HueSlider`);
        const lightEl = document.getElementById(`${type}LightSlider`);
        const previewEl = document.getElementById(`${type}SpectrumPreview`);
        if (!hueEl || !lightEl || !previewEl) return;

        const h = parseInt(hueEl.value || 0);
        const l = parseInt(lightEl.value || 58);
        // 保持莫蘭迪低飽和度質感 (固定飽和度 32%)
        const hex = hslToHex(h, 35, l);
        previewEl.style.backgroundColor = hex;
        previewEl.setAttribute('data-hex', hex);
        hueEl.style.setProperty('--thumb-color', hslToHex(h, 70, 55));
      }

      confirmSpectrumColor(type) {
        const previewEl = document.getElementById(`${type}SpectrumPreview`);
        const hex = previewEl?.getAttribute('data-hex') || '#9B83A4';
        this.addColorDot(type, hex);
        this.showToast(`已加入自訂色 ${hex}`);
      }

      // ==================== 階段三：1:1 縮放裁切畫布與放大鏡滴管 ====================
      initInteractiveCanvas(type) {
        const canvas = document.getElementById(`${type}Canvas`);
        if (!canvas) return;
        const state = this.cropperState[type];

        let isDragging = false;
        let startX = 0, startY = 0;
        let initialPinchDist = 0;
        let initialScale = 1;

        const getTouchDist = (t1, t2) => Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);

        // 1. 觸控開始 / 滑鼠按下
        const onStart = (clientX, clientY, touches) => {
          if (!state.img) return;
          if (state.isEyedropper) {
            this.updateEyedropperMagnifier(type, clientX, clientY);
            return;
          }
          if (touches && touches.length === 2) {
            isDragging = false;
            initialPinchDist = getTouchDist(touches[0], touches[1]);
            initialScale = state.scale;
          } else {
            isDragging = true;
            startX = clientX - state.x;
            startY = clientY - state.y;
          }
        };

        // 2. 觸控移動 / 滑鼠拖曳
        const onMove = (clientX, clientY, touches, e) => {
          if (!state.img) return;
          if (state.isEyedropper) {
            if (e && e.cancelable) e.preventDefault();
            this.updateEyedropperMagnifier(type, clientX, clientY);
            return;
          }
          if (touches && touches.length === 2 && initialPinchDist > 0) {
            if (e && e.cancelable) e.preventDefault();
            const dist = getTouchDist(touches[0], touches[1]);
            const ratio = dist / initialPinchDist;
            state.scale = Math.max(state.minScale, Math.min(initialScale * ratio, state.minScale * 4));
            this.clampAndDrawCropper(type);
          } else if (isDragging) {
            if (e && e.cancelable) e.preventDefault();
            state.x = clientX - startX;
            state.y = clientY - startY;
            this.clampAndDrawCropper(type);
          }
        };

        // 3. 觸控放開 / 滑鼠放開
        const onEnd = () => {
          if (!state.img) return;
          if (state.isEyedropper) {
            if (state.pickedHex) {
              this.addColorDot(type, state.pickedHex);
              this.showToast(`已吸取色調 ${state.pickedHex}`);
            }
            this.deactivateEyedropper(type);
            return;
          }
          if (isDragging || initialPinchDist > 0) {
            isDragging = false;
            initialPinchDist = 0;
            this.exportCroppedImage(type);
          }
        };

        // 綁定 Touch 事件
        canvas.addEventListener('touchstart', (e) => {
          const t = e.touches[0];
          onStart(t.clientX, t.clientY, e.touches);
        }, { passive: false });

        canvas.addEventListener('touchmove', (e) => {
          const t = e.touches[0];
          onMove(t.clientX, t.clientY, e.touches, e);
        }, { passive: false });

        canvas.addEventListener('touchend', () => onEnd());

        // 綁定 Mouse 事件 (支援電腦端操作與滾輪縮放)
        canvas.addEventListener('mousedown', (e) => onStart(e.clientX, e.clientY, null));
        window.addEventListener('mousemove', (e) => {
          if (isDragging || (state.isEyedropper && e.buttons === 1)) {
            onMove(e.clientX, e.clientY, null, e);
          }
        });
        window.addEventListener('mouseup', () => {
          if (isDragging || state.isEyedropper) onEnd();
        });

        canvas.addEventListener('wheel', (e) => {
          if (!state.img || state.isEyedropper) return;
          e.preventDefault();
          const delta = e.deltaY < 0 ? 1.08 : 0.92;
          state.scale = Math.max(state.minScale, Math.min(state.scale * delta, state.minScale * 4));
          this.clampAndDrawCropper(type);
          this.exportCroppedImage(type);
        }, { passive: false });
      }

      clampAndDrawCropper(type) {
        const canvas = document.getElementById(`${type}Canvas`);
        const state = this.cropperState[type];
        if (!canvas || !state.img) return;

        const ctx = canvas.getContext('2d');
        const cw = canvas.width;
        const ch = canvas.height;
        const iw = state.img.width * state.scale;
        const ih = state.img.height * state.scale;

        // 限制邊界避免留白
        if (iw >= cw) {
          state.x = Math.min(0, Math.max(cw - iw, state.x));
        } else {
          state.x = (cw - iw) / 2;
        }
        if (ih >= ch) {
          state.y = Math.min(0, Math.max(ch - ih, state.y));
        } else {
          state.y = (ch - ih) / 2;
        }

        ctx.clearRect(0, 0, cw, ch);
        ctx.fillStyle = '#FAF7F2';
        ctx.fillRect(0, 0, cw, ch);
        ctx.drawImage(state.img, state.x, state.y, iw, ih);
      }

      exportCroppedImage(type) {
        const canvas = document.getElementById(`${type}Canvas`);
        if (!canvas || !this.cropperState[type].img) return;
        this.tempUploadedImage[type] = canvas.toDataURL('image/jpeg', 0.88);
      }

      handleImageUpload(event, type) {
        const file = event.target.files && event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.getElementById(`${type}Canvas`);
            if (!canvas) return;
            canvas.width = 600;
            canvas.height = 600;

            const state = this.cropperState[type];
            state.img = img;
            // 計算填滿 600x600 的最小縮放比
            state.minScale = Math.max(600 / img.width, 600 / img.height);
            state.scale = state.minScale;
            state.x = (600 - img.width * state.scale) / 2;
            state.y = (600 - img.height * state.scale) / 2;

            this.clampAndDrawCropper(type);
            this.exportCroppedImage(type);

            // 更新 UI 狀態：隱藏上傳提示與 file input，顯示刪除與滴管按鈕
            document.getElementById(`${type}UploadPrompt`)?.classList.add('hidden');
            document.getElementById(`${type}FileInput`)?.classList.add('hidden');
            document.getElementById(`${type}ClearImgBtn`)?.classList.remove('hidden');
            document.getElementById(`${type}EyedropperBtn`)?.classList.remove('hidden');
            document.getElementById(`${type}CropHint`)?.classList.remove('hidden');
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }

      // 刪除照片並重新傳送
      clearUploadedImage(type) {
        const state = this.cropperState[type];
        state.img = null;
        state.isEyedropper = false;
        this.tempUploadedImage[type] = null;

        const canvas = document.getElementById(`${type}Canvas`);
        if (canvas) {
          const ctx = canvas.getContext('2d');
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        const fileInput = document.getElementById(`${type}FileInput`);
        if (fileInput) {
          fileInput.value = '';
          fileInput.classList.remove('hidden');
        }

        document.getElementById(`${type}UploadPrompt`)?.classList.remove('hidden');
        document.getElementById(`${type}ClearImgBtn`)?.classList.add('hidden');
        document.getElementById(`${type}EyedropperBtn`)?.classList.add('hidden');
        document.getElementById(`${type}CropHint`)?.classList.add('hidden');
        this.deactivateEyedropper(type);
        this.showToast('已清除照片，請重新選擇');
      }

      // 啟動右下角單次滴管取色模式
      activateEyedropper(type) {
        const state = this.cropperState[type];
        if (!state.img) return;
        state.isEyedropper = !state.isEyedropper;
        const btn = document.getElementById(`${type}EyedropperBtn`);
        const hint = document.getElementById(`${type}CropHint`);

        if (state.isEyedropper) {
          btn?.classList.add('eyedropper-active');
          if (hint) hint.innerText = '請在照片上拖曳吸色，放開即完成';
          this.showToast('請在照片上拖曳吸取顏色');
        } else {
          this.deactivateEyedropper(type);
        }
      }

      deactivateEyedropper(type) {
        const state = this.cropperState[type];
        state.isEyedropper = false;
        state.pickedHex = null;
        document.getElementById(`${type}EyedropperBtn`)?.classList.remove('eyedropper-active');
        const hint = document.getElementById(`${type}CropHint`);
        if (hint) hint.innerText = '雙指縮放 · 單指移動';
        document.getElementById('colorMagnifier')?.classList.add('hidden');
      }

      updateEyedropperMagnifier(type, clientX, clientY) {
        const canvas = document.getElementById(`${type}Canvas`);
        const mag = document.getElementById('colorMagnifier');
        const magCanvas = document.getElementById('magnifierCanvas');
        if (!canvas || !mag || !magCanvas) return;

        const rect = canvas.getBoundingClientRect();
        // 限制在畫布範圍內
        const clampedX = Math.max(rect.left, Math.min(clientX, rect.right - 1));
        const clampedY = Math.max(rect.top, Math.min(clientY, rect.bottom - 1));

        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const cx = (clampedX - rect.left) * scaleX;
        const cy = (clampedY - rect.top) * scaleY;

        const ctx = canvas.getContext('2d');
        const pixel = ctx.getImageData(cx, cy, 1, 1).data;
        const hex = '#' + ((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1).toUpperCase();
        this.cropperState[type].pickedHex = hex;

        // 顯示並定位放大鏡
        mag.classList.remove('hidden');
        mag.style.left = `${clampedX}px`;
        mag.style.top = `${clampedY}px`;
        mag.style.borderColor = hex;
        mag.style.boxShadow = `0 0 0 2px #FFFFFF, 0 8px 20px rgba(0,0,0,0.35)`;

        // 繪製 3 倍放大像素至放大鏡 Canvas
        const magCtx = magCanvas.getContext('2d');
        magCtx.imageSmoothingEnabled = false;
        magCtx.clearRect(0, 0, 80, 80);
        const sampleSize = 26;
        magCtx.drawImage(
          canvas,
          cx - sampleSize / 2, cy - sampleSize / 2, sampleSize, sampleSize,
          0, 0, 80, 80
        );
      }

      // 載入既有圖片至 1:1 畫布 (用於編輯模式)
      loadExistingImageToCanvas(type, imgUrl) {
        if (!imgUrl) {
          this.clearUploadedImage(type);
          return;
        }
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          const canvas = document.getElementById(`${type}Canvas`);
          if (!canvas) return;
          canvas.width = 600;
          canvas.height = 600;
          const state = this.cropperState[type];
          state.img = img;
          state.minScale = Math.max(600 / img.width, 600 / img.height);
          state.scale = state.minScale;
          state.x = (600 - img.width * state.scale) / 2;
          state.y = (600 - img.height * state.scale) / 2;
          this.clampAndDrawCropper(type);

          document.getElementById(`${type}UploadPrompt`)?.classList.add('hidden');
          document.getElementById(`${type}FileInput`)?.classList.add('hidden');
          document.getElementById(`${type}ClearImgBtn`)?.classList.remove('hidden');
          document.getElementById(`${type}EyedropperBtn`)?.classList.remove('hidden');
          document.getElementById(`${type}CropHint`)?.classList.remove('hidden');
        };
        img.src = imgUrl;
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
            .withSuccessHandler(() => { this.isSyncing = false; this.showToast('已同步至雲端 Drive'); })
            .withFailureHandler(() => { this.isSyncing = false; })
            .apiDispatch(action, payload);
        } else if (this.gasUrl) {
          try {
            await fetch(this.gasUrl, {
              method: 'POST', mode: 'no-cors',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ action, ...payload })
            });
            this.showToast('已同步至雲端 Drive');
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
              const newTag = prompt('請輸入新的標籤名稱：');
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

      initPageSwipeGestures() {
        const main = document.getElementById('mainContainer');
        if (!main) return;
        let startX = 0, startY = 0, startTime = 0;
        main.addEventListener('touchstart', (e) => {
          if (this.currentView === 'home') return;
          if (e.touches.length === 1) {
            startX = e.touches[0].clientX; startY = e.touches[0].clientY; startTime = Date.now();
          }
        }, { passive: true });
        main.addEventListener('touchend', (e) => {
          if (this.currentView === 'home') return;
          if (e.changedTouches.length === 1) {
            const diffX = e.changedTouches[0].clientX - startX;
            const diffY = e.changedTouches[0].clientY - startY;
            const duration = Date.now() - startTime;
            if (Math.abs(diffX) > 55 && Math.abs(diffX) > Math.abs(diffY) * 1.5 && duration < 350) {
              const curIdx = this.viewOrder.indexOf(this.currentView);
              if (curIdx === -1) return;
              if (diffX < 0 && curIdx < this.viewOrder.length - 1) this.navigate(this.viewOrder[curIdx + 1], 1);
              else if (diffX > 0 && curIdx > 0) this.navigate(this.viewOrder[curIdx - 1], -1);
            }
          }
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

      navigate(viewName, direction = 0) {
        if (this.currentView === viewName) return;
        const oldView = this.currentView;
        this.currentView = viewName;
        const viewMap = { home: 'viewHome', yarns: 'viewYarns', library: 'viewLibrary', gallery: 'viewGallery', chronometer: 'viewChronometer' };
        const oldEl = document.getElementById(viewMap[oldView]);
        const newEl = document.getElementById(viewMap[viewName]);
        if (!newEl) return;
        newEl.classList.remove('hidden');

        const backBtn = document.getElementById('navBackBtn');
        const bottomNav = document.getElementById('bottomNavBar');
        this.renderInkText('brandTitle', "LINDA'S HANDMADE");

        if (viewName === 'home') {
          if (backBtn) backBtn.classList.add('hidden');
          if (bottomNav) gsap.to(bottomNav, { y: 20, opacity: 0, duration: 0.3, onComplete: () => bottomNav.classList.add('hidden') });
          if (window.gsap && oldEl) {
            gsap.to(oldEl, { xPercent: 100, duration: 0.38, ease: "power2.inOut", onComplete: () => { oldEl.classList.add('hidden'); gsap.set(oldEl, {clearProps: "all"}); } });
            gsap.fromTo(newEl, { xPercent: -100 }, { xPercent: 0, duration: 0.38, ease: "power2.inOut" });
          } else if (oldEl) oldEl.classList.add('hidden');
        } else {
          if (backBtn) backBtn.classList.remove('hidden');
          if (bottomNav) {
            bottomNav.classList.remove('hidden');
            if (oldView === 'home') gsap.fromTo(bottomNav, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.38, ease: "power2.out" });
          }
          if (window.gsap && oldEl) {
            let dir = direction;
            if (dir === 0) dir = this.viewOrder.indexOf(viewName) >= this.viewOrder.indexOf(oldView) ? 1 : -1;
            if (oldView === 'home') dir = 1;
            gsap.to(oldEl, { xPercent: -100 * dir, duration: 0.38, ease: "power2.inOut", onComplete: () => { oldEl.classList.add('hidden'); gsap.set(oldEl, {clearProps: "all"}); } });
            gsap.fromTo(newEl, { xPercent: 100 * dir }, { xPercent: 0, duration: 0.38, ease: "power2.inOut" });
          } else if (oldEl) oldEl.classList.add('hidden');
        }

        ['yarns', 'library', 'gallery', 'chronometer'].forEach(v => {
          const btn = document.getElementById(`tabBtn_${v}`);
          if (btn) btn.className = v === viewName ? 'flex flex-col items-center space-y-1 w-14 text-morandi-700 font-bold transition scale-110' : 'flex flex-col items-center space-y-1 w-14 text-morandi-400 hover:text-morandi-700 transition';
        });

        const globalFab = document.getElementById('globalFabContainer');
        const fabText = document.getElementById('globalFabText');

        if (viewName === 'home') {
          if (globalFab) globalFab.classList.add('hidden');
          this.renderInkText('pageTitle', '手札');
        } else {
          if (globalFab) globalFab.classList.remove('hidden');
          const titleMap = { yarns: '毛線櫃', library: '織典', gallery: '藝廊', chronometer: '時光儀' };
          this.renderInkText('pageTitle', titleMap[viewName] || '手札');
          if (fabText) {
            if (viewName === 'yarns') fabText.innerText = '新增線材';
            if (viewName === 'library') fabText.innerText = '典藏織譜';
            if (viewName === 'gallery') fabText.innerText = '記錄作品';
            if (viewName === 'chronometer') globalFab.classList.add('hidden');
          }
        }

        if (viewName === 'chronometer') { this.animateChronometerEntrance(); this.renderCalendar(); }
        else if (viewName === 'gallery') this.renderGallery();
        else if (viewName === 'yarns') { this.renderYarnCharts(); this.renderYarns(false); }
        else if (viewName === 'library') this.renderPatterns();
      }

      goHome() { this.navigate('home', -1); }

      handleGlobalFabClick() {
        if (this.currentView === 'yarns') {
          this.clearUploadedImage('yarn');
          document.getElementById('editYarnId').value = '';
          document.getElementById('yarnBrandInput').value = '';
          document.getElementById('yarnNameInput').value = '';
          document.getElementById('modalYarnTitle').innerText = '登錄毛線';
          this.setDropdownValue('yarnLocationDropdown', '台南');
          this.tempColors.yarn = [];
          this.renderTempColorDots('yarn');
          this.renderYarnTagSelectionGroup();
          this.openModal('modalAddYarn');
        }
        if (this.currentView === 'library') {
          this.tempUploadedImage.pattern = null;
          document.getElementById('patternNameInput').value = '';
          document.getElementById('patternUrlInput').value = '';
          this.renderPatternTagSelectionGroup();
          this.openModal('modalAddPattern');
        }
        if (this.currentView === 'gallery') {
          this.clearUploadedImage('project');
          document.getElementById('editProjectId').value = '';
          document.getElementById('projectNameInput').value = '';
          document.getElementById('projectNotesInput').value = '';
          document.getElementById('projectStartDate').value = toInputDate(relDate(0));
          document.getElementById('modalProjectTitle').innerText = '記錄作品';
          
          this.toggleProjectWip(false);
          document.getElementById('projectIsWip').checked = false;
          this.tempColors.project = [];
          this.renderTempColorDots('project');

          this.populateDropdown('projectCategoryDropdown', this.globalCategoryTags, '包包');
          this.populateDropdown('projectYarnTagDropdown', this.globalYarnTags, '羊毛');
          this.openModal('modalAddProject');
        }
      }

      toggleProjectWip(isWip) {
        const endInput = document.getElementById('projectEndDate');
        if (!endInput) return;
        if (isWip) {
          endInput.value = '';
          endInput.disabled = true;
          endInput.classList.add('opacity-40');
        } else {
          endInput.disabled = false;
          endInput.classList.remove('opacity-40');
          if (!endInput.value) endInput.value = toInputDate(relDate(0));
        }
      }

      startTagPress(e, type, tag) {
        this.tagPressTimer = setTimeout(() => {
          document.querySelectorAll('.tag-wrapper').forEach(el => el.classList.add('wiggle-mode'));
          this.showToast('進入標籤編輯模式');
        }, 500);
      }
      cancelTagPress() { clearTimeout(this.tagPressTimer); }
      exitTagEditMode() {
        document.querySelectorAll('.tag-wrapper').forEach(el => el.classList.remove('wiggle-mode'));
      }

      addGlobalTagFromInput(type) {
        const inputId = type === 'yarn' ? 'newCustomTagInput' : 'newPatternTagInput';
        const input = document.getElementById(inputId);
        if (!input) return;
        const tag = input.value.trim();
        if (tag) {
          if (type === 'yarn' && !this.globalYarnTags.includes(tag)) {
            this.globalYarnTags.push(tag);
            this.saveLocal('tung_global_yarn_tags', this.globalYarnTags);
            this.renderYarnTagSelectionGroup();
          } else if (type === 'pattern' && !this.globalCategoryTags.includes(tag)) {
            this.globalCategoryTags.push(tag);
            this.saveLocal('tung_global_category_tags', this.globalCategoryTags);
            this.renderPatternTagSelectionGroup([tag]);
          }
          input.value = '';
          this.showToast(`已新增標籤 #${tag}`);
          
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
            <div class="relative inline-block tag-wrapper" onmousedown="app.startTagPress(event, 'yarn', '${t}')" onmouseup="app.cancelTagPress()" onmouseleave="app.cancelTagPress()" ontouchstart="app.startTagPress(event, 'yarn', '${t}')" ontouchend="app.cancelTagPress()" ontouchmove="app.cancelTagPress()">
              <button type="button" onclick="app.toggleSelectTag(this)" class="tag-btn px-2.5 py-1 text-xs rounded-xl transition ${isActive ? 'bg-morandi-600 text-white font-bold' : 'bg-morandi-100 text-morandi-700'}">${t}</button>
              <button type="button" class="delete-badge absolute -top-1.5 -right-1.5 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] items-center justify-center border-2 border-white z-10" onclick="event.stopPropagation(); app.deleteGlobalTag('yarn', '${t}')">✕</button>
            </div>
          `;
        }).join('');
      }

      renderPatternTagSelectionGroup(activeTags = []) {
        const container = document.getElementById('patternTypeSelectGroup');
        if (!container) return;
        container.innerHTML = this.globalCategoryTags.map(t => {
          const isActive = activeTags.includes(t);
          return `
            <div class="relative inline-block tag-wrapper" onmousedown="app.startTagPress(event, 'pattern', '${t}')" onmouseup="app.cancelTagPress()" onmouseleave="app.cancelTagPress()" ontouchstart="app.startTagPress(event, 'pattern', '${t}')" ontouchend="app.cancelTagPress()" ontouchmove="app.cancelTagPress()">
              <button type="button" onclick="app.toggleSelectTag(this)" class="tag-btn px-2.5 py-1 text-xs rounded-xl transition ${isActive ? 'bg-morandi-600 text-white font-bold' : 'bg-morandi-100 text-morandi-700'}">${t}</button>
              <button type="button" class="delete-badge absolute -top-1.5 -right-1.5 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] items-center justify-center border-2 border-white z-10" onclick="event.stopPropagation(); app.deleteGlobalTag('pattern', '${t}')">✕</button>
            </div>
          `;
        }).join('');
      }

      switchYarnChart(type) {
        this.yarnChartType = type;
        const btnC = document.getElementById('chartTab_color');
        const btnT = document.getElementById('chartTab_tag');
        const title = document.getElementById('yarnChartTitle');
        if (type === 'color') {
          btnC.className = 'px-2 py-0.5 text-[9px] font-serifBrand rounded-lg bg-morandi-600 text-white font-semibold transition';
          btnT.className = 'px-2 py-0.5 text-[9px] font-serifBrand rounded-lg bg-morandi-100 text-morandi-700 transition';
          title.innerText = '毛線庫存 · 顏色分佈';
        } else {
          btnT.className = 'px-2 py-0.5 text-[9px] font-serifBrand rounded-lg bg-morandi-600 text-white font-semibold transition';
          btnC.className = 'px-2 py-0.5 text-[9px] font-serifBrand rounded-lg bg-morandi-100 text-morandi-700 transition';
          title.innerText = '毛線庫存 · 種類分佈';
        }
        this.renderYarnCharts();
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

      setYarnLayout(mode) {
        this.yarnLayout = mode;
        const btnList = document.getElementById('yarnLayoutBtn_list'); const btnGrid = document.getElementById('yarnLayoutBtn_grid'); const menu = document.getElementById('yarnGridDensityMenu');
        if (mode === 'list') {
          if (btnList) btnList.className = 'w-7 h-7 rounded-lg flex items-center justify-center bg-morandi-600 text-white shadow-sm transition';
          if (btnGrid) btnGrid.className = 'w-7 h-7 rounded-lg flex items-center justify-center text-morandi-400 hover:text-morandi-700 transition';
          if (menu) menu.classList.add('hidden');
        } else {
          if (btnGrid) btnGrid.className = 'w-7 h-7 rounded-lg flex items-center justify-center bg-morandi-600 text-white shadow-sm transition';
          if (btnList) btnList.className = 'w-7 h-7 rounded-lg flex items-center justify-center text-morandi-400 hover:text-morandi-700 transition';
        }
        this.renderYarns(true);
      }
      toggleYarnGridDensityMenu() { if (this.yarnLayout !== 'grid') { this.setYarnLayout('grid'); return; } const menu = document.getElementById('yarnGridDensityMenu'); if (menu) menu.classList.toggle('hidden'); }
      setYarnGridColumns(cols) { this.yarnGridColumns = cols; document.querySelectorAll('.yarn-density-btn').forEach((btn, idx) => { btn.className = idx + 2 === cols ? 'yarn-density-btn px-2 py-0.5 text-[10px] rounded-lg bg-morandi-600 text-white font-bold' : 'yarn-density-btn px-2 py-0.5 text-[10px] rounded-lg bg-white border border-morandi-200 text-morandi-700'; }); this.renderYarns(true); }

      initYarnPinchZoom() {
        const container = document.getElementById('yarnListContainer'); if (!container) return; let initialDist = 0;
        container.addEventListener('touchstart', (e) => { if (e.touches.length === 2 && this.yarnLayout === 'grid') { initialDist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY); } }, { passive: true });
        container.addEventListener('touchmove', (e) => {
          if (e.touches.length === 2 && initialDist > 0 && this.yarnLayout === 'grid') {
            const currentDist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY); const delta = currentDist - initialDist;
            if (delta > 60) { if (this.yarnGridColumns > 2) { this.setYarnGridColumns(this.yarnGridColumns - 1); initialDist = currentDist; } }
            else if (delta < -60) { if (this.yarnGridColumns < 4) { this.setYarnGridColumns(this.yarnGridColumns + 1); initialDist = currentDist; } }
          }
        }, { passive: true });
      }

      initPikminFilterBar() {
        const bar = document.getElementById('yarnColorFilterBar'); if (!bar) return;
        bar.innerHTML = pikminPalette.map(item => item.isAll ? `<button onclick="app.selectPikminColor('all')" id="pikminBtn_all" class="shrink-0 px-3 py-1 rounded-full text-xs font-serifTitle transition bg-morandi-600 text-white font-bold shadow-sm">#全部</button>` : `<button onclick="app.selectPikminColor('${item.id}', '${item.color}')" id="pikminBtn_${item.id}" class="shrink-0 w-6 h-6 rounded-full border-2 border-white shadow-sm transition active:scale-90 relative" style="background-color: ${item.color}" title="${item.name}"></button>`).join('');
      }

      selectPikminColor(id, hex = null) {
        this.selectedPikminColorId = id; this.selectedPikminHex = hex;
        pikminPalette.forEach(item => {
          const btn = document.getElementById(`pikminBtn_${item.id}`); if (!btn) return;
          if (item.id === id) { if (item.isAll) { btn.className = 'shrink-0 px-3 py-1 rounded-full text-xs font-serifTitle transition bg-morandi-600 text-white font-bold shadow-sm'; } else { btn.classList.add('color-active-glow'); } }
          else { if (item.isAll) { btn.className = 'shrink-0 px-3 py-1 rounded-full text-xs font-serifTitle transition bg-white/90 text-morandi-700 border border-morandi-200'; } else { btn.classList.remove('color-active-glow'); } }
        });
        this.renderYarns(true);
      }

      renderYarns(useFlipAnimation = false) {
        const container = document.getElementById('yarnListContainer'); if (!container) return;
        let list = [...this.yarns];
        if (this.selectedPikminColorId !== 'all' && this.selectedPikminHex) list = list.filter(y => y.colors && y.colors.some(c => isSimilarFamilyColor(c, this.selectedPikminHex)));
        list.sort((a, b) => getColorPikminScore(a.colors?.[0]) - getColorPikminScore(b.colors?.[0]));
        if (!list.length) { container.innerHTML = `<div class="text-xs text-morandi-400 py-12 text-center font-serifTitle w-full">此色彩尚無毛線收納</div>`; return; }

        let flipTargets = [];
        if (useFlipAnimation && window.Flip) flipTargets = this.yarnLayout === 'list' ? Array.from(container.children) : (container.firstElementChild ? Array.from(container.firstElementChild.children) : []);
        const flipState = (flipTargets.length > 0) ? Flip.getState(flipTargets) : null;
        let htmlStr = '';

        if (this.yarnLayout === 'list') {
          htmlStr = list.map(y => `
            <div data-flip-id="y_${y.id}" class="flip-item p-3 rounded-2xl glass-panel shadow-sm flex items-center justify-between cursor-pointer transition active:scale-[0.985] group w-full" onclick="app.openYarnDetail('${y.id}')">
              <div class="flex items-center space-x-3 min-w-0">
                <img src="${y.image}" alt="${y.name}" class="w-12 h-12 rounded-xl object-cover shrink-0 border border-morandi-100 shadow-sm" onerror="app.handleImgFallback(this)">
                <div class="min-w-0 flex-1">
                  <span class="text-[9px] font-serifBrand text-morandi-400 tracking-wider block uppercase">${y.brand}</span>
                  <h4 class="text-xs font-serifTitle font-bold text-morandi-900 truncate">${y.name}</h4>
                  <div class="flex items-center space-x-1.5 mt-1">
                    <div class="flex -space-x-1">${(y.colors || []).map(c => `<span class="w-2.5 h-2.5 rounded-full border border-white inline-block shadow-sm" style="background-color: ${c}"></span>`).join('')}</div>
                    <div class="flex gap-1 overflow-hidden">${(y.tags || []).slice(0, 2).map(t => `<span class="text-[9px] text-morandi-500">#${t}</span>`).join('')}</div>
                  </div>
                </div>
              </div>
              <div class="shrink-0 pl-2"><span class="text-xs font-serifBrand font-semibold px-2.5 py-1 rounded-full bg-morandi-100/90 text-morandi-800 border border-morandi-200/50 shadow-sm">${y.quantity} 球</span></div>
            </div>
          `).join('');
        } else {
          const gridClassMap = { 2: 'grid grid-cols-2 gap-2.5', 3: 'grid grid-cols-3 gap-1.5', 4: 'grid grid-cols-4 gap-1' };
          htmlStr = `<div class="${gridClassMap[this.yarnGridColumns] || 'grid grid-cols-2 gap-2.5'} w-full">` + list.map(y => `
            <div data-flip-id="y_${y.id}" class="flip-item glass-panel rounded-2xl overflow-hidden shadow-sm cursor-pointer transition active:scale-[0.98] group flex flex-col w-full" onclick="app.openYarnDetail('${y.id}')">
              <div class="aspect-square bg-morandi-100 overflow-hidden relative">
                <img src="${y.image}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" onerror="app.handleImgFallback(this)">
                <div class="absolute bottom-1 right-1 bg-white/80 backdrop-blur-md px-1.5 py-0.5 rounded text-[8px] font-bold text-morandi-800">${y.quantity}球</div>
              </div>
              ${this.yarnGridColumns <= 2 ? `<div class="p-2"><h4 class="text-[10px] font-serifTitle font-bold text-morandi-900 truncate">${y.name}</h4><div class="flex items-center space-x-1 mt-1">${(y.colors || []).map(c => `<span class="w-2 h-2 rounded-full border border-black/10 inline-block" style="background-color: ${c}"></span>`).join('')}</div></div>` : ''}
            </div>
          `).join('') + `</div>`;
        }
        
        container.innerHTML = htmlStr;
        if (useFlipAnimation && window.Flip && flipState && container.children.length > 0) {
          const newTargets = this.yarnLayout === 'list' ? Array.from(container.children) : Array.from(container.firstElementChild.children);
          Flip.from(flipState, { targets: newTargets, duration: 0.6, ease: "power2.out", absolute: true, onEnter: elements => gsap.fromTo(elements, { opacity: 0, scale: 0.75 }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.5)" }), onLeave: elements => gsap.to(elements, { opacity: 0, scale: 0.6, duration: 0.35, ease: "power2.in" }) });
        }
      }

      openYarnDetail(id) {
        this.activeYarnId = id; const yarn = this.yarns.find(y => y.id === id); if (!yarn) return;
        const imgEl = document.getElementById('yarnDetailImg'); if (imgEl) imgEl.src = yarn.image;
        document.getElementById('yarnDetailBrand').innerText = yarn.brand;
        document.getElementById('yarnDetailName').innerText = yarn.name;
        document.getElementById('yarnDetailLoc').innerText = `存放地點：${yarn.location || '台南'}`;
        const colorsEl = document.getElementById('yarnDetailColors'); if (colorsEl) colorsEl.innerHTML = (yarn.colors || []).map(c => `<span class="w-5 h-5 rounded-full border border-black/10 shadow-inner" style="background-color: ${c}"></span>`).join('');
        const tagsEl = document.getElementById('yarnDetailTags'); if (tagsEl) tagsEl.innerHTML = (yarn.tags || []).map(t => `<span class="px-2 py-0.5 rounded-lg bg-morandi-100 text-morandi-700 text-xs">#${t}</span>`).join('');
        this.openModal('modalYarnDetail');
      }

      openEditYarnForm() {
        const yarn = this.yarns.find(y => y.id === this.activeYarnId); if (!yarn) return;
        this.closeModal('modalYarnDetail');
        document.getElementById('modalYarnTitle').innerText = '編輯毛線';
        document.getElementById('editYarnId').value = yarn.id;
        document.getElementById('yarnBrandInput').value = yarn.brand;
        document.getElementById('yarnNameInput').value = yarn.name;
        document.getElementById('yarnQuantityInput').value = yarn.quantity;
        this.setDropdownValue('yarnLocationDropdown', yarn.location || '台南');
        this.tempColors.yarn = [...(yarn.colors || [])];
        this.tempUploadedImage.yarn = yarn.image;
        this.loadExistingImageToCanvas('yarn', yarn.image);
        this.renderTempColorDots('yarn');
        this.renderYarnTagSelectionGroup(yarn.tags);
        this.openModal('modalAddYarn');
      }

      deleteCurrentYarn() {
        const targetId = this.activeYarnId;
        this.yarns = this.yarns.filter(y => y.id !== targetId);
        this.saveLocal('tung_yarns', this.yarns);
        this.closeModal('modalYarnDetail');
        this.renderYarns(false);
        this.renderYarnCharts();
        this.updateStats();
        this.showToast('毛線已刪除');
        this.dispatchCloudAction('deleteYarn', { id: targetId });
      }

      setPatternLayout(mode) {
        this.patternLayout = mode;
        const btnList = document.getElementById('patLayoutBtn_list'); const btnGrid = document.getElementById('patLayoutBtn_grid'); const menu = document.getElementById('patGridDensityMenu');
        if (mode === 'list') {
          if (btnList) btnList.className = 'w-7 h-7 rounded-lg flex items-center justify-center bg-morandi-600 text-white shadow-sm transition';
          if (btnGrid) btnGrid.className = 'w-7 h-7 rounded-lg flex items-center justify-center text-morandi-400 hover:text-morandi-700 transition';
          if (menu) menu.classList.add('hidden');
        } else {
          if (btnGrid) btnGrid.className = 'w-7 h-7 rounded-lg flex items-center justify-center bg-morandi-600 text-white shadow-sm transition';
          if (btnList) btnList.className = 'w-7 h-7 rounded-lg flex items-center justify-center text-morandi-400 hover:text-morandi-700 transition';
        }
        this.renderPatterns();
      }
      togglePatternGridDensityMenu() { if (this.patternLayout !== 'grid') { this.setPatternLayout('grid'); return; } const menu = document.getElementById('patGridDensityMenu'); if (menu) menu.classList.toggle('hidden'); }
      setPatternGridColumns(cols) { this.patternGridColumns = cols; document.querySelectorAll('.pat-density-btn').forEach((btn, idx) => { btn.className = idx + 1 === cols ? 'pat-density-btn px-2 py-0.5 text-[10px] rounded-lg bg-morandi-600 text-white font-bold' : 'pat-density-btn px-2 py-0.5 text-[10px] rounded-lg bg-white border border-morandi-200 text-morandi-700'; }); this.renderPatterns(); }
      togglePatternSearch() { const drawer = document.getElementById('patternSearchDrawer'); if (!drawer) return; drawer.classList.toggle('hidden'); if (!drawer.classList.contains('hidden')) { const input = document.getElementById('patternSearchInput'); if (input) input.focus(); } }
      onPatternSearchInput(val) { this.patternSearchQuery = val; this.renderPatterns(); }
      clearPatternSearch() { this.patternSearchQuery = ''; const input = document.getElementById('patternSearchInput'); if (input) input.value = ''; this.renderPatterns(); }

      renderPatterns() {
        const container = document.getElementById('patternListContainer'); if (!container) return;
        let list = [...this.patterns]; const q = (this.patternSearchQuery || '').trim().toLowerCase();
        if (q) list = list.filter(p => p.name.toLowerCase().includes(q) || (p.tags || []).some(t => t.toLowerCase().includes(q)));
        if (!list.length) { container.innerHTML = `<div class="text-xs text-morandi-400 py-12 text-center font-serifTitle w-full">查無符合織譜</div>`; return; }

        if (this.patternLayout === 'list') {
          container.className = 'flex flex-col gap-3 relative';
          container.innerHTML = list.map(p => `
            <div onclick="app.openPatternLightbox('${p.id}')" class="rounded-3xl glass-panel shadow-sm overflow-hidden p-3.5 flex flex-col gap-2.5 cursor-pointer active:scale-[0.99] transition">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-xs font-serifTitle font-bold text-morandi-900">${p.name}</h4>
                  <div class="flex items-center space-x-1.5 mt-0.5">
                    <span class="text-[10px] font-serifBrand text-morandi-400">${toDisplayDate(p.date)}</span>
                    ${(p.tags || []).map(t => `<span class="text-[10px] text-morandi-600 bg-morandi-100 px-2 py-0.5 rounded-full">#${t}</span>`).join('')}
                  </div>
                </div>
                ${p.url ? `<a href="${p.url}" target="_blank" onclick="event.stopPropagation()" class="w-6 h-6 rounded-full bg-morandi-100 flex items-center justify-center text-morandi-600"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg></a>` : ''}
              </div>
              <div class="relative w-full h-44 rounded-2xl overflow-hidden bg-morandi-100 border border-morandi-200/50"><img src="${p.image}" alt="織譜" class="w-full h-full object-cover" onerror="app.handleImgFallback(this)"><div class="absolute bottom-2 right-2 px-2 py-0.5 rounded-lg bg-black/45 backdrop-blur-md text-[9px] text-white">點擊進入檢視</div></div>
            </div>
          `).join('');
        } else {
          const gridClassMap = { 1: 'grid grid-cols-1 gap-3', 2: 'grid grid-cols-2 gap-2.5', 3: 'grid grid-cols-3 gap-1.5' };
          container.className = `${gridClassMap[this.patternGridColumns] || 'grid grid-cols-2 gap-2.5'} relative`;
          container.innerHTML = list.map(p => `
            <div onclick="app.openPatternLightbox('${p.id}')" class="glass-panel rounded-2xl overflow-hidden shadow-sm cursor-pointer transition active:scale-[0.98] group flex flex-col">
              <div class="aspect-square bg-morandi-100 overflow-hidden relative"><img src="${p.image}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" onerror="app.handleImgFallback(this)"></div>
              <div class="p-2"><h4 class="text-[10px] font-serifTitle font-bold text-morandi-900 truncate">${p.name}</h4><div class="flex items-center space-x-1 mt-0.5"><span class="text-[8px] text-morandi-400 font-serifBrand truncate">${(p.tags && p.tags[0]) || '織譜'}</span></div></div>
            </div>
          `).join('');
        }
      }

      openPatternLightbox(id) {
        this.activePatternId = id; const p = this.patterns.find(item => item.id === id); if (!p) return;
        document.getElementById('patternViewerTitle').innerText = p.name;
        document.getElementById('patternViewerMeta').innerText = `${toDisplayDate(p.date)} · ${(p.tags || []).join(' ')}`;
        const imgEl = document.getElementById('patternViewerImg'); if (imgEl) imgEl.src = p.image;
        this.openModal('modalPatternViewer');
      }

      deleteCurrentPattern() {
        const targetId = this.activePatternId;
        this.patterns = this.patterns.filter(p => p.id !== targetId);
        this.saveLocal('tung_patterns', this.patterns);
        this.closeModal('modalPatternViewer');
        this.renderPatterns();
        this.updateStats();
        this.showToast('織譜已刪除');
        this.dispatchCloudAction('deletePattern', { id: targetId });
      }

      initKnittingRulerDrag() {
        const ruler = document.getElementById('knittingRuler'); const container = document.getElementById('patternViewerContainer'); if (!ruler || !container) return;
        let isDragging = false; const onDown = () => { isDragging = true; ruler.style.transition = 'none'; };
        const onMove = (e) => { if (!isDragging) return; const rect = container.getBoundingClientRect(); const clientY = e.touches ? e.touches[0].clientY : e.clientY; let top = clientY - rect.top; top = Math.max(10, Math.min(top, rect.height - 40)); ruler.style.top = `${top}px`; };
        const onUp = () => { isDragging = false; };
        ruler.addEventListener('mousedown', onDown); ruler.addEventListener('touchstart', onDown); window.addEventListener('mousemove', onMove); window.addEventListener('touchmove', onMove); window.addEventListener('mouseup', onUp); window.addEventListener('touchend', onUp);
      }

      async toggleWakeLock() {
        const label = document.getElementById('wakeLockLabel'); const dot = document.getElementById('wakeLockDot');
        if (!this.wakeLock) {
          try {
            if ('wakeLock' in navigator) {
              this.wakeLock = await navigator.wakeLock.request('screen');
              if (label) label.innerText = '長亮中'; if (dot) dot.className = 'w-2 h-2 rounded-full bg-emerald-400 animate-pulse';
              this.showToast('已開啟螢幕防休眠');
              this.wakeLock.addEventListener('release', () => { this.wakeLock = null; if (label) label.innerText = '看譜長亮'; if (dot) dot.className = 'w-2 h-2 rounded-full bg-morandi-300'; });
            } else { this.showToast('看譜模式啟動'); }
          } catch (e) { this.showToast('看譜模式就緒'); }
        } else {
          try { this.wakeLock.release(); } catch(e){}
          this.wakeLock = null; if (label) label.innerText = '看譜長亮'; if (dot) dot.className = 'w-2 h-2 rounded-full bg-morandi-300';
          this.showToast('已關閉防休眠');
        }
      }

      setGalleryLayout(mode) {
        this.galleryLayout = mode;
        const btnList = document.getElementById('layoutBtn_list'); const btnGrid = document.getElementById('layoutBtn_grid'); const menu = document.getElementById('gridDensityMenu');
        if (mode === 'list') {
          if (btnList) btnList.className = 'w-7 h-7 rounded-lg flex items-center justify-center bg-morandi-600 text-white shadow-sm transition';
          if (btnGrid) btnGrid.className = 'w-7 h-7 rounded-lg flex items-center justify-center text-morandi-400 hover:text-morandi-700 transition';
          if (menu) menu.classList.add('hidden');
        } else {
          if (btnGrid) btnGrid.className = 'w-7 h-7 rounded-lg flex items-center justify-center bg-morandi-600 text-white shadow-sm transition';
          if (btnList) btnList.className = 'w-7 h-7 rounded-lg flex items-center justify-center text-morandi-400 hover:text-morandi-700 transition';
        }
        this.renderGallery();
      }

      toggleGridDensityMenu() { if (this.galleryLayout !== 'grid') { this.setGalleryLayout('grid'); return; } const menu = document.getElementById('gridDensityMenu'); if (menu) menu.classList.toggle('hidden'); }
      setGridColumns(cols) { this.gridColumns = cols; document.querySelectorAll('.density-btn').forEach((btn, idx) => { btn.className = idx + 1 === cols ? 'density-btn px-2 py-0.5 text-[10px] rounded-lg bg-morandi-600 text-white font-bold' : 'density-btn px-2 py-0.5 text-[10px] rounded-lg bg-white border border-morandi-200 text-morandi-700'; }); this.renderGallery(); }

      initGalleryPinchZoom() {
        const container = document.getElementById('galleryGroupedContainer'); if (!container) return; let initialDist = 0;
        container.addEventListener('touchstart', (e) => { if (e.touches.length === 2) { initialDist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY); } }, { passive: true });
        container.addEventListener('touchmove', (e) => {
          if (e.touches.length === 2 && initialDist > 0) {
            const currentDist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY); const delta = currentDist - initialDist;
            if (delta > 60) { if (this.gridColumns > 1) { this.setGridColumns(this.gridColumns - 1); initialDist = currentDist; this.showToast(`宮格視圖: ${this.gridColumns} 欄`); } }
            else if (delta < -60) { if (this.gridColumns < 4) { this.setGridColumns(this.gridColumns + 1); initialDist = currentDist; this.showToast(`宮格視圖: ${this.gridColumns} 欄`); } }
          }
        }, { passive: true });
      }

      toggleGallerySearch() { const drawer = document.getElementById('gallerySearchDrawer'); if (!drawer) return; drawer.classList.toggle('hidden'); if (!drawer.classList.contains('hidden')) { const input = document.getElementById('galleryTagSearchInput'); if (input) input.focus(); } }
      onGalleryTagSearchInput(val) { this.gallerySearchQuery = val; this.renderGallery(); }
      clearGallerySearch() { this.gallerySearchQuery = ''; const input = document.getElementById('galleryTagSearchInput'); if (input) input.value = ''; this.renderGallery(); }

      renderGallery() {
        const container = document.getElementById('galleryGroupedContainer'); if (!container) return;
        const rawQuery = (this.gallerySearchQuery || '').trim(); let list = [...this.projects];
        
        if (rawQuery) {
          const terms = rawQuery.split(/[,，]+/).map(t => t.trim().toLowerCase()).filter(Boolean);
          list = list.filter(p => {
            const haystack = [p.title, p.purpose, ...(p.yarnTags || []), ...(p.categoryTags || []), p.notes].join(' ').toLowerCase();
            return terms.every(term => haystack.includes(term));
          });
        }
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
          if (this.galleryLayout === 'list') {
            html += `<div class="flex flex-col gap-3 w-full">`;
            html += groupItems.map(p => {
              const displayEnd = p.endDate ? toDisplayDate(p.endDate) : '進行中';
              return `
                <div data-flip-id="p_${p.id}" onclick="app.openProjectDetail('${p.id}')" class="flip-item glass-panel rounded-2xl overflow-hidden shadow-sm cursor-pointer transition active:scale-[0.985] group w-full">
                  <div class="aspect-square w-full max-h-56 bg-morandi-100 overflow-hidden"><img src="${p.image}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" onerror="app.handleImgFallback(this)"></div>
                  <div class="p-3 flex items-center justify-between">
                    <div>
                      <h4 class="text-xs font-serifTitle font-bold text-morandi-900">${p.title}</h4>
                      <span class="text-[10px] font-serifBrand text-morandi-400">${toDisplayDate(p.startDate)} ~ ${displayEnd}</span>
                    </div>
                    <div class="flex items-center space-x-1">${(p.colors || []).map(c => `<span class="w-2.5 h-2.5 rounded-full inline-block shadow-inner" style="background-color: ${c}"></span>`).join('')}</div>
                  </div>
                </div>
              `;
            }).join('');
            html += `</div>`;
          } else {
            const gridClassMap = { 1: 'grid grid-cols-1 gap-3', 2: 'grid grid-cols-2 gap-2.5', 3: 'grid grid-cols-3 gap-1.5', 4: 'grid grid-cols-4 gap-1' };
            html += `<div class="${gridClassMap[this.gridColumns] || 'grid grid-cols-2 gap-2.5'}">`;
            html += groupItems.map(p => {
              if (this.gridColumns >= 3) {
                return `<div data-flip-id="p_${p.id}" onclick="app.openProjectDetail('${p.id}')" class="flip-item aspect-square rounded-xl overflow-hidden bg-morandi-100 shadow-sm cursor-pointer active:scale-95 transition relative group w-full"><img src="${p.image}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" onerror="app.handleImgFallback(this)"></div>`;
              } else if (this.gridColumns === 1) {
                return `<div data-flip-id="p_${p.id}" onclick="app.openProjectDetail('${p.id}')" class="flip-item glass-panel rounded-2xl overflow-hidden shadow-sm cursor-pointer transition active:scale-[0.98] group w-full"><div class="aspect-square bg-morandi-100 overflow-hidden"><img src="${p.image}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" onerror="app.handleImgFallback(this)"></div><div class="p-3"><h4 class="text-sm font-serifTitle font-bold text-morandi-900">${p.title}</h4><p class="text-xs text-morandi-500 line-clamp-1 mt-0.5">${p.notes || ''}</p></div></div>`;
              } else {
                return `<div data-flip-id="p_${p.id}" onclick="app.openProjectDetail('${p.id}')" class="flip-item glass-panel rounded-2xl overflow-hidden shadow-sm cursor-pointer transition active:scale-[0.98] group w-full"><div class="w-full aspect-square bg-morandi-100 overflow-hidden relative"><img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" onerror="app.handleImgFallback(this)"></div><div class="p-2.5"><h4 class="text-xs font-serifTitle font-bold text-morandi-900 truncate">${p.title}</h4><div class="flex items-center space-x-1 mt-1.5">${(p.colors || []).map(c => `<span class="w-2.5 h-2.5 rounded-full border border-black/10 inline-block shadow-inner" style="background-color: ${c}"></span>`).join('')}</div></div></div>`;
              }
            }).join('');
            html += `</div>`;
          }
          html += `</div>`;
        });
        container.innerHTML = html;
        this.renderCarousel();
      }

      renderCarousel() {
        if (!this.projects || !this.projects.length) return;
        const wrapper = document.getElementById('carouselWrapper'); if (!wrapper) return;
        wrapper.innerHTML = this.projects.map((p) => `
          <div class="w-[300px] h-full shrink-0 relative px-1 pb-1 pt-1" onclick="app.openProjectDetail('${p.id}')">
            <div class="w-full h-full rounded-2xl overflow-hidden relative shadow-sm border border-morandi-200/50 group">
              <img src="${p.image}" alt="作品" class="w-full h-full object-cover group-hover:scale-105 transition duration-500 pointer-events-none" onerror="handleImgFallback(this)">
              <div class="absolute inset-0 bg-gradient-to-t from-morandi-950/75 via-transparent to-transparent pointer-events-none"></div>
              <div class="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                <span class="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-medium tracking-wide">#${(p.categoryTags && p.categoryTags[0]) || '編織'}</span>
                <h3 class="text-base font-serifTitle tracking-wide mt-1 drop-shadow-sm truncate">${p.title}</h3>
              </div>
            </div>
          </div>
        `).join('');
        if (this.carouselTween) this.carouselTween.kill();
        const totalWidth = wrapper.scrollWidth; const viewWidth = wrapper.parentElement.clientWidth;
        if (totalWidth > viewWidth && window.gsap) {
          this.carouselTween = gsap.to(wrapper, { x: -(totalWidth - viewWidth), duration: this.projects.length * 3, ease: "none", repeat: -1, yoyo: true });
          wrapper.onmouseenter = () => this.carouselTween.pause(); wrapper.onmouseleave = () => this.carouselTween.play(); wrapper.ontouchstart = () => this.carouselTween.pause(); wrapper.ontouchend = () => this.carouselTween.play();
        }
      }

      openProjectDetail(id) {
        this.activeProjectId = id; const p = this.projects.find(item => item.id === id); if (!p) return;
        const imgEl = document.getElementById('detailImg'); if (imgEl) imgEl.src = p.image;
        document.getElementById('detailTitle').innerText = p.title;
        document.getElementById('detailPurpose').innerText = p.purpose || '自用';
        
        const displayEnd = p.endDate ? toDisplayDate(p.endDate) : '進行中';
        document.getElementById('detailDates').innerText = `${toDisplayDate(p.startDate)} ~ ${displayEnd}`;
        document.getElementById('detailNotes').innerText = p.notes || '尚無編織心情紀錄。';

        const tagsContainer = document.getElementById('detailTags');
        if (tagsContainer) {
          tagsContainer.innerHTML = [
            ...(!p.endDate ? [`<span class="px-2 py-0.5 rounded-xl bg-morandi-600 text-white font-bold text-[10px]">⏳ 進行中</span>`] : []),
            ...(p.yarnTags || []).map(t => `<span class="px-2 py-0.5 rounded-xl bg-morandi-100 text-morandi-700 text-[10px]">#${t}</span>`),
            ...(p.categoryTags || []).map(t => `<span class="px-2 py-0.5 rounded-xl bg-morandi-100 text-morandi-700 text-[10px]">#${t}</span>`)
          ].join('');
        }
        const colorsContainer = document.getElementById('detailColors'); if (colorsContainer) colorsContainer.innerHTML = (p.colors || []).map(c => `<span class="w-5 h-5 rounded-full border border-black/10 inline-block shadow-inner" style="background-color: ${c}"></span>`).join('');
        this.openModal('modalProjectDetail');
      }

      editCurrentProject() {
        const p = this.projects.find(item => item.id === this.activeProjectId); if (!p) return;
        this.closeModal('modalProjectDetail');
        document.getElementById('modalProjectTitle').innerText = '修改作品';
        document.getElementById('editProjectId').value = p.id;
        document.getElementById('projectNameInput').value = p.title;
        document.getElementById('projectStartDate').value = toInputDate(p.startDate);
        
        const wipCheck = document.getElementById('projectIsWip');
        if (!p.endDate) {
          wipCheck.checked = true;
          this.toggleProjectWip(true);
        } else {
          wipCheck.checked = false;
          this.toggleProjectWip(false);
          document.getElementById('projectEndDate').value = toInputDate(p.endDate);
        }
        
        document.getElementById('projectNotesInput').value = p.notes || '';
        this.populateDropdown('projectCategoryDropdown', this.globalCategoryTags, (p.categoryTags && p.categoryTags[0]) || '包包');
        this.populateDropdown('projectYarnTagDropdown', this.globalYarnTags, (p.yarnTags && p.yarnTags[0]) || '羊毛');
        const purposeRadios = document.getElementsByName('projectPurpose'); purposeRadios.forEach(r => r.checked = (r.value === p.purpose));
        this.tempColors.project = [...(p.colors || [])];
        this.tempUploadedImage.project = p.image;
        this.loadExistingImageToCanvas('project', p.image);
        this.renderTempColorDots('project');
        this.openModal('modalAddProject');
      }

      deleteCurrentProject() {
        const targetId = this.activeProjectId;
        this.projects = this.projects.filter(p => p.id !== targetId);
        this.saveLocal('tung_projects', this.projects);
        this.closeModal('modalProjectDetail');
        this.renderGallery();
        this.updateStats();
        this.showToast('作品已刪除');
        this.dispatchCloudAction('deleteProject', { id: targetId });
      }

      animateChronometerEntrance() { this.updateStats(); }
      updateStats() {
        const totalBalls = this.yarns.reduce((sum, y) => sum + (Number(y.quantity) || 0), 0);
        const elBalls = document.getElementById('statYarnBalls'); const elPatterns = document.getElementById('statPatternsCount'); const elProjects = document.getElementById('statProjectsCount');
        if (elBalls) elBalls.innerText = totalBalls; if (elPatterns) elPatterns.innerText = this.patterns.length; if (elProjects) elProjects.innerText = this.projects.length;
      }

      changeCalendarMonth(delta) { this.calendarDate.setMonth(this.calendarDate.getMonth() + delta); this.renderCalendar(); }
      renderCalendar() {
        const container = document.getElementById('calendarGrid'); const label = document.getElementById('calendarMonthLabel'); if (!container || !label) return;
        const year = this.calendarDate.getFullYear(); const month = this.calendarDate.getMonth();
        label.innerText = `${year} 年 ${String(month + 1).padStart(2, '0')} 月`;
        const firstDay = new Date(year, month, 1); const lastDay = new Date(year, month + 1, 0);
        const startOffset = firstDay.getDay(); const daysInMonth = lastDay.getDate();
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

        const totalCells = startOffset + daysInMonth; const remainder = totalCells % 7;
        if (remainder > 0) { const fillCount = 7 - remainder; for (let i = 0; i < fillCount; i++) html += `<div class="bg-oat-50/40 h-16 border-b border-r border-morandi-100/30"></div>`; }
        container.innerHTML = html;
      }

      


      renderSearchDrawerResults() {
        const container = document.getElementById('searchDrawerContent'); if (!container) return; let htmlStr = '';
        if (this.searchDrawerTab === 'yarns') {
          if (!this.filteredYarns.length) { container.innerHTML = '<div class="text-xs text-morandi-400 py-3 text-center font-serifTitle w-full">查無符合線材</div>'; return; }
          htmlStr = this.filteredYarns.map(y => `
            <div data-flip-id="s_y_${y.id}" class="flip-item flex items-center space-x-2.5 p-2 rounded-2xl bg-white/80 border border-morandi-100 cursor-pointer active:scale-98 transition w-full" onclick="app.openYarnDetail('${y.id}')">
              <img src="${y.image}" class="w-9 h-9 rounded-xl object-cover shrink-0" onerror="app.handleImgFallback(this)">
              <div class="flex-1 min-w-0">
                <h5 class="text-xs font-serifTitle font-bold text-morandi-800 truncate">${y.name}</h5>
                <div class="flex items-center space-x-1 mt-0.5">${(y.colors || []).map(c => `<span class="w-2.5 h-2.5 rounded-full inline-block" style="background-color: ${c}"></span>`).join('')}<span class="text-[10px] text-morandi-500 ml-1 font-serifBrand">${y.quantity} 球</span></div>
              </div>
            </div>
          `).join('');
        } else {
          if (!this.filteredProjects.length) { container.innerHTML = '<div class="text-xs text-morandi-400 py-3 text-center font-serifTitle w-full">查無符合作品</div>'; return; }
          htmlStr = this.filteredProjects.map(p => `
            <div data-flip-id="s_p_${p.id}" onclick="app.openProjectDetail('${p.id}')" class="flip-item flex items-center space-x-2.5 p-2 rounded-2xl bg-white/80 border border-morandi-100 cursor-pointer active:scale-98 transition w-full">
              <img src="${p.image}" class="w-9 h-9 rounded-xl object-cover shrink-0" onerror="app.handleImgFallback(this)">
              <div class="flex-1 min-w-0">
                <h5 class="text-xs font-serifTitle font-bold text-morandi-800 truncate">${p.title}</h5>
                <div class="flex items-center space-x-1 mt-0.5">${(p.colors || []).map(c => `<span class="w-2.5 h-2.5 rounded-full inline-block" style="background-color: ${c}"></span>`).join('')}<span class="text-[10px] font-serifBrand text-morandi-400 ml-1">${p.endDate ? toDisplayDate(p.endDate).slice(5) : '進行中'}</span></div>
              </div>
            </div>
          `).join('');
        }
        container.innerHTML = htmlStr;
      }

      handlePatternImageUpload(event) {
        const file = event.target.files && event.target.files[0]; if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => { this.tempUploadedImage.pattern = e.target.result; this.showToast('織譜照片已載入'); };
        reader.readAsDataURL(file);
      }

      addColorDot(type, hex) {
        if (!this.tempColors[type]) this.tempColors[type] = [];
        if (!this.tempColors[type].includes(hex)) { this.tempColors[type].push(hex); this.renderTempColorDots(type); }
      }
      removeColorDot(type, hex) {
        if (!this.tempColors[type]) return;
        this.tempColors[type] = this.tempColors[type].filter(c => c !== hex); this.renderTempColorDots(type);
      }
      renderTempColorDots(type) {
        const container = document.getElementById(type === 'yarn' ? 'yarnSelectedColors' : 'projectSelectedColors'); if (!container) return;
        container.innerHTML = (this.tempColors[type] || []).map(c => `<button type="button" onclick="app.removeColorDot('${type}', '${c}')" class="w-6 h-6 rounded-full border border-black/15 shadow-inner flex items-center justify-center relative group active:scale-90 transition" style="background-color: ${c}"><span class="opacity-0 group-hover:opacity-100 text-[9px] text-white bg-black/60 rounded-full w-full h-full flex items-center justify-center">✕</span></button>`).join('');
      }

      openModal(id) { const el = document.getElementById(id); if (el) el.classList.remove('hidden'); }
      closeModal(id) {
        const el = document.getElementById(id); if (el) el.classList.add('hidden');
        this.deactivateEyedropper('yarn');
        this.deactivateEyedropper('project');
      }
      stepModalCount(delta) { const input = document.getElementById('yarnQuantityInput'); if (input) input.value = Math.max(1, parseInt(input.value || 1) + delta); }

      toggleSelectTag(btn) {
        if (!btn) return;
        btn.classList.toggle('bg-morandi-600'); btn.classList.toggle('text-white'); btn.classList.toggle('font-bold');
        btn.classList.toggle('bg-morandi-100'); btn.classList.toggle('text-morandi-700');
      }

      saveYarn() {
        // 確保儲存前導出最新 1:1 裁切畫面
        if (this.cropperState.yarn.img) this.exportCroppedImage('yarn');

        const editId = document.getElementById('editYarnId').value;
        const brand = document.getElementById('yarnBrandInput').value || 'DARUMA';
        const name = document.getElementById('yarnNameInput').value || '未命名線材';
        const quantity = parseInt(document.getElementById('yarnQuantityInput').value || 1);
        const location = document.getElementById('yarnLocationInput').value || '台南';
        const tags = Array.from(document.querySelectorAll('#yarnTypeSelectGroup .tag-btn.text-white')).map(b => b.innerText);
        const colors = this.tempColors.yarn.length ? [...this.tempColors.yarn] : ['#9B83A4'];
        const image = this.tempUploadedImage.yarn || fallbackSvg;
        let savedYarn = null;

        if (editId) {
          const yarn = this.yarns.find(y => y.id === editId);
          if (yarn) {
            yarn.brand = brand; yarn.name = name; yarn.quantity = quantity; yarn.location = location; yarn.tags = tags.length ? tags : ['純色']; yarn.colors = colors;
            yarn.image = image;
            savedYarn = yarn;
          }
          this.showToast('毛線資料已更新');
        } else {
          savedYarn = { id: 'y_' + Date.now(), brand, name, colors, tags: tags.length ? tags : ['純色'], quantity, location, image };
          this.yarns.unshift(savedYarn);
          this.showToast('毛線已入櫃');
        }

        this.saveLocal('tung_yarns', this.yarns);
        this.renderYarns(false); this.renderYarnCharts(); this.updateStats(); this.closeModal('modalAddYarn');
        this.tempColors.yarn = []; this.tempUploadedImage.yarn = null; this.renderTempColorDots('yarn'); document.getElementById('editYarnId').value = '';
        if (savedYarn) this.dispatchCloudAction('saveYarn', { item: savedYarn });
      }

      saveNewPattern() {
        const name = document.getElementById('patternNameInput').value || '新織譜';
        const url = document.getElementById('patternUrlInput').value || '';
        const tags = Array.from(document.querySelectorAll('#patternTypeSelectGroup .tag-btn.text-white')).map(b => b.innerText);
        const image = this.tempUploadedImage.pattern || fallbackSvg;
        const newPattern = { id: 'p_' + Date.now(), name, tags: tags.length ? tags : ['小物'], date: relDate(0), url, image };
        this.patterns.unshift(newPattern);
        this.saveLocal('tung_patterns', this.patterns);
        this.renderPatterns(); this.updateStats(); this.closeModal('modalAddPattern');
        this.tempUploadedImage.pattern = null; this.showToast('織譜已典藏至織典');
        this.dispatchCloudAction('savePattern', { item: newPattern });
      }

      saveProject() {
        // 確保儲存前導出最新 1:1 裁切畫面至 Base64 並上傳 Drive
        if (this.cropperState.project.img) this.exportCroppedImage('project');

        const editId = document.getElementById('editProjectId').value;
        const title = document.getElementById('projectNameInput').value || '編織作品';
        const startDate = toDisplayDate(document.getElementById('projectStartDate').value) || relDate(0);
        
        const isWip = document.getElementById('projectIsWip').checked;
        const endDate = isWip ? '' : (toDisplayDate(document.getElementById('projectEndDate').value) || relDate(7));

        const notes = document.getElementById('projectNotesInput').value || '';
        const purpose = document.querySelector('input[name="projectPurpose"]:checked')?.value || '自用';
        const category = document.getElementById('projectCategorySelect').value || '包包';
        const yarnTag = document.getElementById('projectYarnTagSelect').value || '羊毛';
        const colors = this.tempColors.project.length ? [...this.tempColors.project] : ['#9B83A4'];
        const image = this.tempUploadedImage.project || fallbackSvg;
        let savedProject = null;

        if (editId) {
          const prj = this.projects.find(p => p.id === editId);
          if (prj) {
            prj.title = title; prj.startDate = startDate; prj.endDate = endDate; prj.notes = notes; prj.purpose = purpose;
            prj.categoryTags = [category]; prj.yarnTags = [yarnTag]; prj.colors = colors;
            prj.image = image;
            savedProject = prj;
          }
          this.showToast('作品已更新');
        } else {
          savedProject = {
            id: 'prj_' + Date.now(), title, startDate, endDate, colors, yarnTags: [yarnTag], categoryTags: [category], purpose, notes, image
          };
          this.projects.unshift(savedProject);
          this.showToast('作品已記錄');
        }

        this.saveLocal('tung_projects', this.projects);
        this.renderGallery(); this.updateStats(); this.closeModal('modalAddProject');
        this.tempColors.project = []; this.tempUploadedImage.project = null; this.renderTempColorDots('project'); document.getElementById('editProjectId').value = '';
        if (savedProject) this.dispatchCloudAction('saveProject', { item: savedProject });
      }

      renderAll() {
        this.renderYarnCharts(); this.renderYarns(false); this.renderPatterns(); this.renderGallery(); this.updateStats();
      }
    }

    function initStudioApp() {
      if (window.gsap && window.Flip) gsap.registerPlugin(Flip);
      if (!window.app || !(window.app instanceof AppController)) { window.app = new AppController(); window.app.init(); }
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initStudioApp);
    else initStudioApp();

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => { navigator.serviceWorker.register('./sw.js').catch((err) => { console.debug('SW:', err); }); });
    }
