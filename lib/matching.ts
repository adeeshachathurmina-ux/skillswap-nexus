export type MatchProfile = {
  teach: string[];
  learn: string[];
  languages?: string[];
  city?: string | null;
  sessionType?: 'Online' | 'In-person' | 'Hybrid' | string | null;
};

function normalise(value: string) {
  return value.trim().toLowerCase();
}

function overlap(left: string[] = [], right: string[] = []) {
  const target = new Set(right.map(normalise));
  return left.filter((item) => target.has(normalise(item))).length;
}

export function reciprocalMatchScore(viewer: MatchProfile, candidate: MatchProfile) {
  const candidateTeachesViewerNeeds = overlap(viewer.learn, candidate.teach);
  const viewerTeachesCandidateNeeds = overlap(viewer.teach, candidate.learn);
  const learningScore = viewer.learn.length ? candidateTeachesViewerNeeds / viewer.learn.length : 0;
  const teachingScore = candidate.learn.length ? viewerTeachesCandidateNeeds / candidate.learn.length : 0;
  const languageScore = overlap(viewer.languages, candidate.languages) > 0 ? 1 : 0;
  const locationScore = viewer.city && candidate.city && normalise(viewer.city) === normalise(candidate.city) ? 1 : 0;
  const sessionScore = viewer.sessionType && candidate.sessionType && (viewer.sessionType === 'Hybrid' || candidate.sessionType === 'Hybrid' || viewer.sessionType === candidate.sessionType) ? 1 : 0;
  const score = learningScore * 45 + teachingScore * 35 + languageScore * 10 + locationScore * 5 + sessionScore * 5;
  return Math.round(Math.min(100, score));
}
