<div align="center">

# dottore

**Full-Stack Web Developer Portfolio**

Персональный сайт-портфолио с анимациями, кастомным курсором, поддержкой RU/EN и формой обратной связи.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/license-MIT-34d399?style=for-the-badge)](#лицензия)

[Telegram](https://t.me/vladkolchin00) · [Email](mailto:colchin.vl4d@yandex.ru) · [GitHub](https://github.com/colchinvlad-dev)

</div>

---

## О проекте

**dottore** — одностраничный сайт-портфолио, собранный с нуля **без фреймворков и сборщиков**. Проект демонстрирует навыки full-stack разработки, работы с анимациями и внимания к деталям интерфейса.

### Что включает

- **Hero-секцию** с побуквенной анимацией заголовка и запуском по первому скроллу
- **Секцию «Обо мне»** со sticky-блоком и карточками ключевых фактов
- **Секцию «Работы»** — карточки реальных проектов с переходами на GitHub
- **Секцию «Стек»** — бесконечная карусель технологий с паузой по hover
- **Секцию «Контакты»** — три карточки: Telegram, Email, GitHub
- **Форму заявки** с валидацией и отправкой через `mailto:`
- **Поддержку RU/EN** с мгновенным переключением без перезагрузки страницы
- **Кастомный курсор**, прогресс-бар скролла и reveal-анимации по всему сайту

---

## Стек

**Frontend**

- HTML5 — семантическая разметка
- CSS3 — Flexbox, Grid, `clamp()`, `mask-image`, CSS-переменные, keyframes
- JavaScript (ES2022+) — модули, `IntersectionObserver`, `requestAnimationFrame`
- Web Animations API — побуквенные анимации и reveal-эффекты

**Без зависимостей**

- 0 npm-пакетов
- 0 фреймворков
- 0 сборщиков
- Только нативные веб-технологии

**Особенности реализации**

- **i18n без библиотек** — собственный словарь и `data-i18n` атрибуты
- **Кастомный курсор** с плавным следованием и hover-состояниями
- **IntersectionObserver** для reveal-анимаций и активной ссылки в навигации
- **`prefers-reduced-motion`** — полное отключение анимаций для тех, кто их не хочет
- **`color-scheme: dark`** для корректного отображения системных элементов
- **Сброс `history.scrollRestoration`** — корректный старт страницы после F5

---

## Структура проекта

```
dottore/
├── index.html              # Основная разметка
├── favicon.svg             # SVG-иконка сайта
├── README.md               # Этот файл
└── assets/
    ├── style/
    │   └── style.css       # Все стили проекта
    └── js/
        └── main.js         # Вся логика: анимации, i18n, форма
```

**Никаких `node_modules`, `dist`, `.cache` и прочего — проект запускается как есть.**

---

## Запуск

### Локальный сервер (рекомендуется)

Так как проект использует ES-модули (`<script type="module">`), открывать `index.html` напрямую через `file://` не получится — браузер заблокирует загрузку скрипта из-за CORS.

**Через VS Code + Live Server:**

1. Установи расширение [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
2. Правый клик по `index.html` → **Open with Live Server**
3. Откроется `http://127.0.0.1:5500`

**Через Python:**

```bash
python -m http.server 5500
```

**Через Node.js:**

```bash
npx serve .
```

**Через Open Server Panel / XAMPP / MAMP:**

Помести папку `dottore` в директорию домена и открой её по локальному URL (например, `http://dottore.local`).

### Публикация

Проект готов к деплою на любом статическом хостинге:

- **GitHub Pages** — Settings → Pages → Deploy from branch
- **Vercel** — импорт репозитория, деплой одной кнопкой
- **Netlify** — drag & drop папки
- **Cloudflare Pages** — подключение репозитория

Никаких настроек сборки не требуется — это чистый статический сайт.

---

## Как редактировать

### Тексты и переводы

Все тексты, которые можно перевести, помечены атрибутом `data-i18n="ключ"` в `index.html`. Словари лежат в `main.js` в объекте `I18N`:

```js
const I18N = {
    ru: {
        'nav.about': 'Обо мне',
        'hero.status': 'Открыт к проектам',
        // ...
    },
    en: {
        'nav.about': 'About',
        'hero.status': 'Open to projects',
        // ...
    },
};
```

**Чтобы добавить новый переводимый текст:**

1. В HTML добавь `data-i18n="my.new.key"` на элемент.
2. В `I18N.ru` и `I18N.en` добавь перевод по этому ключу.
3. Всё — переключение языка подхватит автоматически.

### Проекты в секции «Работы»

Каждая карточка проекта — это `<li class="project-card">`. Чтобы добавить новый проект, скопируй блок и поменяй:

- `project-card-index` — номер (`01`, `02`, ...)
- `project-card-badge--*` — тип (`commercial` / `diploma` / `team` / `pet`)
- Название, описание, стек, роль
- Ссылку в `.project-card-link`

### Технологии в секции «Стек»

Каждый ряд — `<div class="stack-row" data-direction="left|right" data-speed="60">`. Внутри — карточки `<a class="stack-card">`. Скорость движения задаётся через `data-speed`: чем больше, тем быстрее.

### Цвета и типографика

Все переменные собраны в `:root` в начале `style.css`:

```css
:root {
    --bg: #080808;
    --fg: #f2f2f2;
    --accent: #f43f75;
    --accent-2: #3b6ff5;
    /* ... */
}
```

Меняешь `--accent` — весь сайт перекрашивается в новый цвет.

---

## Секции сайта

| № | Секция | ID | Описание |
|---|--------|-----|----------|
| — | Hero | `#hero` | Побуквенная анимация, статус, статистика, CTA |
| 01 | Обо мне | `#about` | Возраст, описание, 4 карточки + CTA-плашка |
| 02 | Работы | `#projects` | 6 карточек проектов + кнопка «Все на GitHub» |
| 03 | Стек | `#stack` | 3 ряда бесконечной карусели технологий |
| 04 | Контакты | `#contact` | 3 карточки: Telegram, Email, GitHub |
| 05 | Заявка | `#form` | Форма с валидацией и `mailto:` |
| — | Footer | — | Бренд, ссылки, копирайт |

---

## Особенности и решения

### Кастомный курсор

Курсор рисуется через `<div class="custom-cursor">` и следует за мышью с интерполяцией. Реализовано через `requestAnimationFrame` с коэффициентом сглаживания `0.18`. Hover-состояние активируется на всех `a`, `button` и элементах с `data-cursor-label`.

**Отключается автоматически** на тач-устройствах (`@media (hover: hover) and (pointer: fine)`).

### Hero по первому скроллу

Hero-анимация **не запускается при загрузке** — ждёт первого реального взаимодействия пользователя. В `waitForFirstScroll()` отсеиваются ложные срабатывания (`scrollY < 5`, `wheel` вверх). Это создаёт эффект «оживающей» страницы.

### i18n без перезагрузки

При клике на RU/EN страница **не перезагружается**. Вместо этого:

1. Все элементы с `data-i18n` получают новый текст.
2. Обновляется `document.title`, `<meta description>`, `og:`-теги.
3. Обновляется `document.documentElement.lang`.
4. Выбор сохраняется в `localStorage`.

### Поддержка `prefers-reduced-motion`

Если у пользователя в системе включено «уменьшить движение» или он выбрал это осознанно через `localStorage['dottore:motion']`, все анимации отключаются одним CSS-классом `motion-reduced`:

```css
.motion-reduced * {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
}
```

Также отключается карусель стека и побуквенные анимации Hero.

---

## Что можно улучшить

Идеи для будущих версий:

- [ ] Подключить **Formspree** или **Web3Forms** для отправки формы без открытия почтового клиента
- [ ] Добавить **секцию «Опыт»** с timeline (2022 → 2026)
- [ ] Поддержать **светлую тему** через `prefers-color-scheme`
- [ ] Добавить **больше языков** в i18n (например, DE, FR)
- [ ] Сделать **страницы проектов** — детальные кейсы с описанием задач
- [ ] Подключить **аналитику** (Plausible / Umami) без куки
- [ ] Оптимизировать **LCP и CLS** через preload шрифтов и критический CSS

---

<div align="center">

**Сделано с ❤️ и вниманием к деталям**

[Telegram](https://t.me/vladkolchin00) · [Email](mailto:colchin.vl4d@yandex.ru) · [GitHub](https://github.com/colchinvlad-dev)

</div>
