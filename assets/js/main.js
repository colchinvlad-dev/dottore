/* ==========================================================================
   DOTTORE — main.js
   ========================================================================== */

const html = document.documentElement;
const body = document.body;
const nav = document.querySelector('.site-nav');
const progress = document.querySelector('.site-nav-progress');
const navLinks = document.querySelector('.site-nav-links');
const navToggle = document.querySelector('.site-nav-toggle');
const langBtns = document.querySelectorAll('.lang-switch-btn');
const soundToggle = document.querySelector('.sound-toggle');
const cursor = document.querySelector('.custom-cursor');

const REDUCED = html.classList.contains('motion-reduced');

// При перезагрузке страницы всегда стартуем с верха,
// чтобы Hero-анимация не срабатывала мгновенно из-за восстановленной позиции скролла.
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

/* --------------------------------------------------------------------------
   1. Прогресс-бар скролла
   -------------------------------------------------------------------------- */

let lastScrollY = 0;
let ticking = false;

function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = docHeight > 0 ? scrollTop / docHeight : 0;

    if (progress) {
        progress.style.transform = `scaleX(${ratio})`;
    }

    if (nav) {
        nav.classList.toggle('at-top', scrollTop < 10);

        if (scrollTop > 120 && scrollTop > lastScrollY) {
            nav.classList.add('is-hidden');
        } else {
            nav.classList.remove('is-hidden');
        }
    }

    lastScrollY = scrollTop;
    ticking = false;
}

function onScroll() {
    if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
    }
}

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll, { passive: true });
updateProgress();

/* --------------------------------------------------------------------------
   2. Мобильное меню
   -------------------------------------------------------------------------- */

if (navToggle) {
    navToggle.addEventListener('click', () => {
        const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!isOpen));
        navToggle.setAttribute('aria-label', isOpen ? 'Открыть меню' : 'Закрыть меню');
        navLinks?.classList.toggle('is-open', !isOpen);
        nav?.classList.toggle('menu-open', !isOpen);
    });

    navLinks?.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.setAttribute('aria-label', 'Открыть меню');
            navLinks.classList.remove('is-open');
            nav.classList.remove('menu-open');
        });
    });
}

/* --------------------------------------------------------------------------
   3. Язык — i18n без перезагрузки
   -------------------------------------------------------------------------- */

const I18N = {
    ru: {
        'nav.about': 'Обо мне',
        'nav.projects': 'Работы',
        'nav.stack': 'Стек',
        'nav.contact': 'Контакты',

        'hero.status': 'Открыт к проектам',
        'hero.sub': 'Разрабатываю веб-продукты полного цикла — от проектирования макета в Figma до фронтенда, бэкенда и деплоя в продакшен.',
        'hero.stat1': 'проектов<br>разработано и готово',
        'hero.stat2num': '4 года',
        'hero.stat2': 'в веб-разработке<br>и дизайне',
        'hero.stat3': 'макет → код<br>→ деплой',
        'hero.cta1': 'Смотреть работы',
        'hero.cta2': 'Написать мне',
        'hero.scroll': 'Листай',

        'about.eyebrow': '01 / Обо мне',
        'about.title1': 'Обо',
        'about.title2': 'мне',
        'about.ageLabel': 'год',
        'about.p1': 'Разработчик с 4-летним техническим образованием и опытом создания веб-продуктов полного цикла. Объединяю экспертизу в веб-разработке и мультимедиа-дизайне: создаю прототипы в Figma, разрабатываю адаптивные интерфейсы с анимацией и пишу серверную логику.',
        'about.p2': 'Дипломированный разработчик веб и мультимедиа приложений (специальность «Информационные системы и программирование»). Самостоятельно реализовал более 10 проектов — pet и коммерческих, работал как единственным разработчиком, так и в команде.',
        'about.p3': 'Активно использую AI-инструменты в ежедневной работе: применяю LLM для генерации кода, рефакторинга, написания тестов и автоматизации рутинных задач, а также интегрирую AI-сервисы в разрабатываемые продукты.',
        'about.c1t': '4 года в разработке',
        'about.c1d': 'Разрабатываю веб-приложения с 2022 года. Полный цикл: от идеи и макета до продакшена.',
        'about.c2t': 'Профильное образование',
        'about.c2d': 'Дипломированный разработчик веб и мультимедиа приложений. Специальность «Информационные системы и программирование».',
        'about.c3t': 'Полный цикл разработки',
        'about.c3d': 'Макет → frontend → backend → база данных → деплой. Проектирую архитектуру и довожу до продакшена.',
        'about.c4t': 'AI в ежедневной работе',
        'about.c4d': 'Использую LLM для генерации кода, рефакторинга и тестов. Интегрирую AI-сервисы в продукты.',
        'about.ctaLabel': 'Есть идея?',
        'about.ctaAction': 'Написать мне',

        'projects.eyebrow': '02 / Работы',
        'projects.title1': 'Работы',
        'projects.title2': 'и проекты',
        'projects.sub': 'Более 10 реализованных проектов: коммерческие продукты, дипломные работы и пет-проекты. Ниже — избранное с реальными задачами и стеком.',
        'projects.badge.commercial': 'Коммерческий',
        'projects.badge.diploma': 'Дипломный',
        'projects.badge.team': 'Командный',
        'projects.badge.pet': 'Пет-проект',
        'projects.view': 'Просмотреть',
        'projects.allOnGithub': 'Все проекты на GitHub',
        'projects.p1.desc': 'Корпоративный мессенджер для школ: защищённое общение учителей, учеников и администрации. Шифрование сообщений, RBAC, пригласительные коды. Готов к продаже образовательным учреждениям.',
        'projects.p1.role': 'Full-stack · sole developer',
        'projects.p2.desc': 'Административная панель интернет-магазина косметики: 9 модулей, полный CRUD, транзакционная обработка заказов, роли, экспорт в Excel и генерация счетов.',
        'projects.p2.role': 'Full-stack · 44 таблицы БД',
        'projects.p3.desc': 'SPA-платформа обмена навыками: публикация навыков, фильтрация каталога, избранное и заявки на обмен. Разработка велась по Agile с code review и CI/CD.',
        'projects.p3.role': 'Frontend · feature/catalog-filters',
        'projects.p4.desc': 'SPA для заказа бургеров: конструктор из ингредиентов с drag-and-drop, оформление заказа, лента заказов в реальном времени, полный цикл авторизации с JWT.',
        'projects.p4.role': 'Frontend · 11-й спринт',
        'projects.p5.desc': 'Платформа для записи на образовательные курсы: каталог с фильтрами и пагинацией, личный кабинет, заявки со статусами и админ-панель для их обработки.',
        'projects.p5.role': 'Full-stack · sole developer',
        'projects.p6.desc': 'SPA интернет-магазин для веб-разработчиков: каталог, корзина, пошаговое оформление заказа с валидацией, модальные окна. Архитектура построена по парадигме MVP.',
        'projects.p6.role': 'Frontend · MVP-архитектура',

        'stack.eyebrow': '03 / Технологии',
        'stack.title': 'Стек',
        'stack.sub': 'Инструменты, на которых я собираю продукты — от идеи до продакшена. Наведи на карточку, чтобы остановить движение.',
        'stack.note.ui': 'UI-библиотека',
        'stack.note.types': 'типизация',
        'stack.note.fullstack': 'full-stack фреймворк',
        'stack.note.server': 'серверная логика',
        'stack.note.db': 'база данных',
        'stack.note.utility': 'utility CSS',
        'stack.note.design': 'дизайн и прототипы',
        'stack.note.containers': 'контейнеризация',
        'stack.note.webserver': 'веб-сервер',
        'stack.note.versions': 'версии',
        'stack.note.cache': 'кэш и сессии',
        'stack.note.docdb': 'документная БД',
        'stack.note.ai': 'генерация и анализ',
        'stack.note.deploy': 'деплой',
        'stack.note.build': 'сборка',
        'stack.note.server2': 'сервер',
        'stack.note.integrations': 'интеграции',

        'contact.eyebrow': '04 / Контакты',
        'contact.status': 'Открыт к проектам',
        'contact.title1': 'Есть идея?',
        'contact.title2': 'Давай соберём.',
        'contact.sub': 'Беру новые проекты и открыт к работе в команде. Пиши, где тебе удобно — отвечаю быстро.',
        'contact.cta': 'Связаться со мной',

        'form.eyebrow': '05 / Заявка',
        'form.title1': 'Оставить',
        'form.title2': 'заявку',
        'form.sub': 'Опиши задачу — отвечу в течение дня. Письмо сформируется автоматически и откроется в твоём почтовом клиенте.',
        'form.name': 'Имя',
        'form.email': 'Email',
        'form.subject': 'Тема',
        'form.message': 'Сообщение',
        'form.note': 'Нажимая «Отправить», ты соглашаешься на обработку данных и переход в почтовый клиент.',
        'form.submit': 'Отправить заявку',

        'footer.copy': '© 2026 · Full-Stack Web Developer',

        // Сообщения валидации
        'err.name.required': 'Введи имя',
        'err.name.short': 'Минимум 2 символа',
        'err.email.required': 'Введи email',
        'err.email.invalid': 'Некорректный email',
        'err.subject.required': 'Введи тему',
        'err.subject.short': 'Минимум 3 символа',
        'err.message.required': 'Введи сообщение',
        'err.message.short': 'Минимум 10 символов',
        'err.form.hasErrors': 'Проверь поля — есть ошибки',
        'success.form.opened': 'Письмо открыто в почтовом клиенте. Проверь и отправь его.',
    },

    en: {
        'nav.about': 'About',
        'nav.projects': 'Work',
        'nav.stack': 'Stack',
        'nav.contact': 'Contact',

        'hero.status': 'Open to projects',
        'hero.sub': 'I build full-cycle web products — from Figma mockups to frontend, backend, and production deployment.',
        'hero.stat1': 'projects<br>designed & shipped',
        'hero.stat2num': '4 years',
        'hero.stat2': 'in web development<br>and design',
        'hero.stat3': 'mockup → code<br>→ deploy',
        'hero.cta1': 'See my work',
        'hero.cta2': 'Get in touch',
        'hero.scroll': 'Scroll',

        'about.eyebrow': '01 / About',
        'about.title1': 'About',
        'about.title2': 'me',
        'about.ageLabel': 'years',
        'about.p1': 'Developer with 4 years of technical education and experience building full-cycle web products. I combine web development and multimedia design expertise: I create Figma prototypes, build adaptive interfaces with animations, and write server-side logic.',
        'about.p2': 'Certified web and multimedia application developer (specialty "Information Systems and Programming"). I have independently delivered 10+ projects — both pet and commercial — working as a solo developer and as part of a team.',
        'about.p3': 'I actively use AI tools in my daily work: LLMs for code generation, refactoring, writing tests, and automating routine tasks, and I integrate AI services directly into the products I build.',
        'about.c1t': '4 years in development',
        'about.c1d': 'Building web apps since 2022. Full cycle: from idea and mockup to production.',
        'about.c2t': 'Formal education',
        'about.c2d': 'Certified web and multimedia application developer. Specialty "Information Systems and Programming".',
        'about.c3t': 'Full-cycle development',
        'about.c3d': 'Mockup → frontend → backend → database → deploy. I design the architecture and take it to production.',
        'about.c4t': 'AI in daily work',
        'about.c4d': 'I use LLMs for code generation, refactoring, and tests. I integrate AI services into products.',
        'about.ctaLabel': 'Got an idea?',
        'about.ctaAction': 'Message me',

        'projects.eyebrow': '02 / Work',
        'projects.title1': 'Work',
        'projects.title2': '& projects',
        'projects.sub': 'Over 10 delivered projects: commercial products, thesis work, and pet projects. Below are selected ones with real tasks and stacks.',
        'projects.badge.commercial': 'Commercial',
        'projects.badge.diploma': 'Thesis',
        'projects.badge.team': 'Team',
        'projects.badge.pet': 'Pet project',
        'projects.view': 'View',
        'projects.allOnGithub': 'All projects on GitHub',
        'projects.p1.desc': 'Corporate messenger for schools: secure communication between teachers, students, and administration. Message encryption, RBAC, invite codes. Ready to be sold to educational institutions.',
        'projects.p1.role': 'Full-stack · sole developer',
        'projects.p2.desc': 'Admin panel for a cosmetics e-commerce store: 9 modules, full CRUD, transactional order processing, roles, Excel export, and invoice generation.',
        'projects.p2.role': 'Full-stack · 44 DB tables',
        'projects.p3.desc': 'SPA platform for skill exchange: publishing skills, catalog filtering, favorites, and exchange requests. Developed with Agile, code review, and CI/CD.',
        'projects.p3.role': 'Frontend · feature/catalog-filters',
        'projects.p4.desc': 'SPA for ordering burgers: ingredient constructor with drag-and-drop, order checkout, real-time order feed, full JWT auth cycle.',
        'projects.p4.role': 'Frontend · sprint 11',
        'projects.p5.desc': 'Platform for enrolling in educational courses: catalog with filters and pagination, user dashboard, requests with statuses, and admin panel to process them.',
        'projects.p5.role': 'Full-stack · sole developer',
        'projects.p6.desc': 'SPA e-commerce store for web developers: catalog, cart, step-by-step checkout with validation, modals. Architecture built on the MVP paradigm.',
        'projects.p6.role': 'Frontend · MVP architecture',

        'stack.eyebrow': '03 / Tech',
        'stack.title': 'Stack',
        'stack.sub': 'The tools I use to build products — from idea to production. Hover a card to pause the motion.',
        'stack.note.ui': 'UI library',
        'stack.note.types': 'typing',
        'stack.note.fullstack': 'full-stack framework',
        'stack.note.server': 'server logic',
        'stack.note.db': 'database',
        'stack.note.utility': 'utility CSS',
        'stack.note.design': 'design & prototypes',
        'stack.note.containers': 'containers',
        'stack.note.webserver': 'web server',
        'stack.note.versions': 'versioning',
        'stack.note.cache': 'cache & sessions',
        'stack.note.docdb': 'document DB',
        'stack.note.ai': 'generation & analysis',
        'stack.note.deploy': 'deploy',
        'stack.note.build': 'build',
        'stack.note.server2': 'server',
        'stack.note.integrations': 'integrations',

        'contact.eyebrow': '04 / Contact',
        'contact.status': 'Open to projects',
        'contact.title1': 'Got an idea?',
        'contact.title2': "Let's build it.",
        'contact.sub': 'I take on new projects and am open to team work. Reach out wherever is convenient — I reply fast.',
        'contact.cta': 'Get in touch',

        'form.eyebrow': '05 / Request',
        'form.title1': 'Send',
        'form.title2': 'a request',
        'form.sub': 'Describe your task — I reply within a day. The email will be drafted automatically and opened in your mail client.',
        'form.name': 'Name',
        'form.email': 'Email',
        'form.subject': 'Subject',
        'form.message': 'Message',
        'form.note': 'By clicking "Send" you agree to data processing and opening your mail client.',
        'form.submit': 'Send request',

        'footer.copy': '© 2026 · Full-Stack Web Developer',

        'err.name.required': 'Enter your name',
        'err.name.short': 'Minimum 2 characters',
        'err.email.required': 'Enter your email',
        'err.email.invalid': 'Invalid email',
        'err.subject.required': 'Enter a subject',
        'err.subject.short': 'Minimum 3 characters',
        'err.message.required': 'Enter a message',
        'err.message.short': 'Minimum 10 characters',
        'err.form.hasErrors': 'Check the fields — there are errors',
        'success.form.opened': 'Email opened in your mail client. Review and send it.',
    },
};

// Отдельно — SEO-метаданные для каждого языка.
const I18N_META = {
    ru: {
        title: 'dottore — Full-Stack Web Developer',
        desc: 'Full-Stack разработчик: современные сайты, веб-приложения, SaaS и AI-продукты — от идеи до готового решения.',
    },
    en: {
        title: 'dottore — Full-Stack Web Developer',
        desc: 'Full-Stack Web Developer building modern websites, web apps, SaaS and AI products — from idea to launch.',
    },
};

let currentLang = (() => {
    try { return localStorage.getItem('dottore:lang') || 'ru'; } catch (e) { return 'ru'; }
})();

/**
 * Применяет перевод ко всем элементам с data-i18n.
 * Если ключа нет — оставляет оригинальный текст.
 */
function applyI18n(lang) {
    const dict = I18N[lang] || I18N.ru;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        const value = dict[key];
        if (typeof value !== 'string') return;

        // Если перевод содержит <br> — ставим через innerHTML,
        // иначе — через textContent (безопаснее).
        if (value.includes('<br')) {
            el.innerHTML = value;
        } else {
            el.textContent = value;
        }
    });

    // SEO
    const meta = I18N_META[lang] || I18N_META.ru;
    document.title = meta.title;

    const setMeta = (selector, content) => {
        const el = document.querySelector(selector);
        if (el) el.setAttribute('content', content);
    };
    setMeta('meta[name="description"]', meta.desc);
    setMeta('meta[property="og:title"]', meta.title);
    setMeta('meta[property="og:description"]', meta.desc);
    setMeta('meta[name="twitter:title"]', meta.title);
    setMeta('meta[name="twitter:description"]', meta.desc);

    // html lang
    document.documentElement.lang = lang;

    // Активное состояние кнопок
    langBtns.forEach((b) => {
        const isActive = b.getAttribute('data-lang') === lang;
        b.classList.toggle('lang-switch-active', isActive);
        b.setAttribute('aria-pressed', String(isActive));
    });
}

/**
 * Возвращает перевод по ключу для текущего языка.
 */
function t(key) {
    const dict = I18N[currentLang] || I18N.ru;
    return dict[key] || key;
}

// Инициализация переключателя языка
if (langBtns.length) {
    langBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-lang') || 'ru';
            if (target === currentLang) return;

            currentLang = target;
            try {
                localStorage.setItem('dottore:lang', target);
            } catch (e) { /* ignore */ }

            applyI18n(target);
        });
    });

    // Применяем выбранный язык сразу (без перезагрузки)
    applyI18n(currentLang);
}

/* --------------------------------------------------------------------------
   4. Переключатель звука
   -------------------------------------------------------------------------- */

if (soundToggle) {
    soundToggle.addEventListener('click', () => {
        const isOn = soundToggle.classList.toggle('sound-toggle-on');
        soundToggle.setAttribute('aria-pressed', String(isOn));
        const label = isOn ? 'Выключить звук' : 'Включить звук';
        soundToggle.setAttribute('aria-label', label);
        soundToggle.setAttribute('title', label);
        soundToggle.setAttribute('data-cursor-label', isOn ? 'off' : 'on');
        try {
            localStorage.setItem('dottore:sound', isOn ? 'on' : 'off');
        } catch (e) { /* ignore */ }
    });
}

/* --------------------------------------------------------------------------
   5. Кастомный курсор
   -------------------------------------------------------------------------- */

if (cursor && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    body.classList.add('has-custom-cursor');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let curX = mouseX;
    let curY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.classList.add('is-visible');
    });

    window.addEventListener('mouseleave', () => {
        cursor.classList.remove('is-visible');
    });

    function render() {
        curX += (mouseX - curX) * 0.18;
        curY += (mouseY - curY) * 0.18;
        cursor.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`;
        requestAnimationFrame(render);
    }
    if (!REDUCED) requestAnimationFrame(render);

    const hoverables = document.querySelectorAll(
        'a, button, [data-cursor-label], .site-nav-links a'
    );

    hoverables.forEach((el) => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('is-hover');
            const label = el.getAttribute('data-cursor-label');
            if (label) cursor.setAttribute('data-label', label);
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('is-hover');
            cursor.removeAttribute('data-label');
        });
    });
}

/* --------------------------------------------------------------------------
   6. Активная ссылка в навигации (по скроллу)
   -------------------------------------------------------------------------- */

const sections = document.querySelectorAll('section[id]');

if (sections.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const id = entry.target.id;
                navLinks?.querySelectorAll('a').forEach((link) => {
                    const active = link.getAttribute('href') === `#${id}`;
                    link.classList.toggle('is-active', active);
                });
            });
        },
        { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
}

/* --------------------------------------------------------------------------
   7. HERO — побуквенная анимация заголовка
   -------------------------------------------------------------------------- */

function splitChars(container, text) {
    container.innerHTML = '';
    const frag = document.createDocumentFragment();

    for (const ch of text) {
        const span = document.createElement('span');
        span.className = 'hero-title-char';
        span.textContent = ch === ' ' ? '\u00A0' : ch;
        frag.appendChild(span);
    }

    container.appendChild(frag);
    return container.querySelectorAll('.hero-title-char');
}

function playChars(chars, baseDelay = 0, stagger = 0.035) {
    chars.forEach((char, i) => {
        const delay = baseDelay + i * stagger;
        char.style.transitionDelay = `${delay}s`;
        requestAnimationFrame(() => {
            char.parentElement.classList.add('is-in');
        });
    });
}

/* --------------------------------------------------------------------------
   8. HERO — подготовка (буквы скрыты, но готовы к запуску)
   -------------------------------------------------------------------------- */

let heroPlayed = false;
let heroChars = [];
let heroReveals = [];

function prepareHero() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const charContainers = hero.querySelectorAll('[data-hero-chars]');

    charContainers.forEach((container) => {
        const text = container.getAttribute('data-hero-chars') || '';
        const chars = splitChars(container, text);
        heroChars.push(...Array.from(chars));
    });

    heroReveals = Array.from(hero.querySelectorAll('[data-hero-reveal]'));

    if (REDUCED) {
        hero.querySelectorAll('.hero-title-chars').forEach((el) => el.classList.add('is-in'));
        heroReveals.forEach((el) => el.classList.add('is-in'));
        heroPlayed = true;
    }
}

function playHero() {
    if (heroPlayed) return;
    heroPlayed = true;

    playChars(heroChars, 0.1, 0.03);

    const charsDuration = heroChars.length * 0.03 + 0.6;
    heroReveals.forEach((el, i) => {
        el.style.transitionDelay = `${charsDuration + i * 0.12}s`;
        requestAnimationFrame(() => el.classList.add('is-in'));
    });
}

/* --------------------------------------------------------------------------
   9. HERO — ожидание первого реального скролла
   -------------------------------------------------------------------------- */

function waitForFirstScroll() {
    if (heroPlayed) return;

    let triggered = false;

    const onFirstInteraction = (e) => {
        if (triggered) return;

        // Игнорируем ложные срабатывания
        if (e && e.type === 'scroll' && window.scrollY < 5) return;
        if (e && e.type === 'wheel' && e.deltaY <= 0) return;

        triggered = true;
        playHero();

        window.removeEventListener('scroll', onFirstInteraction);
        window.removeEventListener('wheel', onFirstInteraction);
        window.removeEventListener('touchmove', onFirstInteraction);
        window.removeEventListener('keydown', onFirstInteraction);
    };

    window.addEventListener('scroll', onFirstInteraction, { passive: true });
    window.addEventListener('wheel', onFirstInteraction, { passive: true });
    window.addEventListener('touchmove', onFirstInteraction, { passive: true });
    window.addEventListener('keydown', onFirstInteraction);
}

function initHero() {
    prepareHero();
    waitForFirstScroll();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHero);
} else {
    initHero();
}

/* --------------------------------------------------------------------------
   10. STACK — бесконечная карусель карточек
   -------------------------------------------------------------------------- */

function initStack() {
    const rows = document.querySelectorAll('.stack-row');
    if (!rows.length) return;

    rows.forEach((row) => {
        const track = row.querySelector('.stack-track');
        if (!track) return;

        const originalCards = Array.from(track.children);
        const clone = document.createDocumentFragment();
        originalCards.forEach((card) => {
            clone.appendChild(card.cloneNode(true));
        });
        track.appendChild(clone);

        const speed = parseFloat(row.getAttribute('data-speed')) || 60;
        const duration = Math.max(20, 60 - speed * 0.4);
        track.style.setProperty('--stack-duration', `${duration}s`);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStack);
} else {
    initStack();
}

/* --------------------------------------------------------------------------
   11. ABOUT — reveal-анимация при появлении в вьюпорте
   -------------------------------------------------------------------------- */

function initAboutReveal() {
    const items = document.querySelectorAll('[data-about-reveal]');
    if (!items.length) return;

    if (REDUCED) {
        items.forEach((el) => el.classList.add('is-in'));
        return;
    }

    if (!('IntersectionObserver' in window)) {
        items.forEach((el) => el.classList.add('is-in'));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const el = entry.target;

                const idx = Array.from(items).indexOf(el);
                el.style.transitionDelay = `${Math.min(idx * 0.08, 0.5)}s`;

                el.classList.add('is-in');
                observer.unobserve(el);
            });
        },
        { rootMargin: '0px 0px -12% 0px', threshold: 0.15 }
    );

    items.forEach((el) => observer.observe(el));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAboutReveal);
} else {
    initAboutReveal();
}

/* --------------------------------------------------------------------------
   12. PROJECTS — reveal-анимация карточек при появлении в вьюпорте
   -------------------------------------------------------------------------- */

function initProjectsReveal() {
    const items = document.querySelectorAll('[data-project-reveal]');
    if (!items.length) return;

    if (REDUCED) {
        items.forEach((el) => el.classList.add('is-in'));
        return;
    }

    if (!('IntersectionObserver' in window)) {
        items.forEach((el) => el.classList.add('is-in'));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const idx = Array.from(items).indexOf(el);
                el.style.transitionDelay = `${Math.min(idx * 0.08, 0.6)}s`;
                el.classList.add('is-in');
                observer.unobserve(el);
            });
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
    );

    items.forEach((el) => observer.observe(el));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjectsReveal);
} else {
    initProjectsReveal();
}

/* --------------------------------------------------------------------------
   13. CONTACT — reveal-анимация при появлении в вьюпорте
   -------------------------------------------------------------------------- */

function initContactReveal() {
    const items = document.querySelectorAll('[data-contact-reveal]');
    if (!items.length) return;

    if (REDUCED) {
        items.forEach((el) => el.classList.add('is-in'));
        return;
    }

    if (!('IntersectionObserver' in window)) {
        items.forEach((el) => el.classList.add('is-in'));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const idx = Array.from(items).indexOf(el);
                el.style.transitionDelay = `${Math.min(idx * 0.1, 0.6)}s`;
                el.classList.add('is-in');
                observer.unobserve(el);
            });
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
    );

    items.forEach((el) => observer.observe(el));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactReveal);
} else {
    initContactReveal();
}

/* --------------------------------------------------------------------------
   14. CONTACT FORM — валидация и отправка через mailto
   -------------------------------------------------------------------------- */

const MY_EMAIL = 'colchin.vl4d@yandex.ru';

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const statusEl = document.getElementById('formStatus');
    const fields = {
        name:    form.querySelector('#formName'),
        email:   form.querySelector('#formEmail'),
        subject: form.querySelector('#formSubject'),
        message: form.querySelector('#formMessage'),
    };

    /* ---- Утилита: показать ошибку на конкретном поле ---- */
    function setError(fieldName, message) {
        const input = fields[fieldName];
        if (!input) return;
        const wrapper = input.closest('.form-field');
        const errorEl = wrapper?.querySelector('.form-error');
        if (!wrapper || !errorEl) return;

        if (message) {
            wrapper.classList.add('has-error');
            errorEl.textContent = message;
        } else {
            wrapper.classList.remove('has-error');
            errorEl.textContent = '';
        }
    }

    /* ---- Утилита: очистить все ошибки ---- */
    function clearErrors() {
        Object.keys(fields).forEach((key) => setError(key, ''));
    }

    /* ---- Утилита: показать сообщение статуса ---- */
    function setStatus(message, type = 'success') {
        if (!statusEl) return;
        statusEl.textContent = message;
        statusEl.classList.remove('is-success', 'is-error');
        statusEl.classList.add('is-visible', type === 'error' ? 'is-error' : 'is-success');

        // Автоскрытие через 5 секунд
        clearTimeout(statusEl._timer);
        statusEl._timer = setTimeout(() => {
            statusEl.classList.remove('is-visible', 'is-success', 'is-error');
        }, 5000);
    }

    /* ---- Валидация полей (с переводами) ---- */
    function validate() {
        clearErrors();
        let valid = true;

        // Имя
        const nameVal = fields.name.value.trim();
        if (!nameVal) {
            setError('name', t('err.name.required'));
            valid = false;
        } else if (nameVal.length < 2) {
            setError('name', t('err.name.short'));
            valid = false;
        }

        // Email
        const emailVal = fields.email.value.trim();
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailVal) {
            setError('email', t('err.email.required'));
            valid = false;
        } else if (!emailRe.test(emailVal)) {
            setError('email', t('err.email.invalid'));
            valid = false;
        }

        // Тема
        const subjectVal = fields.subject.value.trim();
        if (!subjectVal) {
            setError('subject', t('err.subject.required'));
            valid = false;
        } else if (subjectVal.length < 3) {
            setError('subject', t('err.subject.short'));
            valid = false;
        }

        // Сообщение
        const messageVal = fields.message.value.trim();
        if (!messageVal) {
            setError('message', t('err.message.required'));
            valid = false;
        } else if (messageVal.length < 10) {
            setError('message', t('err.message.short'));
            valid = false;
        }

        return valid;
    }

    /* ---- Снятие ошибки при вводе ---- */
    Object.keys(fields).forEach((key) => {
        fields[key]?.addEventListener('input', () => setError(key, ''));
    });

    /* ---- Отправка формы ---- */
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!validate()) {
            setStatus(t('err.form.hasErrors'), 'error');
            return;
        }

        const name = fields.name.value.trim();
        const email = fields.email.value.trim();
        const subject = fields.subject.value.trim();
        const message = fields.message.value.trim();

        // Формируем письмо
        const mailSubject = `[Заявка с сайта] ${subject}`;
        const mailBody =
            `Имя: ${name}\n` +
            `Email: ${email}\n` +
            `Тема: ${subject}\n\n` +
            `Сообщение:\n${message}\n\n` +
            `---\n` +
            `Отправлено с сайта dottore`;

        // Кодируем и открываем почтовый клиент
        const mailto = `mailto:${MY_EMAIL}` +
            `?subject=${encodeURIComponent(mailSubject)}` +
            `&body=${encodeURIComponent(mailBody)}`;

        // Открываем mailto. Браузер сам решит, какой клиент использовать.
        window.location.href = mailto;

        setStatus(t('success.form.opened'), 'success');

        // Не сбрасываем форму сразу — пользователь может вернуться и что-то поправить.
        // Если хочешь сбросить — раскомментируй:
        // form.reset();
    });

    /* ---- Проверка на «вставку» невалидных данных ---- */
    ['paste', 'blur'].forEach((evt) => {
        Object.keys(fields).forEach((key) => {
            fields[key]?.addEventListener(evt, () => {
                // На blur — если поле не пустое, проверим его валидность
                if (evt === 'blur' && fields[key].value.trim()) {
                    // Точечная проверка email
                    if (key === 'email') {
                        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!re.test(fields[key].value.trim())) {
                            setError('email', t('err.email.invalid'));
                        }
                    }
                }
            });
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactForm);
} else {
    initContactForm();
}