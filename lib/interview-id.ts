
export function createInterviewId(
  estimatedLevel: string
) {
  const slug = estimatedLevel
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  const random =
    crypto.randomUUID().slice(0, 6);

  return `${slug}-interview-${random}`;
}