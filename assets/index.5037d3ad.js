import{v as _e,n as be,r as m,o as B,c as h,a as b,b as e,w as K,d as Y,e as r,u as y,f as xe,g as X,h as ie,F as D,i as T,t as u,j as k,k as S,l as we,m as j,p as ye,q as O,s as $e,x as U,y as ee,z as q,A as Q,B as se,C as ce,D as ke,E as F,G as Se,H as je,I as Ce,J as De,K as Ie,L as J,M as Te,N as Ne,O as le,P as Fe,Q as Ge,R as Ae,S as Le,T as Oe}from"./vendor.9a6e4625.js";const Ve=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const c of t)if(c.type==="childList")for(const l of c.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function s(t){const c={};return t.integrity&&(c.integrity=t.integrity),t.referrerpolicy&&(c.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?c.credentials="include":t.crossorigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function i(t){if(t.ep)return;t.ep=!0;const c=s(t);fetch(t.href,c)}};Ve();function Ke(o={}){const{immediate:n=!1,onNeedRefresh:s,onOfflineReady:i,onRegistered:t,onRegisterError:c}=o;let l,a;const v=async(d=!0)=>{d&&(l==null||l.addEventListener("controlling",w=>{w.isUpdate&&window.location.reload()})),a&&a.waiting&&await be(a.waiting,{type:"SKIP_WAITING"})};if("serviceWorker"in navigator){l=new _e("/sw.js",{scope:"/",type:"classic"}),l.addEventListener("activated",d=>{d.isUpdate||i==null||i()});{const d=()=>{s==null||s()};l.addEventListener("waiting",d),l.addEventListener("externalwaiting",d)}l.register({immediate:n}).then(d=>{a=d,t==null||t(d)}).catch(d=>{c==null||c(d)})}return v}const ze={class:"h-screen"},He={class:"z-10 bg-white fixed bottom-0 w-full border-t border-gray-200 flex"},Me={class:"text-center"},Ee={class:"block h-8 text-3xl leading-8"},Pe=e("span",{class:"block text-xs leading-none"},"Ligen",-1),Re={class:"text-center"},Be={class:"block h-8 text-3xl leading-8"},Je=e("span",{class:"block text-xs leading-none"},"Favoriten",-1),We={class:"text-center"},Ue={class:"block h-8 text-3xl leading-8"},qe=e("span",{class:"block text-xs leading-none"},"Suche",-1),Qe={setup(o){"serviceWorker"in navigator&&Ke();const n=m([]);return m({}),B(()=>{console.log("onMounted"),n.value=JSON.parse(localStorage.getItem("favorites")||"[]")}),(s,i)=>{const t=Y("router-view"),c=Y("router-link");return r(),h("div",ze,[b(t),e("div",He,[b(c,{to:"leagues",class:"flex flex-grow items-center justify-center p-2 hover:text-indigo-500","active-class":"text-indigo-500"},{default:K(()=>[e("div",Me,[e("span",Ee,[b(y(xe),{class:"h-7 w-7 mx-auto"})]),Pe])]),_:1}),b(c,{to:"favorites","active-class":"text-indigo-500",class:"flex flex-grow items-center justify-center p-2 hover:text-indigo-500"},{default:K(()=>[e("div",Re,[e("span",Be,[b(y(X),{class:"h-7 w-7 mx-auto"})]),Je])]),_:1}),b(c,{to:"search",class:"flex flex-grow items-center justify-center p-2 hover:text-indigo-500","active-class":"text-indigo-500"},{default:K(()=>[e("div",We,[e("span",Ue,[b(y(ie),{class:"h-7 w-7 mx-auto"})]),qe])]),_:1})])])}}};const Ze=e("div",{class:"ml-5 mt-3 mb-3 absolute"},[e("h1",{class:"text-3xl font-bold"},"Suche"),e("p",{class:"text-sm text-gray-500 uppercase font-bold"},"Verein / Halle")],-1),Ye={class:"flex justify-center w-full pt-20"},Xe={class:"flex w-4/6"},es={class:"w-4/6 mx-auto"},ss=e("div",{class:"rounded-lg w-full mt-5 text-sm text-gray-500 uppercase font-bold"},"Verein",-1),ts={id:"clubs"},as=["onClick"],ls={class:"text-sm text-gray-500"},os=e("div",{class:"rounded-lg w-full mt-5 text-sm text-gray-500 uppercase font-bold"},"Halle",-1),ns={id:"gyms"},is=["onClick"],cs={class:"text-sm text-gray-500"},rs={setup(o){const n=m(!1);m([]),m(""),m("Show more");const s=m([]),i=m([]);m("");const t=async c=>{n.value=!0;const l=await fetch("https://spo.handball4all.de/service/if_g_json.php?cmd=cs&cs="+c),a=await fetch("https://spo.handball4all.de/service/if_g_json.php?cmd=gs&gs="+c),v=await l.json(),d=await a.json();s.value=v[0].searchResult.list,i.value=d[0].searchResult.list,n.value=!1};return(c,l)=>(r(),h(D,null,[Ze,e("div",Ye,[e("div",Xe,[b(y(ie),{class:"ml-auto h-6 mt-2 text-neutral-800 mr-0 z-10"}),e("input",{type:"text",autocomplete:"off",class:"-ml-8 w-full pl-8 rounded-full",onInput:l[0]||(l[0]=a=>t(a.target.value))},null,32)])]),e("div",es,[ss,e("div",ts,[(r(!0),h(D,null,T(s.value,a=>(r(),h("div",{class:"transform transition-all duration-300 scale-100 hover:scale-95 rounded-lg w-full border-neutral-300 border p-2 my-2",onClick:v=>c.$router.push("club#"+a.no)},u(a.lname),9,as))),256)),k(e("div",ls," Keine Ergebnisse ",512),[[S,s.value.length<1]])]),os,e("div",ns,[(r(!0),h(D,null,T(i.value,a=>(r(),h("div",{class:"transform transition-all duration-300 scale-100 hover:scale-95 rounded-lg w-full border-neutral-300 border p-2 my-2",onClick:v=>c.$router.push("gym#"+a.no)},u(a.lname),9,is))),256)),k(e("div",cs," Keine Ergebnisse ",512),[[S,i.value.length<1]])])])],64))}},ds={},us={class:"grid grid-cols-3 sm:grid-cols-6 gap-1"},ms={id:"teams",class:"text-black w-fit col-span-2 text-xs font-bold"},vs={id:"date-time",class:"w-fit text-xs text-gray-800"},hs={class:"flex"},gs={class:"flex"},fs={id:"location",class:"flex text-black col-span-2"},ps={class:"truncate text-xs"},_s={id:"score",class:"flex w-fit text-black"},bs={class:"min-w-[20px] mr-1 text-right"},xs=j(" : "),ws={class:"min-w-[20px] ml-1"},re={props:["match","teamID","teamClassID"],setup(o){return(n,s)=>(r(),h("div",{class:"rounded-lg bg-indigo-200 my-1 p-2 justify-between px-5 hover:scale-95 scale-100 transition-all",onClick:s[0]||(s[0]=i=>{n.$router.push("match#"+o.match.gID+";"+o.teamID+";"+o.teamClassID)})},[e("div",us,[e("div",ms,u(o.match.gHomeTeam)+" : "+u(o.match.gGuestTeam),1),e("div",vs,[e("div",hs,u(o.match.gWDay)+" "+u(o.match.gDate),1),e("div",gs,[b(y(we),{class:"h-4 mr-1 text-indigo-900"}),j(" "+u(o.match.gTime),1)])]),e("div",fs,[b(y(ye),{class:"h-4 w-4 text-indigo-900 shrink-0"}),e("span",ps,u(o.match.gGymnasiumName),1)]),e("div",_s,[e("div",bs,u(o.match.gHomeGoals),1),xs,e("div",ws,u(o.match.gGuestGoals),1)]),e("div",{id:"info",class:O(["col-span-3 text-xs text-gray-600",o.match.gComment.length>1?"flex":"hidden"])},[b(y($e),{class:"h-4 w-4 mr-1"}),j(" "+u(o.match.gComment),1)],2)])]))}};var de=(o,n)=>{const s=o.__vccOpts||o;for(const[i,t]of n)s[i]=t;return s};const ys={},$s={class:"rounded-lg xs:h-[76px] sm:h-[48px] h-[92px] w-full bg-indigo-200 my-1 p-2 justify-between px-5 hover:scale-95 scale-100 transition-all"},ks=U('<div class="grid grid-cols-3 sm:grid-cols-6 gap-1"><div id="teams" class="text-black w-fit col-span-2 text-xs font-bold"><span class="w-12 h-4 animate-pulse rounded -mb-1 bg-gray-500 inline-block"></span> : <span class="w-12 h-4 animate-pulse rounded -mb-1 bg-gray-500 inline-block"></span></div><div id="date-time" class="w-fit text-xs text-gray-800"><span class="inline-block w-6 animate-pulse rounded xs:hidden h-3 bg-gray-500"></span><div class="flex"><span class="w-4 mr-1 hidden xs:block animate-pulse rounded h-3 bg-gray-500"></span><span class="w-12 animate-pulse rounded h-3 bg-gray-500"></span></div><div class="flex"><div class="h-4 w-4 mt-0.5 animate-pulse bg-gray-500 rounded-full mr-1 shrink-0"></div><span class="w-8 h-3 mt-1 animate-pulse rounded m-0.5 bg-gray-500"></span></div></div><div id="location" class="flex text-black col-span-2 mt-1"><div class="h-4 w-4 bg-gray-500 animate-pulse rounded-full mr-1 shrink-0"></div><span class="truncate text-xs"><span class="w-20 rounded animate-pulse h-4 bg-gray-500 inline-block"></span></span></div><div id="score" class="flex w-fit text-black"><div class="min-w-[20px] mr-1 text-right"><span class="w-5 animate-pulse -mb-1 h-4 inline-block rounded bg-gray-500"></span></div> : <div class="min-w-[20px] ml-1"><span class="w-5 animate-pulse -mb-1 h-4 inline-block rounded bg-gray-500"></span></div></div></div>',1),Ss=[ks];function js(o,n){return r(),h("div",$s,Ss)}var ue=de(ys,[["render",js]]);const te=async(o,n,s,i)=>{if(!o)return s.find(a=>a.gClassID===n).matches;const l=(await(await fetch("https://spo.handball4all.de/service/if_g_json.php?ca=0&cmd=ps&cl="+n+"&ct="+o)).json())[0].content.futureGames.games;return console.log(l),console.log(i),i?l:l.filter(a=>{const v=a.gDate.split("."),d=a.gTime.split(":"),w=new Date("20"+v[2],v[1]-1,v[0],d[0],d[1]);return w.setHours(w.getHours()+2),w>new Date})},me=async(o,n,s)=>o?(await(await fetch("https://spo.handball4all.de/service/if_g_json.php?ca=0&cmd=ps&cl="+n+"&ct="+o)).json())[0]:s.find(c=>c.gClassID===n).matches,Cs=async(o,n)=>{const i=await(await fetch("https://spo.handball4all.de/service/if_g_json.php?ca=1&cmd=ps&cl="+o)).json();return i[0].content.score.length?i[0].content.score.filter(l=>l.tabTeamname.includes(n)).map(l=>l.tabTeamID):null},Ds=async o=>await(await fetch("https://spo.handball4all.de/service/if_ticker_data.php?token="+o+"&cmd=getAllGameInfo")).json(),oe=async o=>await(await fetch("https://spo.handball4all.de/service/if_ticker_data.php?token="+o+"&cmd=getAllTickerMessages")).json(),W=o=>{localStorage.setItem("favorites",JSON.stringify(o)),emit("updateFavorites")},ve=async()=>{const o=localStorage.getItem("favorites");return o?JSON.parse(o):[]},Is={class:"w-full h-full"},Ts=e("div",{class:"ml-5 pt-3 mb-3"},[e("h1",{class:"text-3xl font-bold"},"Verein"),e("p",{class:"text-sm text-gray-500 uppercase font-bold"}," Spiel\xFCbersicht ")],-1),Ns={id:"club-header",class:"flex w-5/6 m-auto border border-gray-100 shadow-xl rounded-lg relative"},Fs=["src"],Gs={key:1},As={id:"club-info",class:"my-10 m-5 line-clamp-4 break-words"},Ls={class:"font-bold"},Os={class:"text-gray-800"},Vs={class:"text-gray-800"},Ks=["href"],zs={class:"w-5/6 m-auto"},Hs={class:"mt-3 flex justify-between"},Ms=e("h2",{class:"font-bold text-lg m-1"},"Spiele",-1),Es={class:"text-sm m-2"},Ps=j(" Alle Spiele "),Rs={class:"overflow-auto max-h-[50%] w-full mx-auto bg-white rounded-2xl border border-gray-100 shadow-xl p-2 mb-20"},Bs={class:"mr-4 ml-auto text-opacity-75"},Js={key:0,id:"games_loading"},Ws=e("hr",{class:"bg-gray-400 text-black h-[1.5px] -mt-3"},null,-1),Us={class:"h-4 w-14 ml-auto mr-0 bg-indigo-300 rounded block underline-offset-2 underline hover:text-indigo-700 text-indigo-900"},qs=j("Zum Team"),Qs=e("div",{id:"league-info"},null,-1),Zs={id:"no-data",class:"mb-2"},Ys={id:"no-future-matches"},he={props:["club_no"],emits:["updateFavorites","disclosure-update"],setup(o,{emit:n}){const s=o,i=ee(),t=m({}),c=m([]),l=m([]),a=m(!0),v=m([]),d=m(null),w=m([]),C=m(!1);t.value={},m([]);const I=()=>{navigator.share?navigator.share({title:"Verein",text:t.value.lname,url:i.fullPath}):alert("Dein Browser unterst\xFCtzt das Share-Feature nicht.")},G=async()=>{let f="";s.club_no?f=s.club_no:f=i.hash.substring(1);const _=await(await fetch("https://spo.handball4all.de/service/if_g_json.php?cmd=cs&cs="+f)).json();t.value=_[0].searchResult.list[0]},A=async()=>{const x=await(await fetch("/club_address.json")).json();t.value.webaddress=x[t.value.no]},z=async()=>{const x=await(await fetch("https://spo.handball4all.de/misc/mobApp.php?jsoncallback=teamData&format=json&cmd=data&lvTypeNext=club&lvIDNext="+t.value.id)).text();new Function("teamData",x)(function(g){const p=g[0].dataList;var $=[];for(const N in p){let L=$.length-1;if(!$[L]||$[L].gClassID!=p[N].gClassID){const V={gClassID:p[N].gClassID,gClassSname:p[N].gClassSname,matches:[]};let Z=!1;V.gClassID||(V.gClassID=p[N].class,Z=!0),V.gClassSname||(V.gClassSname=p[N].class_sname,Z=!0),L=$.push(V)-1,Z||$[L].matches.push(p[N])}else $[L].matches.push(p[N])}c.value=$})},H=async f=>{a.value=!0,w.value=await Cs(f,t.value.lname),v.value={};for(const x of w.value)v.value[x]=await te(x,f,c.value,C.value);a.value=!1},M=()=>{if(!l.value.length)return!1;for(const f of l.value)if(f.type=="club"&&f.id==t.value.id)return!0},E=()=>{l.value.push({type:"club",id:t.value.id,name:t.value.lname,no:t.value.no}),W(l.value)},P=()=>{for(const f of l.value)f.type=="club"&&f.id==t.value.id&&l.value.splice(l.value.indexOf(f),1);W(l.value)},R=q(s,"club_no");return Q(R,async(f,x)=>{console.log("update club"),f&&forceUpdate()}),B(async()=>{await G(),l.value=await ve(),await A(),await z()}),(f,x)=>{const _=Y("router-link");return r(),h("div",Is,[Ts,e("div",Ns,[b(y(se),{class:"h-6 w-6 mt-1 ml-2 hover:text-indigo-500 absolute right-20 top-5",onClick:I}),k(b(y(X),{class:"h-6 w-6 mt-1 ml-2 hover:text-indigo-500 absolute right-5 top-5",onClick:E},null,512),[[S,!M()]]),k(b(y(ce),{class:"h-6 w-6 mt-1 ml-2 text-indigo-500 hover:text-black absolute right-5 top-5",onClick:P},null,512),[[S,M()]]),t.value?(r(),h("img",{key:0,src:"logos/clubs/"+t.value.no+".png",alt:"",class:"w-1/3 h-1/3 my-10 ml-5 rounded-lg border border-gray-500"},null,8,Fs)):(r(),h("div",Gs,"Loading...")),e("div",As,[e("div",Ls,u(t.value.lname),1),e("div",Os,"Postleitzahl: "+u(t.value.postal),1),e("div",Vs,"Nummer: "+u(t.value.no),1)]),e("a",{class:"absolute bottom-5 right-5 underline text-indigo-500 hover:text-indigo-800",href:"http://"+t.value.webaddress},u(t.value.webaddress),9,Ks)]),e("div",zs,[e("div",Hs,[Ms,e("div",Es,[Ps,k(e("input",{class:"ml-1 mb-1 rounded",type:"checkbox",name:"",id:"","onUpdate:modelValue":x[0]||(x[0]=g=>C.value=g),onClick:x[1]||(x[1]=g=>d.value?H(d.value):null)},null,512),[[ke,C.value]])])]),e("div",Rs,[(r(!0),h(D,null,T(c.value,g=>(r(),F(y(De),{key:g.gClassID},{default:K(({open:p})=>[b(y(je),{class:O(["flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-indigo-900 bg-indigo-100 rounded-t-lg hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75",[g.matches.length?"":"!text-gray-600 !bg-gray-200",g.gClassID!==d.value?"my-1 rounded-lg":""]]),onClick:$=>g.gClassID!==d.value?(d.value=g.gClassID,p=!0,H(g.gClassID)):(d.value=null,p=!1),disabled:!g.matches.length},{default:K(()=>[e("span",null,u(g.gClassSname),1),e("span",Bs,u(g.matches.length?"":"spielfrei"),1),b(y(Se),{class:O(["w-5 h-5 text-indigo-900",[p?"transform rotate-180":"",g.matches.length?"":"!text-gray-500"]])},null,8,["class"])]),_:2},1032,["class","onClick","disabled"]),k(b(y(Ce),{static:"",class:"px-4 pt-4 pb-2 text-sm text-gray-500 bg-indigo-100 rounded-b-lg"},{default:K(()=>[a.value?(r(),h("div",Js,[Ws,k(e("span",Us,null,512),[[S,a.value]]),(r(),h(D,null,T(3,$=>b(ue,{key:$})),64))])):(r(!0),h(D,{key:1},T(v.value,($,N,L)=>(r(),h("div",{key:N},[e("hr",{class:O(["bg-gray-400 text-black h-[1.5px]",L===0?"-mt-3":""])},null,2),b(_,{to:"team#"+w.value[L]+";"+g.gClassID+";"+t.value.no,class:"ml-auto mr-0 w-fit block underline-offset-2 underline hover:text-indigo-700 text-indigo-900"},{default:K(()=>[qs]),_:2},1032,["to"]),Qs,(r(!0),h(D,null,T($,V=>(r(),F(re,{key:V.gID,match:V,teamID:w.value[L],teamClassID:g.gClassID},null,8,["match","teamID","teamClassID"]))),128)),k(e("div",Zs,[k(e("div",Ys," Keine zuk\xFCnftigen Spiele ",512),[[S,!C.value]]),k(e("div",null," Keine Spiele in dieser Klasse ",512),[[S,C.value]])],512),[[S,!$.length]])]))),128))]),_:2},1536),[[S,g.gClassID===d.value]])]),_:2},1024))),128))])])])}}};var Xs="/icons/goal.png",et="/icons/ball.svg";const st={class:"flex p-1 m-1 bg-indigo-100 rounded-lg"},tt={class:"text-sm mr-1"},at=["innerHTML"],lt={class:"ml-auto hidden sm:flex mr-7 text-sm"},ot=e("img",{class:"h-5 w-5 mt-0.5 mr-1",src:Xs,alt:""},null,-1),nt={class:"text-sm flex sm:ml-0 ml-auto mr-7 w-fit"},it=e("img",{class:"h-4 mt-1",src:et,alt:""},null,-1),ct={class:"text-sm mr-2 sm:ml-5 <font-bold"},ge={props:["team_score"],setup(o){const n=s=>s.replace("/","/<wbr>");return(s,i)=>(r(),h("div",st,[e("div",tt,u(o.team_score.tabScore),1),e("div",{class:"font-bold text-sm",innerHTML:n(o.team_score.tabTeamname)},null,8,at),e("div",lt,[ot,j(" "+u(o.team_score.numGoalsShot)+" : "+u(o.team_score.numGoalsGot),1)]),e("div",nt,[it,j(" "+u(o.team_score.numPlayedGames),1)]),e("div",ct,u(o.team_score.pointsPlus),1)]))}},rt={},dt={class:"flex p-1 m-1 bg-indigo-100 rounded-lg"},ut=U('<div class="text-sm mr-1"><span class="bg-gray-500 animate-pulse h-4 w-20 mt-1 ml-1 inline-block rounded"></span></div><div class="font-bold text-sm"><span class="bg-gray-500 animate-pulse h-4 w-12"></span></div><div class="ml-auto hidden sm:flex mr-7 text-sm"><span class="bg-gray-500 animate-pulse h-4 w-4 rounded-full mr-1 mt-1"></span><span class="bg-gray-500 animate-pulse h-4 w-8 mt-1 rounded"></span> : <span class="bg-gray-500 animate-pulse h-4 w-8 mt-1 rounded"></span></div><div class="text-sm flex sm:ml-0 ml-auto mr-4 w-fit"><span class="bg-gray-500 animate-pulse h-4 w-4 rounded-full mr-1 mt-1"></span><span class="bg-gray-500 animate-pulse h-4 w-6 rounded mt-1"></span></div><div class="text-sm mr-2 sm:ml-5 font-bold"><span class="bg-gray-500 animate-pulse h-4 w-6 inline-block mt-1 rounded"></span></div>',5),mt=[ut];function vt(o,n){return r(),h("div",dt,mt)}var fe=de(rt,[["render",vt]]);const ht={class:"w-full h-full"},gt=e("div",{class:"ml-5 pt-3 mb-3"},[e("h1",{class:"text-3xl font-bold"},"Team"),e("p",{class:"text-sm text-gray-500 uppercase font-bold"}," Spiel\xFCbersicht ")],-1),ft={id:"club-header",class:"flex w-5/6 m-auto border border-gray-100 shadow-xl rounded-lg relative"},pt=["src"],_t={key:1,class:"w-1/3 h-1/3 my-10 ml-5 rounded-lg border border-gray-300 shadow-2xl bg-gray-300"},bt={id:"club-info",class:"my-12 m-5"},xt={class:"font-bold"},wt={class:"text-sm text-gray-900"},yt={id:"scores",class:"w-5/6 m-auto border border-gray-100 shadow-xl rounded-lg relative mt-2"},$t=U('<div class="flex mt-1"><span class="font-bold ml-2"> Tabelle </span><span class="hidden sm:block ml-auto mr-9"> Tore </span><span class="sm:ml-0 ml-auto mr-5"> Spiele </span><span class="mr-2"> Punkte </span></div>',1),kt={key:0},St={class:"w-5/6 m-auto"},jt={class:"mt-3 flex justify-between"},Ct=e("h2",{class:"font-bold text-lg m-1"},"Spiele",-1),Dt={class:"text-sm m-2"},It=j(" Alle Spiele "),Tt={class:"overflow-auto max-h-[50%] w-full mx-auto bg-white rounded-2xl border border-gray-100 shadow-xl p-2 mb-20"},Nt={key:0},Ft={key:1},Gt=e("div",{id:"league-info"},null,-1),At={id:"no-data"},Lt={id:"no-future-matches"},pe={props:["team_id","team_class","team_club"],emits:["updateFavorites"],setup(o,{emit:n}){const s=o,i=ee(),t=m([]);m(!1);const c=m(!1),l=m([]),a=m(null),v=m(null),d=m(null),w=m(null),C=m(null),I=m(!1),G=()=>{navigator.share?navigator.share({title:"Team",text:w.value.head.name+" "+C.value.lname,url:i.fullPath}):alert("Dein Browser unterst\xFCtzt das Share-Feature nicht.")},A=async()=>{c.value=!0,w.value=await me(v.value,a.value),l.value=await te(v.value,a.value,[],I.value),c.value=!1,console.log(l.value)},z=()=>{if(!t.value.length)return!1;for(const f of t.value)if(f.type=="team"&&f.id==v.value)return!0},H=()=>{console.log("add favorite"),t.value.push({type:"team",id:v,name:w.value.head.sname,classid:a.value,clubno:d.value,clubname:C.value.lname}),W(t.value)},M=()=>{console.log("remove favorite");for(const f of t.value)console.log(f.type),console.log(f.id),f.type=="team"&&f.id==v.value&&t.value.splice(t.value.indexOf(f),1);W(t.value)},E=q(s,"team_id");Q(E,async(f,x)=>{console.log("update club"),f&&forceUpdate()});const P=async()=>{const x=await(await fetch("https://spo.handball4all.de/service/if_g_json.php?cmd=cs&cs="+d.value)).json();C.value=x[0].searchResult.list[0]},R=async()=>{if(console.log(s.team_id),s.team_id&&s.team_class&&s.team_club)console.log("props"),v.value=s.team_id,a.value=s.team_class,d.value=s.team_club;else{const x=i.hash.substring(1).split(";");v.value=x[0],a.value=x[1],d.value=x[2]}console.log("teamID: "+v.value),console.log("teamClassID: "+a.value),console.log("teamClubNo: "+d.value)};return B(async()=>{await R(),t.value=await ve(),await A(),await P()}),(f,x)=>(r(),h("div",ht,[gt,e("div",ft,[b(y(se),{class:"h-6 w-6 mt-1 ml-2 hover:text-indigo-500 absolute right-20 top-5",onClick:G}),k(b(y(X),{class:"h-6 w-6 mt-1 ml-2 hover:text-indigo-500 absolute right-5 top-5",onClick:H},null,512),[[S,!z()]]),k(b(y(ce),{class:"h-6 w-6 mt-1 ml-2 text-indigo-500 hover:text-black absolute right-5 top-5",onClick:M},null,512),[[S,z()]]),w.value?(r(),h("img",{key:0,src:"logos/clubs/"+d.value+".png",alt:"",class:"w-1/3 h-1/3 my-10 ml-5 rounded-lg border border-gray-500"},null,8,pt)):(r(),h("div",_t,[b(y(Ie),{class:"text-gray-700"})])),e("div",bt,[e("div",xt,u(w.value?w.value.head.name:""),1),e("div",wt,u(C.value?C.value.lname:""),1)])]),e("div",yt,[$t,c.value?(r(),h("div",kt,[(r(),h(D,null,T(10,_=>b(fe,{key:_})),64))])):w.value?(r(!0),h(D,{key:1},T(w.value.content.score,_=>(r(),F(ge,{key:_.tabTeamID,team_score:_},null,8,["team_score"]))),128)):J("",!0)]),e("div",St,[e("div",jt,[Ct,e("div",Dt,[It,e("input",{class:"ml-1 mb-1 rounded",type:"checkbox",name:"",id:"",onClick:x[0]||(x[0]=_=>(I.value=!I.value,a.value?A():null))})])]),e("div",Tt,[c.value?(r(),h("div",Nt,[(r(),h(D,null,T(3,_=>b(ue,{key:_})),64))])):(r(),h("div",Ft,[Gt,k(e("div",At,[k(e("div",Lt," Keine zuk\xFCnftigen Spiele ",512),[[S,!I.value]]),k(e("div",null," Keine Spiele in dieser Klasse ",512),[[S,I.value]])],512),[[S,!l.value.length]]),(r(!0),h(D,null,T(l.value,_=>(r(),F(re,{key:_.id,match:_,teamID:v.value,teamClassID:a.value},null,8,["match","teamID","teamClassID"]))),128))]))])])]))}},Ot={class:"w-full h-full"},Vt={class:"mr-5 transition-all"},Kt=["onClick"],zt=["onClick"],Ht={class:"ml-0 mr-auto"},Mt={class:"ml-auto mr-0"},Et={key:2,class:"w-[calc(100%-4rem)] h-full ml-auto mr-0 flex justify-center items-center px-5"},Pt=e("span",{class:"text-lg"},[j(" Noch keine Favoriten angelegt. "),e("br"),j(" Gehen Sie daf\xFCr zur Suche oder den Ligen. ")],-1),Rt=[Pt],Bt={setup(o){const n=m([]),s=m({}),i=m(!1),t=a=>{s.value=a,localStorage.setItem("selectedFavorite",JSON.stringify(a))},c=()=>{const a=localStorage.getItem("selectedFavorite");a?s.value=JSON.parse(a):s.value={},console.log(a);let v=!1;n.value.forEach(d=>{d.type==s.value.type&&d.id==s.value.id&&(v=!0)}),v||(s.value=n.value[0])},l=async()=>{const a=localStorage.getItem("favorites");a?n.value=JSON.parse(a):n.value=[],c()};return B(async()=>{await l(),await c()}),(a,v)=>(r(),h("div",Ot,[e("div",{id:"menu",class:O(["h-full z-10 pl-5 w-[calc(50%+4rem)] bg-indigo-200 transition-all duration-300 fixed",i.value?"left-0":"-left-1/2"])},[b(y(Te),{class:"h-8 w-8 m-5 ml-auto mr-5",onClick:v[0]||(v[0]=d=>i.value=!i.value)}),e("div",Vt,[e("p",{class:O(["font-bold",i.value?"":"ml-[calc(100%-2.5rem)] -mr-2"])}," Verein ",2),(r(!0),h(D,null,T(n.value,d=>k((r(),h("div",{class:O(["rounded-lg shadow-2xl hover:scale-95 scale-100 transition all bg-indigo-600 h-9 break-all text-indigo-100 p-2 my-1 overflow-hidden",i.value?"":"ml-[calc(100%-3.2rem)] -mr-2"]),onClick:w=>t(d)},u(d.name),11,Kt)),[[S,d.type=="club"]])),256)),e("p",{class:O(["font-bold",i.value?"":"ml-[calc(100%-2.5rem)] -mr-2"])}," Team ",2),(r(!0),h(D,null,T(n.value,d=>k((r(),h("div",{class:O(["rounded-lg shadow-2xl hover:scale-95 scale-100 transition all bg-indigo-600 h-9 break-all text-indigo-100 p-2 my-1 overflow-hidden",i.value?"flex":"ml-[calc(100%-3.2rem)] -mr-2"]),onClick:w=>t(d)},[e("span",Ht,u(d.name),1),e("span",Mt,u(d.clubname),1)],10,zt)),[[S,d.type=="team"]])),256))])],2),s.value&&s.value.type=="club"?(r(),F(he,{class:"w-[calc(100%-4rem)] ml-auto mr-0",club_no:s.value.no,key:s.value.no,onUpdateFavorites:l},null,8,["club_no"])):s.value&&s.value.type=="team"?(r(),F(pe,{class:"w-[calc(100%-4rem)] ml-auto mr-0",team_id:s.value.id,team_class:s.value.classid,team_club:s.value.clubno,key:s.value.id,onUpdateFavorites:l},null,8,["team_id","team_class","team_club"])):(r(),h("div",Et,Rt))]))}},Jt={},Wt={props:["location"],setup(o){const n=o,s=window.navigator,i=()=>{console.log(n.location),s.platform.indexOf("iPhone")!=-1||s.platform.indexOf("iPad")!=-1||s.platform.indexOf("iPod")!=-1||s.userAgentData&&(s.userAgentData.platform.indexOf("iOS")!=-1||s.userAgentData.platform.indexOf("iPadOS")!=-1)?(console.log("iOS"),window.open("maps://www.google.com/maps/search/?api=1&query="+n.location)):(window.open("https://www.google.com/maps/search/?api=1&query="+n.location),console.log("Not iOS"))};return(t,c)=>(r(),F(y(Ne),{onClick:c[0]||(c[0]=l=>i()),class:"h-6 w-6 hover:text-indigo-500"}))}},Ut={key:0},qt={class:"flex mr-1 ml-auto sm:mr-10 w-fit"},Qt=["src"],Zt={key:1},Yt={class:"flex ml-1 mr-auto sm:ml-10 w-fit"},Xt=["src"],ne={props:["message","side"],setup(o){const n=o,s=m(null),i=m(null),t=m(!1),c=()=>{const a=n.message;a=="Spielstand 1. Halbzeit"||a=="Spielstand 2. Halbzeit"?(s.value="Spielstand",i.value="https://spo.handball4all.de/service/ticker/2Vg7rkdR.svg"):a.includes("7m")&&(a.includes("Tor")||a.includes("Erfolgreicher"))?(s.value="7m Tor durch Nr. "+a.replace("7m","").match(/\d+/)[0],i.value="https://spo.handball4all.de/service/ticker/doZSekQl.svg"):a.includes("7m")?(s.value="7m von Nr. "+a.replace("7m","").match(/\d+/)[0],i.value="https://spo.handball4all.de/service/ticker/OBOdJWyJ.svg"):a.includes("Tor")?(s.value="Tor durch Nr. "+a.match(/\d+/)[0],i.value="https://spo.handball4all.de/service/ticker/3GjFnr19.svg"):a.includes("Mannschafts-Auszeit")?(s.value="Auszeit",i.value="https://spo.handball4all.de/service/ticker/3B6Hgy_M.svg"):a.includes("Verwarnung")?(s.value="Verwarnung f\xFCr Nr. "+a.match(/\d+/)[0],i.value="https://spo.handball4all.de/service/ticker/jAfYIp8x.svg"):a.includes("2-min")?(s.value="2-min Strafe f\xFCr Nr. "+a.replace("2-min","").match(/\d+/)[0],i.value="https://spo.handball4all.de/service/ticker/V-fktpyp.svg"):(s.value="error",i.value=""),a.includes("Gastmannschaft")?t.value=!0:t.value=!1};c();const l=q(n,"message");return Q(l,async(a,v)=>{a&&c()}),(a,v)=>o.side=="left"&&!t.value?(r(),h("div",Ut,[e("div",qt,[j(u(s.value)+" ",1),e("img",{class:"h-5 w-5 ml-1 sm:mt-1 -mt-0.5",src:i.value,alt:""},null,8,Qt)])])):o.side=="right"&&t.value?(r(),h("div",Zt,[e("div",Yt,[e("img",{class:"h-5 w-5 mr-1 sm:mt-1 -mt-0.5",src:i.value,alt:""},null,8,Xt),j(" "+u(s.value),1)])])):J("",!0)}},ea={class:"w-full h-full"},sa=e("div",{class:"ml-5 pt-3 mb-3"},[e("h1",{class:"text-3xl font-bold"},"Spiel"),e("p",{class:"text-sm text-gray-500 uppercase font-bold"},"Info")],-1),ta={id:"game-header",class:"flex w-5/6 m-auto border border-gray-100 shadow-xl rounded-lg relative"},aa={class:"sm:text-xl sm:mt-0.5 mt-1 ml-2 absolute left-12 top-5"},la={id:"game-info",class:"mt-14 m-5 w-full"},oa={class:"font-bold text-xl sm:text-2xl justify-center flex"},na={class:"font-bold text-3xl sm:text-4xl my-4 justify-center flex"},ia={class:"text-md sm:text-xl my-4 justify-center flex hover:underline hover:text-indigo-500 hover:cursor-pointer"},ca={key:0,id:"ticker",class:"w-5/6 m-auto border border-gray-100 shadow-xl rounded-lg relative mt-2"},ra=e("div",{class:"flex mt-1"},[e("span",{class:"font-bold ml-2"}," Ticker ")],-1),da={id:"header",class:"flex justify-between"},ua={class:"h-20 bg-indigo-500 text-white relative font-bold flex items-center justify-center p-2 w-1/3"},ma=e("div",{class:"h-20 w-5 -scale-y-100 absolute -right-5 overflow-hidden inline-block"},[e("div",{class:"h-28 -mt-8 bg-indigo-500 -rotate-12 transform origin-bottom-right"})],-1),va={class:"grid justify-center mt-2"},ha={class:"flex justify-center"},ga={class:"justify-center flex font-bold text-xl"},fa={class:"bg-indigo-500 text-white font-bold relative flex items-center justify-center p-2 w-1/3"},pa=e("div",{class:"h-20 w-5 -scale-x-100 absolute -left-5 overflow-hidden inline-block"},[e("div",{class:"h-28 -mt-8 bg-indigo-500 -rotate-12 transform origin-bottom-right"})],-1),_a=e("div",{class:"flex justify-evenly p-3 m-2 bg-indigo-200 rounded font-bold text-gray-800"},[e("div",null,"Aktion"),e("div",null,"Spielstand"),e("div",null,"Aktion")],-1),ba={id:"data",class:"max-h-80 overflow-auto mb-2"},xa={class:"flex justify-evenly md:text-xl sm:text-sm text-xs p-3 mx-2 bg-indigo-100 rounded items-center text-gray-800"},wa={class:"w-1/3"},ya={class:"flex justify-center"},$a={class:"justify-center flex text-indigo-700 font-bold sm:text-xl"},ka={class:"w-1/3"},Sa={id:"scores",class:"w-5/6 m-auto border border-gray-100 shadow-xl rounded-lg relative mt-2"},ja=U('<div class="flex mt-1"><span class="font-bold ml-2"> Tabelle </span><span class="hidden sm:block ml-auto mr-9"> Tore </span><span class="sm:ml-0 ml-auto mr-5"> Spiele </span><span class="mr-2"> Punkte </span></div>',1),Ca={props:["team_id","team_class","game_id"],setup(o){const n=o,s=ee(),i=m([]),t=m([]),c=m(!0),l=m({}),a=m({}),v=m([]),d=5e3,w=m(!1),C=m(!1),I=m(null),G=m(null),A=m(null),z=["Spielzeit gestoppt","Spielzeit gestartet"],H=()=>{navigator.share?navigator.share({title:"Spiel",text:l.value+" "+club.value.lname,url:s.fullPath}):alert("Dein Browser unterst\xFCtzt das Share-Feature nicht.")},M=q(n,"game_id");Q(M,async(_,g)=>{console.log("update game"),_&&forceUpdate()});const E=_=>{let g=Math.floor(_/60),p=_%60,$=p<10?"0"+p:p;return g+":"+$},P=async()=>{if(n.game_id&&n.team_id&&n.team_class)console.log("props"),A.value=n.game_id,G.value=n.team_id,I.value=n.team_class;else{const g=s.hash.substring(1).split(";");A.value=g[0],G.value=g[1],I.value=g[2]}console.log("gameID: "+A.value),console.log("teamID: "+G.value),console.log("teamClassID: "+I.value)},R=async()=>{c.value=!0,i.value=await te(G.value,I.value,[],!0),t.value=await me(G.value,I.value),l.value=i.value.find(_=>_.gID===A.value),c.value=!1},f=async()=>{if(w.value=!0,l.value.gLive){console.log("game is live"),setInterval(async()=>{let g=await oe(l.value.gTickerToken);C.value||(g=g.filter(p=>!z.includes(p.message))),g=g.reverse(),v.value=x(g)},d);let _=await oe(l.value.gTickerToken);C.value||(_=_.filter(g=>!z.includes(g.message))),_=_.reverse(),v.value=x(_),a.value=await Ds(l.value.gTickerToken)}w.value=!1},x=_=>{const g=[];return _.forEach(p=>{let $=!1;g.forEach(N=>{p.message===N.message&&p.game_time===N.game_time&&(console.log("found duplicate"),$=!0)}),$||g.push(p)}),g};return B(async()=>{await P(),await R(),await f()}),(_,g)=>(r(),h("div",ea,[sa,e("div",ta,[b(y(le),{class:"h-6 w-6 mt-1 ml-2 absolute left-5 top-5"}),e("span",aa,u(l.value.gDate)+" "+u(l.value.gTime),1),b(y(se),{class:"h-6 w-6 mt-1 ml-2 hover:text-indigo-500 absolute right-7 top-5",onClick:H}),e("div",la,[e("div",oa,u(l.value.gHomeTeam)+" : "+u(l.value.gGuestTeam),1),e("div",na,u(l.value.gHomeGoals)+" : "+u(l.value.gGuestGoals),1),e("div",ia,[c.value?J("",!0):(r(),F(Wt,{key:0,class:"",location:l.value.gGymnasiumName+"+"+l.value.gGymnasiumStreet+"+"+l.value.gGymnasiumPostal+"+"+l.value.gGymnasiumTown},null,8,["location"])),j(" "+u(l.value.gGymnasiumName)+" "+u(l.value.gGymnasiumTown),1)])])]),l.value.gLive&&!w.value&&a.value?(r(),h("div",ca,[ra,e("div",da,[e("div",ua,[ma,j(" "+u(a.value.team_home.club),1)]),e("div",va,[e("div",ha,[b(y(le),{class:"h-6 w-6"}),j(" "+u(E(v.value[v.value.length-1].game_time)),1)]),e("div",ga,u(v.value[v.value.length-1].home_score)+" : "+u(v.value[v.value.length-1].guest_score),1)]),e("div",fa,[j(u(a.value.team_home.club)+" ",1),pa])]),_a,e("div",ba,[b(y(Fe),{class:"h-full",nodes:v.value,viewportHeight:320,getNodeHeight:p=>84,"get-node-key":(p,$)=>$},{cell:K(p=>[e("div",xa,[e("div",wa,[b(ne,{message:p.node.message,side:"left"},null,8,["message"])]),e("div",null,[e("div",ya,u(E(p.node.game_time)),1),e("div",$a,u(p.node.home_score)+" : "+u(p.node.guest_score),1)]),e("div",ka,[b(ne,{class:"flex",message:p.node.message,side:"right"},null,8,["message"])])])]),_:1},8,["nodes","getNodeHeight","get-node-key"])])])):J("",!0),e("div",Sa,[ja,c.value?(r(),F(fe,{key:0})):(r(!0),h(D,{key:1},T(t.value.content.score,p=>(r(),F(ge,{key:p.tabTeamID,team_score:p},null,8,["team_score"]))),128))])]))}},Da={},Ia=[{path:"//",redirect:"/favorites"},{path:"//team",component:pe,meta:{KeepAlive:!0}},{path:"//leagues",component:ds,meta:{KeepAlive:!0}},{path:"//favorites",component:Bt,meta:{KeepAlive:!0}},{path:"//search",component:rs,meta:{KeepAlive:!0}},{path:"//match",component:Ca,meta:{KeepAlive:!0}},{path:"//club",component:he,meta:{KeepAlive:!0}},{path:"//gym",component:Da,meta:{KeepAlive:!0}},{path:"//settings",component:Jt,meta:{KeepAlive:!0}}],Ta=Ge({history:Ae(),routes:Ia}),ae=Le(Qe);ae.use(Ta);ae.use(Oe);ae.mount("#app");
