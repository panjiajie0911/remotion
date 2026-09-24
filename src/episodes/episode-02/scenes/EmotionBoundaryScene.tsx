import {AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig} from "remotion";
import comfort from "../assets/img/comfor.png";
import {theme} from "../../../lib/theme";
export const EMOTION_BOUNDARY_DURATION = 210;
const clamp={extrapolateLeft:"clamp",extrapolateRight:"clamp"} as const;
export const EmotionBoundaryScene=()=>{
 const {fps}=useVideoConfig(); const t=useCurrentFrame()/fps;
 const fade=(a:number,b:number)=>interpolate(t,[a,b],[0,1],clamp);
 return <AbsoluteFill style={{backgroundColor:"#fff",fontFamily:theme.fonts.sans,color:theme.colors.text}}>
  <div style={{position:"absolute",left:70,right:70,top:170,textAlign:"center",opacity:fade(0,.4)}}><div style={{fontSize:29,color:theme.colors.primary,fontWeight:700}}>当情绪失控时</div><div style={{fontSize:58,fontWeight:700,marginTop:20}}>先理解，再设定边界</div></div>
  <Img src={comfort} style={{position:"absolute",left:210,top:575,width:660,height:770,objectFit:"contain",opacity:fade(.3,.8)}}/>
  <div style={{position:"absolute",left:65,top:1050,width:300,textAlign:"center",color:theme.colors.primary,fontSize:43,fontWeight:700,opacity:fade(1.2,1.6)}}>理解感受</div>
  <div style={{position:"absolute",right:55,top:1050,width:330,textAlign:"center",color:theme.colors.primary,fontSize:43,fontWeight:700,opacity:fade(3.2,3.6)}}>清晰边界</div>
  <div style={{position:"absolute",left:80,right:80,top:1550,textAlign:"center",fontSize:38,color:"#6E7788",opacity:fade(4.8,5.2)}}>情绪可以被理解，行为需要有边界</div>
  <div style={{position:"absolute",left:0,right:0,top:1320,height:8,backgroundColor:theme.colors.primary,transformOrigin:"center",scale:`${interpolate(t,[3.8,4.4],[0,1],clamp)} 1`,opacity:.8}}/>
 </AbsoluteFill>;
};
