// OLLI: banco de crípticos de nivel difícil, con definiciones y juegos de letras integrados.
const clean = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase();
const bank=[];
const hardPairs=[
  ['letras','lastre','signos que componen un alfabeto','peso que frena el avance'],
  ['esponja','japones','objeto poroso que se empapa y se exprime','persona nacida en el país del sol naciente'],
  ['alerta','altera','vigilante ante un peligro','cambia algo de su estado'],
  ['animal','lamina','ser vivo que no es vegetal','hoja fina, a veces ilustrada'],
  ['soldar','dorsal','unir metales con calor','relativo a la espalda'],
  ['cantera','cantare','lugar del que se extrae piedra','lo que haré con la voz mañana'],
  ['reclamo','comerla','llamada para atraer la atención','ingerirla a ella'],
  ['conserva','conversa','fruta guardada para que dure','habla con alguien'],
  ['destino','sentido','lo que parece escrito para el futuro','significado de una frase'],
  ['consejo','conejos','recomendación dada con prudencia','mamíferos de orejas largas'],
  ['castigo','goticas','pena impuesta por una falta','propias de una arquitectura medieval'],
  ['camison','mocasin','prenda holgada para dormir','zapato bajo, sin cordones'],
  ['acuerdo','ecuador','pacto entre partes','país atravesado por la línea imaginaria'],
  ['patrona','aportan','protectora o dueña de un negocio','contribuyen con algo'],
  ['costera','recosta','relativa a la orilla del mar','vuelve a apoyar el cuerpo'],
  ['escoria','acieros','residuo que queda tras fundir metal','aleaciones resistentes de hierro'],
  ['partera','reparta','persona que ayuda a nacer','distribuya entre varias personas'],
  ['musical','simular','propio de una obra con canciones','fingir algo que no ocurre'],
  ['rapidos','disparo','veloces, sin demora','sonido y acción de un arma'],
  ['palidas','lapidas','de rostro sin color','piedras que cubren una tumba'],
  ['doradas','rodadas','cubiertas de brillo como el oro','filmadas, como ciertas escenas'],
  ['pareja','pajera','dos que van juntas','lugar donde se guarda la paja'],
  ['sirena','serian','criatura que atrae marineros con su canto','existirían, si se diera el caso']
];
const surfaceWord={japones:'japonés',lamina:'lámina',camison:'camisón',mocasin:'mocasín',cantare:'cantaré',goticas:'góticas',rapidos:'rápidos',palidas:'pálidas',lapidas:'lápidas'};
const hardFeminine=new Set('esponja alerta lamina cantera conserva patrona costera escoria partera musical sirena pajera'.split(' '));
const hardFemininePlural=new Set(['letras','conversas','goticas','palidas','lapidas']);
const hardMasculinePlural=new Set(['conejos','aceros']);
const hardWordForms=new Set('altera soldar cantare comerla conversa aportan recosta reparta simular serian rapidos goticas palidas doradas rodadas'.split(' '));
function materialPhrase(raw){const w=surfaceWord[raw]||raw;if(hardWordForms.has(raw))return `la forma ${w}`;const article=hardFemininePlural.has(raw)?'las':hardMasculinePlural.has(raw)?'los':hardFeminine.has(raw)?'la':'el';return `${article} ${w}`}
const hardClues=[
  (d,f)=>`${d}; ${materialPhrase(f)} volvió de la verbena irreconocible.`,
  (d,f)=>`La noche dejó ${materialPhrase(f)} sin compostura: ${d}.`,
  (d,f)=>`${d}, cuando ${materialPhrase(f)} cambió de pareja a medianoche.`,
  (d,f)=>`La coctelera puso ${materialPhrase(f)} patas arriba: ${d}.`,
  (d,f)=>`${d}; ${materialPhrase(f)} se desmelenó en el baile.`,
  (d,f)=>`Con el compás perdido, ${materialPhrase(f)}: ${d}.`,
  (d,f)=>`La fiesta puso ${materialPhrase(f)} del revés: ${d}.`,
  (d,f)=>`Al salir del carnaval, ${materialPhrase(f)} había cambiado por completo: ${d}.`,
  (d,f)=>`A ${materialPhrase(f)} le cambió el paso la verbena: ${d}.`,
  (d,f)=>`${d}; ${materialPhrase(f)} llegó con las piezas bailando.`,
  (d,f)=>`Noche de máscaras: ${materialPhrase(f)} se perdió entre la multitud; ${d}.`,
  (d,f)=>`${d}, ${materialPhrase(f)} fuera de su sitio tras el baile.`,
  (d,f)=>`La música trastocó ${materialPhrase(f)}: ${d}.`,
  (d,f)=>`En la pista, ${materialPhrase(f)} acabó hecho un lío: ${d}.`,
  (d,f)=>`${d}; ${materialPhrase(f)} perdió el norte de madrugada.`,
  (d,f)=>`Cuando se apagan las luces, ${materialPhrase(f)} queda patas arriba: ${d}.`,
  (d,f)=>`La verbena no dejó a ${materialPhrase(f)} con la misma cara: ${d}.`,
  (d,f)=>`${d}; ${materialPhrase(f)} se fue de juerga y volvió distinto.`,
  (d,f)=>`${materialPhrase(f)}, con un giro de baile: ${d}.`,
  (d,f)=>`${d}; tras el trajín nocturno, ${materialPhrase(f)} cambió de sitio.`,
  (d,f)=>`La fiesta de ${materialPhrase(f)} terminó en ${d}.`,
  (d,f)=>`${d}; el alboroto alrededor de ${materialPhrase(f)}.`,
  (d,f)=>`El azar sacó a bailar ${materialPhrase(f)}: ${d}.`,
  (d,f)=>`${d}; ${materialPhrase(f)} volvió del torbellino con otra cara.`,
  (d,f)=>`Entre confeti y vueltas, ${materialPhrase(f)}: ${d}.`,
  (d,f)=>`${d}, cuando ${materialPhrase(f)} se mezcló en el carnaval.`,
  (d,f)=>`La noche barajó el destino de ${materialPhrase(f)}: ${d}.`
];
const hardBank=[];
for(const [a,b,da,db] of hardPairs){
  for(let i=0;i<hardClues.length;i++){
    hardBank.push({answer:a,fodder:b,definition:da,clue:hardClues[i](da,b),type:'anagrama'});
    hardBank.push({answer:b,fodder:a,definition:db,clue:hardClues[(i+9)%hardClues.length](db,a),type:'anagrama'});
  }
}
bank.length=0;
bank.push(...hardBank);
const hardHidden=[
  ['destino','predestino','lo que parece escrito para el futuro'],
  ['consejo','aconsejo','recomendación dada con prudencia'],
  ['conversa','desconversar','habla con alguien'],
  ['lastre','deslastre','peso que frena el avance']
];
const hiddenSurfaces=[
  (d,f)=>`${d}; va cosido dentro de ${f}.`,
  (d,f)=>`${d}, algo que ${f} lleva en su interior.`,
  (d,f)=>`De ${f} asoma ${d}.`,
  (d,f)=>`${d}; aparece, sin salir, en ${f}.`
];
for(const [answer,material,definition] of hardHidden){for(const surface of hiddenSurfaces)bank.push({answer,fodder:material,definition,clue:surface(definition,material),type:'palabra oculta'})}
const dayKey=new Date().toLocaleDateString('sv-SE');
const puzzles=bank.map(p=>{const answer=clean(p.answer),fodder=clean(p.fodder);return {...p,conceptId:`${p.type}:${answer}:${fodder}`,id:`${p.type}:${answer}:${fodder}:${p.clue}`}});
const STORAGE='olli-progress-v1';
let saved={};try{saved=JSON.parse(localStorage.getItem(STORAGE)||'{}')}catch{}
let seen=new Set(Array.isArray(saved.seenConcepts)?saved.seenConcepts:[]);
let completed=new Set(Array.isArray(saved.completedConcepts)?saved.completedConcepts:[]);
const savedPuzzleIndex=puzzles.findIndex(p=>p.id===saved.currentPuzzleId);
let currentIndex=savedPuzzleIndex>=0&&!completed.has(puzzles[savedPuzzleIndex].conceptId)?savedPuzzleIndex:pickUnseenIndex();
seen.add(puzzles[currentIndex].conceptId);
let attempts=5,typed='',usedHints=0,finished=false,current=puzzles[currentIndex],autoNext=null;
const $=s=>document.querySelector(s);
const slots=$('#answerSlots'), feedback=$('#feedback'), toast=$('#toast');
function showToast(msg){toast.textContent=msg;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2100)}
function persist(){saved.currentPuzzleId=puzzles[currentIndex].id;saved.seenConcepts=[...seen];saved.completedConcepts=[...completed];localStorage.setItem(STORAGE,JSON.stringify(saved))}
function save(){saved.solved=saved.solved||0;saved.streak=saved.streak||0;saved.lastDay=saved.lastDay||'';persist();updateProgress()}
function updateProgress(){const solved=saved.solved||0;$('#solvedCount').textContent=`${solved.toLocaleString('es')} resueltos`;$('#progressBar').style.width=`${Math.min(100,solved/12)}%`;$('#streak').textContent=`${saved.streak||0} ${(saved.streak||0)===1?'día':'días'}`}
function render(){current=puzzles[currentIndex];typed='';attempts=5;usedHints=0;finished=false;$('#clue').textContent=current.clue;$('#lengthLabel').textContent=`${clean(current.answer).length} LETRAS`;$('#difficulty').textContent='DIFÍCIL';feedback.textContent='';feedback.className='feedback';drawSlots();drawAttempts();updateProgress()}
function drawSlots(){slots.innerHTML='';for(let i=0;i<clean(current.answer).length;i++){const d=document.createElement('div');d.className='slot'+(i===typed.length&&!finished?' active':'');d.textContent=typed[i]||'';slots.appendChild(d)}}
function drawAttempts(){const dots=$('#attemptDots');dots.innerHTML='';for(let i=0;i<5;i++){let d=document.createElement('i');d.className='attempt-dot '+(i<attempts?'live':'lost');dots.appendChild(d)}$('#attemptText').textContent=`${attempts} ${attempts===1?'intento':'intentos'}`}
function check(){if(finished)return;if(typed.length<clean(current.answer).length){showToast('Completa todas las letras primero');return}if(typed===clean(current.answer)){finished=true;completed.add(current.conceptId);seen.add(current.conceptId);feedback.textContent='¡Exacto! Definición y juego de letras encajan. ✨';feedback.className='feedback';saved.solved=(saved.solved||0)+1;if(saved.lastDay!==dayKey){saved.streak=(saved.lastDay===prevDay()?saved.streak||0:0)+1;saved.lastDay=dayKey}save();autoNext=setTimeout(next,1450)}else{attempts--;drawAttempts();typed='';drawSlots();feedback.textContent=attempts?['Casi… vuelve a leer la pista.','Las letras tienen truco. ¡Prueba otra vez!','No te rindas: busca la definición.'][Math.floor(Math.random()*3)]:'Se acabaron los intentos.';feedback.className='feedback bad';if(attempts===0){finished=true;setTimeout(()=>{feedback.textContent=`La respuesta era ${current.answer.toLocaleUpperCase()}. El material era «${current.fodder}».`},700)}}}
function prevDay(){const d=new Date();d.setDate(d.getDate()-1);return d.toLocaleDateString('sv-SE')}
function addLetter(c){if(finished)return;if(c==='⌫'){typed=typed.slice(0,-1)}else if(c==='ENTER'){check();return}else if(typed.length<clean(current.answer).length){typed+=clean(c)}drawSlots()}
function pickUnseenIndex(){const choices=puzzles.map((p,i)=>({p,i})).filter(({p})=>!completed.has(p.conceptId)&&!seen.has(p.conceptId));if(choices.length)return choices[Math.floor(Math.random()*choices.length)].i;const remaining=puzzles.map((p,i)=>({p,i})).filter(({p})=>!completed.has(p.conceptId));return remaining.length?remaining[Math.floor(Math.random()*remaining.length)].i:0}
function next(){if(autoNext){clearTimeout(autoNext);autoNext=null}seen.add(current.conceptId);let choices=puzzles.map((p,i)=>({p,i})).filter(({p,i})=>i!==currentIndex&&!completed.has(p.conceptId)&&!seen.has(p.conceptId));if(!choices.length)choices=puzzles.map((p,i)=>({p,i})).filter(({p,i})=>i!==currentIndex&&!completed.has(p.conceptId));if(!choices.length){showToast('¡Ya resolviste todos los retos de este banco!');persist();return}currentIndex=choices[Math.floor(Math.random()*choices.length)].i;seen.add(puzzles[currentIndex].conceptId);persist();render()}
function drawKeyboard(){const kb=$('#keyboard');const rows=[['Q','W','E','R','T','Y','U','I','O','P'],['A','S','D','F','G','H','J','K','L','Ñ'],['ENTER','Z','X','C','V','B','N','M','⌫']];kb.innerHTML='';for(const row of rows){for(const char of row){const b=document.createElement('button');b.className='key'+(['ENTER','⌫'].includes(char)?' wide':'');b.textContent=char==='⌫'?'⌫':char==='ENTER'?'ENTRAR':char;b.addEventListener('click',()=>addLetter(char));kb.appendChild(b)}}}
$('#hintBtn').addEventListener('click',()=>{if(finished)return;if(attempts<=1){showToast('Necesitas guardar un intento para seguir jugando');return}attempts--;drawAttempts();const mechanism=current.type==='anagrama'?'Indicador: «revuelto» señala un anagrama.':current.type==='inversión'?'Indicador: «al revés» señala una lectura invertida.':'Indicador: «esconde» invita a buscar letras seguidas dentro del material.';const material=current.type==='anagrama'?`Material: ordena las letras de «${current.fodder}».`:current.type==='inversión'?`Material: lee «${current.fodder}» de derecha a izquierda.`:`Material: busca la respuesta dentro de «${current.fodder}».`;const hints=[`Definición: ${current.definition}.`,mechanism,material];feedback.textContent=`Pista ${usedHints+1}: ${hints[Math.min(usedHints,2)]}`;feedback.className='feedback';usedHints++});
$('#skipBtn').addEventListener('click',next);
$('#helpBtn').addEventListener('click',()=>$('#modal').classList.remove('hidden'));$('#closeModal').addEventListener('click',()=>$('#modal').classList.add('hidden'));$('#gotIt').addEventListener('click',()=>$('#modal').classList.add('hidden'));$('#modal').addEventListener('click',e=>{if(e.target===$('#modal'))$('#modal').classList.add('hidden')});
$('#shareBtn').addEventListener('click',async()=>{const text=`OLLI · ${current.clue} (${clean(current.answer).length})`;try{await navigator.clipboard.writeText(text);showToast('Críptico copiado para compartir')}catch{showToast(text)}});
document.addEventListener('keydown',e=>{if(e.key==='Enter')addLetter('ENTER');else if(e.key==='Backspace')addLetter('⌫');else if(/^[a-zñ]$/i.test(e.key))addLetter(e.key)});
persist();drawKeyboard();updateProgress();render();

