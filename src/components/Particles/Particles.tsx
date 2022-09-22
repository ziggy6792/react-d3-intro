import { useEffect } from 'react';
import * as d3 from 'd3';

interface IParticlesProps {}

const Particles: React.FC<IParticlesProps> = (props) => {
  useEffect(() => {
    var width = Math.max(960, innerWidth),
      height = Math.max(500, innerHeight);

    var i = 0;

    var svg = d3.select('body').append('svg').attr('width', width).attr('height', height);

    svg
      .append('rect')
      .attr('width', width)
      .attr('height', height)
      .on('ontouchstart' in document ? 'touchmove' : 'mousemove', particle);

    function particle(event) {
      var m = d3.pointer(event);

      svg
        .insert('circle', 'rect')
        .attr('cx', m[0])
        .attr('cy', m[1])
        .attr('r', 1e-6)
        // .style("stroke", d3.hsl((i = (i + 1) % 360), 1, .5))
        .style('stroke', 'red')

        .style('stroke-opacity', 1)
        .transition()
        .duration(2000)
        .ease(Math.sqrt)
        .attr('r', 100)
        .style('stroke-opacity', 1e-6)
        .remove();

      event.preventDefault();
    }
  });

  return <div>hi</div>;
};

export default Particles;
