import expect from 'expect.js';
import {fromJS, List, Map} from 'immutable';

import * as surveyHelpers from '../../src/utils/surveyHelpers';
import {CourseMappingTotals, DEV_SURVEY_RESULTS as SurveyResults} from '../../src/surveyContstants';

describe('Survey Helpers', () => {
  describe('getRecommendedScores', () => {
    const zeroResults = SurveyResults.map(() => 0);

    it('Should not throw an error if passing in undefined', () => {
      const recommendedScores = surveyHelpers.getRecommendedScores();

      expect(recommendedScores.isEmpty()).to.be(true);
      expect(Map.isMap(recommendedScores)).to.be(true);
    });

    it('Should not throw an error if passing in a list', () => {
      const recommendedScores = surveyHelpers.getRecommendedScores(List());

      expect(recommendedScores.isEmpty()).to.be(true);
      expect(Map.isMap(recommendedScores)).to.be(true);
    });

    it('Should return an empty map if all scores are 0', () => {
      const recommendedScores = surveyHelpers.getRecommendedScores(zeroResults, Map(), Map());

      expect(recommendedScores.isEmpty()).to.be(true);
      expect(Map.isMap(recommendedScores)).to.be(true);
    });
  });
  describe('getRecommendedPaths', () => {
    it('Should return back the correct results', () => {
      const recommendedPaths = surveyHelpers.getRecommendedPaths(SurveyResults);

      expect(recommendedPaths.get('5zIjquxoY1dZd6VBr6acMc')).to.be(53);
      expect(recommendedPaths.get('1QUR8rdENS66YvUT10Cmzr')).to.be(51);
      expect(recommendedPaths.get('2wuKJAP6uHm0bORm57Vktu')).to.be(34);
      expect(recommendedPaths.get('1BcqY8yWvxVypYaAsPT2d3')).to.be(26);
      expect(recommendedPaths.get('3rdFZV7FvTW7xrYOmhQdXL')).to.be(20);
    });
  });

  describe('getRecommendedCourses', () => {
    it('Should return the correct results', () => {
      const recommendedCourses = surveyHelpers.getRecommendedCourses(SurveyResults);

      expect(recommendedCourses.get('15zmpaevEdRHp1hTeswVOu')).to.be(22);
      expect(recommendedCourses.get('2knpeDXkFdHz8cJ7DGXKbs')).to.be(39);
      expect(recommendedCourses.get('5wNOPBePhki9EKFCxsdriO')).to.be(24);
      expect(recommendedCourses.get('2BAO2FLUUoaWvkl5tlhLjn')).to.be(17);
      expect(recommendedCourses.get('49MnZCKlk87B2eN76JeVze')).to.be(14);
      expect(recommendedCourses.get('6tbYSRwgCu7W2ZQZUVs4iK')).to.be(31);
      expect(recommendedCourses.get('7TX0pQMraQmT7ygdvOA2f')).to.be(26);
      expect(recommendedCourses.get('4RxoRiBklddAhmtylz5J3v')).to.be(30);
      expect(recommendedCourses.get('IEZlo5bQl7NNd7ogNPhI9')).to.be(13);
      expect(recommendedCourses.get('2McdlQZZE3e06PEkqQ1Krj')).to.be(19);
      expect(recommendedCourses.get('6n1XAYPr2lhRINHWINfTon')).to.be(22);
      expect(recommendedCourses.get('3zOwFCA3aBkPOANV5DxmZl')).to.be(34);
      expect(recommendedCourses.get('205FN5BVSKzWteSPxocOxk')).to.be(25);
      expect(recommendedCourses.get('4KnXuUga0siTQ81rYWLcsx')).to.be(12);
    });
  });

  describe('sortResults', () => {
    it('Should return an empty list if passing in undefined', () => {
      const sorted = surveyHelpers.sortResults();

      expect(List.isList(sorted)).to.be(true);
      expect(sorted.isEmpty()).to.be(true);
    });

    it('Should sort the results', () => {
      const results = fromJS({
        path1: 2,
        path2: 10,
        path3: 4
      });

      const sorted = surveyHelpers.sortResults(results);

      expect(sorted.get(0)).to.be('path2');
      expect(sorted.get(1)).to.be('path3');
      expect(sorted.get(2)).to.be('path1');
    });
  });

  describe('getPercentage', () => {
    it('Should return the correct percentage', () => {
      const results = fromJS({
        path1: 2,
        path2: 10,
        path3: 4
      });

      const totals = fromJS({
        path1: 10,
        path2: 10,
        path3: 200
      });

      const percentages = surveyHelpers.getPercentages(results, totals);

      expect(percentages.get('path1')).to.be(0.2);
      expect(percentages.get('path2')).to.be(1);
      expect(percentages.get('path3')).to.be(0.02);
    });

    it('Should return the correct percentage', () => {
      const results = surveyHelpers.getRecommendedCourses(SurveyResults);
      const percentages = surveyHelpers.getPercentages(results, CourseMappingTotals);

      expect(percentages.get('15zmpaevEdRHp1hTeswVOu')).to.be(0.44);
      expect(percentages.get('2knpeDXkFdHz8cJ7DGXKbs')).to.be(0.65);
      expect(percentages.get('5wNOPBePhki9EKFCxsdriO')).to.be(0.48);
      expect(percentages.get('2BAO2FLUUoaWvkl5tlhLjn')).to.be(0.243);
      expect(percentages.get('49MnZCKlk87B2eN76JeVze')).to.be(0.35);
      expect(percentages.get('6tbYSRwgCu7W2ZQZUVs4iK')).to.be(0.62);
      expect(percentages.get('7TX0pQMraQmT7ygdvOA2f')).to.be(0.433);
    });

    it('Should return the correct percentage if one result is over 100%', () => {
      const results = fromJS({
        path1: 200,
        path2: 10,
        path3: 4
      });

      const totals = fromJS({
        path1: 10,
        path2: 10,
        path3: 200
      });

      const percentages = surveyHelpers.getPercentages(results, totals);

      expect(percentages.get('path1')).to.be(1);
      expect(percentages.get('path2')).to.be(1);
      expect(percentages.get('path3')).to.be(0.02);
    });

    it('Should return the correct percentages with a weight', () => {
      const results = fromJS({
        path1: 2,
        path2: 10,
        path3: 4
      });

      const totals = fromJS({
        path1: 10,
        path2: 20,
        path3: 200
      });

      const weights = fromJS({
        path1: 0.002,
        path2: 0.004,
        path3: 0.001
      });

      const percentages = surveyHelpers.getPercentages(results, totals, weights);

      expect(percentages.get('path1')).to.be(0.202);
      expect(percentages.get('path2')).to.be(0.504);
      expect(percentages.get('path3')).to.be(0.021);
    });
  });

  describe('getAdjustedPercent', () => {
    it('Should adjust to make the highest 100%', () => {
      const results = fromJS({
        path1: 2,
        path2: 10,
        path3: 4
      });

      const totals = fromJS({
        path1: 10,
        path2: 20,
        path3: 200
      });

      const adjustedPercentages = surveyHelpers.getAdjustedPercentages(results, totals);

      expect(adjustedPercentages.get('path1')).to.be(0.7);
      expect(adjustedPercentages.get('path2')).to.be(1);
      expect(adjustedPercentages.get('path3')).to.be(0.52);
    });

    it('Should adjust to make the highest 100% with weights', () => {
      const results = fromJS({
        path1: 2,
        path2: 10,
        path3: 4
      });

      const totals = fromJS({
        path1: 10,
        path2: 20,
        path3: 200
      });

      // Diff = .496

      const weights = fromJS({
        path1: 0.002,
        path2: 0.004,
        path3: 0.001
      });

      const adjustedPercentages = surveyHelpers.getAdjustedPercentages(results, totals, weights);

      expect(adjustedPercentages.get('path1')).to.be(0.698);
      expect(adjustedPercentages.get('path2')).to.be(1);
      expect(adjustedPercentages.get('path3')).to.be(0.517);
    });

    it('Should adjust to make the highest 100% with a result over 100%', () => {
      const results = fromJS({
        path1: 20,
        path2: 10,
        path3: 4
      });

      const totals = fromJS({
        path1: 10,
        path2: 20,
        path3: 200
      });

      const adjustedPercentages = surveyHelpers.getAdjustedPercentages(results, totals);

      expect(adjustedPercentages.get('path1')).to.be(1);
      expect(adjustedPercentages.get('path2')).to.be(0.5);
      expect(adjustedPercentages.get('path3')).to.be(0.02);
    });
  });
});
