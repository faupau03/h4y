import{v as he,n as pe,r as u,o as W,a as X,b as l,c as d,d as g,e,w as M,u as w,f as ge,g as Y,h as te,F as N,i as T,j as x,k as $,t as h,l as _e,m as L,p as fe,q as O,s as be,x as ee,y as se,z as ae,A as le,B as oe,C as ne,D as ie,E as V,G as xe,H as we,I as ye,J as $e,K as ke,L as Ce,M as Se,N as je,O as De,P as Ie}from"./vendor.8eb32c2f.js";const Fe=function(){const m=document.createElement("link").relList;if(m&&m.supports&&m.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))v(t);new MutationObserver(t=>{for(const c of t)if(c.type==="childList")for(const i of c.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&v(i)}).observe(document,{childList:!0,subtree:!0});function s(t){const c={};return t.integrity&&(c.integrity=t.integrity),t.referrerpolicy&&(c.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?c.credentials="include":t.crossorigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function v(t){if(t.ep)return;t.ep=!0;const c=s(t);fetch(t.href,c)}};Fe();function Ne(r={}){const{immediate:m=!1,onNeedRefresh:s,onOfflineReady:v,onRegistered:t,onRegisterError:c}=r;let i,o;const p=async(n=!0)=>{n&&(i==null||i.addEventListener("controlling",k=>{k.isUpdate&&window.location.reload()})),o&&o.waiting&&await pe(o.waiting,{type:"SKIP_WAITING"})};if("serviceWorker"in navigator){i=new he("/sw.js",{scope:"/",type:"classic"}),i.addEventListener("activated",n=>{n.isUpdate||v==null||v()});{const n=()=>{s==null||s()};i.addEventListener("waiting",n),i.addEventListener("externalwaiting",n)}i.register({immediate:m}).then(n=>{o=n,t==null||t(n)}).catch(n=>{c==null||c(n)})}return p}const Te={class:"w-screen h-screen"},Le={class:"z-10 bg-white fixed bottom-0 w-full border-t border-gray-200 flex"},Ae={class:"text-center"},Ke={class:"block h-8 text-3xl leading-8"},Oe=e("span",{class:"block text-xs leading-none"},"Ligen",-1),Ge={class:"text-center"},Me={class:"block h-8 text-3xl leading-8"},Ve=e("span",{class:"block text-xs leading-none"},"Favoriten",-1),Ee={class:"text-center"},ze={class:"block h-8 text-3xl leading-8"},Pe=e("span",{class:"block text-xs leading-none"},"Suche",-1),Re={setup(r){"serviceWorker"in navigator&&Ne();const m=u([]);return u({}),W(()=>{console.log("onMounted"),m.value=JSON.parse(localStorage.getItem("favorites")||"[]")}),(s,v)=>{const t=X("router-view"),c=X("router-link");return l(),d("div",Te,[g(t),e("div",Le,[g(c,{to:"leagues",class:"flex flex-grow items-center justify-center p-2 hover:text-indigo-500","active-class":"text-indigo-500"},{default:M(()=>[e("div",Ae,[e("span",Ke,[g(w(ge),{class:"h-7 w-7 mx-auto"})]),Oe])]),_:1}),g(c,{to:"favorites","active-class":"text-indigo-500",class:"flex flex-grow items-center justify-center p-2 hover:text-indigo-500"},{default:M(()=>[e("div",Ge,[e("span",Me,[g(w(Y),{class:"h-7 w-7 mx-auto"})]),Ve])]),_:1}),g(c,{to:"search",class:"flex flex-grow items-center justify-center p-2 hover:text-indigo-500","active-class":"text-indigo-500"},{default:M(()=>[e("div",Ee,[e("span",ze,[g(w(te),{class:"h-7 w-7 mx-auto"})]),Pe])]),_:1})])])}}};const Je=e("div",{class:"ml-5 mt-3 mb-3 absolute"},[e("h1",{class:"text-3xl font-bold"},"Suche"),e("p",{class:"text-sm text-gray-500 uppercase font-bold"},"Verein / Halle")],-1),He={class:"flex justify-center w-full pt-20"},Ue={class:"flex w-4/6"},We={class:"w-4/6 mx-auto"},Be=e("div",{class:"rounded-lg w-full mt-5 text-sm text-gray-500 uppercase font-bold"},"Verein",-1),qe={id:"clubs"},Ze=["onClick"],Qe={class:"text-sm text-gray-500"},Xe=e("div",{class:"rounded-lg w-full mt-5 text-sm text-gray-500 uppercase font-bold"},"Halle",-1),Ye={id:"gyms"},et=["onClick"],tt={class:"text-sm text-gray-500"},st={setup(r){const m=u(!1);u([]),u(""),u("Show more");const s=u([]),v=u([]);u("");const t=async c=>{m.value=!0;const i=await fetch("https://spo.handball4all.de/service/if_g_json.php?cmd=cs&cs="+c),o=await fetch("https://spo.handball4all.de/service/if_g_json.php?cmd=gs&gs="+c),p=await i.json(),n=await o.json();s.value=p[0].searchResult.list,v.value=n[0].searchResult.list,m.value=!1};return(c,i)=>(l(),d(N,null,[Je,e("div",He,[e("div",Ue,[g(w(te),{class:"ml-auto h-6 mt-2 text-neutral-800 mr-0 z-10"}),e("input",{type:"text",autocomplete:"off",class:"-ml-8 w-full pl-8 rounded-full",onInput:i[0]||(i[0]=o=>t(o.target.value))},null,32)])]),e("div",We,[Be,e("div",qe,[(l(!0),d(N,null,T(s.value,o=>(l(),d("div",{class:"transform transition-all duration-300 scale-100 hover:scale-95 rounded-lg w-full border-neutral-300 border p-2 my-2",onClick:p=>c.$router.push("club#"+o.no)},h(o.lname),9,Ze))),256)),x(e("div",Qe," Keine Ergebnisse ",512),[[$,s.value.length<1]])]),Xe,e("div",Ye,[(l(!0),d(N,null,T(v.value,o=>(l(),d("div",{class:"transform transition-all duration-300 scale-100 hover:scale-95 rounded-lg w-full border-neutral-300 border p-2 my-2",onClick:p=>c.$router.push("gym#"+o.no)},h(o.lname),9,et))),256)),x(e("div",tt," Keine Ergebnisse ",512),[[$,v.value.length<1]])])])],64))}},at={},lt={class:"rounded-lg bg-indigo-200 my-1 p-2 justify-between px-5 hover:scale-95 scale-100 transition-all"},ot={class:"grid grid-cols-3 sm:grid-cols-6 gap-1"},nt={id:"teams",class:"text-black w-fit col-span-2 text-xs font-bold"},it={id:"date-time",class:"w-fit text-xs text-gray-800"},ct={class:"flex"},rt={class:"flex"},dt={id:"location",class:"flex text-black col-span-2"},ut={class:"truncate text-xs"},mt={id:"score",class:"flex w-fit text-black"},vt={class:"min-w-[20px] mr-1 text-right"},ht=L(" : "),pt={class:"min-w-[20px] ml-1"},ce={props:["match"],setup(r){return(m,s)=>(l(),d("div",lt,[e("div",ot,[e("div",nt,h(r.match.gHomeTeam)+" : "+h(r.match.gGuestTeam),1),e("div",it,[e("div",ct,h(r.match.gWDay)+" "+h(r.match.gDate),1),e("div",rt,[g(w(_e),{class:"h-4 mr-1 text-indigo-900"}),L(" "+h(r.match.gTime),1)])]),e("div",dt,[g(w(fe),{class:"h-4 w-4 text-indigo-900 shrink-0"}),e("span",ut,h(r.match.gGymnasiumName),1)]),e("div",mt,[e("div",vt,h(r.match.gHomeGoals),1),ht,e("div",pt,h(r.match.gGuestGoals),1)]),e("div",{id:"info",class:O(["col-span-3 text-xs text-gray-600",r.match.gComment.length>1?"flex":"hidden"])},[g(w(be),{class:"h-4 w-4 mr-1"}),L(" "+h(r.match.gComment),1)],2)])]))}};var re=(r,m)=>{const s=r.__vccOpts||r;for(const[v,t]of m)s[v]=t;return s};const gt={},_t={class:"rounded-lg xs:h-[76px] sm:h-[48px] h-[92px] w-full bg-indigo-200 my-1 p-2 justify-between px-5 hover:scale-95 scale-100 transition-all"},ft=ee('<div class="grid grid-cols-3 sm:grid-cols-6 gap-1"><div id="teams" class="text-black w-fit col-span-2 text-xs font-bold"><span class="w-12 h-4 animate-pulse rounded -mb-1 bg-gray-500 inline-block"></span> : <span class="w-12 h-4 animate-pulse rounded -mb-1 bg-gray-500 inline-block"></span></div><div id="date-time" class="w-fit text-xs text-gray-800"><span class="inline-block w-6 animate-pulse rounded xs:hidden h-3 bg-gray-500"></span><div class="flex"><span class="w-4 mr-1 hidden xs:block animate-pulse rounded h-3 bg-gray-500"></span><span class="w-12 animate-pulse rounded h-3 bg-gray-500"></span></div><div class="flex"><div class="h-4 w-4 mt-0.5 animate-pulse bg-gray-500 rounded-full mr-1 shrink-0"></div><span class="w-8 h-3 mt-1 animate-pulse rounded m-0.5 bg-gray-500"></span></div></div><div id="location" class="flex text-black col-span-2 mt-1"><div class="h-4 w-4 bg-gray-500 animate-pulse rounded-full mr-1 shrink-0"></div><span class="truncate text-xs"><span class="w-20 rounded animate-pulse h-4 bg-gray-500 inline-block"></span></span></div><div id="score" class="flex w-fit text-black"><div class="min-w-[20px] mr-1 text-right"><span class="w-5 animate-pulse -mb-1 h-4 inline-block rounded bg-gray-500"></span></div> : <div class="min-w-[20px] ml-1"><span class="w-5 animate-pulse -mb-1 h-4 inline-block rounded bg-gray-500"></span></div></div></div>',1),bt=[ft];function xt(r,m){return l(),d("div",_t,bt)}var de=re(gt,[["render",xt]]);const wt={class:"w-full h-full"},yt=e("div",{class:"ml-5 pt-3 mb-3"},[e("h1",{class:"text-3xl font-bold"},"Verein"),e("p",{class:"text-sm text-gray-500 uppercase font-bold"}," Spiel\xFCbersicht ")],-1),$t={id:"club-header",class:"flex w-5/6 m-auto border border-gray-100 shadow-xl rounded-lg relative"},kt=["src"],Ct={key:1},St={id:"club-info",class:"my-10 m-5 line-clamp-4 break-words"},jt={class:"font-bold"},Dt={class:"text-gray-800"},It={class:"text-gray-800"},Ft=["href"],Nt={class:"w-5/6 m-auto"},Tt={class:"mt-3 flex justify-between"},Lt=e("h2",{class:"font-bold text-lg m-1"},"Spiele",-1),At={class:"text-sm m-2"},Kt=L(" Alle Spiele "),Ot={class:"overflow-auto max-h-[50%] w-full mx-auto bg-white rounded-2xl border border-gray-100 shadow-xl p-2 mb-20"},Gt={class:"mr-4 ml-auto text-opacity-75"},Mt=e("hr",{class:"bg-gray-400 text-black h-[1.5px] mb-2 -mt-3"},null,-1),Vt=L("Zum Team"),Et={class:"h-4 w-14 ml-auto mr-0 bg-indigo-300 rounded block underline-offset-2 underline hover:text-indigo-700 text-indigo-900"},zt={key:0},Pt={key:1},Rt=e("div",{id:"league-info"},null,-1),Jt={id:"no-data"},Ht={id:"no-future-matches"},Ut=["data-id","onClick"],ue={props:["club_no"],emits:["updateFavorites","disclosure-update"],setup(r,{emit:m}){const s=r,v=ie(),t=u({}),c=u([]),i=u([]),o=u(!1),p=u([]),n=u(null),k=u(null),j=u(!1);t.value={};const A=u([]),G=()=>{navigator.share?navigator.share({title:"Verein",text:t.value.lname,url:v.fullPath}):alert("Dein Browser unterst\xFCtzt das Share-Feature nicht.")},B=a=>{A.value.filter(y=>y.getAttribute("data-id")!==a.toString()).forEach(y=>y.click())},z=(a,S)=>{if(!S)return;const y=A.value.find(_=>_.getAttribute("data-id")===k.value);console.log(y),a(y)},P=async()=>{let a="";s.club_no?a=s.club_no:a=v.hash.substring(1);const y=await(await fetch("https://spo.handball4all.de/service/if_g_json.php?cmd=cs&cs="+a)).json();t.value=y[0].searchResult.list[0]},q=async()=>{const S=await(await fetch("/club_address.json")).json();t.value.webaddress=S[t.value.no]},R=async a=>{console.log(a),p.value=a,m("disclosure-update"),o.value=!0;const y=await(await fetch("https://spo.handball4all.de/service/if_g_json.php?ca=1&cmd=ps&cl="+a)).json();if(!y[0].content.score.length){p.value=c.value.find(f=>f.gClassID===a).matches,o.value=!1,k.value=null;return}const _=y[0].content.score.find(f=>f.tabTeamname.includes(t.value.lname));console.log(_.tabTeamID),k.value=_.tabTeamID;const I=(await(await fetch("https://spo.handball4all.de/service/if_g_json.php?ca=0&cmd=ps&cl="+a+"&ct="+_.tabTeamID)).json())[0].content.futureGames.games;j.value?p.value=I:p.value=I.filter(f=>{const K=f.gDate.split("."),E=f.gTime.split(":");return new Date("20"+K[2],K[1]-1,K[0],E[0],E[1])>new Date}),o.value=!1},J=async()=>{const S=await(await fetch("https://spo.handball4all.de/misc/mobApp.php?jsoncallback=teamData&format=json&cmd=data&lvTypeNext=club&lvIDNext="+t.value.id)).text();new Function("teamData",S)(function(_){const F=_[0].dataList;var D=[];for(const I in F){let f=D.length-1;if(!D[f]||D[f].gClassID!=F[I].gClassID){const K={gClassID:F[I].gClassID,gClassSname:F[I].gClassSname,matches:[]};let E=!1;K.gClassID||(K.gClassID=F[I].class,E=!0),K.gClassSname||(K.gClassSname=F[I].class_sname,E=!0),f=D.push(K)-1,E||D[f].matches.push(F[I])}else D[f].matches.push(F[I])}c.value=D})},H=()=>{if(!i.value.length)return!1;for(const a of i.value)if(a.type=="club"&&a.id==t.value.id)return!0},Z=()=>{i.value.push({type:"club",id:t.value.id,name:t.value.lname,no:t.value.no}),U()},Q=()=>{for(const a of i.value)a.type=="club"&&a.id==t.value.id&&i.value.splice(i.value.indexOf(a),1);U()},U=()=>{localStorage.setItem("favorites",JSON.stringify(i.value)),m("updateFavorites")},b=async()=>{const a=localStorage.getItem("favorites");a?i.value=JSON.parse(a):i.value=[]},C=se(s,"club_no");return ae(C,async(a,S)=>{console.log("update club"),a&&forceUpdate()}),W(async()=>{await P(),await J(),await b(),await q()}),(a,S)=>{const y=X("router-link");return l(),d("div",wt,[yt,e("div",$t,[g(w(le),{class:"h-6 w-6 mt-1 ml-2 hover:text-indigo-500 absolute right-20 top-5",onClick:G}),x(g(w(Y),{class:"h-6 w-6 mt-1 ml-2 hover:text-indigo-500 absolute right-5 top-5",onClick:Z},null,512),[[$,!H()]]),x(g(w(oe),{class:"h-6 w-6 mt-1 ml-2 text-indigo-500 hover:text-black absolute right-5 top-5",onClick:Q},null,512),[[$,H()]]),t.value?(l(),d("img",{key:0,src:"logos/clubs/"+t.value.no+".png",alt:"",class:"w-1/3 h-1/3 my-10 ml-5 rounded-lg border border-gray-500"},null,8,kt)):(l(),d("div",Ct,"Loading...")),e("div",St,[e("div",jt,h(t.value.lname),1),e("div",Dt,"Postleitzahl: "+h(t.value.postal),1),e("div",It,"Nummer: "+h(t.value.no),1)]),e("a",{class:"absolute bottom-5 right-5 underline text-indigo-500 hover:text-indigo-800",href:"http://"+t.value.webaddress},h(t.value.webaddress),9,Ft)]),e("div",Nt,[e("div",Tt,[Lt,e("div",At,[Kt,x(e("input",{class:"ml-1 mb-1 rounded",type:"checkbox",name:"",id:"","onUpdate:modelValue":S[0]||(S[0]=_=>j.value=_),onClick:S[1]||(S[1]=_=>n.value?R(n.value):null)},null,512),[[ne,j.value]])])]),e("div",Ot,[(l(!0),d(N,null,T(c.value,(_,F)=>(l(),V(w($e),{key:_.gClassID},{default:M(({open:D,close:I})=>[g(w(we),{class:O(["flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-indigo-900 bg-indigo-100 rounded-t-lg hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75",[_.matches.length?"":"!text-gray-600 !bg-gray-200",D?"":"my-1 rounded-lg"]]),onClick:f=>(n.value=_.gClassID,o.value=!0,B(_.gClassID),R(_.gClassID)),disabled:!_.matches.length},{default:M(()=>[e("span",null,h(_.gClassSname),1),e("span",Gt,h(_.matches.length?"":"spielfrei"),1),g(w(xe),{class:O(["w-5 h-5 text-indigo-900",[D?"transform rotate-180":"",_.matches.length?"":"!text-gray-500"]])},null,8,["class"])]),_:2},1032,["class","onClick","disabled"]),g(w(ye),{class:"px-4 pt-4 pb-2 text-sm text-gray-500 bg-indigo-100 rounded-b-lg"},{default:M(()=>[Mt,x(g(y,{to:"team#"+k.value+";"+_.gClassID+";"+t.value.no,class:"ml-auto mr-0 w-fit block underline-offset-2 underline hover:text-indigo-700 text-indigo-900"},{default:M(()=>[Vt]),_:2},1032,["to"]),[[$,k.value&&!o.value]]),x(e("span",Et,null,512),[[$,o.value]]),o.value?(l(),d("div",zt,[(l(),d(N,null,T(3,f=>g(de,{key:f})),64))])):(l(),d("div",Pt,[Rt,(l(!0),d(N,null,T(p.value,f=>(l(),V(ce,{key:f.gID,match:f},null,8,["match"]))),128)),x(e("div",Jt,[x(e("div",Ht," Keine zuk\xFCnftigen Spiele ",512),[[$,!j.value]]),x(e("div",null," Keine Spiele in dieser Klasse ",512),[[$,j.value]])],512),[[$,!p.value.length]])]))]),_:2},1024),x(e("button",{ref_for:!0,ref:f=>A.value[F]=f,"data-id":_.gClassID,onClick:f=>z(I,D)},null,8,Ut),[[$,!1]])]),_:2},1024))),128))])])])}}};var Wt="/icons/goal.png",Bt="/icons/ball.svg";const qt={class:"flex p-1 m-1 bg-indigo-100 rounded-lg"},Zt={class:"text-sm mr-1"},Qt=["innerHTML"],Xt={class:"ml-auto hidden sm:flex mr-7 text-sm"},Yt=e("img",{class:"h-5 w-5 mt-0.5 mr-1",src:Wt,alt:""},null,-1),es={class:"text-sm flex sm:ml-0 ml-auto mr-7 w-fit"},ts=e("img",{class:"h-4 mt-1",src:Bt,alt:""},null,-1),ss={class:"text-sm mr-2 sm:ml-5 <font-bold"},as={props:["team_score"],setup(r){const m=s=>s.replace("/","/<wbr>");return(s,v)=>(l(),d("div",qt,[e("div",Zt,h(r.team_score.tabScore),1),e("div",{class:"font-bold text-sm",innerHTML:m(r.team_score.tabTeamname)},null,8,Qt),e("div",Xt,[Yt,L(" "+h(r.team_score.numGoalsShot)+" : "+h(r.team_score.numGoalsGot),1)]),e("div",es,[ts,L(" "+h(r.team_score.numPlayedGames),1)]),e("div",ss,h(r.team_score.pointsPlus),1)]))}},ls={},os={class:"flex p-1 m-1 bg-indigo-100 rounded-lg"},ns=ee('<div class="text-sm mr-1"><span class="bg-gray-500 animate-pulse h-4 w-20 mt-1 ml-1 inline-block rounded"></span></div><div class="font-bold text-sm"><span class="bg-gray-500 animate-pulse h-4 w-12"></span></div><div class="ml-auto hidden sm:flex mr-7 text-sm"><span class="bg-gray-500 animate-pulse h-4 w-4 rounded-full mr-1 mt-1"></span><span class="bg-gray-500 animate-pulse h-4 w-8 mt-1 rounded"></span> : <span class="bg-gray-500 animate-pulse h-4 w-8 mt-1 rounded"></span></div><div class="text-sm flex sm:ml-0 ml-auto mr-4 w-fit"><span class="bg-gray-500 animate-pulse h-4 w-4 rounded-full mr-1 mt-1"></span><span class="bg-gray-500 animate-pulse h-4 w-6 rounded mt-1"></span></div><div class="text-sm mr-2 sm:ml-5 font-bold"><span class="bg-gray-500 animate-pulse h-4 w-6 inline-block mt-1 rounded"></span></div>',5),is=[ns];function cs(r,m){return l(),d("div",os,is)}var rs=re(ls,[["render",cs]]);const ds={class:"w-full h-full"},us=e("div",{class:"ml-5 pt-3 mb-3"},[e("h1",{class:"text-3xl font-bold"},"Team"),e("p",{class:"text-sm text-gray-500 uppercase font-bold"}," Spiel\xFCbersicht ")],-1),ms={id:"club-header",class:"flex w-5/6 m-auto border border-gray-100 shadow-xl rounded-lg relative"},vs=["src"],hs={key:1,class:"w-1/3 h-1/3 my-10 ml-5 rounded-lg border border-gray-300 shadow-2xl bg-gray-300"},ps={id:"club-info",class:"my-12 m-5"},gs={class:"font-bold"},_s={class:"text-sm text-gray-900"},fs={id:"scores",class:"w-5/6 m-auto border border-gray-100 shadow-xl rounded-lg relative mt-2"},bs=ee('<div class="flex mt-1"><span class="font-bold ml-2"> Tabelle </span><span class="hidden sm:block ml-auto mr-9"> Tore </span><span class="sm:ml-0 ml-auto mr-5"> Spiele </span><span class="mr-2"> Punkte </span></div>',1),xs={class:"w-5/6 m-auto"},ws={class:"mt-3 flex justify-between"},ys=e("h2",{class:"font-bold text-lg m-1"},"Spiele",-1),$s={class:"text-sm m-2"},ks=L(" Alle Spiele "),Cs={class:"overflow-auto max-h-[50%] w-full mx-auto bg-white rounded-2xl border border-gray-100 shadow-xl p-2 mb-20"},Ss={key:0},js={key:1},Ds=e("div",{id:"league-info"},null,-1),Is={id:"no-data"},Fs={id:"no-future-matches"},me={props:["team_id","team_class","team_club"],emits:["updateFavorites"],setup(r,{emit:m}){const s=r,v=ie(),t=u([]),c=u(!1),i=u(!1),o=u([]),p=u(null),n=u(null),k=u(null),j=u(null),A=u(null),G=u(!1),B=()=>{navigator.share?navigator.share({title:"Team",text:j.value.head.name+" "+A.value.lname,url:v.fullPath}):alert("Dein Browser unterst\xFCtzt das Share-Feature nicht.")},z=async()=>{i.value=!0;const C=await(await fetch("https://spo.handball4all.de/service/if_g_json.php?ca=0&cmd=ps&cl="+p.value+"&ct="+n.value)).json();j.value=C[0];const a=C[0].content.futureGames.games;G.value?o.value=a:o.value=a.filter(S=>{const y=S.gDate.split(".");return new Date("20"+y[2],y[1]-1,y[0])>new Date}),i.value=!1},P=()=>{if(!t.value.length)return!1;for(const b of t.value)if(b.type=="team"&&b.id==n.value)return!0},q=()=>{console.log("add favorite"),t.value.push({type:"team",id:n,name:j.value.head.sname,classid:p.value,clubno:k.value,clubname:A.value.lname}),J()},R=()=>{console.log("remove favorite");for(const b of t.value)console.log(b.type),console.log(b.id),b.type=="team"&&b.id==n.value&&t.value.splice(t.value.indexOf(b),1);J()},J=()=>{localStorage.setItem("favorites",JSON.stringify(t.value)),m("updateFavorites")},H=async()=>{const b=localStorage.getItem("favorites");b?t.value=JSON.parse(b):t.value=[]},Z=se(s,"team_id");ae(Z,async(b,C)=>{console.log("update club"),b&&forceUpdate()});const Q=async()=>{const C=await(await fetch("https://spo.handball4all.de/service/if_g_json.php?cmd=cs&cs="+k.value)).json();A.value=C[0].searchResult.list[0]},U=async()=>{if(console.log(s.team_id),s.team_id&&s.team_class&&s.team_club)console.log("props"),n.value=s.team_id,p.value=s.team_class,k.value=s.team_club;else{const C=v.hash.substring(1).split(";");n.value=C[0],p.value=C[1],k.value=C[2]}console.log("teamID: "+n.value),console.log("teamClassID: "+p.value),console.log("teamClubNo: "+k.value)};return W(async()=>{await U(),await H(),await z(),await Q()}),(b,C)=>(l(),d("div",ds,[us,e("div",ms,[g(w(le),{class:"h-6 w-6 mt-1 ml-2 hover:text-indigo-500 absolute right-20 top-5",onClick:B}),x(g(w(Y),{class:"h-6 w-6 mt-1 ml-2 hover:text-indigo-500 absolute right-5 top-5",onClick:q},null,512),[[$,!P()]]),x(g(w(oe),{class:"h-6 w-6 mt-1 ml-2 text-indigo-500 hover:text-black absolute right-5 top-5",onClick:R},null,512),[[$,P()]]),j.value?(l(),d("img",{key:0,src:"logos/clubs/"+k.value+".png",alt:"",class:"w-1/3 h-1/3 my-10 ml-5 rounded-lg border border-gray-500"},null,8,vs)):(l(),d("div",hs,[g(w(ke),{class:"text-gray-700"})])),e("div",ps,[e("div",gs,h(j.value?j.value.head.name:""),1),e("div",_s,h(A.value?A.value.lname:""),1)])]),e("div",fs,[bs,c.value?(l(),V(rs,{key:0})):j.value?(l(!0),d(N,{key:1},T(j.value.content.score,a=>(l(),V(as,{key:a.tabTeamID,team_score:a},null,8,["team_score"]))),128)):Ce("",!0)]),e("div",xs,[e("div",ws,[ys,e("div",$s,[ks,x(e("input",{class:"ml-1 mb-1 rounded",type:"checkbox",name:"",id:"","onUpdate:modelValue":C[0]||(C[0]=a=>G.value=a),onClick:C[1]||(C[1]=a=>p.value?z():null)},null,512),[[ne,G.value]])])]),e("div",Cs,[i.value?(l(),d("div",Ss,[(l(),d(N,null,T(3,a=>g(de,{key:a})),64))])):(l(),d("div",js,[Ds,x(e("div",Is,[x(e("div",Fs," Keine zuk\xFCnftigen Spiele ",512),[[$,!G.value]]),x(e("div",null," Keine Spiele in dieser Klasse ",512),[[$,G.value]])],512),[[$,!o.value.length]]),(l(!0),d(N,null,T(o.value,a=>(l(),V(ce,{key:a.id,match:a},null,8,["match"]))),128))]))])])]))}},Ns={class:"w-full h-full"},Ts={class:"mr-5 transition-all"},Ls=["onClick"],As=["onClick"],Ks={class:"ml-0 mr-auto"},Os={class:"ml-auto mr-0"},Gs={key:2,class:"w-[calc(100%-4rem)] h-full ml-auto mr-0 flex justify-center items-center px-5"},Ms=e("span",{class:"text-lg"},[L(" Noch keine Favoriten angelegt. "),e("br"),L(" Gehen Sie daf\xFCr zur Suche oder den Ligen. ")],-1),Vs=[Ms],Es={setup(r){const m=u([]),s=u({}),v=u(!1),t=o=>{s.value=o,localStorage.setItem("selectedFavorite",JSON.stringify(o))},c=()=>{const o=localStorage.getItem("selectedFavorite");o?s.value=JSON.parse(o):s.value={},console.log(o);let p=!1;m.value.forEach(n=>{n.type==s.value.type&&n.id==s.value.id&&(p=!0)}),p||(s.value=m.value[0])},i=async()=>{const o=localStorage.getItem("favorites");o?m.value=JSON.parse(o):m.value=[],c()};return W(async()=>{await i(),await c()}),(o,p)=>(l(),d("div",Ns,[e("div",{id:"menu",class:O(["h-full z-10 pl-5 w-[calc(50%+4rem)] bg-indigo-200 transition-all duration-300 fixed",v.value?"left-0":"-left-1/2"])},[g(w(Se),{class:"h-8 w-8 m-5 ml-auto mr-5",onClick:p[0]||(p[0]=n=>v.value=!v.value)}),e("div",Ts,[e("p",{class:O(["font-bold",v.value?"":"ml-[calc(100%-2.5rem)] -mr-2"])}," Verein ",2),(l(!0),d(N,null,T(m.value,n=>x((l(),d("div",{class:O(["rounded-lg shadow-2xl hover:scale-95 scale-100 transition all bg-indigo-600 h-9 break-all text-indigo-100 p-2 my-1 overflow-hidden",v.value?"":"ml-[calc(100%-3.2rem)] -mr-2"]),onClick:k=>t(n)},h(n.name),11,Ls)),[[$,n.type=="club"]])),256)),e("p",{class:O(["font-bold",v.value?"":"ml-[calc(100%-2.5rem)] -mr-2"])}," Team ",2),(l(!0),d(N,null,T(m.value,n=>x((l(),d("div",{class:O(["rounded-lg shadow-2xl hover:scale-95 scale-100 transition all bg-indigo-600 h-9 break-all text-indigo-100 p-2 my-1 overflow-hidden",v.value?"flex":"ml-[calc(100%-3.2rem)] -mr-2"]),onClick:k=>t(n)},[e("span",Ks,h(n.name),1),e("span",Os,h(n.clubname),1)],10,As)),[[$,n.type=="team"]])),256))])],2),s.value&&s.value.type=="club"?(l(),V(ue,{class:"w-[calc(100%-4rem)] ml-auto mr-0",club_no:s.value.no,key:s.value.no,onUpdateFavorites:i},null,8,["club_no"])):s.value&&s.value.type=="team"?(l(),V(me,{class:"w-[calc(100%-4rem)] ml-auto mr-0",team_id:s.value.id,team_class:s.value.classid,team_club:s.value.clubno,key:s.value.id,onUpdateFavorites:i},null,8,["team_id","team_class","team_club"])):(l(),d("div",Gs,Vs))]))}},zs={},Ps={},Rs={},Js=[{path:"//",redirect:"/favorites"},{path:"//team",component:me,meta:{KeepAlive:!0}},{path:"//leagues",component:at,meta:{KeepAlive:!0}},{path:"//favorites",component:Es,meta:{KeepAlive:!0}},{path:"//search",component:st,meta:{KeepAlive:!0}},{path:"//match",component:Ps,meta:{KeepAlive:!0}},{path:"//club",component:ue,meta:{KeepAlive:!0}},{path:"//gym",component:Rs,meta:{KeepAlive:!0}},{path:"//settings",component:zs,meta:{KeepAlive:!0}}],Hs=je({history:De(),routes:Js}),ve=Ie(Re);ve.use(Hs);ve.mount("#app");
