import {select as $h3lrK$select} from "d3-selection";
import {scaleLinear as $h3lrK$scaleLinear} from "d3-scale";
import {extent as $h3lrK$extent} from "d3-array";
import {axisBottom as $h3lrK$axisBottom, axisLeft as $h3lrK$axisLeft} from "d3-axis";





/**
 * Created by Rick on 2022-04-18.
 */ 'use strict';
class $46f0a603822934e7$export$2e2bcd8739ae039 {
    /**
   * The width of the chart in pixels.
   * @type {number}
   */ width = 800;
    /**
   * The height of the chart in pixels.
   * @type {number}
   */ height = 650;
    /**
   * The left margin of the chart in pixels
   * @type {number}
   */ margin_left = 60;
    /**
   * The top margin of the table in pixels.
   * @type {number}
   */ margin_top = 30;
    /**
   * The bottom margin of the chart in pixels.
   * @type {number}
   */ margin_bottom = 50;
    /**
   * An array that sets the tics values for x axis
   * @type {number}
   */ /**
   * The table's title
   * @type {string}
   */ title = undefined;
    /**
   * The table's subtitle
   * @type {string}
   */ sub_title = undefined;
    /**
   * An array of string column headers
   * @type {string}
   */ x_tics = undefined;
    /**
   * The x axis label.
   * @type {string}
   */ x_label = '';
    /**
   * An array that sets the tics values for y axis
   * @type {number}
   */ y_tics = undefined;
    /**
   * The y axis label.
   * @type {string}
   */ y_label = '';
    /**
   * The color for labels
   * @type {string}
   */ label_color = 'black';
    /**
   * The radius of the plotted points
   * @type {number}
   */ point_radius = 5;
    /**
   * The fill color for the points
   * @type {string}
   */ point_fill = '#69b3a2';
    /**
   * The constructor for d3ScatterPlot
   * @param {string} chart_id The DOM element id where the chart will be located
   * @param {array} data An array of Objects
   * @param {string} x_var The name of the variable from the data array
   * @param {string} y_var The name of the variable from the data array
   */ constructor(chart_id, data, x_var, y_var){
        if (chart_id === undefined) throw new ReferenceError('chart_id argument must be defined.');
        else this.chart_id = chart_id;
        if (data === undefined) throw new ReferenceError('data argument must be defined.');
        else this.data = data;
        if (x_var === undefined) throw new ReferenceError('x_var argument must be defined.');
        else this.xAccessor = (d)=>+d[x_var]
        ;
        if (y_var === undefined) throw new ReferenceError('y_var argument must be defined.');
        else this.yAccessor = (d)=>+d[y_var]
        ;
        this.x_extent = $h3lrK$extent(this.data, this.xAccessor);
        this.y_extent = $h3lrK$extent(this.data, this.yAccessor);
    }
    draw() {
        const dimensions = {
            width: this.width,
            height: this.height,
            margin: {
                top: this.margin_top,
                bottom: this.margin_bottom,
                left: this.margin_left,
                right: 10
            }
        };
        const svg = $h3lrK$select('#' + this.chart_id).append('svg').attr('width', dimensions.width).attr('height', dimensions.height);
        let currrent_y = 0;
        if (this.title !== undefined) {
            currrent_y = currrent_y + 20;
            svg.append('text').attr('x', dimensions.width / 2).attr('y', currrent_y).text(this.title).style('text-anchor', 'middle').style('font-size', '28px').style('font-weight', 'bold');
        }
        if (this.sub_title !== undefined) {
            currrent_y = currrent_y + 25;
            svg.append('text').attr('x', dimensions.width / 2).attr('y', currrent_y).text(this.sub_title).style('text-anchor', 'middle').style('font-size', '20px').style('font-weight', 'bold');
        }
        dimensions.ctrWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
        dimensions.ctrHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom - currrent_y;
        const ctr = svg.append('g').attr('transform', `translate(${dimensions.margin.left}, ${currrent_y + dimensions.margin.top})`);
        // X axis: scale and draw
        let xScale;
        let xAxisGroup;
        if (this.x_tics === undefined) {
            xScale = $h3lrK$scaleLinear().domain(this.x_extent).rangeRound([
                0,
                dimensions.ctrWidth
            ]);
            xAxisGroup = ctr.append('g').call($h3lrK$axisBottom(xScale)).style('transform', `translateY(${dimensions.ctrHeight}px)`);
        } else {
            const idx = this.x_tics.length - 1;
            xScale = $h3lrK$scaleLinear().domain([
                this.x_tics[0],
                this.x_tics[idx]
            ]).rangeRound([
                0,
                dimensions.ctrWidth
            ]);
            const xAxis = $h3lrK$axisBottom(xScale).tickValues(this.x_tics);
            xAxisGroup = ctr.append('g').call(xAxis).style('transform', `translateY(${dimensions.ctrHeight}px)`);
        }
        xAxisGroup.append('text').attr('x', dimensions.ctrWidth / 2).attr('y', dimensions.margin.bottom - 10).attr('fill', this.label_color).text(this.x_label).style('font-size', '16px').style('font-weight', 'bold');
        // Y axis: scale and draw
        let yScale;
        let yAxisGroup;
        if (this.y_tics === undefined) {
            yScale = $h3lrK$scaleLinear().domain(this.y_extent).rangeRound([
                dimensions.ctrHeight,
                0
            ]);
            yAxisGroup = ctr.append('g').call($h3lrK$axisLeft(yScale));
        } else {
            const idx = this.y_tics.length - 1;
            yScale = $h3lrK$scaleLinear().domain([
                this.y_tics[0],
                this.y_tics[idx]
            ]).range([
                dimensions.ctrHeight,
                0
            ]);
            const yAxis = $h3lrK$axisLeft(yScale).tickValues(this.y_tics);
            yAxisGroup = ctr.append('g').call(yAxis);
        }
        yAxisGroup.append('text').attr('x', -dimensions.ctrHeight / 2).attr('y', -dimensions.margin.left + 15).attr('fill', this.label_color).text(this.y_label).style('transform', 'rotate(270deg)').style('text-anchor', 'middle').style('font-size', '16px').style('font-weight', 'bold');
        // Draw circles
        ctr.selectAll('circle').data(this.data).join('circle').attr('cx', (d)=>xScale(this.xAccessor(d))
        ).attr('cy', (d)=>yScale(this.yAccessor(d))
        ).attr('r', this.point_radius).attr('fill', this.point_fill);
        return {
            'data_extent_x': this.x_extent,
            'data_extent_y': this.y_extent
        };
    }
}


export {$46f0a603822934e7$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=d3ScatterPlot_min.js.map
