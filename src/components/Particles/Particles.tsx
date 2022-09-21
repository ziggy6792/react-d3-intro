/* eslint-disable no-restricted-globals */
import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { makeStyles } from 'src/makeStyles';
import { TSelection } from 'src/d3Types';

const useStyles = makeStyles()(() => ({
  root: {
    '& rect': {
      fill: 'none',
      pointerEvents: 'all',
    },
    '& circle': {
      fill: 'none',
      strokeWidth: '2.5px',
    },
  },
}));

const Particles: React.FC = (props) => {
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

    const rect = svg.select('rect');

    rect.on('ontouchstart' in document ? 'touchmove' : 'mousemove', particle);

    function particle(event) {
      const m = d3.pointer(event);

      svg
        .insert('circle', 'rect')
        .attr('cx', m[0])
        .attr('cy', m[1])
        .attr('r', 1e-6)
        .style('stroke', d3.hsl((i = (i + 1) % 360), 1, 0.5) as any)
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

  return (
    <svg ref={svgRef} className={classes.root}>
      <rect width={width} height={height}></rect>
    </svg>
  );
};

export default Particles;
