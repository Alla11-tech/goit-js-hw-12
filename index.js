import{a as L,S as b,i as c}from"./assets/vendor-DvfmeZXB.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const E="https://pixabay.com/api/",S="45295548-800e218e35273c9a8c48208a3",w={key:S,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15};async function P(r,t){return(await L.get(E,{params:{...w,q:r,page:t}})).data}const d=document.querySelector(".gallery"),f=document.querySelector(".loader"),m=document.querySelector(".load-more-button"),q=new b(".gallery a",{captionsData:"alt",captionDelay:250});function v(r){const t=r.map(({webformatURL:n,largeImageURL:i,tags:e,likes:o,views:s,comments:g,downloads:h})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${i}">
          <img
            class="gallery-image"
            src="${n}"
            alt="${e}"
            loading="lazy"
          />
        </a>
        <div class="info">
          <p><b>Likes</b> ${o}</p>
          <p><b>Views</b> ${s}</p>
          <p><b>Comments</b> ${g}</p>
          <p><b>Downloads</b> ${h}</p>
        </div>
      </li>`).join("");d.insertAdjacentHTML("beforeend",t),q.refresh()}function M(){d.innerHTML=""}function A(){f.classList.remove("is-hidden")}function R(){f.classList.add("is-hidden")}function B(){m.classList.remove("is-hidden")}function l(){m.classList.add("is-hidden")}const $=document.querySelector(".form"),O=document.querySelector(".form-input"),_=document.querySelector(".load-more-button"),D=15;let p="",a=1,u=0;$.addEventListener("submit",H);_.addEventListener("click",I);async function H(r){r.preventDefault();const t=O.value.trim();if(!t){c.warning({title:"Warning",message:"Please enter a search query!",position:"topRight"});return}p=t,a=1,M(),l(),await y({isLoadMore:!1})}async function I(){await y({isLoadMore:!0})}async function y({isLoadMore:r}){A();try{const t=await P(p,a),{hits:n,totalHits:i}=t;if(a===1&&(u=i),!n||n.length===0){l(),c.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}v(n);const e=Math.ceil(u/D);a+=1,a<=e?B():(l(),c.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),r&&T()}catch(t){console.error(t),l(),c.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"})}finally{R()}}function T(){const r=document.querySelector(".gallery-item");if(!r)return;const{height:t}=r.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
