// Mathematical Rose — isolated flower module
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

export function createRose(options = {}) {
  const group=new THREE.Group();
  const layers=options.layers ?? 6;
  const makePetal=(offset,scale,layer)=>{
    const Nu=100,Nv=14,pos=[],idx=[];
    const X=t=>1-.5*Math.pow((5/4)*(1-(t%(2*Math.PI))/Math.PI)**2-.25,2);
    const phi=t=>Math.PI/2*Math.exp(-t/(8*Math.PI));
    for(let i=0;i<=Nu;i++){
      const u=i/Nu, th=u*2*Math.PI+offset, rhythm=Math.pow(Math.max(0,Math.cos(5*th)),2.2), base=.2+scale*(.42+.66*rhythm), bend=phi(u*2*Math.PI+layer*.35);
      for(let j=0;j<=Nv;j++){
        const v=j/Nv, across=v*2-1, width=.5*scale*Math.sin(Math.PI*v)*(.72+.28*rhythm), r=base*(.52+.48*v)+across*width*.12;
        const x=r*Math.sin(th),y=r*Math.cos(th); let z=.1+.48*scale*Math.pow(v,1.55)+.13*Math.sin(Math.PI*v)*rhythm;
        z+=.18*X(th)*(x*Math.cos(bend)-y*Math.sin(bend)); z+=layer*.055+.035*Math.sin(2*th+layer); pos.push(x,y,z);
      }
    }
    for(let i=0;i<Nu;i++) for(let j=0;j<Nv;j++){const a=i*(Nv+1)+j,b=a+Nv+1;idx.push(a,b,a+1,b,b+1,a+1)}
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setIndex(idx);g.computeVertexNormals();return g;
  };
  for(let layer=0;layer<layers;layer++){
    const n=5+layer;for(let k=0;k<n;k++){const offset=k/n*Math.PI*2+layer*.31,m=new THREE.Mesh(makePetal(offset,1.02-layer*.075,layer),new THREE.MeshPhysicalMaterial({color:new THREE.Color().setHSL(.94,.92,.48+layer*.015),roughness:.48,metalness:.04,side:THREE.DoubleSide,transparent:true,opacity:.94,clearcoat:.35}));m.rotation.z=offset*.15;group.add(m)}
  }
  return group;
}
