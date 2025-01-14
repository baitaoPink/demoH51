import{_ as e}from"./u-icon.RXcgIMGU.js";import{r as t,o as a,c as l,w as o,a as s,n as i,e as r,h as n,p as c,b as u,t as d,i as h,I as p,l as f,j as m,k as y,F as g,m as b,v as w,d as x}from"./index-DhClNPpd.js";import{_ as C,r as k}from"./uni-app.es.DMIRyn8K.js";import{_ as S,b as _,a as v}from"./u-avatar.BsdvLoRO.js";import{r as $,a as I}from"./request.Cpjo-hVt.js";const B=C({name:"u-search",emits:["update:modelValue","input","change","search","custom","clear","focus","blur"],props:{value:{type:String,default:""},modelValue:{type:String,default:""},shape:{type:String,default:"round"},bgColor:{type:String,default:"#f2f2f2"},placeholder:{type:String,default:"请输入关键字"},clearabled:{type:Boolean,default:!0},focus:{type:Boolean,default:!1},showAction:{type:Boolean,default:!0},actionStyle:{type:Object,default:()=>({})},actionText:{type:String,default:"搜索"},inputAlign:{type:String,default:"left"},disabled:{type:Boolean,default:!1},animation:{type:Boolean,default:!1},borderColor:{type:String,default:"none"},height:{type:[Number,String],default:64},inputStyle:{type:Object,default:()=>({})},maxlength:{type:[Number,String],default:1e3},searchIconColor:{type:String,default:""},color:{type:String,default:"#606266"},placeholderColor:{type:String,default:"#909399"},margin:{type:String,default:"0"},searchIcon:{type:String,default:"search"}},data(){return{keyword:"",showClear:!1,show:!1,focused:this.focus}},watch:{keyword(e){this.$emit("input",e),this.$emit("update:modelValue",e),this.$emit("change",e)},valueCom:{immediate:!0,handler(e){this.keyword=e}}},computed:{valueCom(){return this.modelValue},showActionBtn(){return!(this.animation||!this.showAction)},borderStyle(){return this.borderColor?`1px solid ${this.borderColor}`:"none"}},methods:{inputChange(e){this.keyword=e.detail.value},clear(){this.keyword="",this.$nextTick((()=>{this.$emit("clear")}))},search(e){this.$emit("search",e.detail.value);try{uni.hideKeyboard()}catch(t){}},custom(){this.$emit("custom",this.keyword);try{uni.hideKeyboard()}catch(e){}},getFocus(){this.focused=!0,this.animation&&this.showAction&&(this.show=!0),this.$emit("focus",this.keyword)},blur(){setTimeout((()=>{this.focused=!1}),100),this.show=!1,this.$emit("blur",this.keyword)},clickHandler(){this.disabled&&this.$emit("click")}}},[["render",function(f,m,y,g,b,w){const x=k(t("u-icon"),e),C=h,S=p;return a(),l(C,{class:"u-search",onClick:w.clickHandler,style:i({margin:y.margin})},{default:o((()=>[s(C,{class:"u-content",style:i({backgroundColor:y.bgColor,borderRadius:"round"==y.shape?"100rpx":"10rpx",border:w.borderStyle,height:y.height+"rpx"})},{default:o((()=>[s(C,{class:"u-icon-wrap"},{default:o((()=>[s(x,{class:"u-clear-icon",size:30,name:y.searchIcon,color:y.searchIconColor?y.searchIconColor:y.color},null,8,["name","color"])])),_:1}),s(S,{"confirm-type":"search",onBlur:w.blur,value:w.valueCom,onConfirm:w.search,onInput:w.inputChange,disabled:y.disabled,onFocus:w.getFocus,focus:y.focus,maxlength:y.maxlength,"placeholder-class":"u-placeholder-class",placeholder:y.placeholder,"placeholder-style":`color: ${y.placeholderColor}`,class:"u-input",type:"text",style:i([{textAlign:y.inputAlign,color:y.color,backgroundColor:y.bgColor},y.inputStyle])},null,8,["onBlur","value","onConfirm","onInput","disabled","onFocus","focus","maxlength","placeholder","placeholder-style","style"]),b.keyword&&y.clearabled&&b.focused?(a(),l(C,{key:0,class:"u-close-wrap",onClick:w.clear},{default:o((()=>[s(x,{class:"u-clear-icon",name:"close-circle-fill",size:"34",color:"#c0c4cc"})])),_:1},8,["onClick"])):r("",!0)])),_:1},8,["style"]),s(C,{style:i([y.actionStyle]),class:n(["u-action",[w.showActionBtn||b.show?"u-action-active":""]]),onClick:c(w.custom,["stop","prevent"])},{default:o((()=>[u(d(y.actionText),1)])),_:1},8,["style","class","onClick"])])),_:1},8,["onClick","style"])}],["__scopeId","data-v-b7fa3def"]]);const j=C({data:()=>({infos:{},loading:!1,keyword:"",data:[]}),methods:{initData(){const e=this;uni.getStorage({key:"infos",success:function(t){(null==t?void 0:t.data)&&(e.infos=(null==t?void 0:t.data)??{},e.getListData())}})},getListData(){this.loading=!0,$(I.getPlayDetailList,{friendUserId:this.keyword||`${this.infos.openid}`},"post").then((e=>{var t,a;const l=null==(a=null==(t=null==e?void 0:e.data)?void 0:t.list)?void 0:a.map((e=>({img:e.heroPicUrl,name:e.heroName,isWin:1===e.gameResult,score:e.gradeGame,num1:e.killCnt,num2:e.deadCnt,num3:e.assistCnt,time:e.dtEventTime})));this.data=l??[]})).finally((()=>{this.loading=!1}))},handleSearch(){this.getListData()}},onShow(){this.initData()}},[["render",function(e,i,r,c,p,C){const $=k(t("u-search"),B),I=h,j=k(t("u-sticky"),S),A=k(t("u-avatar"),_),D=x,V=f("u-list-item"),F=f("u-list"),T=k(t("u-empty"),v);return a(),l(I,{class:"record-list-page"},{default:o((()=>[s(j,{"bg-color":"rgb(25 46 69)","z-index":"22"},{default:o((()=>[s(I,{class:"u-p-30 search-box"},{default:o((()=>[s($,{placeholder:"请输入营地ID",color:"#fff",modelValue:p.keyword,"onUpdate:modelValue":i[0]||(i[0]=e=>p.keyword=e),"bg-color":"#1a2234","action-style":"color:#fff",onSearch:C.handleSearch,onCustom:C.handleSearch},null,8,["modelValue","onSearch","onCustom"])])),_:1})])),_:1}),s(I,{class:"u-p-30"},{default:o((()=>[s(F,{onScrolltolower:e.scrolltolower},{default:o((()=>[(a(!0),m(g,null,y(p.data,((e,t)=>(a(),l(V,{key:t},{default:o((()=>[s(I,{class:"list-item u-flex"},{default:o((()=>[s(I,{class:"u-flex u-flex-3"},{default:o((()=>[s(I,{class:"u-flex-0 u-flex item-center",style:{flex:"none"}},{default:o((()=>[s(A,{slot:"icon",mode:"square",size:"80",src:e.img,customStyle:"margin: -3px 5px -3px 0"},null,8,["src"]),s(D,{class:"u-p-l-10"},{default:o((()=>[u(d(e.name),1)])),_:2},1024)])),_:2},1024),s(I,{class:n(["u-flex-1",e.isWin?"u-type-primary":"u-type-error"])},{default:o((()=>[u(d(e.isWin?"胜利":"失败"),1)])),_:2},1032,["class"]),s(I,{class:"u-flex-1"},{default:o((()=>[s(D,{class:"u-type-warning text-special"},{default:o((()=>[u(d(e.score),1)])),_:2},1024),u("分 ")])),_:2},1024),s(I,{class:"u-flex-1 u-tips-color"},{default:o((()=>[s(D,{class:"u-type-primary text-special"},{default:o((()=>[u(d(e.num1),1)])),_:2},1024),u("/"),s(D,{class:"u-type-error text-special"},{default:o((()=>[u(d(e.num2),1)])),_:2},1024),u("/"),s(D,{class:"u-type-success text-special"},{default:o((()=>[u(d(e.num3),1)])),_:2},1024)])),_:2},1024)])),_:2},1024),s(I,{class:"u-flex-1 u-tips-color"},{default:o((()=>[u(d(e.time),1)])),_:2},1024)])),_:2},1024)])),_:2},1024)))),128))])),_:1},8,["onScrolltolower"]),b(s(T,{class:"u-m-t-60",mode:"data",icon:"http://cdn.uviewui.com/uview/empty/car.png"},null,512),[[w,!p.data.length]])])),_:1})])),_:1})}],["__scopeId","data-v-5c52ad8e"]]);export{j as default};
