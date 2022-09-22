/* eslint-disable no-restricted-globals */
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { TSelection } from 'src/d3Types';
import { makeStyles } from 'src/makeStyles';

const useStyles = makeStyles()(() => ({
  root: {
    background: '#222',
  },
  rect: {
    fill: 'none',
    pointerEvents: 'all',
  },
  circleContainer: {
    '& circle': {
      fill: 'none',
      strokeWidth: '2.5px',
    },
  },
}));

// eslint-disable-next-line arrow-body-style
export const Particles: React.FC = (props) => {
  const { classes } = useStyles();

  const [svg, setSvg] = useState<null | TSelection>(null);

  const svgRef = useRef<null | SVGSVGElement>(null);

  const width = Math.max(960, innerWidth);
  const height = Math.max(500, innerHeight);

  useEffect(() => {
    if (!svg) {
      setSvg(d3.select(svgRef.current));
      return;
    }

    let i = 0;

    svg.attr('width', width).attr('height', height);

    svg.select(`.${classes.rect}`).on('ontouchstart' in document ? 'touchmove' : 'mousemove', particle);

    const circleContainer = svg.select(`.${classes.circleContainer}`);

    function particle(event) {
      const m = d3.pointer(event);

      circleContainer
        .append('circle')
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [svg]);

  return (
    <svg ref={svgRef} className={classes.root}>
      <g className={classes.circleContainer} />
      <rect width={width} height={height} className={classes.rect} />
    </svg>
  );
};
