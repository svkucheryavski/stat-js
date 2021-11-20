/******************************************************************
 *  Tests for functions for theoretical distributions             *
 ******************************************************************/

// import of functions to test
import {runif, dunif, punif, rnorm, dnorm, pnorm, dt, pt, df, pf} from '../src/index.js';

// import dependencies
import {seq, sum, sd, mean, min, max} from '../src/index.js';
import {default as chai} from 'chai';

const should = chai.should();
const expect = chai.expect;


describe('Tests for theoretical distribution functions.', function () {

   it('runif() works correctly (n = 1 000 000).', function () {
      const n = 1000000;
      const r1 = runif(n);

      expect(r1).to.have.lengthOf(n)
      expect(min(r1)).to.be.above(0);
      expect(max(r1)).to.be.below(1);

      const r2 = runif(n, 10, 20);
      expect(r2).to.have.lengthOf(n)
      expect(min(r2)).to.be.above(10);
      expect(max(r2)).to.be.below(20);
   });

   it('rnorm() works correctly (n = 1 000 000).', function () {
      const n = 1000000;
      const r1 = rnorm(n);
      expect(r1).to.have.lengthOf(n)
      sd(r1).should.be.closeTo(1, 0.01);
      mean(r1).should.be.closeTo(0, 0.01);
      min(r1).should.be.above(-6);
      max(r1).should.be.below(6);
   });

   it('dnorm() works correctly (n = 1 000 000).', function () {
      const n = 1000000;

      // standardized distribution for ± 3 sigma
      const x1 = seq(-3, 3, n);
      const d1 = dnorm(x1);
      expect(d1).to.have.lengthOf(n);
      d1[0].should.be.closeTo(0.004431848, 0.00000001);
      d1[n-1].should.be.closeTo(0.004431848, 0.00000001);
      d1[n/2].should.be.closeTo(0.3989423, 0.0000001);

      // distribution with mu = 10 and sigma = 10, for ± 3 sigma
      const mu = 10;
      const sigma = 10
      const x2 = seq(mu - 3 * sigma, mu + 3 * sigma, n);
      const d2 = dnorm(x2, mu, sigma);
      expect(d2).to.have.lengthOf(n);
      d2[0].should.be.closeTo(0.0004431848, 0.00000001);
      d2[n-1].should.be.closeTo(0.0004431848, 0.00000001);
      d2[n/2].should.be.closeTo(0.03989423, 0.0000001);

      // distribution with mu = 10 and sigma = 10, for ± 6 sigma should have area of one
      const x3 = seq(mu - 6 * sigma, mu + 6 * sigma, n);
      const d3 = dnorm(x3, mu, sigma);
      expect(d3).to.have.lengthOf(n);
      (sum(d3) * 12 * sigma/n).should.be.closeTo(1.0, 0.00001);

      // if values are far from mean density is 0
      dnorm([mu - 6 * sigma], mu, sigma)[0].should.be.closeTo(0.0, 0.0000001);
      dnorm([mu + 6 * sigma], mu, sigma)[0].should.be.closeTo(0.0, 0.0000001);
   });


   it('dunif() works correctly (n = 1 000 000).', function () {
      const n = 1000000;

      // standardized distribution for a = 0, b = 1
      const x1 = seq(0, 1, n);
      const d1 = dunif(x1);

      expect(d1).to.have.lengthOf(n);
      d1[0].should.be.closeTo(1,   0.0000000001);
      d1[n-1].should.be.closeTo(1, 0.0000000001);
      d1[n/2].should.be.closeTo(1, 0.0000000001);

      // distribution with mu = 10 and sigma = 10, for ± 3 sigma
      const a = 10;
      const b = 100;
      const x2 = seq(a, b, n);
      const d2 = dunif(x2, a, b);

      expect(d2).to.have.lengthOf(n);
      d2[0].should.be.closeTo(1 / (b - a),   0.00000001);
      d2[n-1].should.be.closeTo(1 / (b - a), 0.00000001);
      d2[n/2].should.be.closeTo(1 / (b - a), 0.00000001);
      (sum(d2) * (b - a)/n).should.be.closeTo(1.0, 0.000001);

      dunif([a - 0.0000001], a, b)[0].should.be.closeTo(0.0, 0.0000001);
      dunif([b + 0.0000001], a, b)[0].should.be.closeTo(0.0, 0.0000001);
   });


   it('dt() works correctly (n = 100 000).', function () {
      const n = 100000;

      //  distribution for DoF = 1
      const x1 = seq(-5, 5, n);
      const d1 = dt(x1, 1);
      expect(d1).to.have.lengthOf(n);
      d1[0].should.be.closeTo(0.01224269, 0.00000001);
      d1[n-1].should.be.closeTo(0.01224269, 0.00000001);
      d1[n/2].should.be.closeTo(0.31830989, 0.0000001);

      //  distribution for DoF = 3
      const x2 = seq(-5, 5, n);
      const d2 = dt(x2, 3);
      expect(d2).to.have.lengthOf(n);
      d2[0].should.be.closeTo(0.004219354, 0.00000001);
      d2[n-1].should.be.closeTo(0.004219354, 0.00000001);
      d2[n/2].should.be.closeTo(0.3675526, 0.0000001);

      //  distribution for DoF = 30
      const x3 = seq(-3, 3, n);
      const d3 = dt(x3, 30);
      expect(d3).to.have.lengthOf(n);
      d3[0].should.be.closeTo(0.006779063, 0.00000001);
      d3[n-1].should.be.closeTo(0.006779063, 0.00000001);
      d3[n/2].should.be.closeTo(0.3956322, 0.0000001);
   });


   it('df() works correctly (n = 10 000).', function () {
      const n = 10000;

      //  distribution for DoF = 1, 2
      const F1 = seq(0.001, 10, n);
      const d1 = df(F1, 1, 2);
      expect(d1).to.have.lengthOf(n);
      d1[0].should.be.closeTo(11.17196, 0.001);
      d1[n-1].should.be.closeTo(0.007607258, 0.001);
      d1[n/2].should.be.closeTo(0.02414726, 0.001);

      //  distribution for DoF = 3, 10
      const F2 = seq(0.001, 10, n);
      const d2 = df(F2, 3, 10);
      expect(d2).to.have.lengthOf(n);
      d2[0].should.be.closeTo(0.07019374, 0.001);
      d2[n-1].should.be.closeTo(0.0008585295, 0.001);
      d2[n/2].should.be.closeTo(0.01288309, 0.001);

   });

   it('pnorm() works correctly (n = 1 000 000).', function () {
      const n = 1000000;

      // standardized distribution for ± 3 sigma
      const x1 = seq(-3, 3, n);
      const p1 = pnorm(x1);

      expect(p1).to.have.lengthOf(n);
      p1[  0].should.be.closeTo(0.00134996, 0.00001);
      p1[n-1].should.be.closeTo(0.998650, 0.00001);
      p1[n/2].should.be.closeTo(0.5, 0.00001);

     // distribution with mu = 10 and sigma = 10, for ± 3 sigma
      const mu = 10;
      const sigma = 10
      const x2 = seq(mu - 3 * sigma, mu + 3 * sigma, n);
      const p2 = pnorm(x2, mu, sigma);
      expect(p2).to.have.lengthOf(n);
      p2[  0].should.be.closeTo(0.001350, 0.000001);
      p2[n-1].should.be.closeTo(0.998650, 0.000001);
      p2[n/2].should.be.closeTo(0.5, 0.00001);

   });

   it('punif() works correctly (n = 1 000 000).', function () {
      const n = 1000000;

      // standardized distribution for a = 0, b = 1
      const x1 = seq(0, 1, n);
      const p1 = punif(x1);

      expect(p1).to.have.lengthOf(n);
      p1[0].should.be.closeTo(0, 0.00001);
      p1[n-1].should.be.closeTo(1, 0.00001);
      p1[n/2].should.be.closeTo(0.5, 0.00001);

      // outside the range
      punif([-1])[0].should.be.closeTo(0, 0.00001);
      punif([ 1])[0].should.be.closeTo(1, 0.00001);

      // distribution with mu = 10 and sigma = 10, for ± 3 sigma
      const a = 10;
      const b = 100;
      const x2 = seq(a, b, n);
      const p2 = punif(x2, a, b);

      expect(p2).to.have.lengthOf(n);
      punif([a - 10], a, b)[0].should.be.closeTo(0.0, 0.00001);
      punif([b + 10], a, b)[0].should.be.closeTo(1.0, 0.00001);
   });

   it('pt() works correctly (n = 10 000).', function () {
      const n = 10000;

      //  distribution for DoF = 1
      const t1 = seq(-5, 5, n);
      const p1 = pt(t1, 1);
      expect(p1).to.have.lengthOf(n);
      p1[0].should.be.closeTo(0.06283296, 0.001);
      p1[n-1].should.be.closeTo(0.937167, 0.001);
      p1[n/2].should.be.closeTo(0.5, 0.001);

      //  distribution for DoF = 3
      const t2 = seq(-5, 5, n);
      const p2 = pt(t2, 3);
      expect(p2).to.have.lengthOf(n);
      p2[0].should.be.closeTo(0.007696219, 0.001);
      p2[n-1].should.be.closeTo(0.9923038, 0.001);
      p2[n/2].should.be.closeTo(0.5, 0.001);

      //  distribution for DoF = 30
      const t3 = seq(-5, 5, n);
      const p3 = pt(t3, 30);
      expect(p3).to.have.lengthOf(n);
      p3[0].should.be.closeTo(0.00001164834, 0.001);
      p3[n-1].should.be.closeTo(0.9999884, 0.001);
      p3[n/2].should.be.closeTo(0.5, 0.001);

   });

   it('pf() works correctly (n = 10 000).', function () {
      const n = 10000;

      //  distribution for DoF = 1, 2
      const F1 = seq(0, 10, n);
      const p1 = pf(F1, 1, 2);
      expect(p1).to.have.lengthOf(n);
      p1[0].should.be.closeTo(0, 0.001);
      p1[n-1].should.be.closeTo(0.9128709, 0.001);
      p1[n/2].should.be.closeTo(0.8451543, 0.001);

      //  distribution for DoF = 3, 10
      const F2 = seq(0, 10, n);
      const p2 = pf(F2, 3, 10);
      expect(p2).to.have.lengthOf(n);
      p2[0].should.be.closeTo(0, 0.001);
      p2[n-1].should.be.closeTo(0.9976484, 0.001);
      p2[n/2].should.be.closeTo(0.9773861, 0.001);

   });

});

