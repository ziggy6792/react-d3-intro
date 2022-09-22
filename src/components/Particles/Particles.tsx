/* eslint-disable no-restricted-globals */
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

import './particles.css';
import { TSelection } from 'src/d3Types';

// eslint-disable-next-line arrow-body-style
export const Particles: React.FC = (props) => {
  const [svg, setSvg] = useState<null | TSelection>(null);

  const svgRef = useRef<null | SVGSVGElement>(null);

  useEffect(() => {
    if (!svg) {
      setSvg(d3.select(svgRef.current));
      return;
    }

    const width = Math.max(960, innerWidth);
    const height = Math.max(500, innerHeight);

    let i = 0;

    svg.attr('width', width).attr('height', height);

    svg
      .append('rect')
      .attr('width', width)
      .attr('height', height)
      .on('ontouchstart' in document ? 'touchmove' : 'mousemove', particle);

    function particle(event) {
      const m = d3.pointer(event);

      svg
        .insert('circle', 'rect')
        .attr('cx', m[0])
        .attr('cy', m[1])
        .attr('r', 1e-6)
        .style('stroke', d3.hsl((i = (i + 1) % 360), 1, 0.5).toString())
        .style('stroke-opacity', 1)
        .transition()
        .duration(2000)
        .ease(Math.sqrt)
        .attr('r', 100)
        .style('stroke-opacity', 1e-6)
        .remove();

      event.preventDefault();
    }
  }, [svg]);

  return <svg ref={svgRef} />;
};
