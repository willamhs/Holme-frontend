import{a as W,f as Y}from"./chunk-6GJCGIWI.js";import"./chunk-O4TD3ARG.js";import{a as J,b as V}from"./chunk-USJNGY26.js";import{K as j,L as I,N as L,Q as T,R as A,S as N,Sa as K,Ta as X,V as R,Y as k,ga as q,ia as H,ja as B,ka as Q,la as U,pa as G}from"./chunk-QNA37QPB.js";import{h as z,i as D}from"./chunk-VKT35G3O.js";import"./chunk-Q64FFBLU.js";import{$b as w,Ab as t,Bb as o,Ib as P,Kb as S,Qc as F,Ub as n,Wa as c,Zb as y,_b as O,bc as l,da as p,ha as m,lb as b,qb as d,vb as E,xb as M,yb as _,zb as e}from"./chunk-MWU7JMLF.js";var $=(r,a)=>a.id;function ee(r,a){r&1&&(e(0,"div",8),o(1,"div",10),e(2,"p"),n(3,"Cargando charlas m\xE1s recientes..."),t()())}function te(r,a){if(r&1&&o(0,"app-event-card",11),r&2){let i=a.$implicit;d("event",i)}}function ne(r,a){if(r&1&&M(0,te,1,1,"app-event-card",11,$),r&2){let i=S();_(i.filteredEvents)}}function ie(r,a){r&1&&(e(0,"div",9)(1,"mat-icon"),n(2,"event_busy"),t(),e(3,"p"),n(4,"No se encontraron charlas."),t()())}var u=class r{recentEvents=[];filteredEvents=[];searchQuery="";isLoading=!0;eventService=p(W);ngOnInit(){this.isLoading=!0,this.eventService.getRecentEvents().subscribe({next:a=>{this.recentEvents=a,this.filteredEvents=a,this.isLoading=!1},error:a=>{console.error("Error al cargar los eventos recientes",a),this.isLoading=!1}})}onSearch(){let a=this.searchQuery.toLowerCase();this.filteredEvents=this.recentEvents.filter(i=>i.name.toLocaleLowerCase().includes(a)||i.categoryName.toLocaleLowerCase().includes(a)||i.locationName.toLocaleLowerCase().includes(a)||i.cityName.toLocaleLowerCase().includes(a))}static \u0275fac=function(i){return new(i||r)};static \u0275cmp=m({type:r,selectors:[["app-home"]],standalone:!0,features:[l],decls:15,vars:2,consts:[[1,"home-container"],[1,"recent-events"],[1,"section-title"],[1,"search-container"],[1,"search-field"],["matInput","","type","text","placeholder","Nombre de la charla o categor\xEDa",3,"ngModelChange","input","ngModel"],["matSuffix",""],[1,"events-grid"],[1,"loading-spinner"],[1,"no-events"],[1,"spinner"],[3,"event"]],template:function(i,s){i&1&&(e(0,"main",0)(1,"section",1)(2,"h2",2),n(3,"Descubre tus charlas con los mejores especialistas"),t(),e(4,"div",3)(5,"mat-form-field",4)(6,"mat-label"),n(7,"Buscar charlas"),t(),e(8,"input",5),w("ngModelChange",function(v){return O(s.searchQuery,v)||(s.searchQuery=v),v}),P("input",function(){return s.onSearch()}),t(),e(9,"mat-icon",6),n(10,"search"),t()()(),e(11,"div",7),b(12,ee,4,0,"div",8)(13,ne,2,0)(14,ie,5,0,"div",9),t()()()),i&2&&(c(8),y("ngModel",s.searchQuery),c(4),E(s.isLoading?12:s.filteredEvents.length>0?13:14))},dependencies:[F,j,A,T,I,L,B,H,U,Q,G,J,q,N,R,k,V],styles:[".home-container[_ngcontent-%COMP%]{max-width:1200px;margin:0 auto;padding:2rem 1rem}.section-title[_ngcontent-%COMP%]{font-size:2.5rem;color:#00796b;margin-bottom:2rem;text-align:center;font-weight:700}.search-container[_ngcontent-%COMP%]{display:flex;justify-content:center;margin-bottom:2rem}.search-field[_ngcontent-%COMP%]{width:100%;max-width:600px}.events-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:2rem}.no-events[_ngcontent-%COMP%]{grid-column:1 / -1;text-align:center;font-size:1.2rem;color:#666;padding:3rem;background-color:#f5f5f5;border-radius:12px;display:flex;flex-direction:column;align-items:center;gap:1rem}.no-events[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:3rem;color:#104841}.loading-spinner[_ngcontent-%COMP%]{grid-column:1 / -1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px}.spinner[_ngcontent-%COMP%]{width:50px;height:50px;border:5px solid #f3f3f3;border-top:5px solid #0f7a6e;border-radius:50%;animation:_ngcontent-%COMP%_spin 1s linear infinite}@keyframes _ngcontent-%COMP%_spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.loading-spinner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-top:20px;font-size:18px;color:#666}@media (max-width: 768px){.section-title[_ngcontent-%COMP%]{font-size:2rem}.events-grid[_ngcontent-%COMP%]{grid-template-columns:1fr}}"]})};var g=class r{static \u0275fac=function(i){return new(i||r)};static \u0275cmp=m({type:r,selectors:[["app-public-content-layout"]],standalone:!0,features:[l],decls:5,vars:0,consts:[[1,"layout-wrapper"],[1,"content-wrapper"]],template:function(i,s){i&1&&(e(0,"div",0),o(1,"app-navbar"),e(2,"div",1),o(3,"router-outlet"),t(),o(4,"app-footer"),t())},dependencies:[K,X,D]})};var f=class r{eventId;route=p(z);constructor(){this.eventId=+this.route.snapshot.paramMap.get("id")}static \u0275fac=function(i){return new(i||r)};static \u0275cmp=m({type:r,selectors:[["app-event-info-page"]],standalone:!0,features:[l],decls:3,vars:1,consts:[[1,"event-info-page-container"],[1,"event-content"],[3,"eventId"]],template:function(i,s){i&1&&(e(0,"div",0)(1,"div",1),o(2,"app-event-details",2),t()()),i&2&&(c(2),d("eventId",s.eventId))},dependencies:[Y]})};var x=class r{static \u0275fac=function(i){return new(i||r)};static \u0275cmp=m({type:r,selectors:[["app-landing-page"]],standalone:!0,features:[l],decls:128,vars:0,consts:[[1,"main-section"],[1,"main-content"],[1,"main-text"],["href","#",1,"btn-main"],[1,"main-image"],["src","assets/hero-bg.jpg","alt","Estudiante en el campus"],[1,"container"],[1,"eventos"],[1,"evento-card"],["src","assets/evento1.jpg","alt","Evento 1"],["src","assets/evento2.jpg","alt","Evento 2"],["src","assets/evento3.jpg","alt","Evento 3"],["src","assets/evento4.jpg","alt","Evento 4"],[1,"bienvenida"],[1,"botones"],[1,"btn-comenzar"],[1,"btn-explorar"],[1,"testimonials","p-5","text-center","bg-light"],[1,"containerT"],[1,"testimonials-header"],[1,"row","mt-4"],[1,"col-md-4"],[1,"testimonial-item"],["src","assets/jaime.jpg","alt","Jaime",1,"img-fluid","rounded-circle","mb-3",2,"width","150px","height","150px"],["src","assets/angela.jpg","alt","Angela",1,"img-fluid","rounded-circle","mb-3",2,"width","150px","height","150px"],["src","assets/carlos.jpg","alt","Carlos",1,"img-fluid","rounded-circle","mb-3",2,"width","150px","height","150px"],[1,"features-section"],[1,"containerC","text-center"],[1,"row"],[1,"col-md-3","feature-item"],["src","assets/search-events-icon.png","alt","B\xFAsqueda de eventos",1,"feature-icon"],["src","assets/registration-icon.png","alt","Inscripci\xF3n eficaz",1,"feature-icon"],["src","assets/calendar-icon.png","alt","Calendario Personalizado",1,"feature-icon"],["src","assets/notifications-icon.png","alt","Notificaciones en Tiempo Real",1,"feature-icon"],["src","assets/info-icon.png","alt","Informaci\xF3n detallada",1,"feature-icon"],[1,"cta-section","mt-4"],[1,"promo-section"],[1,"promo-content"],[1,"firework-left"],[1,"promo-image"],["src","assets/promo-image.jpg","alt","Estudiantes felices"],[1,"firework-right"],["href","#",1,"btn-registrarse"]],template:function(i,s){i&1&&(e(0,"section",0)(1,"div",1)(2,"div",2)(3,"h1"),n(4,"Tu Portal de Eventos Universitarios"),t(),e(5,"p"),n(6,"Descubre, organiza y participa en emocionantes eventos universitarios de manera sencilla."),t(),e(7,"a",3),n(8,"Comenzar a usar CampusSphere"),t()(),e(9,"div",4),o(10,"img",5),t()()(),e(11,"div",6)(12,"div",7)(13,"div",8),o(14,"img",9),e(15,"h3"),n(16,"Conferencia sobre innovaci\xF3n universitaria."),t(),e(17,"p"),n(18,"Un evento que explora nuevas tendencias y pr\xE1cticas en la educaci\xF3n superior, destacando enfoques innovadores para mejorar la ense\xF1anza y el aprendizaje en las universidades."),t()(),e(19,"div",8),o(20,"img",10),e(21,"h3"),n(22,"Taller Interactivo sobre Desarrollo de Habilidades"),t(),e(23,"p"),n(24,"Una sesi\xF3n pr\xE1ctica dise\xF1ada para ayudar a los participantes a adquirir y mejorar habilidades espec\xEDficas a trav\xE9s de actividades din\xE1micas y participativas."),t()(),e(25,"div",8),o(26,"img",11),e(27,"h3"),n(28,"Seminario de Tecnolog\xEDa Educativa"),t(),e(29,"p"),n(30,"Un seminario enfocado en las \xFAltimas herramientas y tecnolog\xEDas que est\xE1n transformando el \xE1mbito educativo, proporcionando conocimientos sobre su implementaci\xF3n y impacto en el aprendizaje."),t()(),e(31,"div",8),o(32,"img",12),e(33,"h3"),n(34,"Encuentro de Liderazgo Estudiantil"),t(),e(35,"p"),n(36,"Un evento que re\xFAne a estudiantes para discutir y desarrollar habilidades de liderazgo, promoviendo la colaboraci\xF3n y el intercambio de ideas entre futuros l\xEDderes acad\xE9micos y comunitarios."),t()()(),e(37,"div",13)(38,"h1"),n(39,"\xA1Bienvenido a CampusSphere!"),t(),e(40,"p"),n(41,"La plataforma dise\xF1ada para estudiantes que buscan eventos universitarios de calidad."),t(),e(42,"div",14)(43,"button",15),n(44,"Comienza tu experiencia"),t(),e(45,"button",16),n(46,"Explora eventos"),t()()()(),e(47,"section",17)(48,"div",18)(49,"div",19)(50,"h2"),n(51,"\xBFQu\xE9 dicen nuestros clientes sobre nosotros?"),t(),e(52,"p"),n(53,"C\xF3mo CampusSphere les ayud\xF3 a alcanzar sus objetivos y mejorar su experiencia en eventos."),t()(),e(54,"div",20)(55,"div",21)(56,"div",22),o(57,"img",23),e(58,"h4"),n(59,"Jaime, el estudiante curioso"),t(),e(60,"p"),n(61,'"CampusSphere me permiti\xF3 inscribirme en eventos que realmente me interesaban, desde talleres hasta seminarios especializados. Todo en un solo lugar."'),t()()(),e(62,"div",21)(63,"div",22),o(64,"img",24),e(65,"h4"),n(66,"Angela, la entusiasta de la tecnolog\xEDa"),t(),e(67,"p"),n(68,'"Gracias a CampusSphere, descubr\xED eventos sobre tecnolog\xEDa que no sab\xEDa que exist\xEDan. \xA1La inscripci\xF3n fue r\xE1pida y sencilla!"'),t()()(),e(69,"div",21)(70,"div",22),o(71,"img",25),e(72,"h4"),n(73,"Carlos, el aprendiz constante"),t(),e(74,"p"),n(75,'"Inscribirme a conferencias de liderazgo nunca hab\xEDa sido tan f\xE1cil. CampusSphere me ayud\xF3 a encontrar eventos que encajan con mis objetivos profesionales."'),t()()()()()(),e(76,"section",26)(77,"div",27)(78,"h2"),n(79,"CARACTERISTICAS"),t(),e(80,"div",28)(81,"div",29),o(82,"img",30),e(83,"h3"),n(84,"B\xFAsqueda de Eventos"),t(),e(85,"p"),n(86,"Encuentra eventos que te interesan con facilidad. Filtra por fecha, tema o ubicaci\xF3n."),t()(),e(87,"div",29),o(88,"img",31),e(89,"h3"),n(90,"Inscripci\xF3n eficaz"),t(),e(91,"p"),n(92,"Inscr\xEDbete en un evento en pocos pasos. Revisa los detalles y escoge de manera efectiva."),t()(),e(93,"div",29),o(94,"img",32),e(95,"h3"),n(96,"Calendario Personalizado"),t(),e(97,"p"),n(98,"Crea tu calendario personal de eventos. Recibe recordatorios y recomendaciones."),t()(),e(99,"div",29),o(100,"img",33),e(101,"h3"),n(102,"Notificaciones en Tiempo Real"),t(),e(103,"p"),n(104,"Mantente al tanto de los eventos y las actualizaciones a trav\xE9s de notificaciones."),t()(),e(105,"div",29),o(106,"img",34),e(107,"h3"),n(108,"Informaci\xF3n detallada"),t(),e(109,"p"),n(110,"Conoce los detalles de cada evento, para tener una mejor experiencia y pasi\xF3n. Establece confianza y relaciones s\xF3lidas."),t()()(),e(111,"div",35)(112,"p"),n(113,"\xBFTe llama la atenci\xF3n? Haz clic aqu\xED"),t(),e(114,"a",3),n(115,"Registrarse"),t()()()(),e(116,"section",36)(117,"div",37)(118,"h2"),n(119,"\xDAnete a CampusSphere y Ampl\xEDa tus Horizontes"),t(),o(120,"div",38),e(121,"div",39),o(122,"img",40),t(),o(123,"div",41),e(124,"a",42),n(125,"\xA1REG\xCDSTRATE AQU\xCD!"),t(),e(126,"p"),n(127,"No te pierdas ning\xFAn evento universitario. \xA1\xDAnete hoy y disfruta de la experiencia!"),t()()())},styles:[".main-section[_ngcontent-%COMP%]{background-color:#eef0f2;padding:50px 0;display:flex;justify-content:center}.main-content[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;max-width:1200px;width:100%;padding:0 20px}.main-text[_ngcontent-%COMP%]{max-width:50%}.main-text[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:50px;font-weight:700;color:#333}.main-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:20px;margin:20px 0;color:#666}.main-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:100%;height:auto}.container[_ngcontent-%COMP%]{display:flex;justify-content:space-between;padding:20px}.eventos[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;width:60%}.evento-card[_ngcontent-%COMP%]{border:1px solid #ddd;border-radius:10px;padding:20px;box-shadow:0 4px 8px #0000001a;text-align:center}.evento-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:100%;border-radius:10px;margin-bottom:10px}.bienvenida[_ngcontent-%COMP%]{width:35%;display:flex;flex-direction:column;justify-content:center;text-align:left;padding:20px}.bienvenida[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:50px;margin-bottom:20px}.bienvenida[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:30px;margin-bottom:30px}.botones[_ngcontent-%COMP%]{display:flex;gap:10px}.testimonials[_ngcontent-%COMP%]{padding:50px 0;background-color:#eef0f2}.testimonials-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:36px;margin-bottom:10px;color:#333}.testimonials-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:18px;color:#666;margin-bottom:30px}.testimonial-item[_ngcontent-%COMP%]{background-color:#fff;border-radius:10px;padding:20px;box-shadow:0 4px 6px #0000001a;text-align:center;margin-bottom:30px}.testimonial-item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:150px;height:150px;object-fit:cover;border-radius:50%;margin-bottom:15px}.testimonial-item[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-size:22px;margin-top:10px;color:#333}.testimonial-item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:16px;color:#666;font-style:italic}.features-section[_ngcontent-%COMP%]{background-color:#0d21a1;padding:50px 0;color:#fff;display:flex;justify-content:space-around;align-items:center}.features-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:32px;font-weight:700;margin-bottom:40px}.feature-item[_ngcontent-%COMP%]{margin-bottom:30px;text-align:center;max-width:300px}.feature-icon[_ngcontent-%COMP%]{width:80px;height:80px;margin-bottom:15px}.feature-item[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:20px;font-weight:700;margin-bottom:10px}.feature-item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:16px;margin-bottom:0}.cta-section[_ngcontent-%COMP%]{margin-top:30px}.cta-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:18px;margin-bottom:15px}.btn-main[_ngcontent-%COMP%]{background-color:#ff9220;padding:10px 20px;border-radius:5px;color:#fff;font-weight:700;text-transform:uppercase;text-decoration:none}.btn-main[_ngcontent-%COMP%]:hover{background-color:#ff7500;color:#fff}.promo-section[_ngcontent-%COMP%]{background-color:#f3f4f6;text-align:center;padding:50px 0;position:relative}.promo-content[_ngcontent-%COMP%]{max-width:800px;margin:0 auto;position:relative;z-index:1}.promo-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:36px;color:#333;font-weight:700;margin-bottom:30px}.promo-image[_ngcontent-%COMP%]{position:relative;z-index:2}.promo-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:100%;border-radius:10px;margin-bottom:20px;z-index:2}.btn-registrarse[_ngcontent-%COMP%]{background-color:#ff9220;padding:10px 20px;border-radius:5px;color:#fff;font-weight:700;text-transform:uppercase;text-decoration:none;display:inline-block;margin-bottom:20px}.btn-registrarse[_ngcontent-%COMP%]:hover{background-color:#e07c00}.promo-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:18px;color:#666}"]})};var Ae=[{path:"",component:g,children:[{path:"",component:u},{path:"event-details/:id",component:f},{path:"inicio",component:x}]}];export{Ae as publicContentRoutes};
