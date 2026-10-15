"use strict";
(() => {
 const root=document.documentElement;
 const setTheme=(value)=>{root.dataset.theme=value;document.querySelectorAll("[data-theme-toggle]").forEach(b=>b.setAttribute("aria-label",value==="light"?"Switch to dark theme":"Switch to light theme"));};
 let saved;try{saved=localStorage.getItem("x-site-theme");}catch{}
 setTheme(saved==="light"||saved==="dark"?saved:"dark");
 document.querySelectorAll("[data-theme-toggle]").forEach(button=>button.addEventListener("click",()=>{const value=root.dataset.theme==="light"?"dark":"light";setTheme(value);try{localStorage.setItem("x-site-theme",value)}catch{}}));
 const menu=document.querySelector("[data-nav-menu]"),toggle=document.querySelector("[data-nav-toggle]");
 if(menu&&toggle){
  const close=()=>{menu.dataset.open="false";toggle.setAttribute("aria-expanded","false");};
  toggle.addEventListener("click",()=>{const active=menu.dataset.open!=="true";menu.dataset.open=String(active);toggle.setAttribute("aria-expanded",String(active));});
  menu.addEventListener("click",event=>{if(event.target.closest("a"))close()});
  document.addEventListener("keydown",event=>{if(event.key==="Escape")close()});
 }
 document.querySelectorAll("[data-copy-target]").forEach(button=>button.addEventListener("click",async()=>{
  const target=document.getElementById(button.dataset.copyTarget),old=button.textContent;
  if(!target)return;
  try{if(!navigator.clipboard?.writeText)throw Error("Clipboard API unavailable");await navigator.clipboard.writeText(target.textContent);button.textContent="Copied";button.setAttribute("aria-label","Code copied to clipboard")}
  catch{button.textContent="Select code to copy";button.setAttribute("aria-label","Select code and copy manually");target.focus?.()}
  button.dataset.feedback="true";
  setTimeout(()=>{button.textContent=old;button.removeAttribute("data-feedback");button.setAttribute("aria-label","Copy code")},1800);
 }));
})();
