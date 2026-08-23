/* ToolMex — main.js: comportamiento compartido en todas las páginas */
(function(){
  "use strict";

  // Detecta si estamos dentro de /tools/ para resolver rutas relativas
  const inToolsDir = location.pathname.includes("/tools/");
  const prefix = inToolsDir ? "../" : "";

  function toolUrl(t){ return prefix + t.url; }

  /* ---------------- Menú móvil ---------------- */
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");
  if(navToggle && mainNav){
    navToggle.addEventListener("click", ()=>{
      mainNav.classList.toggle("open");
    });
    mainNav.querySelectorAll("a").forEach(a=>{
      a.addEventListener("click", ()=> mainNav.classList.remove("open"));
    });
  }

  /* ---------------- Buscador (header + hero) ---------------- */
  function setupSearch(inputEl, resultsEl){
    if(!inputEl || !resultsEl || typeof TOOLMEX_TOOLS === "undefined") return;

    function render(query){
      const q = query.trim().toLowerCase();
      if(!q){ resultsEl.classList.remove("active"); resultsEl.innerHTML=""; return; }
      const matches = TOOLMEX_TOOLS.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q) ||
        t.cat.toLowerCase().includes(q)
      ).slice(0,8);

      if(matches.length === 0){
        resultsEl.innerHTML = '<div class="empty">Sin resultados para "'+escapeHtml(query)+'"</div>';
      } else {
        resultsEl.innerHTML = matches.map(t =>
          '<a href="'+toolUrl(t)+'"><span>'+t.icon+'</span><span>'+t.name+'</span></a>'
        ).join("");
      }
      resultsEl.classList.add("active");
    }

    inputEl.addEventListener("input", ()=> render(inputEl.value));
    inputEl.addEventListener("focus", ()=> { if(inputEl.value.trim()) render(inputEl.value); });
    document.addEventListener("click", (e)=>{
      if(!resultsEl.contains(e.target) && e.target !== inputEl){
        resultsEl.classList.remove("active");
      }
    });
  }

  function escapeHtml(s){
    return s.replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
  }

  setupSearch(document.getElementById("headerSearch"), document.getElementById("headerSearchResults"));
  setupSearch(document.getElementById("heroSearch"), document.getElementById("heroSearchResults"));

  /* ---------------- Render de grid de herramientas (index) ---------------- */
  const grid = document.getElementById("toolsGrid");
  if(grid && typeof TOOLMEX_TOOLS !== "undefined"){
    function cardHtml(t){
      return '<a class="tool-card fade-up" href="'+toolUrl(t)+'" data-cat="'+t.cat+'">' +
        '<div class="tool-icon">'+t.icon+'</div>' +
        '<span class="tool-cat">'+t.cat+'</span>' +
        '<h3>'+t.name+'</h3>' +
        '<p>'+t.desc+'</p>' +
        '<span class="tool-link">Abrir herramienta →</span>' +
      '</a>';
    }
    function renderGrid(list){
      grid.innerHTML = list.map(cardHtml).join("") || '<p style="color:var(--text-dim);grid-column:1/-1;text-align:center;">No se encontraron herramientas.</p>';
    }
    renderGrid(TOOLMEX_TOOLS);

    // Categorías
    const catWrap = document.getElementById("categoryChips");
    if(catWrap && typeof TOOLMEX_CATEGORIES !== "undefined"){
      catWrap.innerHTML = TOOLMEX_CATEGORIES.map((c,i)=>
        '<button class="chip'+(i===0?" active":"")+'" data-cat="'+c+'">'+c+'</button>'
      ).join("");
      catWrap.addEventListener("click", (e)=>{
        const btn = e.target.closest(".chip");
        if(!btn) return;
        catWrap.querySelectorAll(".chip").forEach(c=>c.classList.remove("active"));
        btn.classList.add("active");
        const cat = btn.dataset.cat;
        renderGrid(cat === "Todas" ? TOOLMEX_TOOLS : TOOLMEX_TOOLS.filter(t=>t.cat===cat));
      });
    }
  }

  /* ---------------- Herramientas relacionadas (tool pages) ---------------- */
  const relatedGrid = document.getElementById("relatedGrid");
  if(relatedGrid && typeof TOOLMEX_TOOLS !== "undefined"){
    const currentId = document.body.dataset.tool;
    const current = TOOLMEX_TOOLS.find(t=>t.id===currentId);
    let related = TOOLMEX_TOOLS.filter(t=>t.id!==currentId);
    if(current){
      related = related.sort((a,b)=> (a.cat===current.cat?-1:0) - (b.cat===current.cat?-1:0));
    }
    related = related.slice(0,4);
    relatedGrid.innerHTML = related.map(t =>
      '<a class="tool-card" href="'+t.id+'.html"><div class="tool-icon">'+t.icon+'</div><h3 style="font-size:.95rem">'+t.name+'</h3><span class="tool-link">Abrir →</span></a>'
    ).join("");
  }

  /* ---------------- FAQ accordion ---------------- */
  document.querySelectorAll(".faq-item").forEach(item=>{
    const q = item.querySelector(".faq-q");
    if(!q) return;
    q.addEventListener("click", ()=>{
      const isOpen = item.classList.contains("open");
      item.classList.toggle("open", !isOpen);
      const a = item.querySelector(".faq-a");
      a.style.maxHeight = !isOpen ? a.scrollHeight + "px" : "0px";
    });
  });

  /* ---------------- Footer year ---------------- */
  document.querySelectorAll(".current-year").forEach(el => el.textContent = new Date().getFullYear());

})();
