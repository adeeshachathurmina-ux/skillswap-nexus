import { describe, expect, it } from 'vitest';
import { reciprocalMatchScore } from './matching';

describe('reciprocalMatchScore', () => {
  it('rewards reciprocal skill overlap', () => {
    const score = reciprocalMatchScore(
      { teach: ['React'], learn: ['Figma'], languages: ['English'] },
      { teach: ['Figma'], learn: ['React'], languages: ['English'] },
    );
    expect(score).toBe(90);
  });

  it('is transparent and bounded when there is no overlap', () => {
    const score = reciprocalMatchScore({ teach: ['Cooking'], learn: ['French'] }, { teach: ['Python'], learn: ['Guitar'] });
    expect(score).toBe(0);
  });
});
