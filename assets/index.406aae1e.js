import{v as re,r as i,o as B,a as Z,b as r,c as u,d as f,e,w as O,u as x,f as de,g as X,h as Y,F as A,i as K,j as C,k as S,t as d,l as ee,m as te,n as se,p as le,q as z,s as ae,x as Q,y as ue,z as T,A as me,B as he,C as ve,D as pe,E as fe,G as _e,H as ge,I as be,J as oe,K as xe,L as ye,M as we,N as $e}from"./vendor.e36a66a2.js";const ke=function(){const p=document.createElement("link").relList;if(p&&p.supports&&p.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))h(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&h(c)}).observe(document,{childList:!0,subtree:!0});function l(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function h(t){if(t.ep)return;t.ep=!0;const o=l(t);fetch(t.href,o)}};ke();function Ce(N={}){const{immediate:p=!1,onNeedRefresh:l,onOfflineReady:h,onRegistered:t,onRegisterError:o}=N;let c;const a=async(n=!0)=>{};return"serviceWorker"in navigator&&(c=new re("/h4y/sw.js",{scope:"/h4y/",type:"classic"}),c.addEventListener("activated",n=>{n.isUpdate?window.location.reload():h==null||h()}),c.register({immediate:p}).then(n=>{t==null||t(n)}).catch(n=>{o==null||o(n)})),a}const Se={class:"w-screen h-screen"},je={class:"z-10 bg-white fixed bottom-0 w-full border-t border-gray-200 flex"},De={class:"text-center"},Fe={class:"block h-8 text-3xl leading-8"},Ie=e("span",{class:"block text-xs leading-none"},"Ligen",-1),ze={class:"text-center"},Ne={class:"block h-8 text-3xl leading-8"},Te=e("span",{class:"block text-xs leading-none"},"Favoriten",-1),Ae={class:"text-center"},Le={class:"block h-8 text-3xl leading-8"},Oe=e("span",{class:"block text-xs leading-none"},"Suche",-1),Ke={setup(N){"serviceWorker"in navigator&&Ce();const p=i([]);return i({}),B(()=>{console.log("onMounted"),p.value=JSON.parse(localStorage.getItem("favorites")||"[]")}),(l,h)=>{const t=Z("router-view"),o=Z("router-link");return r(),u("div",Se,[f(t),e("div",je,[f(o,{to:"leagues",class:"flex flex-grow items-center justify-center p-2 hover:text-indigo-500","active-class":"text-indigo-500"},{default:O(()=>[e("div",De,[e("span",Fe,[f(x(de),{class:"h-7 w-7 mx-auto"})]),Ie])]),_:1}),f(o,{to:"favorites","active-class":"text-indigo-500",class:"flex flex-grow items-center justify-center p-2 hover:text-indigo-500"},{default:O(()=>[e("div",ze,[e("span",Ne,[f(x(X),{class:"h-7 w-7 mx-auto"})]),Te])]),_:1}),f(o,{to:"search",class:"flex flex-grow items-center justify-center p-2 hover:text-indigo-500","active-class":"text-indigo-500"},{default:O(()=>[e("div",Ae,[e("span",Le,[f(x(Y),{class:"h-7 w-7 mx-auto"})]),Oe])]),_:1})])])}}};const Ge=e("div",{class:"ml-5 mt-3 mb-3 absolute"},[e("h1",{class:"text-3xl font-bold"},"Suche"),e("p",{class:"text-sm text-gray-500 uppercase font-bold"},"Verein / Halle")],-1),Ve={class:"flex justify-center w-full pt-20"},Me={class:"flex w-4/6"},Re={class:"w-4/6 mx-auto"},Ee=e("div",{class:"rounded-lg w-full mt-5 text-sm text-gray-500 uppercase font-bold"},"Verein",-1),Je={id:"clubs"},Pe=["onClick"],Be={class:"text-sm text-gray-500"},Ue=e("div",{class:"rounded-lg w-full mt-5 text-sm text-gray-500 uppercase font-bold"},"Halle",-1),He={id:"gyms"},We=["onClick"],qe={class:"text-sm text-gray-500"},Ze={setup(N){const p=i(!1);i([]),i(""),i("Show more");const l=i([]),h=i([]);i("");const t=async o=>{p.value=!0;const c=await fetch("https://spo.handball4all.de/service/if_g_json.php?cmd=cs&cs="+o),a=await fetch("https://spo.handball4all.de/service/if_g_json.php?cmd=gs&gs="+o),n=await c.json(),m=await a.json();l.value=n[0].searchResult.list,h.value=m[0].searchResult.list,p.value=!1};return(o,c)=>(r(),u(A,null,[Ge,e("div",Ve,[e("div",Me,[f(x(Y),{class:"ml-auto h-6 mt-2 text-neutral-800 mr-0 z-10"}),e("input",{type:"text",autocomplete:"off",class:"-ml-8 w-full pl-8 rounded-full",onInput:c[0]||(c[0]=a=>t(a.target.value))},null,32)])]),e("div",Re,[Ee,e("div",Je,[(r(!0),u(A,null,K(l.value,a=>(r(),u("div",{class:"transform transition-all duration-300 scale-100 hover:scale-95 rounded-lg w-full border-neutral-300 border p-2 my-2",onClick:n=>o.$router.push("club#"+a.no)},d(a.lname),9,Pe))),256)),C(e("div",Be," Keine Ergebnisse ",512),[[S,l.value.length<1]])]),Ue,e("div",He,[(r(!0),u(A,null,K(h.value,a=>(r(),u("div",{class:"transform transition-all duration-300 scale-100 hover:scale-95 rounded-lg w-full border-neutral-300 border p-2 my-2",onClick:n=>o.$router.push("gym#"+a.no)},d(a.lname),9,We))),256)),C(e("div",qe," Keine Ergebnisse ",512),[[S,h.value.length<1]])])])],64))}},Qe={},Xe={class:"w-full h-full"},Ye=e("div",{class:"ml-5 pt-3 mb-3"},[e("h1",{class:"text-3xl font-bold"},"Verein"),e("p",{class:"text-sm text-gray-500 uppercase font-bold"}," Spiel\xFCbersicht ")],-1),et={id:"club-header",class:"flex w-5/6 m-auto border border-gray-100 shadow-xl rounded-lg relative"},tt=["src"],st={key:1},lt={id:"club-info",class:"my-10 m-5 line-clamp-4 break-words"},at={class:"font-bold"},ot={class:"text-gray-800"},nt={class:"text-gray-800"},it=["href"],ct={class:"w-5/6 m-auto"},rt={class:"mt-3 flex justify-between"},dt=e("h2",{class:"font-bold text-lg m-1"},"Spiele",-1),ut={class:"text-sm m-2"},mt=z(" Alle Spiele "),ht={class:"overflow-auto max-h-[50%] w-full mx-auto bg-white rounded-2xl border border-gray-100 shadow-xl p-2 mb-20"},vt={class:"mr-4 ml-auto text-opacity-75"},pt=e("hr",{class:"bg-gray-400 text-black h-[1.5px] mb-2 -mt-3"},null,-1),ft=z("Zum Team"),_t={key:0},gt={key:1},bt=e("div",{id:"league-info"},null,-1),xt={id:"no-data"},yt={id:"no-future-matches"},wt={class:"rounded-lg bg-indigo-200 my-1 p-2 justify-between px-5 hover:scale-95 scale-100 transition-all"},$t={class:"grid grid-cols-3 sm:grid-cols-6 gap-1"},kt={id:"teams",class:"text-black w-fit col-span-2 text-xs font-bold"},Ct={id:"date-time",class:"w-fit text-xs text-gray-800"},St={class:"flex"},jt={class:"flex"},Dt={id:"location",class:"flex text-black col-span-2"},Ft={class:"truncate text-xs"},It={id:"score",class:"flex w-fit"},zt={class:"min-w-[20px] mr-1 text-right"},Nt=z(" : "),Tt={class:"min-w-[20px] ml-1"},At=["data-id","onClick"],ne={props:["club_no"],emits:["updateFavorites","disclosure-update"],setup(N,{emit:p}){const l=N,h=ae(),t=i({}),o=i([]),c=i([]),a=i(!1),n=i([]),m=i(null),w=i(null),I=i(!1);t.value={};const L=i([]),U=s=>{L.value.filter(b=>b.getAttribute("data-id")!==s.toString()).forEach(b=>b.click())},V=(s,k)=>{if(!k)return;const b=L.value.find(v=>v.getAttribute("data-id")===w.value);console.log(b),s(b)},M=async()=>{let s="";l.club_no?s=l.club_no:s=h.hash.substring(1);const b=await(await fetch("https://spo.handball4all.de/service/if_g_json.php?cmd=cs&cs="+s)).json();t.value=b[0].searchResult.list[0]},H=async()=>{const k=await(await fetch("/club_address.json")).json();t.value.webaddress=k[t.value.no]},R=async s=>{console.log(s),n.value=s,p("disclosure-update"),a.value=!0;const b=await(await fetch("https://spo.handball4all.de/service/if_g_json.php?ca=1&cmd=ps&cl="+s)).json();if(!b[0].content.score.length){n.value=o.value.find(y=>y.gClassID===s).matches,a.value=!1,w.value=null;return}const v=b[0].content.score.find(y=>y.tabTeamname.includes(t.value.lname));console.log(v.tabTeamID),w.value=v.tabTeamID;const D=(await(await fetch("https://spo.handball4all.de/service/if_g_json.php?ca=0&cmd=ps&cl="+s+"&ct="+v.tabTeamID)).json())[0].content.futureGames.games;I.value?n.value=D:n.value=D.filter(y=>{const _=y.gDate.split("."),G=y.gTime.split(":");return new Date("20"+_[2],_[1]-1,_[0],G[0],G[1])>new Date}),a.value=!1},E=async()=>{const k=await(await fetch("https://spo.handball4all.de/misc/mobApp.php?jsoncallback=teamData&format=json&cmd=data&lvTypeNext=club&lvIDNext="+t.value.id)).text();new Function("teamData",k)(function(v){const F=v[0].dataList;var j=[];for(const D in F){let y=j.length-1;if(!j[y]||j[y].gClassID!=F[D].gClassID){const _={gClassID:F[D].gClassID,gClassSname:F[D].gClassSname,matches:[]};let G=!1;_.gClassID||(_.gClassID=F[D].class,G=!0),_.gClassSname||(_.gClassSname=F[D].class_sname,G=!0),y=j.push(_)-1,G||j[y].matches.push(F[D])}else j[y].matches.push(F[D])}o.value=j})},J=()=>{if(!c.value.length)return!1;for(const s of c.value)if(s.type=="club"&&s.id==t.value.id)return!0},W=()=>{c.value.push({type:"club",id:t.value.id,name:t.value.lname,no:t.value.no}),P()},q=()=>{for(const s of c.value)s.type=="club"&&s.id==t.value.id&&c.value.splice(c.value.indexOf(s),1);P()},P=()=>{localStorage.setItem("favorites",JSON.stringify(c.value)),p("updateFavorites")},g=async()=>{const s=localStorage.getItem("favorites");s?c.value=JSON.parse(s):c.value=[]},$=ee(l,"club_no");return te($,async(s,k)=>{console.log("update club"),s&&forceUpdate()}),B(async()=>{await M(),await E(),await g(),await H()}),(s,k)=>{const b=Z("router-link");return r(),u("div",Xe,[Ye,e("div",et,[C(f(x(X),{class:"h-5 w-5 mt-1 ml-2 hover:text-indigo-500 absolute right-5 top-5",onClick:W},null,512),[[S,!J()]]),C(f(x(se),{class:"h-5 w-5 mt-1 ml-2 text-indigo-500 hover:text-black absolute right-5 top-5",onClick:q},null,512),[[S,J()]]),t.value?(r(),u("img",{key:0,src:"logos/clubs/"+t.value.no+".png",alt:"",class:"w-1/3 h-1/3 my-10 ml-5 rounded-lg border border-gray-500"},null,8,tt)):(r(),u("div",st,"Loading...")),e("div",lt,[e("div",at,d(t.value.lname),1),e("div",ot,"Postleitzahl: "+d(t.value.postal),1),e("div",nt,"Nummer: "+d(t.value.no),1)]),e("a",{class:"absolute bottom-5 right-5 underline text-indigo-500 hover:text-indigo-800",href:"http://"+t.value.webaddress},d(t.value.webaddress),9,it)]),e("div",ct,[e("div",rt,[dt,e("div",ut,[mt,C(e("input",{class:"ml-1 mb-1 rounded",type:"checkbox",name:"",id:"","onUpdate:modelValue":k[0]||(k[0]=v=>I.value=v),onClick:k[1]||(k[1]=v=>m.value?R(m.value):null)},null,512),[[le,I.value]])])]),e("div",ht,[(r(!0),u(A,null,K(o.value,(v,F)=>(r(),Q(x(_e),{key:v.gClassID},{default:O(({open:j,close:D})=>[f(x(me),{class:T(["flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-indigo-900 bg-indigo-100 rounded-t-lg hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75",[v.matches.length?"":"!text-gray-600 !bg-gray-200",j?"":"my-1 rounded-lg"]]),onClick:y=>(m.value=v.gClassID,U(v.gClassID),R(v.gClassID)),disabled:!v.matches.length},{default:O(()=>[e("span",null,d(v.gClassSname),1),e("span",vt,d(v.matches.length?"":"spielfrei"),1),f(x(ue),{class:T(["w-5 h-5 text-indigo-900",[j?"transform rotate-180":"",v.matches.length?"":"!text-gray-500"]])},null,8,["class"])]),_:2},1032,["class","onClick","disabled"]),f(x(fe),{class:"px-4 pt-4 pb-2 text-sm text-gray-500 bg-indigo-100 rounded-b-lg"},{default:O(({close:y})=>[pt,C(f(b,{to:"team#"+w.value+";"+v.gClassID+";"+t.value.no,class:"ml-auto mr-0 w-fit block underline-offset-2 underline hover:text-indigo-700 text-indigo-900"},{default:O(()=>[ft]),_:2},1032,["to"]),[[S,w.value]]),a.value?(r(),u("div",_t,"Loading...")):(r(),u("div",gt,[bt,C(e("div",xt,[C(e("div",yt," Keine zuk\xFCnftigen Spiele ",512),[[S,!I.value]]),C(e("div",null," Keine Spiele in dieser Klasse ",512),[[S,I.value]])],512),[[S,!n.value.length]]),(r(!0),u(A,null,K(n.value,_=>(r(),u("div",wt,[e("div",$t,[e("div",kt,d(_.gHomeTeam)+" : "+d(_.gGuestTeam),1),e("div",Ct,[e("div",St,d(_.gWDay)+" "+d(_.gDate),1),e("div",jt,[f(x(he),{class:"h-4 mr-1 text-indigo-900"}),z(" "+d(_.gTime),1)])]),e("div",Dt,[f(x(ve),{class:"h-4 w-4 text-indigo-900 shrink-0"}),e("span",Ft,d(_.gGymnasiumName),1)]),e("div",It,[e("div",zt,d(_.gHomeGoals),1),Nt,e("div",Tt,d(_.gGuestGoals),1)]),e("div",{id:"info",class:T(["col-span-3 text-gray-600",_.gComment.length>1?"flex":"hidden"])},[f(x(pe),{class:"h-4 w-4 mt-1 mr-1"}),z(" "+d(_.gComment),1)],2)])]))),256))]))]),_:2},1024),C(e("button",{ref_for:!0,ref:y=>L.value[F]=y,"data-id":v.gClassID,onClick:y=>V(D,j)},null,8,At),[[S,!1]])]),_:2},1024))),128))])])])}}};var Lt="/h4y/icons/goal.png";const Ot={class:"w-full h-full"},Kt=e("div",{class:"ml-5 pt-3 mb-3"},[e("h1",{class:"text-3xl font-bold"},"Team"),e("p",{class:"text-sm text-gray-500 uppercase font-bold"}," Spiel\xFCbersicht ")],-1),Gt={id:"club-header",class:"flex w-5/6 m-auto border border-gray-100 shadow-xl rounded-lg relative"},Vt=["src"],Mt={key:1,class:"w-1/3 h-1/3 my-10 ml-5 rounded-lg border border-gray-300 shadow-2xl bg-gray-300"},Rt={id:"club-info",class:"my-10 m-5"},Et={class:"font-bold"},Jt={class:"text-sm text-gray-900"},Pt={id:"scores",class:"w-5/6 m-auto border border-gray-100 shadow-xl rounded-lg relative mt-2"},Bt=oe('<div class="flex mt-1"><span class="font-bold ml-2"> Tabelle </span><span class="hidden sm:block ml-auto mr-9"> Tore </span><span class="sm:ml-0 ml-auto mr-5"> Spiele </span><span class="mr-2"> Punkte </span></div>',1),Ut={key:0},Ht={class:"flex p-1 m-1 bg-indigo-100 rounded-lg"},Wt={class:"text-sm mr-1"},qt={class:"font-bold text-sm"},Zt={class:"ml-auto hidden sm:flex mr-7 text-sm"},Qt=e("img",{class:"h-5 w-5 mt-0.5 mr-1",src:Lt,alt:""},null,-1),Xt={class:"text-sm flex sm:ml-0 ml-auto mr-7 w-fit"},Yt=oe('<svg class="h-4 w-4 mt-1" width="700pt" height="700pt" version="1.1" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg"><g><path d="m224.32 196.48-78.406 58.789 23.652 104.21 5.8125 0.96094 83.5 13.91 33.426-105.04zm-2.0859 23.414 50.277 53.867-25.703 80.836-62.754-10.461-18.594-81.656 56.773-42.59z" fill-rule="evenodd"></path><path d="m386.98 245.26-105.99 17.668 2.8711 17.262 96.762-16.133 56.668 60.461-26.523 87.195-87.227 15.141-65.145-68.668-12.68 12.066 71.605 75.469 107.05-18.629 32.605-107.15-70-74.68z" fill-rule="evenodd"></path><path d="m361.79 88.68-106.78 23.207-39.785 92.867 16.098 6.8711 36.23-84.562 87.535-19.004 52.465 63.676-31.891 80.082 16.27 6.4609 35.684-89.688-65.832-79.91z" fill-rule="evenodd"></path><path d="m417.81 158.92-3.6914 17.09 84.562 18.355 14.766 84.938-70.207 35.102 7.8281 15.656 81.859-40.914-19.039-109.38-96.078-20.848z" fill-rule="evenodd"></path><path d="m418.91 412.63-11.074 13.535 46.449 38.008 11.074-13.535z" fill-rule="evenodd"></path><path d="m545 415.5-94.609 32.504-32.676 60.395 15.379 8.3398 29.465-54.414 88.148-30.281z" fill-rule="evenodd"></path><path d="m528.45 275.5-11.965 12.781 63.848 59.746 11.965-12.785-63.848-59.746z" fill-rule="evenodd"></path><path d="m536.96 123.2-38.043 59.129 14.73 9.4688 38.008-59.129-14.699-9.4688z" fill-rule="evenodd"></path><path d="m402.7 37.512-50.688 54.926 12.852 11.863 50.688-54.926-12.852-11.859z" fill-rule="evenodd"></path><path d="m168.57 344.68-25.359 71.812 16.508 5.8086 25.328-71.812z" fill-rule="evenodd"></path><path d="m113.41 225.84-8.375 15.379 46.449 25.328 8.4102-15.348z" fill-rule="evenodd"></path><path d="m220.7 70.77-11.758 12.957 46.449 42.246 11.793-12.953-46.484-42.246z" fill-rule="evenodd"></path><path d="m210.17 471.94-0.88672 17.5 88.594 4.4102 0.85547-17.465-88.559-4.4414z" fill-rule="evenodd"></path><path d="m312.47 432.63-26.352 57.113 81.93 43.031 8.1367-15.48-67.199-35.309 19.379-42.039z" fill-rule="evenodd"></path><path d="m170.69 456.04c3.5625 0.12891 6.8438-1.918 8.3008-5.168 1.457-3.25 0.79687-7.0586-1.668-9.6328-61.883-66.281-80.387-162.09-47.613-246.64 32.773-84.547 111-142.83 201.39-150.08 90.387-7.2539 176.91 37.805 222.75 116.04 1.1289 2.0859 3.0547 3.6211 5.3359 4.2617 2.2812 0.63672 4.7227 0.32422 6.7695-0.87109 2.0469-1.1953 3.5234-3.168 4.0859-5.4688 0.56641-2.3008 0.17578-4.7344-1.0859-6.7383-49.215-84-142.22-132.48-239.26-124.69-97.039 7.7891-181.11 70.453-216.29 161.23s-15.305 193.73 51.133 264.89c1.582 1.7461 3.8008 2.7812 6.1523 2.8711z"></path><path d="m228.22 501.5c4.0391 0.12891 7.6445-2.5273 8.7188-6.4258 1.0703-3.8984-0.66797-8.0234-4.207-9.9805-11.184-6.3945-21.828-13.711-31.82-21.84h-0.003906c-1.7891-1.5508-4.1289-2.3086-6.4883-2.1055-2.3594 0.20703-4.5352 1.3594-6.0312 3.1953-1.4922 1.8359-2.1797 4.2031-1.8984 6.5547 0.27734 2.3516 1.4961 4.4883 3.3789 5.9258 10.734 8.7344 22.168 16.578 34.18 23.445 1.2656 0.75391 2.6992 1.1758 4.1719 1.2266z"></path><path d="m380.28 531.92c41.148-4.9453 81.102-19.945 116-44.57 69.809-49.25 110.15-130.36 107.32-215.74h0.003906c-0.066406-2.3281-1.0586-4.5312-2.7578-6.125-1.6953-1.5938-3.957-2.4453-6.2812-2.3672-2.3281 0.074218-4.5273 1.0742-6.1133 2.7773-1.5898 1.7031-2.4336 3.9648-2.3477 6.293 2.6328 79.52-34.895 154.98-99.906 200.84-65.012 45.863-148.72 55.945-222.75 26.797-2.1758-0.94141-4.6367-0.96094-6.8281-0.054688-2.1875 0.91016-3.9141 2.668-4.7852 4.8711s-0.80859 4.6641 0.16797 6.8242c0.97656 2.1602 2.7891 3.8281 5.0195 4.6289 39.746 15.648 82.105 20.773 123.25 15.824z"></path><path d="m590.8 243.45c2.6211-0.011718 5.0977-1.1953 6.7539-3.2266s2.3125-4.6992 1.7891-7.2695c-3.043-16.129-7.6484-31.926-13.738-47.168v0.003906c-0.79297-2.25-2.4688-4.082-4.6406-5.0664-2.1719-0.98828-4.6523-1.043-6.8672-0.15625s-3.9688 2.6367-4.8633 4.8477c-0.89453 2.2109-0.84375 4.6914 0.13281 6.8672 5.6719 14.188 9.9492 28.906 12.785 43.922 0.73437 4.1992 4.3867 7.2578 8.6484 7.2461z"></path></g></svg>',1),es={class:"text-sm mr-2 ml-5 <font-bold"},ts={class:"w-5/6 m-auto"},ss={class:"mt-3 flex justify-between"},ls=e("h2",{class:"font-bold text-lg m-1"},"Spiele",-1),as={class:"text-sm m-2"},os=z(" Alle Spiele "),ns=e("div",{class:"overflow-auto max-h-[50%] w-full mx-auto bg-white rounded-2xl border border-gray-100 shadow-xl p-2 mb-20"},null,-1),ie={props:["team_id","team_class","team_club"],emits:["updateFavorites"],setup(N,{emit:p}){const l=N,h=ae(),t=i([]),o=i(!1),c=i([]),a=i(null),n=i(null),m=i(null),w=i(null),I=i(null),L=i(!1),U=()=>{navigator.share?navigator.share({title:"Team",text:w.value.name,url:h.fullPath}):alert("Dein Browser unterst\xFCtzt das Share-Feature nicht.")},V=async()=>{const $=await(await fetch("https://spo.handball4all.de/service/if_g_json.php?ca=0&cmd=ps&cl="+a.value+"&ct="+n.value)).json();w.value=$[0];const s=$[0].content.futureGames.games;L.value?c.value=s:c.value=s.filter(k=>{const b=k.gDate.split(".");return new Date("20"+b[2],b[1]-1,b[0])>new Date}),o.value=!1},M=()=>{if(!t.value.length)return!1;for(const g of t.value)if(g.type=="team"&&g.id==n.value)return!0},H=()=>{console.log("add favorite"),t.value.push({type:"team",id:n,name:w.value.head.sname,classid:a.value,clubno:m.value,clubname:I.value.lname}),E()},R=()=>{console.log("remove favorite");for(const g of t.value)console.log(g.type),console.log(g.id),g.type=="team"&&g.id==n.value&&t.value.splice(t.value.indexOf(g),1);E()},E=()=>{localStorage.setItem("favorites",JSON.stringify(t.value)),p("updateFavorites")},J=async()=>{const g=localStorage.getItem("favorites");g?t.value=JSON.parse(g):t.value=[]},W=ee(l,"team_id");te(W,async(g,$)=>{console.log("update club"),g&&forceUpdate()});const q=async()=>{const $=await(await fetch("https://spo.handball4all.de/service/if_g_json.php?cmd=cs&cs="+m.value)).json();I.value=$[0].searchResult.list[0]},P=async()=>{if(console.log(l.team_id),l.team_id&&l.team_class&&l.team_club)console.log("props"),n.value=l.team_id,a.value=l.team_class,m.value=l.team_club;else{const $=h.hash.substring(1).split(";");n.value=$[0],a.value=$[1],m.value=$[2]}console.log("teamID: "+n.value),console.log("teamClassID: "+a.value),console.log("teamClubNo: "+m.value)};return B(async()=>{await P(),await J(),await V(),await q()}),(g,$)=>(r(),u("div",Ot,[Kt,e("div",Gt,[f(x(ge),{class:"h-6 w-6 mt-1 ml-2 hover:text-indigo-500 absolute right-20 top-5",onClick:U}),C(f(x(X),{class:"h-6 w-6 mt-1 ml-2 hover:text-indigo-500 absolute right-5 top-5",onClick:H},null,512),[[S,!M()]]),C(f(x(se),{class:"h-6 w-6 mt-1 ml-2 text-indigo-500 hover:text-black absolute right-5 top-5",onClick:R},null,512),[[S,M()]]),w.value?(r(),u("img",{key:0,src:"logos/clubs/"+m.value+".png",alt:"",class:"w-1/3 h-1/3 my-10 ml-5 rounded-lg border border-gray-500"},null,8,Vt)):(r(),u("div",Mt,[f(x(be),{class:"text-gray-700"})])),e("div",Rt,[e("div",Et,d(w.value?w.value.head.name:""),1),e("div",Jt,d(I.value?I.value.lname:""),1)])]),e("div",Pt,[Bt,w.value?(r(!0),u(A,{key:1},K(w.value.content.score,s=>(r(),u("div",Ht,[e("div",Wt,d(s.tabScore),1),e("div",qt,d(s.tabTeamname),1),e("div",Zt,[Qt,z(" "+d(s.numGoalsShot)+" : "+d(s.numGoalsGot),1)]),e("div",Xt,[Yt,z(" "+d(s.numPlayedGames),1)]),e("div",es,d(s.pointsPlus),1)]))),256)):(r(),u("div",Ut))]),e("div",ts,[e("div",ss,[ls,e("div",as,[os,C(e("input",{class:"ml-1 mb-1 rounded",type:"checkbox",name:"",id:"","onUpdate:modelValue":$[0]||($[0]=s=>L.value=s),onClick:$[1]||($[1]=s=>a.value?V():null)},null,512),[[le,L.value]])])]),ns])]))}},is={class:"w-full h-full"},cs={class:"mr-5 transition-all"},rs=["onClick"],ds=["onClick"],us={class:"ml-0 mr-auto"},ms={class:"ml-auto mr-0"},hs={key:2,class:"w-[calc(100%-4rem)] h-full ml-auto mr-0 flex justify-center items-center px-5"},vs=e("span",{class:"text-lg"},[z(" Noch keine Favoriten angelegt. "),e("br"),z(" Gehen Sie daf\xFCr zur Suche oder den Ligen. ")],-1),ps=[vs],fs={setup(N){const p=i([]),l=i({}),h=i(!1),t=a=>{l.value=a,localStorage.setItem("selectedFavorite",JSON.stringify(a))},o=()=>{const a=localStorage.getItem("selectedFavorite");a?l.value=JSON.parse(a):l.value={},console.log(a);let n=!1;p.value.forEach(m=>{m.type==l.value.type&&m.id==l.value.id&&(n=!0)}),n||(l.value=p.value[0])},c=async()=>{const a=localStorage.getItem("favorites");a?p.value=JSON.parse(a):p.value=[],o()};return B(async()=>{await c(),await o()}),(a,n)=>(r(),u("div",is,[e("div",{id:"menu",class:T(["h-full z-10 pl-5 w-[calc(50%+4rem)] bg-indigo-200 transition-all duration-300 fixed",h.value?"left-0":"-left-1/2"])},[f(x(xe),{class:"h-8 w-8 m-5 ml-auto mr-5",onClick:n[0]||(n[0]=m=>h.value=!h.value)}),e("div",cs,[e("p",{class:T(["font-bold",h.value?"":"ml-[calc(100%-2.5rem)] -mr-2"])}," Verein ",2),(r(!0),u(A,null,K(p.value,m=>C((r(),u("div",{class:T(["rounded-lg shadow-2xl hover:scale-95 scale-100 transition all bg-indigo-600 h-9 break-all text-indigo-100 p-2 my-1 overflow-hidden",h.value?"":"ml-[calc(100%-3.2rem)] -mr-2"]),onClick:w=>t(m)},d(m.name),11,rs)),[[S,m.type=="club"]])),256)),e("p",{class:T(["font-bold",h.value?"":"ml-[calc(100%-2.5rem)] -mr-2"])}," Team ",2),(r(!0),u(A,null,K(p.value,m=>C((r(),u("div",{class:T(["rounded-lg shadow-2xl hover:scale-95 scale-100 transition all bg-indigo-600 h-9 break-all text-indigo-100 p-2 my-1 overflow-hidden",h.value?"flex":"ml-[calc(100%-3.2rem)] -mr-2"]),onClick:w=>t(m)},[e("span",us,d(m.name),1),e("span",ms,d(m.clubname),1)],10,ds)),[[S,m.type=="team"]])),256))])],2),l.value&&l.value.type=="club"?(r(),Q(ne,{class:"w-[calc(100%-4rem)] ml-auto mr-0",club_no:l.value.no,key:l.value.no,onUpdateFavorites:c},null,8,["club_no"])):l.value&&l.value.type=="team"?(r(),Q(ie,{class:"w-[calc(100%-4rem)] ml-auto mr-0",team_id:l.value.id,team_class:l.value.classid,team_club:l.value.clubno,key:l.value.id,onUpdateFavorites:c},null,8,["team_id","team_class","team_club"])):(r(),u("div",hs,ps))]))}},_s={},gs={},bs={},xs=[{path:"/h4y//",redirect:"/h4y/favorites"},{path:"/h4y//team",component:ie,meta:{KeepAlive:!0}},{path:"/h4y//leagues",component:Qe,meta:{KeepAlive:!0}},{path:"/h4y//favorites",component:fs,meta:{KeepAlive:!0}},{path:"/h4y//search",component:Ze,meta:{KeepAlive:!0}},{path:"/h4y//match",component:gs,meta:{KeepAlive:!0}},{path:"/h4y//club",component:ne,meta:{KeepAlive:!0}},{path:"/h4y//gym",component:bs,meta:{KeepAlive:!0}},{path:"/h4y//settings",component:_s,meta:{KeepAlive:!0}}],ys=ye({history:we(),routes:xs}),ce=$e(Ke);ce.use(ys);ce.mount("#app");
