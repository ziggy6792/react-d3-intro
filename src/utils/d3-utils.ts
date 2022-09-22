import * as d3 from 'd3';

export const easeInterpolate = (ease) =>
  function (a, b) {
    const i = d3.interpolate(a, b);
    return function (t) {
      return i(ease(t));
    };
  };
