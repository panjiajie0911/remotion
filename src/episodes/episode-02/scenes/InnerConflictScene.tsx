import {AbsoluteFill, Easing, Img, interpolate, useCurrentFrame} from "remotion";
import confused from "../assets/img/confused.png";
import pushing from "../assets/img/push-away.png";
import tower from "../assets/img/complete-jimu.png";
import blocks from "../assets/img/mess-jimu.png";
import {captions} from "../script/captions";
import {theme} from "../../../lib/theme";

const first = captions.findIndex(c => c.text.startsWith("精神分析提供了一种理解角度"));
const last = captions.findIndex((c,i) => i >= first && c.text.includes("演”了出来"));
if(first < 0 || last < first) throw new Error("未找到内在冲突字幕范围");
export const INNER_CONFLICT_START = 90 + Math.round(captions[first].start * 30);
export const INNER_CONFLICT_DURATION = Math.round(captions[last].end * 30) - Math.round(captions[first].start * 30);
const clamp = {extrapolateLeft:"clamp", extrapolateRight:"clamp"} as const;

export const InnerConflictScene = () => {
 const p = useCurrentFrame() / (INNER_CONFLICT_DURATION-1);
 const enter = (a:number,b:number) => interpolate(p,[a,b],[0,1],{...clamp,easing:Easing.inOut(Easing.cubic)});
 const thought = enter(.3,.38)*(1-enter(.72,.8));
 const fall = enter(.77,.85);
 const push = interpolate(p,[.71,.77,.85],[0,45,25],clamp);
 return <AbsoluteFill style={{backgroundColor:"#fff",fontFamily:theme.fonts.sans,color:theme.colors.text}}>
 
  {/* <div style={{position:"absolute",left:60,right:60,top:290,textAlign:"center",fontSize:55,fontWeight:700,opacity:enter(.82,.89)}}>内在冲突，可能通过行为表达</div> */}
  <div style={{position:"absolute",left:90,top:470,width:900,height:310,opacity:thought}}>
   
  
  </div>
  <svg width="1080" height="1920" style={{position:"absolute",inset:0,opacity:enter(.7,.73)*(1-enter(.9,.94))}}>
   <path d="M735 760 Q820 940 510 1080" fill="none" stroke={theme.colors.primary} strokeWidth="4" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-enter(.7,.78)}/>
  </svg>
  {p<.71 ? <Img src={confused} style={{position:"absolute",left:150,top:855,width:300,height:615,objectFit:"contain",opacity:enter(0,.07)}}/> : <Img src={pushing} style={{position:"absolute",left:100+push,top:840,width:370,height:630,objectFit:"contain"}}/>}
  {p>=.3 && p<.85 ? <Img src={tower} style={{position:"absolute",left:360+fall*190,top:1080+fall*90,width:430,height:390,objectFit:"contain",opacity:enter(.3,.38)*interpolate(p,[.81,.85],[1,0],clamp),rotate:`${fall*42}deg`,transformOrigin:"85% 100%"}}/> : null}
  <Img src={blocks} style={{position:"absolute",left:485,top:1215,width:485,height:255,objectFit:"contain",opacity:p<.3?1-enter(.23,.3):enter(.81,.86),translate:`0 ${p>.8?interpolate(p,[.81,.85,.88],[-15,4,0],clamp):0}px`}}/>
 </AbsoluteFill>;
};
