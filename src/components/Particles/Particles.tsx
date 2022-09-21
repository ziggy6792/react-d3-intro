import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { makeStyles } from 'src/makeStyles';
import { TSelection } from 'src/d3Types';
import useResizeObserver from 'src/hooks/useResizeObserver';

interface IParticlesProps {}

const useStyles = makeStyles()(() => ({
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

const Particles: React.FC<IParticlesProps> = (props) => {
  const { classes } = useStyles();

  const [svg, setSvg] = useState<null | TSelection>(null);

  const svgRef = useRef<null | SVGSVGElement>(null);

  const wrapperRef = useRef<null | HTMLDivElement>();

  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    if (!svg) {
      setSvg(d3.select(svgRef.current));
      return;
    }

    let i = 0;

    const rect = svg.select('rect');

    rect.on('ontouchstart' in document ? 'touchmove' : 'mousemove', particle);

    const circleContainer = svg.select(`.${classes.circleContainer}`);

    function particle(event) {
      let m = d3.pointer(event);

      circleContainer
        .append('circle')
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
  }, [svg, dimensions, classes]);

  return (
    <div ref={wrapperRef} style={{ width: '100%', height: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', height: '100%' }}>
        <rect width={dimensions?.width} height={dimensions?.height} className={classes.rect}></rect>
        <g className={classes.circleContainer}></g>
      </svg>
    </div>
  );
};

export default Particles;
