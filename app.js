const BOT="Hdkd28dkbot";
const TARGETS=["de","en","ru","cs","pl","it","uk","fr","es","tr","pt","nl","ar","zh","ja"];
const GT={zh:"zh-CN"};
const I={
de:{to:"Übersetzen nach",text:"Text",go:"Übersetzen",result:"Ergebnis",copy:"📋 Kopieren",copied:"✅ Kopiert",setbot:"✅ Als Zielsprache im Bot speichern",groups:"Gruppen: Bot hinzufügen, /on und /tolang xx — dann übersetzt er automatisch.",err:"⚠️ Übersetzung gerade nicht möglich.",det:"Erkannt"},
en:{to:"Translate to",text:"Text",go:"Translate",result:"Result",copy:"📋 Copy",copied:"✅ Copied",setbot:"✅ Save as target language in bot",groups:"Groups: add the bot, /on and /tolang xx — it translates automatically.",err:"⚠️ Translation unavailable right now.",det:"Detected"},
ru:{to:"Перевести на",text:"Текст",go:"Перевести",result:"Результат",copy:"📋 Копировать",copied:"✅ Скопировано",setbot:"✅ Сохранить язык в боте",groups:"Группы: добавь бота, /on и /tolang xx — автоперевод.",err:"⚠️ Перевод сейчас недоступен.",det:"Определено"},
cs:{to:"Přeložit do",text:"Text",go:"Přeložit",result:"Výsledek",copy:"📋 Kopírovat",copied:"✅ Zkopírováno",setbot:"✅ Uložit jako cílový jazyk v botu",groups:"Skupiny: přidej bota, /on a /tolang xx.",err:"⚠️ Překlad teď není dostupný.",det:"Rozpoznáno"},
pl:{to:"Tłumacz na",text:"Tekst",go:"Tłumacz",result:"Wynik",copy:"📋 Kopiuj",copied:"✅ Skopiowano",setbot:"✅ Zapisz język w bocie",groups:"Grupy: dodaj bota, /on i /tolang xx.",err:"⚠️ Tłumaczenie niedostępne.",det:"Wykryto"},
it:{to:"Traduci in",text:"Testo",go:"Traduci",result:"Risultato",copy:"📋 Copia",copied:"✅ Copiato",setbot:"✅ Salva come lingua nel bot",groups:"Gruppi: aggiungi il bot, /on e /tolang xx.",err:"⚠️ Traduzione non disponibile.",det:"Rilevato"}};
const $=id=>document.getElementById(id);
TARGETS.forEach(c=>{const o=document.createElement("option");o.value=c;o.textContent=MA.NAMES[c];$("to").appendChild(o);});
let t=I.en;
const getLang=MA.initLang(TARGETS,l=>{t=I[l]||I.en;document.querySelectorAll("[data-i]").forEach(e=>e.textContent=t[e.dataset.i]);if(!localStorage.getItem("ma_to"))$("to").value=l;});
if(localStorage.getItem("ma_to"))$("to").value=localStorage.getItem("ma_to");
$("to").onchange=()=>localStorage.setItem("ma_to",$("to").value);
async function translate(text,to){
  try{const u="https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&dt=t&tl="+(GT[to]||to)+"&q="+encodeURIComponent(text);
    const j=await (await fetch(u)).json();return {out:j[0].map(x=>x[0]).join(""),det:j[2]};}
  catch(e){const u="https://api.mymemory.translated.net/get?langpair=autodetect|"+to+"&q="+encodeURIComponent(text.slice(0,500));
    const j=await (await fetch(u)).json();return {out:j.responseData.translatedText,det:j.responseData.detectedLanguage||"?"};}
}
$("go").onclick=async()=>{const v=$("src").value.trim();if(!v)return;$("out").textContent="⏳";$("det").textContent="";
  try{const r=await translate(v,$("to").value);$("out").textContent=r.out;$("det").textContent=t.det+": "+r.det;}catch(e){$("out").textContent=t.err;}};
$("swap").onclick=()=>{if($("out").textContent&&$("out").textContent!=="⏳"){$("src").value=$("out").textContent;$("out").textContent="";}};
$("copy").onclick=async()=>{try{await navigator.clipboard.writeText($("out").textContent);$("copy").textContent=t.copied;setTimeout(()=>$("copy").textContent=t.copy,1500);}catch(e){}};
$("setbot").onclick=()=>MA.openBot(BOT,"l_"+$("to").value);
