function translasi(m, dx, dy, dz){
   //translasi
   m[12] = m[12] + dx;
   m[13] = m[13] + dy;
   m[14] = m[14] + dz;
}

function skalasi(m){
   var Sx = 0.999, Sy = 0.999, Sz = 1.0;

   m[0] = m[0] * Sx;
   m[5] = m[5] * Sy;
   m[10] = m[10] * Sz;
}

function shear(gl, program){
   var angle = 45;
   var cota = 1/Math.tan(angle);
   var matriksShear = new Float32Array([
   1.0,   cota,  0.0,  0.0,
   0.0,  1.0,   0.0,  0.0,
   0.0,  0.0,  1.0,   0.0,
   0.0,  0.0,  0.0,  1.0  
   ]);

   var uMatrix = gl.getUniformLocation(program, 'uMatrix');
   gl.uniformMatrix4fv(uMatrix, false, matriksShear);
}

/*function rotasi(gl, program){
   var angle = 45;
   var ca = Math.cos(angle);
   var sa = Math.sin(angle);
   var matriksRotasi = new Float32Array([
       ca, -sa, 0.0, 0.0,
       sa, ca, 0.0, 0.0,
       0.0, 0.0, 1.0, 0.0, 
       0.0, 0.0, 0.0, 1.0
   ]);
   var uFormMatriks = gl.getUniformLocation(program, 'uFormMatriks');
   gl.uniformMatrix4fv(uFormMatriks, false, matriksRotasi);
}*/

function rotasiY(m, angle) {
   var c = Math.cos(angle);
   var s = Math.sin(angle);
   var mv0 = m[0], mv8 = m[8];

   // Matriks rotasi sekitar sumbu y (rotasi ke kanan)
   m[0] = c * mv0 - s * mv8;
   m[8] = s * mv0 + c * mv8;
}

function getprojection(angle, a, zMin, zMax) {
   var ang = Math.tan((angle*.5)*Math.PI/180);//angle*.5
   return [
      0.5/ang, 0 , 0, 0,
      0, 0.5*a/ang, 0, 0,
      0, 0, -(zMax+zMin)/(zMax-zMin), -1,
      0, 0, (-2*zMax*zMin)/(zMax-zMin), 0
   ];
}