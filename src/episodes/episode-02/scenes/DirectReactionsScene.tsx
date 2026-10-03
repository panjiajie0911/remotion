import {AbsoluteFill, Img, interpolate, useCurrentFrame} from "remotion";
import cry from "../assets/img/cry-boy.png";
import fight from "../assets/img/fight-boy.png";
import negative from "../assets/img/negitive-boy.png";
import {theme} from "../../../lib/theme";
// Ends at full-video 54s after the preceding 45s shot.
export const DIRECT_REACTIONS_DURATION = 270;
export const DirectReactionsScene = () => {
 const frame=useCurrentFrame(); const t=frame/30; const fade=(a:number,b:number)=>interpolate(t,[a,b],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
 const phases=[{src:cry,label:"哭闹",from:0,to:1.8,left:90},{src:fight,label:"抢夺",from:1.8,to:3.6,left:395},{src:negative,label:"顶嘴",from:3.6,to:5.4,left:700}];
 return <AbsoluteFill style={{backgroundColor:"#fff",fontFamily:theme.fonts.sans,color:theme.colors.text}}>
 
  {phases.map(p=><div key={p.label} style={{position:"absolute",left:p.left,top:580,width:300,opacity:fade(p.from,p.from+.25),scale: t>=p.to?0.78:1,translate:t>=p.to?"0 -30px":"0 0"}}><Img src={p.src} style={{width:300,height:520,objectFit:"contain"}}/><div style={{textAlign:"center",color:theme.colors.primary,fontSize:42,fontWeight:700,marginTop:24}}>{p.label}</div></div>)}
  <div style={{position:"absolute",left:0,right:0,top:1610,textAlign:"center",fontSize:38,color:"#6E7788",opacity:fade(5,5.3)}}>哭闹 · 抢夺 · 顶嘴</div>
 </AbsoluteFill>;
};
