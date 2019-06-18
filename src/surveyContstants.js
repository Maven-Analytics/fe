import {fromJS, Map} from 'immutable';

export const SurveyQuestions = fromJS([
  {
    text: 'On a scale of 1-10, how interested are you in mastering the following tools?	',
    answers: [
      {id: '1a', text: 'Excel Formulas & Functions'},
      {id: '1b', text: 'Pivot Tables & Pivot Charts'},
      {id: '1c', text: 'Excel Charts & Graphs'},
      {id: '1d', text: 'Power Query & Power Pivot'},
      {id: '1e', text: 'Microsoft Power BI'},
      {id: '1f', text: 'Data Analysis Expressions (DAX)'},
      {id: '1g', text: 'MySQL'},
      {id: '1h', text: 'Visual Basic (VBA) for Excel'}
    ]
  },
  {
    text: 'On a scale of 1-10, how interested are you in developing the following skills?',
    answers: [
      {id: '2a', text: 'General Productivity', note: '(Efficiently managing and manipulating information stored in spreadsheets)'},
      {id: '2b', text: 'Data Analysis', note: '(Exploring and analyzing raw data to expose meaningful insights and trends)'},
      {id: '2c', text: 'Data Visualization', note: '(Using charts, graphs, and custom dashboards to bring your data to life)'},
      {id: '2d', text: 'Database Design & Modeling', note: '(Building and analyzing relational data models from multiple sources)'}
    ]
  },
  {
    text: 'On a scale of 1-10, how often do you perform (or expect to perform) the following types of tasks?',
    answers: [
      {id: '3a', text: 'Exploring and analyzing relatively small datasets (<1mm rows)'},
      {id: '3b', text: 'Exploring and analyzing large tables (>1mm rows), data models or databases'},
      {id: '3c', text: 'Creating charts or graphs for use in presentations or reports'},
      {id: '3d', text: 'Prepping or maintaining data stored in spreadsheets'},
      {id: '3e', text: 'Developing reports or dashboards to integrate multiple sources of data'},
      {id: '3f', text: 'Managing or administering reports for clients or internal teams'},
      {id: '3g', text: 'Building custom, spreadsheet-based forecasts, tools, or reports'}
    ]
  },
  {
    text: 'Last but not least, which of the following goals can we help you achieve? (multi-select)',
    isMultiSelect: true,
    answers: [
      {id: '4a', text: 'Strengthen and expand my skill set'},
      {id: '4b', text: 'Increase productivity and become more valuable in my role'},
      {id: '4c', text: 'Earn a promotion or land a new job'},
      {id: '4d', text: 'Start a new business or personal project'},
      {id: '4e', text: 'I have another goal in mind', hasAddon: true}
    ]
  }
]);

export const PathMappings = fromJS({
  // Excel Master
  '5zIjquxoY1dZd6VBr6acMc': ['1a', '1b', '1c', '1d', '1h', '2a', '2b', '2d', '3a', '3b', '3c', '3e', '3g'],
  // Excel Specialist
  '1QUR8rdENS66YvUT10Cmzr': ['1a', '1b', '1c', '2a', '2b', '2c', '3a', '3c', '3d', '3g'],
  // Data Visualization
  '2wuKJAP6uHm0bORm57Vktu': ['1c', '2c', '3a', '3c', '3g'],
  // BI Analyst
  '1BcqY8yWvxVypYaAsPT2d3': ['1b', '1d', '1e', '1f', '1g', '2b', '2d', '3b', '3e', '3f'],
  // Power BI Specialist
  '3rdFZV7FvTW7xrYOmhQdXL': ['1d', '1e', '1f', '2b', '2d', '3b', '3e', '3f']
});

// Count each answer for each of the paths and multiply it by the maximum value
export const PathMappingTotals = PathMappings.map(p => p.count() * 10);

export const CourseMappings = fromJS({
  // Microsoft Excel: Formulas & Functions,
  '15zmpaevEdRHp1hTeswVOu': ['1a', '2a', '3a', '3d', '3g'],
  // Microsoft Excel: Charts & Graphs
  '2knpeDXkFdHz8cJ7DGXKbs': ['1c', '2a', '2c', '3a', '3c', '3g'],
  // Microsoft Excel: Pivot Tables & Pivot Charts
  '5wNOPBePhki9EKFCxsdriO': ['1b', '2a', '2b', '3a', '3g'],
  // Microsoft Excel: Power Query, Power Pivot & DAX
  '2BAO2FLUUoaWvkl5tlhLjn': ['1b', '1d', '1f', '2b', '2d', '3b', '3e'],
  // Excel Pro Tips: Productivity
  '49MnZCKlk87B2eN76JeVze': ['1a', '2a', '3a', '3d'],
  // Excel Pro Tips: Formatting
  '6tbYSRwgCu7W2ZQZUVs4iK': ['1c', '2a', '2c', '3c', '3d'],
  // Excel Pro Tips: Formulas
  '7TX0pQMraQmT7ygdvOA2f': ['1a', '2a', '2b', '3a', '3d', '3g'],
  // Excel Pro Tips: Data Visualization
  '4RxoRiBklddAhmtylz5J3v': ['1c', '2b', '2c', '3a', '3c'],
  // Excel Pro Tips: PivotTables
  'IEZlo5bQl7NNd7ogNPhI9': ['1b', '2b', '3a', '3e'], // eslint-disable-line quote-props
  // Excel Pro Tips: Analytics
  '2McdlQZZE3e06PEkqQ1Krj': ['1d', '2b', '2d', '3b', '3g'],
  // Microsoft Excel: VBA & Macros
  '6n1XAYPr2lhRINHWINfTon': ['1h', '2a', '3d', '3g'],
  // Microsoft Power BI: Up & Running with Power BI Desktop,
  '3zOwFCA3aBkPOANV5DxmZl': ['1d', '1e', '1f', '2b', '2c', '2d', '3b', '3c', '3e'],
  // Microsoft Power BI: Publishing to Power BI Service
  '205FN5BVSKzWteSPxocOxk': ['1d', '1e', '2b', '2c', '3b', '3e', '3f'],
  // MySQL for Data Analysis
  '4KnXuUga0siTQ81rYWLcsx': ['1g', '2b', '2d', '3b']
});

// Count each answer for each of the paths and multiply it by the maximum value
export const CourseMappingTotals = CourseMappings.map(p => p.count() * 10);

export const DEV_SURVEY_RESULTS = fromJS({
  '1a': 1,
  '1b': 3,
  '1c': 7,
  '1d': 2,
  '1e': 5,
  '1f': 1,
  '1g': 3,
  '1h': 5,
  '2a': 5,
  '2b': 4,
  '2c': 8,
  '2d': 2,
  '3a': 4,
  '3b': 3,
  '3c': 7,
  '3d': 4,
  '3e': 2,
  '3f': 1,
  '3g': 8
});
