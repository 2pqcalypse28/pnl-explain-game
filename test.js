var E=require('./engine.js'),TH=34.1214,bad=0,cnt={};
function chk(q){var p=q.p,x;switch(q.type){
case'ttfOut':x=p.n*p.days*24*p.dp;break;case'nbpOut':x=p.n*p.days*1000*p.dp/100;break;case'lotSize':x=p.n*p.days*24;break;
case'tSpread':x=p.n*(p.h1*p.a1-p.h2*p.a2);break;case'residual':x=p.n*(p.h1-p.h2)*p.a2;break;case'newTrade':x=p.v*(p.cl-p.tp);break;
case'conv':x=p.p*p.fx/TH*100;break;case'locSpread':var th=p.n*1000*p.d;x=th*p.dn/100-th/TH*p.dt*p.fx;break;
case'fxPnl':x=(p.m0+p.dm)*p.f1-p.m0*p.f0-p.dm*p.f1;break;case'rollDown':x=p.n*p.h*(p.nr-p.fr)*p.dd/p.tt;break;
case'multiLeg':case'priceAttr':x=p.L.reduce(function(s,l){return s+(l.nbp?l.v*l.dp/100:l.v*l.dp*p.fx);},0);break;
case'fullExplain':x=p.act-(p.vn*p.dn/100+p.vt*p.dt*p.fx1+p.m0*(p.fx1-p.fx0)+p.ntv*(p.ntc-p.ntp)*p.fx1+p.carry);break;
default:return q.correct>=0&&q.correct<q.choices.length&&new Set(q.choices).size===q.choices.length;}
return Math.abs(x-q.answer)<1e-6*Math.max(1,Math.abs(x))&&isFinite(x);}
E.LEVELS.forEach(function(l){E.GEN[l].forEach(function(g){for(var i=0;i<5000;i++){var q=g();cnt[q.type]=(cnt[q.type]||0)+1;if(!chk(q)){bad++;if(bad<5)console.log('FAIL',q.type,q.p,q.answer);}
 if(q.type==='residual'){var p=q.p;if(Math.abs(p.n*(p.h1*(p.a1-p.a2))+q.answer-(p.n*p.h1*p.a1-p.n*p.h2*p.a2))>1e-6)bad++;}}});});
console.log(cnt);console.log(bad?'FAILURES: '+bad:'ALL PASS');process.exit(bad?1:0);
