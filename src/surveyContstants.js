import {fromJS} from 'immutable';

export const SurveyQuestions = fromJS([
  {
    id: 'question-1',
    text: 'On a scale of 1-10, how interested are you in mastering the following tools?	',
    answers: [
      {id: '1a', text: 'Excel Formulas & Functions'},
      {id: '1b', text: 'PivotTables & Pivot Charts'},
      {id: '1c', text: 'Excel Charts & Graphs'},
      {id: '1d', text: 'Power Query & Power Pivot'},
      {id: '1e', text: 'Microsoft Power BI'},
      {id: '1f', text: 'Data Analysis Expressions (DAX)'},
      {id: '1g', text: 'MySQL'},
      {id: '1h', text: 'Visual Basic (VBA)'}
    ]
  },
  {
    id: 'question-2',
    text: 'On a scale of 1-10, how interested are you in developing the following skills?',
    answers: [
      {
        id: '2a',
        text: 'General Productivity',
        className: 'has-note',
        note: '(Efficiently managing data and information stored in spreadsheets)',
        icon: 'productivity'
      },
      {
        id: '2b',
        text: 'Data Analysis',
        className: 'has-note',
        note: '(Exploring and analyzing raw data to expose insights and trends)',
        icon: 'analytics'
      },
      {
        id: '2c',
        text: 'Data Visualization',
        className: 'has-note',
        note: '(Using charts, graphs, and dashboards to bring data to life)',
        icon: 'visualisation'
      },
      {
        id: '2d',
        text: 'Database Design & Modeling',
        className: 'has-note',
        note: '(Building and analyzing relational models from multiple data sources)',
        icon: 'database'
      }
    ]
  },
  {
    id: 'question-3',
    text: 'On a scale of 1-10, how often do you perform (or expect to perform) the following types of tasks?',
    answers: [
      {id: '3a', text: 'Exploring & analyzing small datasets (<100,000 rows)'},
      {id: '3b', text: 'Exploring & analyzing large tables or databases'},
      {id: '3c', text: 'Creating charts and visuals for reports or dashboards'},
      {id: '3d', text: 'Blending & analyzing data across multiple sources'},
      {id: '3e', text: 'Managing or administering reports or databases'},
      {id: '3f', text: 'Building custom spreadsheet models or forecasts'}
    ]
  },
  {
    id: 'question-4',
    text: 'Last but not least, which of the following goals can we help you achieve? (multi-select)',
    isMultiSelect: true,
    answers: [
      {id: '4a', text: 'Strengthen and expand my skill set', type: 'checkbox'},
      {id: '4b', text: 'Increase productivity and become more valuable in my role', type: 'checkbox'},
      {id: '4c', text: 'Earn a promotion or land a new job', type: 'checkbox'},
      {id: '4d', text: 'Start a new business or personal project', type: 'checkbox'},
      {id: '4e', text: 'I have another goal in mind', type: 'checkbox'},
      {id: '4e_1', text: 'What is your goal?', condition: '4e', type: 'text'}
    ]
  }
]);

export const PathMappings = fromJS({
  // Excel Master
  '5zIjquxoY1dZd6VBr6acMc': ['1a', '1b', '1c', '1d', '1f', '1h', '2a', '2b', '2d', '3a', '3b', '3c', '3d', '3f'],
  // Excel Specialist
  '1QUR8rdENS66YvUT10Cmzr': ['1a', '1b', '1c', '2a', '2b', '2c', '3a', '3c', '3f'],
  // Data Visualization
  '2wuKJAP6uHm0bORm57Vktu': ['1c', '2c', '3a', '3c', '3f'],
  // BI Analyst
  '1BcqY8yWvxVypYaAsPT2d3': ['1b', '1d', '1e', '1f', '1g', '2b', '2d', '3b', '3d', '3e'],
  // MySQL Specialist
  '73qPugrw5qAVHo0SSyydsf': ['1g', '2b', '2d', '3a', '3b', '3e'],
  // Power BI Specialist
  '3rdFZV7FvTW7xrYOmhQdXL': ['1d', '1e', '1f', '2b', '2d', '3b', '3d', '3e']
});

// Count each answer for each of the paths and multiply it by the maximum value
export const PathMappingTotals = PathMappings.map(p => p.count() * 10);

export const CourseMappings = fromJS({
  // Microsoft Excel: Formulas & Functions,
  '15zmpaevEdRHp1hTeswVOu': ['1a', '2a', '2b', '3a', '3f'],
  // Microsoft Excel: Charts & Graphs
  '2knpeDXkFdHz8cJ7DGXKbs': ['1c', '2a', '2c', '3a', '3c', '3f'],
  // Microsoft Excel: Pivot Tables & Pivot Charts
  '5wNOPBePhki9EKFCxsdriO': ['1b', '2a', '2b', '3a', '3f'],
  // Microsoft Excel: Power Query, Power Pivot & DAX
  '2BAO2FLUUoaWvkl5tlhLjn': ['1b', '1d', '1f', '2b', '2d', '3b', '3d'],
  // Excel Pro Tips: Productivity
  '49MnZCKlk87B2eN76JeVze': ['1a', '2a', '3a', '3f'],
  // Excel Pro Tips: Formatting
  '6tbYSRwgCu7W2ZQZUVs4iK': ['1c', '2a', '2c', '3c', '3f'],
  // Excel Pro Tips: Formulas
  '7TX0pQMraQmT7ygdvOA2f': ['1a', '2a', '2b', '3a', '3f'],
  // Excel Pro Tips: Data Visualization
  '4RxoRiBklddAhmtylz5J3v': ['1c', '2b', '2c', '3a', '3c'],
  // Excel Pro Tips: PivotTables
  IEZlo5bQl7NNd7ogNPhI9: ['1b', '2b', '3e'], // eslint-disable-line quote-props
  // Excel Pro Tips: Analytics
  '2McdlQZZE3e06PEkqQ1Krj': ['1d', '2b', '2d', '3b', '3f'],
  // Microsoft Excel: VBA & Macros
  '6n1XAYPr2lhRINHWINfTon': ['1h', '2a', '3f'],
  // Microsoft Power BI: Up & Running with Power BI Desktop,
  '3zOwFCA3aBkPOANV5DxmZl': ['1d', '1e', '1f', '2b', '2c', '2d', '3b', '3c', '3d'],
  // Microsoft Power BI: Publishing to Power BI Service
  '205FN5BVSKzWteSPxocOxk': ['1d', '1e', '2b', '2c', '3b', '3d', '3e'],
  // MySQL for Data Analysis
  '4KnXuUga0siTQ81rYWLcsx': ['1g', '2b', '2d', '3b'],
  // Advanced MySQL for Data Analysis
  '399GpujXI2dtopCfRO6G1w': ['1g', '2b', '2d', '3b'],
  // MySQL Database Administration
  '1mMyKNU1nNQsTK586TTlzH': ['1g', '2d', '3b', '3e']
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
