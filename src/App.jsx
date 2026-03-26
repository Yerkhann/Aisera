import './index.css';
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  ArrowRight,
  Brain,
  Check,
  ChevronDown,
  Clock3,
  Dumbbell,
  Menu,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";

// Создаем "заглушки", чтобы код не ломался, если эти иконки используются внизу
const Github = Activity;
const Twitter = Activity;
const Linkedin = Activity;
const Instagram = Activity;

const features = [
  {
    icon: Brain,
    title: "AI-план под твой ритм",
    text: "Алгоритм анализирует уровень, цели и график, чтобы строить персональные циклы тренировок.",
  },
  {
    icon: Activity,
    title: "Умная адаптация нагрузки",
    text: "Платформа в реальном времени корректирует интенсивность по восстановлению и прогрессу.",
  },
  {
    icon: Target,
    title: "Точные цели и трекинг",
    text: "От жиросжигания до набора массы: ясные KPI, недельные спринты и контроль выполнения.",
  },
  {
    icon: Clock3,
    title: "Тренировки за 25 минут",
    text: "Генератор коротких, но эффективных сессий, когда времени минимум, а результат нужен максимум.",
  },
  {
    icon: ShieldCheck,
    title: "Безопасность движений",
    text: "Подсказки по технике и безопасным диапазонам нагрузки помогают избегать перегрузок.",
  },
  {
    icon: Zap,
    title: "Мгновенные инсайты",
    text: "Понимай, что работает для твоего тела, с рекомендациями после каждой тренировки.",
  },
];
const stats = [
  { label: "Активных атлетов", value: 120, suffix: "K+" },
  { label: "Рост удержания", value: 94, suffix: "%" },
  { label: "Построено планов", value: 2.8, suffix: "M" },
  { label: "Средний PR за 90 дней", value: 31, suffix: "%" },
];
const steps = [
  {
    icon: Users,
    title: "Ответь на 7 вопросов",
    text: "Цели, опыт, инвентарь и график — AI собирает полный профиль за 60 секунд.",
  },
  {
    icon: Sparkles,
    title: "Получай динамичный план",
    text: "Система создаёт адаптивные недельные блоки и меняет их по твоей фактической нагрузке.",
  },
  {
    icon: TrendingUp,
    title: "Расти каждую неделю",
    text: "Следуй рекомендациям, отслеживай прогресс и повышай результат без выгорания.",
  },
];
const testimonials = [
  {
    name: "Анна Соколова",
    role: "Product Designer",
    quote:
      "За 8 недель я вышла на стабильный режим. План реально ощущается как личный тренер с мозгом data scientist.",
    rating: 5,
  },
  {
    name: "Илья Морозов",
    role: "Frontend Engineer",
    quote:
      "Наконец-то фитнес вписался в мой хаос. AI перестраивает неделю, если я пропустил день, и не рушит прогресс.",
    rating: 5,
  },
  {
    name: "Кристина Белова",
    role: "Маркетинг Lead",
    quote:
      "Очень стильный интерфейс и сильная аналитика. Минус 6 кг за 3 месяца без жёстких диет и перегрузок.",
    rating: 5,
  },
];
const faqItems = [
  {
    q: "Чем Smart Fitness Planner отличается от обычных программ?",
    a: "Обычные планы статичны. Здесь программа меняется каждую неделю на основе вашего восстановления, прогресса и расписания.",
  },
  {
    q: "Подходит ли платформа новичкам?",
    a: "Да. AI подбирает безопасную стартовую нагрузку, объясняет базовые паттерны и повышает сложность постепенно.",
  },
  {
    q: "Можно ли тренироваться дома без зала?",
    a: "Конечно. Вы выбираете доступный инвентарь, и система формирует домашние протоколы с эквивалентной эффективностью.",
  },
  {
    q: "Есть ли интеграция с трекерами и часами?",
    a: "Да, поддерживаются популярные носимые устройства для синхронизации пульса, сна и активности.",
  },
  {
    q: "Как считается прогресс?",
    a: "Платформа учитывает объём, интенсивность, регулярность, самочувствие и визуализирует тренд по ключевым целям.",
  },
  {
    q: "Можно ли отменить подписку в любой момент?",
    a: "Да, без долгих обязательств. Управление подпиской доступно в личном кабинете в один клик.",
  },
];
const footerGroups = [
  {
    title: "Продукт",
    links: ["Возможности", "Интеграции", "Обновления", "Roadmap"],
  },
  {
    title: "Ресурсы",
    links: ["Блог", "Гайды", "Документация", "Помощь"],
  },
  {
    title: "Компания",
    links: ["О нас", "Карьера", "Партнёры", "Контакты"],
  },
  {
    title: "Legal",
    links: ["Конфиденциальность", "Условия", "Cookies", "Compliance"],
  },
];
function useCountUp(value, shouldStart, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!shouldStart) return;
    const target = Number(value);
    const start = performance.now();
    let frameId = null;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const next = target * progress;
      setCount(progress >= 1 ? target : next);
      if (progress < 1) frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [value, shouldStart, duration]);
  return count;
}
function formatStat(value, suffix, count) {
  const isDecimal = value % 1 !== 0;
  const shown = isDecimal ? count.toFixed(1) : Math.round(count).toString();
  return `${shown}${suffix}`;
}
export default function SmartFitnessPlanner() {
  const [navSolid, setNavSolid] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [yearly, setYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleMap, setVisibleMap] = useState({});
  const [statsActive, setStatsActive] = useState(false);
  const sectionRefs = useRef([]);
  const statsRef = useRef(null);
  const priceData = useMemo(() => {
    const monthly = [
      { name: "Базовый", price: 19, badge: "", features: ["AI-план тренировок", "Трекер прогресса", "База упражнений"] },
      {
        name: "Про",
        price: 39,
        badge: "Популярный",
        features: ["Всё из Базового", "Адаптивная нагрузка", "Глубокая аналитика", "Питание и recovery"],
      },
      {
        name: "Энтерпрайз",
        price: 89,
        badge: "",
        features: ["Всё из Про", "Командные кабинеты", "Dedicated support", "White-label API"],
      },
    ];
    if (!yearly) return monthly;
    return monthly.map((plan) => ({
      ...plan,
      price: Math.round(plan.price * 10),
      yearlyNote: "2 месяца в подарок",
    }));
  }, [yearly]);
  const counters = stats.map((s) => useCountUp(s.value, statsActive, 2000));
  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = entry.target.dataset.section;
            setVisibleMap((prev) => ({ ...prev, [idx]: true }));
          }
        });
      },
      { threshold: 0.15 }
    );
    sectionRefs.current.forEach((item) => item && observer.observe(item));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!statsRef.current) return;
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setStatsActive(true);
        });
      },
      { threshold: 0.35 }
    );
    statsObserver.observe(statsRef.current);
    return () => statsObserver.disconnect();
  }, []);
  const navLinks = [
    { id: "features", label: "Возможности" },
    { id: "how", label: "Как это работает" },
    { id: "pricing", label: "Цены" },
    { id: "faq", label: "FAQ" },
  ];
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenu(false);
  };
  return (
    <div
      className="min-h-screen text-white selection:bg-orange-400/40"
      style={{
        backgroundColor: "var(--bg-primary)",
        backgroundImage:
          "radial-gradient(circle at 15% 20%, rgba(255,120,64,0.12), transparent 30%), radial-gradient(circle at 85% 10%, rgba(244,63,94,0.14), transparent 32%), radial-gradient(circle at 40% 80%, rgba(251,146,60,0.10), transparent 32%)",
      }}
    >
      <style>{`
        :root {
          --bg-primary: #08080f;
          --accent-from: #ff7a18;
          --accent-to: #ff3b6b;
          --card-bg: rgba(255, 255, 255, 0.05);
          --border: rgba(255, 255, 255, 0.14);
        }
        html { scroll-behavior: smooth; }
        .fade-in-up {
          opacity: 0;
          transform: translateY(28px);
          animation: fadeInUp 0.8s ease forwards;
        }
        .reveal {
          opacity: 0;
          transform: translateY(26px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal.show {
          opacity: 1;
          transform: translateY(0px);
        }
        .blob {
          position: absolute;
          border-radius: 9999px;
          filter: blur(24px);
          animation: floatBlob 10s ease-in-out infinite;
        }
        .btn-glow:hover {
          transform: scale(1.05);
          box-shadow: 0 0 30px rgba(255, 109, 54, 0.5);
        }
        .card-hover:hover {
          transform: scale(1.03) translateY(-4px);
          border-color: rgba(255, 132, 67, 0.7);
          box-shadow: 0 0 24px rgba(255, 106, 76, 0.25);
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatBlob {
          0%,100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.6; }
          50% { transform: translateY(-18px) translateX(12px) scale(1.08); opacity: 0.9; }
        }
      `}</style>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          navSolid ? "bg-black/55 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <button className="flex items-center gap-2" onClick={() => scrollToId("hero")}>
              <Dumbbell className="h-6 w-6 text-orange-400" />
              <span className="font-semibold tracking-wide">SmartFitness AI</span>
            </button>
            <nav className="hidden md:flex items-center gap-8 text-sm text-white/80">
              {navLinks.map((item) => (
                <button
                  key={item.id}
                  className="transition hover:text-white min-h-[44px]"
                  onClick={() => scrollToId(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="hidden md:block">
              <button
                onClick={() => scrollToId("cta")}
                className="btn-glow min-h-[44px] rounded-xl px-5 py-2.5 text-sm font-semibold transition-all"
                style={{ background: "linear-gradient(90deg,var(--accent-from),var(--accent-to))" }}
              >
                Начать бесплатно
              </button>
            </div>
            <button className="md:hidden min-h-[44px] min-w-[44px]" onClick={() => setMobileMenu((v) => !v)}>
              {mobileMenu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileMenu ? "max-h-96 border-t border-white/10 bg-black/80 backdrop-blur-xl" : "max-h-0"
          }`}
        >
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((item) => (
              <button
                key={item.id}
                className="block w-full rounded-lg px-3 py-3 text-left text-white/90 hover:bg-white/10 min-h-[44px]"
                onClick={() => scrollToId(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </header>
      <section id="hero" className="relative overflow-hidden px-4 pb-20 pt-16 sm:pt-24">
        <div className="blob h-56 w-56 bg-orange-500/40 left-[-60px] top-10" />
        <div className="blob h-64 w-64 bg-pink-500/35 right-[-80px] top-36" style={{ animationDelay: "1.2s" }} />
        <div className="blob h-72 w-72 bg-amber-500/25 left-[35%] bottom-[-90px]" style={{ animationDelay: "2s" }} />
        <div className="mx-auto max-w-6xl text-center relative">
          <p className="fade-in-up text-xs sm:text-sm uppercase tracking-[0.24em] text-orange-300/80" style={{ animationDelay: "0.1s" }}>
            AI-Платформа персональных тренировок
          </p>
          <h1
            className="fade-in-up mt-4 text-4xl font-extrabold leading-tight sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.2s" }}
          >
            Твоя форма будущего.
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg,var(--accent-from),var(--accent-to))" }}
            >
              Умный фитнес-планер на AI.
            </span>
          </h1>
          <p className="fade-in-up mx-auto mt-6 max-w-2xl text-base text-white/75 sm:text-lg" style={{ animationDelay: "0.35s" }}>
            Smart Fitness Planner проектирует персональные тренировки, адаптирует нагрузку в реальном времени и
            доводит до результата быстрее, чем классические программы.
          </p>
          <div className="fade-in-up mt-9 flex flex-col justify-center gap-4 sm:flex-row" style={{ animationDelay: "0.5s" }}>
            <button
              onClick={() => scrollToId("pricing")}
              className="btn-glow inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl px-7 py-3 font-semibold transition-all"
              style={{ background: "linear-gradient(90deg,var(--accent-from),var(--accent-to))" }}
            >
              Попробовать 14 дней <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollToId("how")}
              className="btn-glow min-h-[48px] rounded-xl border border-white/20 bg-white/5 px-7 py-3 font-semibold text-white/90 transition-all hover:bg-white/10"
            >
              Смотреть демо
            </button>
          </div>
        </div>
      </section>
      <section
        id="features"
        ref={(el) => (sectionRefs.current[0] = el)}
        data-section="0"
        className={`reveal px-4 py-16 sm:py-20 ${visibleMap[0] ? "show" : ""}`}
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold sm:text-4xl">Почему выбирают SmartFitness AI</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-white/70">
            Всё, что нужно для прогресса: интеллект, дисциплина и визуально безупречный опыт.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="card-hover rounded-2xl border p-6 transition-all duration-300"
                  style={{
                    background: "var(--card-bg)",
                    borderColor: "var(--border)",
                    backdropFilter: "blur(14px)",
                    transitionDelay: `${idx * 90}ms`,
                  }}
                >
                  <div
                    className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{ background: "linear-gradient(135deg,var(--accent-from),var(--accent-to))" }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-white/70">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section
        ref={statsRef}
        data-section="1"
        className={`reveal px-4 py-14 sm:py-20 ${visibleMap[1] ? "show" : ""}`}
        style={{
          borderTop: "1px solid rgba(255,255,255,0.12)",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
          background: "linear-gradient(90deg, rgba(255,122,24,0.08), rgba(255,59,107,0.08))",
        }}
      >
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, idx) => (
            <div key={item.label} className="text-center">
              <div className="text-4xl font-extrabold sm:text-5xl">
                {formatStat(item.value, item.suffix, counters[idx])}
              </div>
              <p className="mt-2 text-sm uppercase tracking-widest text-white/65">{item.label}</p>
            </div>
          ))}
        </div>
      </section>
      <section
        id="how"
        ref={(el) => (sectionRefs.current[2] = el)}
        data-section="2"
        className={`reveal px-4 py-16 sm:py-20 ${visibleMap[2] ? "show" : ""}`}
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold sm:text-4xl">Как это работает</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="relative rounded-2xl border p-6"
                  style={{ background: "var(--card-bg)", borderColor: "var(--border)", backdropFilter: "blur(12px)" }}
                >
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-4 top-12 h-[2px] w-8 bg-gradient-to-r from-orange-400 to-pink-500" />
                  )}
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold"
                      style={{ background: "linear-gradient(90deg,var(--accent-from),var(--accent-to))" }}
                    >
                      {i + 1}
                    </span>
                    <Icon className="h-5 w-5 text-orange-300" />
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-white/70">{step.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section
        ref={(el) => (sectionRefs.current[3] = el)}
        data-section="3"
        className={`reveal px-4 py-16 sm:py-20 ${visibleMap[3] ? "show" : ""}`}
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold sm:text-4xl">Отзывы</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item) => {
              const initials = item.name
                .split(" ")
                .map((v) => v[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();
              return (
                <article
                  key={item.name}
                  className="card-hover rounded-2xl border p-6 transition-all duration-300"
                  style={{ background: "var(--card-bg)", borderColor: "var(--border)", backdropFilter: "blur(12px)" }}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full font-bold"
                        style={{ background: "linear-gradient(135deg,var(--accent-from),var(--accent-to))" }}
                      >
                        {initials}
                      </span>
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-white/65">{item.role}</p>
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(item.rating)].map((_, idx) => (
                        <Star key={idx} className="h-4 w-4 fill-orange-300 text-orange-300" />
                      ))}
                    </div>
                  </div>
                  <p className="text-white/75">"{item.quote}"</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section
        id="pricing"
        ref={(el) => (sectionRefs.current[4] = el)}
        data-section="4"
        className={`reveal px-4 py-16 sm:py-20 ${visibleMap[4] ? "show" : ""}`}
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold sm:text-4xl">Тарифы без компромиссов</h2>
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setYearly((v) => !v)}
              className="inline-flex min-h-[44px] items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2"
            >
              <span className={`${!yearly ? "text-white" : "text-white/60"}`}>Месяц</span>
              <span className="relative h-6 w-11 rounded-full bg-white/20">
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${
                    yearly ? "left-[22px]" : "left-0.5"
                  }`}
                />
              </span>
              <span className={`${yearly ? "text-white" : "text-white/60"}`}>Год</span>
              <span className="rounded-full bg-orange-500/20 px-2 py-1 text-xs text-orange-200">-17%</span>
            </button>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {priceData.map((plan) => {
              const popular = plan.name === "Про";
              return (
                <article
                  key={plan.name}
                  className={`card-hover relative rounded-2xl border p-6 transition-all duration-300 ${
                    popular ? "scale-[1.02] border-orange-400/60" : ""
                  }`}
                  style={{ background: "var(--card-bg)", borderColor: popular ? "rgba(255,132,67,0.65)" : "var(--border)" }}
                >
                  {plan.badge && (
                    <span
                      className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-semibold"
                      style={{ background: "linear-gradient(90deg,var(--accent-from),var(--accent-to))" }}
                    >
                      {plan.badge}
                    </span>
                  )}
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <div className="mt-4">
                    <span className="text-4xl font-extrabold">${plan.price}</span>
                    <span className="text-white/65"> / {yearly ? "год" : "мес"}</span>
                  </div>
                  {plan.yearlyNote && <p className="mt-1 text-xs text-orange-200">{plan.yearlyNote}</p>}
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-white/80">
                        <Check className="h-4 w-4 text-orange-300" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="btn-glow mt-7 w-full min-h-[46px] rounded-xl px-4 py-2 font-semibold transition-all"
                    style={{
                      background: popular ? "linear-gradient(90deg,var(--accent-from),var(--accent-to))" : "rgba(255,255,255,0.08)",
                    }}
                  >
                    Выбрать {plan.name}
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section
        id="faq"
        ref={(el) => (sectionRefs.current[5] = el)}
        data-section="5"
        className={`reveal px-4 py-16 sm:py-20 ${visibleMap[5] ? "show" : ""}`}
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold sm:text-4xl">FAQ</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {faqItems.map((item, idx) => {
              const open = openFaq === idx;
              return (
                <div key={item.q} className="rounded-xl border border-white/15 bg-white/5 p-4 backdrop-blur-xl">
                  <button
                    className="flex min-h-[44px] w-full items-center justify-between gap-3 text-left"
                    onClick={() => setOpenFaq(open ? -1 : idx)}
                  >
                    <span className="font-medium">{item.q}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-40 pt-3" : "max-h-0"}`}>
                    <p className="text-sm text-white/70">{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section id="cta" className="px-4 py-16 sm:py-20">
        <div
          className="mx-auto max-w-7xl overflow-hidden rounded-3xl px-6 py-12 text-center sm:px-10"
          style={{ background: "linear-gradient(100deg,var(--accent-from),var(--accent-to))" }}
        >
          <h2 className="text-3xl font-extrabold sm:text-4xl">Готов прокачать форму вместе с AI?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/90">
            Подпишитесь и получите персональный демо-план + чеклист эффективной недели.
          </p>
          <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Введите ваш email"
              className="min-h-[48px] flex-1 rounded-xl border border-white/35 bg-black/25 px-4 outline-none placeholder:text-white/70"
            />
            <button className="btn-glow min-h-[48px] rounded-xl bg-black/30 px-6 font-semibold transition-all hover:bg-black/40">
              Подписаться
            </button>
          </div>
        </div>
      </section>
      <footer className="border-t border-white/10 px-4 pb-8 pt-14">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <Dumbbell className="h-6 w-6 text-orange-400" />
              <span className="text-lg font-semibold">SmartFitness AI</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-white/65">
              Интеллектуальная экосистема персональных тренировок для людей, которым важен измеримый прогресс.
            </p>
            <div className="mt-5 flex gap-3 text-white/75">
              {[Github, Twitter, Linkedin, Instagram].map((Icon, idx) => (
                <button
                  key={idx}
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-white/15 bg-white/5 transition hover:bg-white/10"
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h4 className="font-semibold">{group.title}</h4>
              <ul className="mt-4 space-y-2 text-sm text-white/65">
                {group.links.map((link) => (
                  <li key={link}>
                    <button className="transition hover:text-white">{link}</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-sm text-white/50">
          © {new Date().getFullYear()} SmartFitness AI. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
