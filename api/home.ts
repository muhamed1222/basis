export interface HomeCase {
  id: string;
  title: string;
  desc: string;
  preview: string;
  username: string;
}

export interface HomeStats {
  users: number;
  pages: number;
  integrations: number;
}

export interface HomeReview {
  id: string;
  name: string;
  job: string;
  avatar: string;
  text: string;
  stars: number;
}

export async function fetchCases(): Promise<HomeCase[]> {
  return [
    {
      id: '1',
      title: 'Дизайнерское портфолио',
      desc: 'Пример стильной страницы для креативных работ',
      preview: 'https://placehold.co/600x400/png',
      username: 'designer',
    },
    {
      id: '2',
      title: 'Профиль разработчика',
      desc: 'Техническое портфолио с ссылками на проекты',
      preview: 'https://placehold.co/600x400/png',
      username: 'dev',
    },
    {
      id: '3',
      title: 'Личный блог',
      desc: 'Пример странички для контент‑криэйтора',
      preview: 'https://placehold.co/600x400/png',
      username: 'blogger',
    },
  ];
}

export async function fetchStats(): Promise<HomeStats> {
  return {
    users: 1200,
    pages: 3400,
    integrations: 12,
  };
}

export async function fetchReviews(): Promise<HomeReview[]> {
  return [
    {
      id: '1',
      name: 'Анна',
      job: 'Дизайнер',
      avatar: 'https://placehold.co/80/png',
      text: 'Очень удобный сервис, создала портфолио за пару минут!',
      stars: 5,
    },
    {
      id: '2',
      name: 'Иван',
      job: 'Разработчик',
      avatar: 'https://placehold.co/80/png',
      text: 'Интеграции работают отлично, сайт загрузил код без проблем.',
      stars: 4,
    },
  ];
}
