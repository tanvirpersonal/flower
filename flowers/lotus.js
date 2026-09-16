// Radiant Lotus — isolated flower module
// Exports a builder that can be mounted into the future bouquet scene.
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

export function createLotus(options = {}) {
  const group = new THREE.Group();
  const N = options.petals ?? 180;
  const goldenAngle = 2.39996323;

  const makePetal = (length, width, bend, colorA, colorB) => {
    const uSegs = 25, vSegs = 10, pos = [], cols = [], idx = [];
    const a = new THREE.Color(colorA), b = new THREE.Color(colorB), c = new THREE.Color();
    for (let i=0;i<=uSegs;i++) {
      const u=i/uSegs; c.copy(a).lerp(b,Math.pow(u,.6));
      for (let j=0;j<=vSegs;j++) {
        const v=j/vSegs*2-1;
        let w=Math.sin(u*Math.PI)*(1-.2*u);
        if(u<.1) w=(u/.1)*Math.sin(.1*Math.PI);
        pos.push(width*v*w,length*u,bend*Math.pow(u,1.8)-.15*v*v*u);
        cols.push(c.r,c.g,c.b);
      }
    }
    for(let i=0;i<uSegs;i++) for(let j=0;j<vSegs;j++) {
      const x=i*(vSegs+1)+j,y=x+vSegs+1;
      idx.push(x,y,x+1,y,y+1,x+1);
    }
    const geo=new THREE.BufferGeometry();
    geo.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));
    geo.setAttribute('color',new THREE.Float32BufferAttribute(cols,3));
    geo.setIndex(idx); geo.computeVertexNormals();
    return geo;
  };

  const mat=new THREE.MeshPhysicalMaterial({vertexColors:true,roughness:.3,metalness:.1,clearcoat:.5,side:THREE.DoubleSide,transparent:true,opacity:.92});
  const center=new THREE.Color(0xffe259), mid=new THREE.Color(0xff007f), edge=new THREE.Color(0x3a0ca3);
  for(let n=1;n<=N;n++){
    const radius=.18*Math.sqrt(n), theta=n*goldenAngle, t=n/N;
    const c1=center.clone().lerp(mid,t*1.5).getHex();
    const c2=mid.clone().lerp(edge,t).getHex();
    const petal=new THREE.Mesh(makePetal(.6+radius*.45,.25+radius*.08,.3+radius*.2,c1,c2),mat);
    petal.position.z=radius;
    petal.rotation.x=(Math.PI/2)*(1-Math.exp(-radius*.6));
    const wrapper=new THREE.Group(); wrapper.rotation.y=-theta; wrapper.add(petal); group.add(wrapper);
  }
  group.add(new THREE.Mesh(new THREE.SphereGeometry(.25,24,12),new THREE.MeshBasicMaterial({color:0xffddaa})));
  return group;
}
