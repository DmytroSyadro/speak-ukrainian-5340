enum Challenges {
  UNITED = 'Єдині',
  UKR_CLUB = 'Клуб української мови "Розмовляй"',
  TEACH_URK_CHALLENGE = 'Навчай українською челендж',
  LANG_MARATHON = 'Мовомаратон',
  TEACH_URK = 'Навчай українською',
}
export const challengesValues: Challenges[] = Object.values(Challenges);
export function isChallenge(value: string): value is Challenges {
  return challengesValues.includes(value as Challenges);
}
export function getRandomChallenge(): Challenges {
  return challengesValues[Math.floor(Math.random() * challengesValues.length)];
}
export { Challenges };
