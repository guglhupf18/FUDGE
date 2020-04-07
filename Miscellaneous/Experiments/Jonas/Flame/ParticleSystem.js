"use strict";
var Flame;
(function (Flame) {
    var f = FudgeCore;
    var fAid = FudgeAid;
    class ParticleSystem extends f.Node {
        constructor(_mesh, _material, _transform, _numberOfParticles, _speed, _a, _b, _c, _d, _scaleXMin, _scaleXMax) {
            super("Particles");
            this.randomNumbers = [];
            this.addComponent(new f.ComponentTransform());
            this.cmpTransform.local = _transform;
            this.speed = _speed;
            this.a = _a;
            this.b = _b;
            this.c = _c;
            this.d = _d;
            this.scaleXMax = _scaleXMax;
            this.scaleXMin = _scaleXMin;
            for (let i = 0; i < _numberOfParticles; i++) {
                this.addChild(this.createParticle(_mesh, _material));
            }
            this.particles = this.getChildrenByName("Particle");
            this.normNumberOfParticles = 1 / _numberOfParticles;
            for (let i = 0; i < 1000; i++) {
                this.randomNumbers.push(Math.random());
            }
        }
        update(_time) {
            let inNormTime = _time * this.speed % 1;
            for (let index = 0, length = this.particles.length; index < length; ++index) {
                let inParticle = index * this.normNumberOfParticles - this.normNumberOfParticles / 2;
                let inNormParticleTime = (inParticle + inNormTime) % 1;
                let x = this.scale(this.polynom4(1 - inNormParticleTime, this.a, this.b, this.c, this.d), this.randomNumberFrom(index, this.scaleXMin, this.scaleXMax));
                let y = inNormParticleTime;
                let z = 0;
                let translation = new f.Vector3(x, y, z);
                this.particles[index].mtxLocal.translation = translation;
            }
        }
        polynom4(_x, _a, _b, _c, _d) {
            return _a * Math.pow(_x, 3) + _b * Math.pow(_x, 2) + _c * _x + _d;
        }
        scale(_value, _by) {
            return _value * _by;
        }
        createParticle(_mesh, _material) {
            let node = new fAid.Node("Particle", f.Matrix4x4.IDENTITY(), _material, _mesh);
            node.getComponent(f.ComponentMesh).pivot.scale(new f.Vector3(0.05, 0.05, 0.05));
            return node;
        }
        randomNumberFrom(_index, _min, _max) {
            return this.randomNumbers[_index] * (_max - _min) + _min;
        }
    }
    Flame.ParticleSystem = ParticleSystem;
})(Flame || (Flame = {}));
//# sourceMappingURL=ParticleSystem.js.map