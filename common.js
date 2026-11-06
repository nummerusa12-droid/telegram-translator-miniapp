// Shared helpers: Telegram WebApp init, language picker (button first), deep link back to bot.
window.MA = (function(){
  const tg = window.Telegram && window.Telegram.WebApp; if (tg){tg.ready();tg.expand();}
  const NAMES={de:"🇩🇪 Deutsch",en:"🇬🇧 English",ru:"🇷🇺 Русский",cs:"🇨🇿 Čeština",pl:"🇵🇱 Polski",it:"🇮🇹 Italiano",uk:"🇺🇦 Українська",fr:"🇫🇷 Français",es:"🇪🇸 Español",tr:"🇹🇷 Türkçe",pt:"🇵🇹 Português",nl:"🇳🇱 Nederlands",ar:"🇸🇦 العربية",zh:"🇨🇳 中文",ja:"🇯🇵 日本語"};
  function b64(str,maxBytes){let b=new TextEncoder().encode(str);if(b.length>maxBytes){b=b.slice(0,maxBytes);while(b.length&&(b[b.length-1]&0xC0)===0x80)b=b.slice(0,-1);if(b.length&&b[b.length-1]>=0xC0)b=b.slice(0,-1);}
    let s="";b.forEach(x=>s+=String.fromCharCode(x));return btoa(s).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");}
  function openBot(bot,payload){const u="https://t.me/"+bot+(payload?"?start="+payload:"");if(tg&&tg.openTelegramLink){tg.openTelegramLink(u);setTimeout(()=>tg.close(),300);}else location.href=u;}
  function initLang(supported,onChange){
    const guess=((tg&&tg.initDataUnsafe&&tg.initDataUnsafe.user&&tg.initDataUnsafe.user.language_code)||navigator.language||"en").slice(0,2);
    let lang=localStorage.getItem("ma_lang")||(supported.includes(guess)?guess:"en");
    const dlg=document.getElementById("langdlg"),sheet=dlg.querySelector(".sheet");
    supported.forEach(c=>{const b=document.createElement("button");b.className="ghost";b.textContent=NAMES[c]||c;b.onclick=()=>{lang=c;localStorage.setItem("ma_lang",c);dlg.classList.remove("on");apply();};sheet.appendChild(b);});
    dlg.onclick=e=>{if(e.target===dlg)dlg.classList.remove("on");};
    document.getElementById("langbtn").onclick=()=>dlg.classList.add("on");
    function apply(){document.documentElement.lang=lang;document.documentElement.dir=lang==="ar"?"rtl":"ltr";document.getElementById("langbtn").textContent="🌍 "+(NAMES[lang]||lang);onChange(lang);}
    apply();return ()=>lang;
  }
  return {tg,b64,openBot,initLang,NAMES};
})();
