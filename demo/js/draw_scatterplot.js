/**
 * Created by Rick on 2022-04-18.
 */
'use strict';
import {csv} from 'd3-fetch'
import d3ScatterPlot from 'd3-scatterplot';

async function get_data(data_path){
  try {
    return await csv(data_path);
  }catch(err){
    console.log(err);
  }
}

get_data('Advertising.csv').then((data) => {
  const d3_scatterplot = new d3ScatterPlot(
    'chart',
    data,
    'TV',
    'sales'
  )
  d3_scatterplot.height = 700;
  d3_scatterplot.title = 'TV Advertising Expense vs Sales';
  d3_scatterplot.sub_title = 'Study date: January 20, 2012';
  d3_scatterplot.x_label = 'TV Advertising Expense';
  d3_scatterplot.y_label = 'Product Sales';
  d3_scatterplot.y_tics = [0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30];
  const data_info = d3_scatterplot.draw();
  console.log(data_info);
})
