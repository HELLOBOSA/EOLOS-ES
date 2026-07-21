(function(){
  var path=window.location.pathname;
  if(!/\/index\.html$/i.test(path))return;
  window.location.replace(path.slice(0,-10)+window.location.search+window.location.hash);
})();

(function(){
  var body=document.body;
  var toggle=document.getElementById("menu-toggle");
  var menu=document.getElementById("mobile-menu");
  if(!toggle||!menu)return;

  var menuLinks=Array.prototype.slice.call(menu.querySelectorAll("a[href]"));
  var allNavLinks=Array.prototype.slice.call(document.querySelectorAll("[data-nav-section]"));

  function menuLabel(open){
    var es=document.documentElement.lang==="es";
    return open?(es?"Cerrar menu":"Close menu"):(es?"Abrir menu":"Open menu");
  }

  function setOpen(open,restoreFocus){
    toggle.setAttribute("aria-expanded",String(open));
    toggle.setAttribute("aria-label",menuLabel(open));
    menu.setAttribute("aria-hidden",String(!open));
    menu.inert=!open;
    body.classList.toggle("nav-open",open);
    if(!open&&restoreFocus)toggle.focus();
  }

  function currentSection(){
    var path=window.location.pathname;
    // Que Hacemos hub (/servicios/) and every service page
    if(path.indexOf("/servicios/")===0)return "servicios";
    if(path.indexOf("/reforma-integral")===0)return "servicios";
    if(path.indexOf("/branding-madrid")===0)return "servicios";
    if(path.indexOf("/diseno-web-madrid")===0)return "servicios";
    if(path.indexOf("/visualizacion")===0)return "servicios";
    if(path.indexOf("/direccion-creativa")===0)return "servicios";
    if(path.indexOf("/experiencia-completa")===0)return "servicios";
    if(path.indexOf("/interiorismo-comercial")===0)return "servicios";
    if(path.indexOf("/staging-digital")===0)return "servicios";
    if(path.indexOf("/consultoria-well-ap")===0)return "servicios";
    if(path.indexOf("/due-diligence-tecnica")===0)return "servicios";
    if(path.indexOf("/workplace-strategy")===0)return "servicios";
    if(path.indexOf("/paquetes-interiorismo")===0)return "servicios";
    // Para Quien hub (/a-quien-ayudamos/) and every sector page
    if(path.indexOf("/a-quien-ayudamos")===0)return "para-quien";
    if(path.indexOf("/para-")===0)return "para-quien";
    if(path.indexOf("/clientes-internacionales")===0)return "para-quien";
    if(path.indexOf("/nuevo-negocio")===0)return "para-quien";
    // Blog
    if(path.indexOf("/journal/")===0)return "journal";
    if(path.indexOf("/blog/")===0)return "journal";
    // Estudio
    if(path.indexOf("/estudio/")===0)return "estudio";
    if(path.indexOf("/arquitectos/")===0)return "estudio";
    if(path.indexOf("/profesionales/")===0)return "estudio";
    // Casos de exito
    if(path.indexOf("/proyectos/")===0)return "proyectos";
    return "";
  }

  var active=currentSection();
  allNavLinks.forEach(function(link){
    if(active&&link.getAttribute("data-nav-section")===active)link.setAttribute("aria-current","page");
    else link.removeAttribute("aria-current");
  });

  menu.inert=true;
  toggle.addEventListener("click",function(){setOpen(toggle.getAttribute("aria-expanded")!=="true",false);});
  menuLinks.forEach(function(link){link.addEventListener("click",function(){setOpen(false,false);});});
  document.addEventListener("keydown",function(event){if(event.key==="Escape"&&toggle.getAttribute("aria-expanded")==="true")setOpen(false,true);});

  var desktop=window.matchMedia("(min-width:981px)");
  function closeOnDesktop(event){if(event.matches)setOpen(false,false);}
  if(desktop.addEventListener)desktop.addEventListener("change",closeOnDesktop);
  else desktop.addListener(closeOnDesktop);
})();
