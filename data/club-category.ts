export enum ClubCategory {
  SPORTS = 'Спортивні секції',
  DANCING = 'Танці, хореографія',
  EARLY_DEVELOPMENT = 'Студії раннього розвитку',
  PROGRAMMING = 'Програмування, робототехніка, STEM',
  ART_STUDIO = 'Художня студія, мистецтво, дизайн',
  VOCALS_MUSIC = 'Вокальна студія, музика, музичні інструменти',
  ACTING = 'Акторська майстерність, театр',
  PERSONAL_DEVELOPMENT = 'Особистісний розвиток',
  JOURNALISM_FULL = 'Журналістика, дитяче телебачення, монтаж відео, влогів',
  DEVELOPMENT_CENTER = 'Центр розвитку',
  JOURNALISM = 'Журналістика, дитяче телебачення, монтаж відео',
  OTHER = 'Інше',
}

export const clubCategoryValues = Object.values(ClubCategory);

export function isClubCategory(value: string): value is ClubCategory {
  return clubCategoryValues.includes(value as ClubCategory);
}
export function getRandomCategory() {
  return clubCategoryValues[Math.floor(Math.random() * clubCategoryValues.length)];
}
