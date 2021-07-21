import { describe, it } from 'mocha';
import { expect } from 'chai';
import getAverageScore from '../utilities/getAverageScore';

describe('average aggregation check', () => {
  it('should return the valid average score of modules studied in a course', () => {
    expect(getAverageScore(19.8, 3)).to.equal(6.6);
  });

  it('should return zero, if the totalModulesStudied is equal to 0', () => {
    expect(getAverageScore(19.8, 0)).to.equal(0);
  });
});
