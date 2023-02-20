import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  debug: false,
  resources: {
    en: {
      translation: {
        nav: {
          home: 'Home',
          news: 'News',
        },
        auth: {
          login: 'Login',
          signUp: 'Sign Up',
          email: 'Email',
          password: 'Password',
          remember: 'Remember me',
          haveAccount: 'Already have an account? Login',
          noAccount: "Don't have an account? Sign Up",
          promo: 'I want to receive promotions via email',
        },
        home: {
          title: 'Welcome to our News Site',
          text: 'Stay up to date with the latest news from around the world.',
          text2:
            'Our website is dedicated to providing you with accurate and timely news about current events, sports, entertainment, and more.',
          changeLng: 'Change language',
        },
        footer: {
          copyright: '2023 News. All Rights Reserved.',
        },
        errors: {
          incorrectCredentials: 'Your email or password is incorrect',
          global: 'Something went wrong',
        },
        buttons: {
          loadMore: 'Load more',
          toNews: 'Go to News',
          reload: 'Reload page',
        },
      },
    },
    ua: {
      translation: {
        nav: {
          home: 'Головна',
          news: 'Новини',
        },
        auth: {
          login: 'Вхід',
          signUp: 'Реєстрація',
          email: 'Електронна пошта',
          password: 'Пароль',
          remember: "Запам'ятати мене",
          haveAccount: 'Вже є аккаунт? Вхід',
          noAccount: 'Немає облікового запису? Зареєструватися',
          promo: 'Я хочу отримувати рекламні акції електронною поштою',
        },
        home: {
          title: 'Ласкаво просимо на наш Сайт Новин',
          text: 'Будьте в курсі останніх новин з усього світу.',
          text2:
            'Наш веб-сайт призначений для надання вам точних і своєчасних новин про поточні події, спорт, розваги тощо.',
          changeLng: 'Змінити мову',
        },
        footer: {
          copyright: '2023 Новини. Всі права захищені.',
        },
        errors: {
          incorrectCredentials:
            "Ім'я користувача або пароль введено неправильно",
          global: 'Щось пішло не так',
        },
        buttons: {
          loadMore: 'Завантажити ще',
          toNews: 'Перейти до новин',
          reload: 'Перезавантажити сторінку'
        },
      },
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
