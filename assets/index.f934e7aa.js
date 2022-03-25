import{v as me,n as ve,u as Z,a as he,b as pe,r as v,o as V,c as R,d as r,e as m,f as g,w as z,g as e,F as L,h as k,t as o,i as b,j as ge,k as X,l as te,m as A,p as y,q as S,s as se,x as le,y as ae,z as oe,A as Q,B as _e,C as H,D as fe,E as ne,G as ie,H as ce,I as be,J as xe,K as we,L as ye,M as re,N as $e,O as ke,P as Ce,Q as Se,R as je}from"./vendor.b036088e.js";const De=function(){const h=document.createElement("link").relList;if(h&&h.supports&&h.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))_(t);new MutationObserver(t=>{for(const d of t)if(d.type==="childList")for(const c of d.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&_(c)}).observe(document,{childList:!0,subtree:!0});function s(t){const d={};return t.integrity&&(d.integrity=t.integrity),t.referrerpolicy&&(d.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?d.credentials="include":t.crossorigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function _(t){if(t.ep)return;t.ep=!0;const d=s(t);fetch(t.href,d)}};De();function Ie(T={}){const{immediate:h=!1,onNeedRefresh:s,onOfflineReady:_,onRegistered:t,onRegisterError:d}=T;let c,n;const u=async(l=!0)=>{l&&(c==null||c.addEventListener("controlling",w=>{w.isUpdate&&window.location.reload()})),n&&n.waiting&&await ve(n.waiting,{type:"SKIP_WAITING"})};if("serviceWorker"in navigator){c=new me("/sw.js",{scope:"/",type:"classic"}),c.addEventListener("activated",l=>{l.isUpdate||_==null||_()});{const l=()=>{s==null||s()};c.addEventListener("waiting",l),c.addEventListener("externalwaiting",l)}c.register({immediate:h}).then(l=>{n=l,t==null||t(l)}).catch(l=>{d==null||d(l)})}return u}const Fe={class:"w-screen h-screen"},ze={class:"z-10 bg-white fixed bottom-0 w-full border-t border-gray-200 flex"},Le={class:"text-center"},Te={class:"block h-8 text-3xl leading-8"},Ne=e("span",{class:"block text-xs leading-none"},"Ligen",-1),He={class:"text-center"},Ae={class:"block h-8 text-3xl leading-8"},Ge=e("span",{class:"block text-xs leading-none"},"Favoriten",-1),Ke={class:"text-center"},Me={class:"block h-8 text-3xl leading-8"},Oe=e("span",{class:"block text-xs leading-none"},"Suche",-1),Ee={setup(T){"serviceWorker"in navigator&&Ie();const h=Z(),{meta:s}=he({title:"H4Y - Handball Ergebnisse",description:"Handballergebnisse , Liveticker und mehr",url:h.fullPath,og:{title:"H4Y - Handball Ergebnisse",description:"Handballergebnisse , Liveticker und mehr",url:h.fullPath}});console.log(location),watch(h.fullPath,()=>{s.title="H4Y - Handball Ergebnisse",s.description="Handballergebnisse , Liveticker und mehr",s.url=h.fullPath,s.og.title="H4Y - Handball Ergebnisse",s.og.description="Handballergebnisse , Liveticker und mehr",s.og.url=h.fullPath}),console.log(h.fullPath),pe();const _=v([]);return v({}),V(()=>{console.log("onMounted"),_.value=JSON.parse(localStorage.getItem("favorites")||"[]")}),(t,d)=>{const c=R("metainfo"),n=R("router-view"),u=R("router-link");return r(),m(L,null,[g(c,null,{title:z(({metainfo:l})=>[k(o(l.description),1)]),"og(title)":z(({metainfo:l})=>[k(o(l.description),1)]),"og(url)":z(({og:l})=>[k(o(l.url),1)]),"og(description)":z(({metainfo:l})=>[k(o(l.description),1)]),_:1}),e("div",Fe,[g(n),e("div",ze,[g(u,{to:"leagues",class:"flex flex-grow items-center justify-center p-2 hover:text-indigo-500","active-class":"text-indigo-500"},{default:z(()=>[e("div",Le,[e("span",Te,[g(b(ge),{class:"h-7 w-7 mx-auto"})]),Ne])]),_:1}),g(u,{to:"favorites","active-class":"text-indigo-500",class:"flex flex-grow items-center justify-center p-2 hover:text-indigo-500"},{default:z(()=>[e("div",He,[e("span",Ae,[g(b(X),{class:"h-7 w-7 mx-auto"})]),Ge])]),_:1}),g(u,{to:"search",class:"flex flex-grow items-center justify-center p-2 hover:text-indigo-500","active-class":"text-indigo-500"},{default:z(()=>[e("div",Ke,[e("span",Me,[g(b(te),{class:"h-7 w-7 mx-auto"})]),Oe])]),_:1})])])],64)}}};const Pe=e("div",{class:"ml-5 mt-3 mb-3 absolute"},[e("h1",{class:"text-3xl font-bold"},"Suche"),e("p",{class:"text-sm text-gray-500 uppercase font-bold"},"Verein / Halle")],-1),Re={class:"flex justify-center w-full pt-20"},Ve={class:"flex w-4/6"},Je={class:"w-4/6 mx-auto"},We=e("div",{class:"rounded-lg w-full mt-5 text-sm text-gray-500 uppercase font-bold"},"Verein",-1),Ue={id:"clubs"},Be=["onClick"],Ye={class:"text-sm text-gray-500"},qe=e("div",{class:"rounded-lg w-full mt-5 text-sm text-gray-500 uppercase font-bold"},"Halle",-1),Qe={id:"gyms"},Ze=["onClick"],Xe={class:"text-sm text-gray-500"},et={setup(T){const h=v(!1);v([]),v(""),v("Show more");const s=v([]),_=v([]);v("");const t=async d=>{h.value=!0;const c=await fetch("https://spo.handball4all.de/service/if_g_json.php?cmd=cs&cs="+d),n=await fetch("https://spo.handball4all.de/service/if_g_json.php?cmd=gs&gs="+d),u=await c.json(),l=await n.json();s.value=u[0].searchResult.list,_.value=l[0].searchResult.list,h.value=!1};return(d,c)=>(r(),m(L,null,[Pe,e("div",Re,[e("div",Ve,[g(b(te),{class:"ml-auto h-6 mt-2 text-neutral-800 mr-0 z-10"}),e("input",{type:"text",autocomplete:"off",class:"-ml-8 w-full pl-8 rounded-full",onInput:c[0]||(c[0]=n=>t(n.target.value))},null,32)])]),e("div",Je,[We,e("div",Ue,[(r(!0),m(L,null,A(s.value,n=>(r(),m("div",{class:"transform transition-all duration-300 scale-100 hover:scale-95 rounded-lg w-full border-neutral-300 border p-2 my-2",onClick:u=>d.$router.push("club#"+n.no)},o(n.lname),9,Be))),256)),y(e("div",Ye," Keine Ergebnisse ",512),[[S,s.value.length<1]])]),qe,e("div",Qe,[(r(!0),m(L,null,A(_.value,n=>(r(),m("div",{class:"transform transition-all duration-300 scale-100 hover:scale-95 rounded-lg w-full border-neutral-300 border p-2 my-2",onClick:u=>d.$router.push("gym#"+n.no)},o(n.lname),9,Ze))),256)),y(e("div",Xe," Keine Ergebnisse ",512),[[S,_.value.length<1]])])])],64))}},tt={},st={class:"w-full h-full"},lt=e("div",{class:"ml-5 pt-3 mb-3"},[e("h1",{class:"text-3xl font-bold"},"Verein"),e("p",{class:"text-sm text-gray-500 uppercase font-bold"}," Spiel\xFCbersicht ")],-1),at={id:"club-header",class:"flex w-5/6 m-auto border border-gray-100 shadow-xl rounded-lg relative"},ot=["src"],nt={key:1},it={id:"club-info",class:"my-10 m-5 line-clamp-4 break-words"},ct={class:"font-bold"},rt={class:"text-gray-800"},dt={class:"text-gray-800"},ut=["href"],mt={class:"w-5/6 m-auto"},vt={class:"mt-3 flex justify-between"},ht=e("h2",{class:"font-bold text-lg m-1"},"Spiele",-1),pt={class:"text-sm m-2"},gt=k(" Alle Spiele "),_t={class:"overflow-auto max-h-[50%] w-full mx-auto bg-white rounded-2xl border border-gray-100 shadow-xl p-2 mb-20"},ft={class:"mr-4 ml-auto text-opacity-75"},bt=e("hr",{class:"bg-gray-400 text-black h-[1.5px] mb-2 -mt-3"},null,-1),xt=k("Zum Team"),wt={key:0},yt={key:1},$t=e("div",{id:"league-info"},null,-1),kt={id:"no-data"},Ct={id:"no-future-matches"},St={class:"rounded-lg bg-indigo-200 my-1 p-2 justify-between px-5 hover:scale-95 scale-100 transition-all"},jt={class:"grid grid-cols-3 sm:grid-cols-6 gap-1"},Dt={id:"teams",class:"text-black w-fit col-span-2 text-xs font-bold"},It={id:"date-time",class:"w-fit text-xs text-gray-800"},Ft={class:"flex"},zt={class:"flex"},Lt={id:"location",class:"flex text-black col-span-2"},Tt={class:"truncate text-xs"},Nt={id:"score",class:"flex w-fit text-black"},Ht={class:"min-w-[20px] mr-1 text-right"},At=k(" : "),Gt={class:"min-w-[20px] ml-1"},Kt=["data-id","onClick"],de={props:["club_no"],emits:["updateFavorites","disclosure-update"],setup(T,{emit:h}){const s=T,_=Z(),t=v({}),d=v([]),c=v([]),n=v(!1),u=v([]),l=v(null),w=v(null),F=v(!1);t.value={};const N=v([]),J=a=>{N.value.filter(C=>C.getAttribute("data-id")!==a.toString()).forEach(C=>C.click())},W=(a,i)=>{if(!i)return;const C=N.value.find(p=>p.getAttribute("data-id")===w.value);console.log(C),a(C)},M=async()=>{let a="";s.club_no?a=s.club_no:a=_.hash.substring(1);const C=await(await fetch("https://spo.handball4all.de/service/if_g_json.php?cmd=cs&cs="+a)).json();t.value=C[0].searchResult.list[0]},O=async()=>{const i=await(await fetch("/club_address.json")).json();t.value.webaddress=i[t.value.no]},E=async a=>{console.log(a),u.value=a,h("disclosure-update"),n.value=!0;const C=await(await fetch("https://spo.handball4all.de/service/if_g_json.php?ca=1&cmd=ps&cl="+a)).json();if(!C[0].content.score.length){u.value=d.value.find($=>$.gClassID===a).matches,n.value=!1,w.value=null;return}const p=C[0].content.score.find($=>$.tabTeamname.includes(t.value.lname));console.log(p.tabTeamID),w.value=p.tabTeamID;const I=(await(await fetch("https://spo.handball4all.de/service/if_g_json.php?ca=0&cmd=ps&cl="+a+"&ct="+p.tabTeamID)).json())[0].content.futureGames.games;F.value?u.value=I:u.value=I.filter($=>{const x=$.gDate.split("."),G=$.gTime.split(":");return new Date("20"+x[2],x[1]-1,x[0],G[0],G[1])>new Date}),n.value=!1},U=async()=>{const i=await(await fetch("https://spo.handball4all.de/misc/mobApp.php?jsoncallback=teamData&format=json&cmd=data&lvTypeNext=club&lvIDNext="+t.value.id)).text();new Function("teamData",i)(function(p){const j=p[0].dataList;var D=[];for(const I in j){let $=D.length-1;if(!D[$]||D[$].gClassID!=j[I].gClassID){const x={gClassID:j[I].gClassID,gClassSname:j[I].gClassSname,matches:[]};let G=!1;x.gClassID||(x.gClassID=j[I].class,G=!0),x.gClassSname||(x.gClassSname=j[I].class_sname,G=!0),$=D.push(x)-1,G||D[$].matches.push(j[I])}else D[$].matches.push(j[I])}d.value=D})},K=()=>{if(!c.value.length)return!1;for(const a of c.value)if(a.type=="club"&&a.id==t.value.id)return!0},B=()=>{c.value.push({type:"club",id:t.value.id,name:t.value.lname,no:t.value.no}),P()},Y=()=>{for(const a of c.value)a.type=="club"&&a.id==t.value.id&&c.value.splice(c.value.indexOf(a),1);P()},P=()=>{localStorage.setItem("favorites",JSON.stringify(c.value)),h("updateFavorites")},q=async()=>{const a=localStorage.getItem("favorites");a?c.value=JSON.parse(a):c.value=[]},f=se(s,"club_no");return le(f,async(a,i)=>{console.log("update club"),a&&forceUpdate()}),V(async()=>{await M(),await U(),await q(),await O()}),(a,i)=>{const C=R("router-link");return r(),m("div",st,[lt,e("div",at,[y(g(b(X),{class:"h-5 w-5 mt-1 ml-2 hover:text-indigo-500 absolute right-5 top-5",onClick:B},null,512),[[S,!K()]]),y(g(b(ae),{class:"h-5 w-5 mt-1 ml-2 text-indigo-500 hover:text-black absolute right-5 top-5",onClick:Y},null,512),[[S,K()]]),t.value?(r(),m("img",{key:0,src:"logos/clubs/"+t.value.no+".png",alt:"",class:"w-1/3 h-1/3 my-10 ml-5 rounded-lg border border-gray-500"},null,8,ot)):(r(),m("div",nt,"Loading...")),e("div",it,[e("div",ct,o(t.value.lname),1),e("div",rt,"Postleitzahl: "+o(t.value.postal),1),e("div",dt,"Nummer: "+o(t.value.no),1)]),e("a",{class:"absolute bottom-5 right-5 underline text-indigo-500 hover:text-indigo-800",href:"http://"+t.value.webaddress},o(t.value.webaddress),9,ut)]),e("div",mt,[e("div",vt,[ht,e("div",pt,[gt,y(e("input",{class:"ml-1 mb-1 rounded",type:"checkbox",name:"",id:"","onUpdate:modelValue":i[0]||(i[0]=p=>F.value=p),onClick:i[1]||(i[1]=p=>l.value?E(l.value):null)},null,512),[[oe,F.value]])])]),e("div",_t,[(r(!0),m(L,null,A(d.value,(p,j)=>(r(),Q(b(xe),{key:p.gClassID},{default:z(({open:D,close:I})=>[g(b(fe),{class:H(["flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-indigo-900 bg-indigo-100 rounded-t-lg hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75",[p.matches.length?"":"!text-gray-600 !bg-gray-200",D?"":"my-1 rounded-lg"]]),onClick:$=>(l.value=p.gClassID,J(p.gClassID),E(p.gClassID)),disabled:!p.matches.length},{default:z(()=>[e("span",null,o(p.gClassSname),1),e("span",ft,o(p.matches.length?"":"spielfrei"),1),g(b(_e),{class:H(["w-5 h-5 text-indigo-900",[D?"transform rotate-180":"",p.matches.length?"":"!text-gray-500"]])},null,8,["class"])]),_:2},1032,["class","onClick","disabled"]),g(b(be),{class:"px-4 pt-4 pb-2 text-sm text-gray-500 bg-indigo-100 rounded-b-lg"},{default:z(({close:$})=>[bt,y(g(C,{to:"team#"+w.value+";"+p.gClassID+";"+t.value.no,class:"ml-auto mr-0 w-fit block underline-offset-2 underline hover:text-indigo-700 text-indigo-900"},{default:z(()=>[xt]),_:2},1032,["to"]),[[S,w.value]]),n.value?(r(),m("div",wt,"Loading...")):(r(),m("div",yt,[$t,y(e("div",kt,[y(e("div",Ct," Keine zuk\xFCnftigen Spiele ",512),[[S,!F.value]]),y(e("div",null," Keine Spiele in dieser Klasse ",512),[[S,F.value]])],512),[[S,!u.value.length]]),(r(!0),m(L,null,A(u.value,x=>(r(),m("div",St,[e("div",jt,[e("div",Dt,o(x.gHomeTeam)+" : "+o(x.gGuestTeam),1),e("div",It,[e("div",Ft,o(x.gWDay)+" "+o(x.gDate),1),e("div",zt,[g(b(ne),{class:"h-4 mr-1 text-indigo-900"}),k(" "+o(x.gTime),1)])]),e("div",Lt,[g(b(ie),{class:"h-4 w-4 text-indigo-900 shrink-0"}),e("span",Tt,o(x.gGymnasiumName),1)]),e("div",Nt,[e("div",Ht,o(x.gHomeGoals),1),At,e("div",Gt,o(x.gGuestGoals),1)]),e("div",{id:"info",class:H(["col-span-3 text-gray-600",x.gComment.length>1?"flex":"hidden"])},[g(b(ce),{class:"h-4 w-4 mt-1 mr-1"}),k(" "+o(x.gComment),1)],2)])]))),256))]))]),_:2},1024),y(e("button",{ref_for:!0,ref:$=>N.value[j]=$,"data-id":p.gClassID,onClick:$=>W(I,D)},null,8,Kt),[[S,!1]])]),_:2},1024))),128))])])])}}};var Mt="/icons/goal.png";const Ot={class:"w-full h-full"},Et=e("div",{class:"ml-5 pt-3 mb-3"},[e("h1",{class:"text-3xl font-bold"},"Team"),e("p",{class:"text-sm text-gray-500 uppercase font-bold"}," Spiel\xFCbersicht ")],-1),Pt={id:"club-header",class:"flex w-5/6 m-auto border border-gray-100 shadow-xl rounded-lg relative"},Rt=["src"],Vt={key:1,class:"w-1/3 h-1/3 my-10 ml-5 rounded-lg border border-gray-300 shadow-2xl bg-gray-300"},Jt={id:"club-info",class:"my-10 m-5"},Wt={class:"font-bold"},Ut={class:"text-sm text-gray-900"},Bt={id:"scores",class:"w-5/6 m-auto border border-gray-100 shadow-xl rounded-lg relative mt-2"},Yt=re('<div class="flex mt-1"><span class="font-bold ml-2"> Tabelle </span><span class="hidden sm:block ml-auto mr-9"> Tore </span><span class="sm:ml-0 ml-auto mr-5"> Spiele </span><span class="mr-2"> Punkte </span></div>',1),qt={key:0},Qt={class:"flex p-1 m-1 bg-indigo-100 rounded-lg"},Zt={class:"text-sm mr-1"},Xt=["innerHTML"],es={class:"ml-auto hidden sm:flex mr-7 text-sm"},ts=e("img",{class:"h-5 w-5 mt-0.5 mr-1",src:Mt,alt:""},null,-1),ss={class:"text-sm flex sm:ml-0 ml-auto mr-7 w-fit"},ls=re('<svg class="h-4 w-4 mt-1" width="700pt" height="700pt" version="1.1" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg"><g><path d="m224.32 196.48-78.406 58.789 23.652 104.21 5.8125 0.96094 83.5 13.91 33.426-105.04zm-2.0859 23.414 50.277 53.867-25.703 80.836-62.754-10.461-18.594-81.656 56.773-42.59z" fill-rule="evenodd"></path><path d="m386.98 245.26-105.99 17.668 2.8711 17.262 96.762-16.133 56.668 60.461-26.523 87.195-87.227 15.141-65.145-68.668-12.68 12.066 71.605 75.469 107.05-18.629 32.605-107.15-70-74.68z" fill-rule="evenodd"></path><path d="m361.79 88.68-106.78 23.207-39.785 92.867 16.098 6.8711 36.23-84.562 87.535-19.004 52.465 63.676-31.891 80.082 16.27 6.4609 35.684-89.688-65.832-79.91z" fill-rule="evenodd"></path><path d="m417.81 158.92-3.6914 17.09 84.562 18.355 14.766 84.938-70.207 35.102 7.8281 15.656 81.859-40.914-19.039-109.38-96.078-20.848z" fill-rule="evenodd"></path><path d="m418.91 412.63-11.074 13.535 46.449 38.008 11.074-13.535z" fill-rule="evenodd"></path><path d="m545 415.5-94.609 32.504-32.676 60.395 15.379 8.3398 29.465-54.414 88.148-30.281z" fill-rule="evenodd"></path><path d="m528.45 275.5-11.965 12.781 63.848 59.746 11.965-12.785-63.848-59.746z" fill-rule="evenodd"></path><path d="m536.96 123.2-38.043 59.129 14.73 9.4688 38.008-59.129-14.699-9.4688z" fill-rule="evenodd"></path><path d="m402.7 37.512-50.688 54.926 12.852 11.863 50.688-54.926-12.852-11.859z" fill-rule="evenodd"></path><path d="m168.57 344.68-25.359 71.812 16.508 5.8086 25.328-71.812z" fill-rule="evenodd"></path><path d="m113.41 225.84-8.375 15.379 46.449 25.328 8.4102-15.348z" fill-rule="evenodd"></path><path d="m220.7 70.77-11.758 12.957 46.449 42.246 11.793-12.953-46.484-42.246z" fill-rule="evenodd"></path><path d="m210.17 471.94-0.88672 17.5 88.594 4.4102 0.85547-17.465-88.559-4.4414z" fill-rule="evenodd"></path><path d="m312.47 432.63-26.352 57.113 81.93 43.031 8.1367-15.48-67.199-35.309 19.379-42.039z" fill-rule="evenodd"></path><path d="m170.69 456.04c3.5625 0.12891 6.8438-1.918 8.3008-5.168 1.457-3.25 0.79687-7.0586-1.668-9.6328-61.883-66.281-80.387-162.09-47.613-246.64 32.773-84.547 111-142.83 201.39-150.08 90.387-7.2539 176.91 37.805 222.75 116.04 1.1289 2.0859 3.0547 3.6211 5.3359 4.2617 2.2812 0.63672 4.7227 0.32422 6.7695-0.87109 2.0469-1.1953 3.5234-3.168 4.0859-5.4688 0.56641-2.3008 0.17578-4.7344-1.0859-6.7383-49.215-84-142.22-132.48-239.26-124.69-97.039 7.7891-181.11 70.453-216.29 161.23s-15.305 193.73 51.133 264.89c1.582 1.7461 3.8008 2.7812 6.1523 2.8711z"></path><path d="m228.22 501.5c4.0391 0.12891 7.6445-2.5273 8.7188-6.4258 1.0703-3.8984-0.66797-8.0234-4.207-9.9805-11.184-6.3945-21.828-13.711-31.82-21.84h-0.003906c-1.7891-1.5508-4.1289-2.3086-6.4883-2.1055-2.3594 0.20703-4.5352 1.3594-6.0312 3.1953-1.4922 1.8359-2.1797 4.2031-1.8984 6.5547 0.27734 2.3516 1.4961 4.4883 3.3789 5.9258 10.734 8.7344 22.168 16.578 34.18 23.445 1.2656 0.75391 2.6992 1.1758 4.1719 1.2266z"></path><path d="m380.28 531.92c41.148-4.9453 81.102-19.945 116-44.57 69.809-49.25 110.15-130.36 107.32-215.74h0.003906c-0.066406-2.3281-1.0586-4.5312-2.7578-6.125-1.6953-1.5938-3.957-2.4453-6.2812-2.3672-2.3281 0.074218-4.5273 1.0742-6.1133 2.7773-1.5898 1.7031-2.4336 3.9648-2.3477 6.293 2.6328 79.52-34.895 154.98-99.906 200.84-65.012 45.863-148.72 55.945-222.75 26.797-2.1758-0.94141-4.6367-0.96094-6.8281-0.054688-2.1875 0.91016-3.9141 2.668-4.7852 4.8711s-0.80859 4.6641 0.16797 6.8242c0.97656 2.1602 2.7891 3.8281 5.0195 4.6289 39.746 15.648 82.105 20.773 123.25 15.824z"></path><path d="m590.8 243.45c2.6211-0.011718 5.0977-1.1953 6.7539-3.2266s2.3125-4.6992 1.7891-7.2695c-3.043-16.129-7.6484-31.926-13.738-47.168v0.003906c-0.79297-2.25-2.4688-4.082-4.6406-5.0664-2.1719-0.98828-4.6523-1.043-6.8672-0.15625s-3.9688 2.6367-4.8633 4.8477c-0.89453 2.2109-0.84375 4.6914 0.13281 6.8672 5.6719 14.188 9.9492 28.906 12.785 43.922 0.73437 4.1992 4.3867 7.2578 8.6484 7.2461z"></path></g></svg>',1),as={class:"text-sm mr-2 sm:ml-5 <font-bold"},os={class:"w-5/6 m-auto"},ns={class:"mt-3 flex justify-between"},is=e("h2",{class:"font-bold text-lg m-1"},"Spiele",-1),cs={class:"text-sm m-2"},rs=k(" Alle Spiele "),ds={class:"overflow-auto max-h-[50%] w-full mx-auto bg-white rounded-2xl border border-gray-100 shadow-xl p-2 mb-20"},us={key:0},ms={key:1},vs=e("div",{id:"league-info"},null,-1),hs={id:"no-data"},ps={id:"no-future-matches"},gs={class:"rounded-lg bg-indigo-200 my-1 p-2 justify-between px-5 hover:scale-95 scale-100 transition-all"},_s={class:"grid grid-cols-3 sm:grid-cols-6 gap-1"},fs={id:"teams",class:"text-black w-fit col-span-2 text-xs font-bold"},bs={id:"date-time",class:"w-fit text-xs text-gray-800"},xs={class:"flex"},ws={class:"flex"},ys={id:"location",class:"flex text-black col-span-2"},$s={class:"truncate text-xs"},ks={id:"score",class:"flex w-fit"},Cs={class:"min-w-[20px] mr-1 text-right"},Ss=k(" : "),js={class:"min-w-[20px] ml-1"},ue={props:["team_id","team_class","team_club"],emits:["updateFavorites"],setup(T,{emit:h}){const s=T,_=Z(),t=v([]),d=v(!1),c=v([]),n=v(null),u=v(null),l=v(null),w=v(null),F=v(null),N=v(!1),J=()=>{navigator.share?navigator.share({title:"Team",text:w.value.head.name+" "+F.value.lname,url:_.fullPath}):alert("Dein Browser unterst\xFCtzt das Share-Feature nicht.")},W=f=>f.replace("/","/<wbr>"),M=async()=>{const a=await(await fetch("https://spo.handball4all.de/service/if_g_json.php?ca=0&cmd=ps&cl="+n.value+"&ct="+u.value)).json();w.value=a[0];const i=a[0].content.futureGames.games;N.value?c.value=i:c.value=i.filter(C=>{const p=C.gDate.split(".");return new Date("20"+p[2],p[1]-1,p[0])>new Date}),d.value=!1},O=()=>{if(!t.value.length)return!1;for(const f of t.value)if(f.type=="team"&&f.id==u.value)return!0},E=()=>{console.log("add favorite"),t.value.push({type:"team",id:u,name:w.value.head.sname,classid:n.value,clubno:l.value,clubname:F.value.lname}),K()},U=()=>{console.log("remove favorite");for(const f of t.value)console.log(f.type),console.log(f.id),f.type=="team"&&f.id==u.value&&t.value.splice(t.value.indexOf(f),1);K()},K=()=>{localStorage.setItem("favorites",JSON.stringify(t.value)),h("updateFavorites")},B=async()=>{const f=localStorage.getItem("favorites");f?t.value=JSON.parse(f):t.value=[]},Y=se(s,"team_id");le(Y,async(f,a)=>{console.log("update club"),f&&forceUpdate()});const P=async()=>{const a=await(await fetch("https://spo.handball4all.de/service/if_g_json.php?cmd=cs&cs="+l.value)).json();F.value=a[0].searchResult.list[0]},q=async()=>{if(console.log(s.team_id),s.team_id&&s.team_class&&s.team_club)console.log("props"),u.value=s.team_id,n.value=s.team_class,l.value=s.team_club;else{const a=_.hash.substring(1).split(";");u.value=a[0],n.value=a[1],l.value=a[2]}console.log("teamID: "+u.value),console.log("teamClassID: "+n.value),console.log("teamClubNo: "+l.value)};return V(async()=>{await q(),await B(),await M(),await P()}),(f,a)=>(r(),m("div",Ot,[Et,e("div",Pt,[g(b(we),{class:"h-6 w-6 mt-1 ml-2 hover:text-indigo-500 absolute right-20 top-5",onClick:J}),y(g(b(X),{class:"h-6 w-6 mt-1 ml-2 hover:text-indigo-500 absolute right-5 top-5",onClick:E},null,512),[[S,!O()]]),y(g(b(ae),{class:"h-6 w-6 mt-1 ml-2 text-indigo-500 hover:text-black absolute right-5 top-5",onClick:U},null,512),[[S,O()]]),w.value?(r(),m("img",{key:0,src:"logos/clubs/"+l.value+".png",alt:"",class:"w-1/3 h-1/3 my-10 ml-5 rounded-lg border border-gray-500"},null,8,Rt)):(r(),m("div",Vt,[g(b(ye),{class:"text-gray-700"})])),e("div",Jt,[e("div",Wt,o(w.value?w.value.head.name:""),1),e("div",Ut,o(F.value?F.value.lname:""),1)])]),e("div",Bt,[Yt,w.value?(r(!0),m(L,{key:1},A(w.value.content.score,i=>(r(),m("div",Qt,[e("div",Zt,o(i.tabScore),1),e("div",{class:"font-bold text-sm",innerHTML:W(i.tabTeamname)},null,8,Xt),e("div",es,[ts,k(" "+o(i.numGoalsShot)+" : "+o(i.numGoalsGot),1)]),e("div",ss,[ls,k(" "+o(i.numPlayedGames),1)]),e("div",as,o(i.pointsPlus),1)]))),256)):(r(),m("div",qt))]),e("div",os,[e("div",ns,[is,e("div",cs,[rs,y(e("input",{class:"ml-1 mb-1 rounded",type:"checkbox",name:"",id:"","onUpdate:modelValue":a[0]||(a[0]=i=>N.value=i),onClick:a[1]||(a[1]=i=>n.value?M():null)},null,512),[[oe,N.value]])])]),e("div",ds,[d.value?(r(),m("div",us,"Loading...")):(r(),m("div",ms,[vs,y(e("div",hs,[y(e("div",ps," Keine zuk\xFCnftigen Spiele ",512),[[S,!N.value]]),y(e("div",null," Keine Spiele in dieser Klasse ",512),[[S,N.value]])],512),[[S,!c.value.length]]),(r(!0),m(L,null,A(c.value,i=>(r(),m("div",gs,[e("div",_s,[e("div",fs,o(i.gHomeTeam)+" : "+o(i.gGuestTeam),1),e("div",bs,[e("div",xs,o(i.gWDay)+" "+o(i.gDate),1),e("div",ws,[g(b(ne),{class:"h-4 mr-1 text-indigo-900"}),k(" "+o(i.gTime),1)])]),e("div",ys,[g(b(ie),{class:"h-4 w-4 text-indigo-900 shrink-0"}),e("span",$s,o(i.gGymnasiumName),1)]),e("div",ks,[e("div",Cs,o(i.gHomeGoals),1),Ss,e("div",js,o(i.gGuestGoals),1)]),e("div",{id:"info",class:H(["col-span-3 text-gray-600",i.gComment.length>1?"flex":"hidden"])},[g(b(ce),{class:"h-4 w-4 mt-1 mr-1"}),k(" "+o(i.gComment),1)],2)])]))),256))]))])])]))}},Ds={class:"w-full h-full"},Is={class:"mr-5 transition-all"},Fs=["onClick"],zs=["onClick"],Ls={class:"ml-0 mr-auto"},Ts={class:"ml-auto mr-0"},Ns={key:2,class:"w-[calc(100%-4rem)] h-full ml-auto mr-0 flex justify-center items-center px-5"},Hs=e("span",{class:"text-lg"},[k(" Noch keine Favoriten angelegt. "),e("br"),k(" Gehen Sie daf\xFCr zur Suche oder den Ligen. ")],-1),As=[Hs],Gs={setup(T){const h=v([]),s=v({}),_=v(!1),t=n=>{s.value=n,localStorage.setItem("selectedFavorite",JSON.stringify(n))},d=()=>{const n=localStorage.getItem("selectedFavorite");n?s.value=JSON.parse(n):s.value={},console.log(n);let u=!1;h.value.forEach(l=>{l.type==s.value.type&&l.id==s.value.id&&(u=!0)}),u||(s.value=h.value[0])},c=async()=>{const n=localStorage.getItem("favorites");n?h.value=JSON.parse(n):h.value=[],d()};return V(async()=>{await c(),await d()}),(n,u)=>(r(),m("div",Ds,[e("div",{id:"menu",class:H(["h-full z-10 pl-5 w-[calc(50%+4rem)] bg-indigo-200 transition-all duration-300 fixed",_.value?"left-0":"-left-1/2"])},[g(b($e),{class:"h-8 w-8 m-5 ml-auto mr-5",onClick:u[0]||(u[0]=l=>_.value=!_.value)}),e("div",Is,[e("p",{class:H(["font-bold",_.value?"":"ml-[calc(100%-2.5rem)] -mr-2"])}," Verein ",2),(r(!0),m(L,null,A(h.value,l=>y((r(),m("div",{class:H(["rounded-lg shadow-2xl hover:scale-95 scale-100 transition all bg-indigo-600 h-9 break-all text-indigo-100 p-2 my-1 overflow-hidden",_.value?"":"ml-[calc(100%-3.2rem)] -mr-2"]),onClick:w=>t(l)},o(l.name),11,Fs)),[[S,l.type=="club"]])),256)),e("p",{class:H(["font-bold",_.value?"":"ml-[calc(100%-2.5rem)] -mr-2"])}," Team ",2),(r(!0),m(L,null,A(h.value,l=>y((r(),m("div",{class:H(["rounded-lg shadow-2xl hover:scale-95 scale-100 transition all bg-indigo-600 h-9 break-all text-indigo-100 p-2 my-1 overflow-hidden",_.value?"flex":"ml-[calc(100%-3.2rem)] -mr-2"]),onClick:w=>t(l)},[e("span",Ls,o(l.name),1),e("span",Ts,o(l.clubname),1)],10,zs)),[[S,l.type=="team"]])),256))])],2),s.value&&s.value.type=="club"?(r(),Q(de,{class:"w-[calc(100%-4rem)] ml-auto mr-0",club_no:s.value.no,key:s.value.no,onUpdateFavorites:c},null,8,["club_no"])):s.value&&s.value.type=="team"?(r(),Q(ue,{class:"w-[calc(100%-4rem)] ml-auto mr-0",team_id:s.value.id,team_class:s.value.classid,team_club:s.value.clubno,key:s.value.id,onUpdateFavorites:c},null,8,["team_id","team_class","team_club"])):(r(),m("div",Ns,As))]))}},Ks={},Ms={},Os={},Es=[{path:"//",redirect:"/favorites"},{path:"//team",component:ue,meta:{KeepAlive:!0}},{path:"//leagues",component:tt,meta:{KeepAlive:!0}},{path:"//favorites",component:Gs,meta:{KeepAlive:!0}},{path:"//search",component:et,meta:{KeepAlive:!0}},{path:"//match",component:Ms,meta:{KeepAlive:!0}},{path:"//club",component:de,meta:{KeepAlive:!0}},{path:"//gym",component:Os,meta:{KeepAlive:!0}},{path:"//settings",component:Ks,meta:{KeepAlive:!0}}],Ps=ke({history:Ce(),routes:Es}),ee=Se(Ee),Rs=je();ee.use(Ps);ee.use(Rs);ee.mount("#app");
