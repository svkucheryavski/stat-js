# Javascript library for statistic analysis and data manipulations

A simple library for statistic analysis and manipulations with single vector values. The library is currently under development, breaking changes may occur in the coming versions.

## How to

```javascript
export {rnorm, mean, sd} from "stat-js";

// generate vector of n = 10 random numbers from N(µ = 5, σ = 2)
const x = rnorm(10, 5, 2);

// compute mean and standard deviation
const m = mean(x);
const s = sd(x);

// show both statistics
console.log([m, s]);
```

## List of functions

If nothing specific is written, then in all functions variables named `x` and `y` are expected to be vectors with numbers (`number[]`).

### Computing statistics

Following functions compute single statistic for one or two vectors.

* `min(x)` — smallest value in a vector.
* `max(x)` — largest value in a vector.
* `sum(x)` — sum of all values in a vector.
* `prod(x)` — product of all values in a vector.
* `mean(x)` — mean (average) value.
* `sd(x, biased = false)` — standard deviation.
* `skewness(x)` — skewness (measure of symmetry)
* `kurtosis(x)` — kurtosis (measure of tailedness)
* `cov(x, y)` — covariance between `x` and `y`.
* `cor(x, y, type = 'pearson')` — correlation between `x` and `y`.

Following functions compute and return either single statistic or a vector with statistics.

* `quantile(x, p)` — computes p-th quantile, `0 > p > 1`.
* `range(x)` — returns a vector with smallest (min) and largest (max) values.
* `mrange(x, margin)` — similar to `range()` but with margins on both sides of the interval.
* `split(x, n)` — splits a range of values from `x` into `n` equal intervals.
* `count(x, bins`) — counts how many values from `x` fall into bins defined by `bins`.
* `mids(x)` — returns a vector with middle points between the adjacent values from `x`.
* `diff(x)` — returns a vector with differences between the adjacent values from `x`.
* `getOutliers(x, Q1, Q3)` — finds outliers in `x` based on 1.5 IQR rule (like in boxplot).
* `ppoints(n)` — computes probability points for QQ plot.
* `rank(x)` — returns a vector with ranks of values from `x`.
* `cumsum(x)` — computes cumulative sum of a vector of values.
* `scale(x, center, scale)` — center and scale values from `x` (e.g. standardize).

## Manipulations with values

* `seq(a, b, n)` — creates a sequence of `n` values equally distanced in interval [a, b].
* `rep(x, n)` — replicates values in a vector `x` `n` times (`n` can be a vector).
* `sort(x, decreasing = false)` — sorts values in `x`.
* `subset(x, ind)` — returns a subset of `x`, defined by vector of indices `ind`.
* `shuffle(x)` — shuffles values in `x` using Fisher–Yates algorithm.
* `round(x, n)` — rounds `x` to `n` decimals.
* `expandGrid(...args)` — generates all combinations of vector values (full factorial design).

### Theoretical distributions

The package has support for several known theoretical distributions. Every distribution is represented by four functions `d*` for computing density, `p*` for computing probability, and `r*` for generating random numbers. The following distributions are supported:

#### Uniform distribution
* `dunif(x, a = 0, b = 1)` — `x` is a vector of values, `a` and `b` — distribution parameters.
* `punif(x, a = 0, b = 1)` — same parameters as for `dunif`
* `runif(n, a = 0, b = 1)` — `n` is a number of values to generate.

#### Normal distribution
* `dnorm(x, mean = 0, sd = 1)`
* `pnorm(x, mean = 0, sd = 1)`
* `rnorm(n, mean = 0, sd = 1)`

#### Student's t-distribution
* `dt(t, dof)`
* `pt(t, dof)`

#### F-distribution
* `df(F, d1, d2)`
* `pf(F, d1, d2)`

### Additional functions (helpers)

* `integrate(f, a, b)` — numeric integration of function `f` with limits `(a, b)`.
* `gamma(z)` — Lanczos approximation of the Gamma function.
* `beta(x, y)` — Beta function computed via approximation of Gamma function.
* `ibeta(x, a, b)` — Standardized incomplete Beta function (a.k.a. I<sub>x</sub>(a, b)).

