import {Map, List} from 'immutable';

import {PathMappings, CourseMappings, CourseMappingTotals, PathMappingTotals} from '../surveyContstants';

export function getRecommendedScores(results, initial, data) {
  if (!results || !Map.isMap(results)) {
    return Map();
  }

  return results.reduce((recommendedObjects, score, answerId) => {
    return data.reduce((recommendedObjects, path, key) => {
      if (path.find(a => a === answerId)) {
        return recommendedObjects.update(key, u => u + score);
      }

      return recommendedObjects;
    }, recommendedObjects);
  }, initial)
    .filter(ro => ro);
}

export function getRecommendedPaths(results) {
  return getRecommendedScores(results, PathMappings.map(() => 0), PathMappings);
}

export function getRecommendedCourses(results) {
  return getRecommendedScores(results, CourseMappings.map(() => 0), CourseMappings);
}

export function getPercentages(results, totals, weights = Map()) {
  return results.map((score, key) => {
    const total = totals.get(key);
    const weight = weights.get(key) || 0;
    const percentage = Math.round(((score / total) + weight) * 1000) / 1000;

    return percentage < 1 ? parseFloat(percentage) : 1;
  });
}

export function getCoursePercentages(results) {
  return getPercentages(results, CourseMappingTotals);
}

export function getPathPercentages(results, weights = Map()) {
  return getPercentages(results, PathMappingTotals, weights);
}

export function getAdjustedPercentages(results, totals, weights = Map()) {
  const percentages = getPercentages(results, totals, weights);
  const highest = percentages.sort((v1, v2) => v2 - v1).first();
  let diff = 1 - highest;

  if (diff < 0) {
    diff = 0;
  }

  return percentages.map(p => p + diff);
}

export function getAdjustedCoursePercentages(results) {
  return getAdjustedPercentages(results, CourseMappingTotals);
}

export function getAdjustedPathPercentages(results, weights = Map()) {
  return getAdjustedPercentages(results, PathMappingTotals, weights);
}

export function sortResults(results) {
  if (!results) {
    return List();
  }

  return results
    .sort((value1, value2) => value2 - value1)
    .reduce((list, score, id) => list.push(id), List());
}

export function getInitialAnswers(questions, initialValue = 0) {
  return questions.reduce((map, question) => {
    question.get('answers').forEach(a => {
      map = map.set(a.get('id'), initialValue);
    });

    return map;
  }, Map());
}
