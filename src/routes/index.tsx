import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import draManoelaHero from "@/assets/dra-manoela-hero.png.asset.json";
import draManoelaEvento from "@/assets/dra-manoela-evento-v2.jpeg.asset.json";
import clinica1 from "@/assets/clinica-1.webp.asset.json";
import clinica2 from "@/assets/clinica-2.webp.asset.json";
import clinica3 from "@/assets/clinica-3.webp.asset.json";
import pacienteCamila from "@/assets/paciente-camila.jpeg.asset.json";
import pacienteRafa from "@/assets/paciente-rafa.jpeg.asset.json";
import pacienteHhaline from "@/assets/paciente-hhaline.jpeg.asset.json";
import pacienteKaren from "@/assets/paciente-karen.jpeg.asset.json";
import fotoComDraKaren from "@/assets/foto-com-dra-karen.jpeg.asset.json";
import fotoComDraCamila from "@/assets/foto-com-dra-camila.jpeg.asset.json";




const WHATSAPP_NUMBER = "5511917431212";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Olá, Dra. Manoela. Gostaria de agendar uma consulta particular.",
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

const ENDERECO_CONSULTORIO = "R. Pedroso Alvarenga, 1255 - Itaim Bibi, São Paulo - SP, 04531-012";
const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ENDERECO_CONSULTORIO)}`;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function trackWhatsAppConversion() {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: "AW-18245418780/YNRrCIng1sIcEJz-i_xD",
      value: 1.0,
      currency: "BRL",
    });
  }
}

const VIDEOS = [
  { id: "n49yn1Y5iXA", title: "Entrevista — Dra. Manoela Souza" },
  { id: "LhZoYhZWSLo", title: "Participação em entrevista" },
  { id: "MvhZoUD1epc", title: "Participação em entrevista" },
];

const ARTIGO_DESTAQUE = {
  categoria: "Eventos · Bem-estar",
  titulo:
    "Dra. Manoela Souza no encontro de bem-estar em São Paulo",
  resumo:
    "A revista QUEM destacou o encontro em São Paulo que reuniu nomes da medicina e do entretenimento em torno de saúde, longevidade e qualidade de vida — com a Dra. Manoela Souza como referência médica em emagrecimento clínico e acompanhamento individualizado.",
  veiculo: "Revista QUEM · Globo",
  url: "https://revistaquem.globo.com/eventos/noticia/2026/03/famosas-prestigiam-encontro-de-bem-estar-em-sp.ghtml",
  capa: "/assets/quem-materia-dra-manoela.jpg",
};

const ARTIGOS_SECUNDARIOS = [
  {
    categoria: "Entrevista ao vivo",
    titulo: "Live com a Dra. Manoela Souza — emagrecimento clínico e saúde metabólica",
    veiculo: "YouTube · Ao vivo",
    url: "https://www.youtube.com/live/YCVKqE1JPxo?si=5_K_y78-CDVVt7Gi",
  },
  {
    categoria: "Bem-estar",
    titulo:
      "Médica alerta para riscos da automedicação com canetas emagrecedoras adotadas por famosas",
    veiculo: "CARAS · Bem-estar",
    url: "https://caras.com.br/bem-estar/medica-alerta-riscos-da-automedicacao-com-canetas-emagrecedoras-adotadas-por-famosas.phtml",
  },
  {
    categoria: "História de paciente",
    titulo:
      "Camila Moura perde 40 kg com acompanhamento médico: ‘Não foi um processo rápido nem simples’",
    veiculo: "Portal Léo Dias · Saúde",
    url: "https://portalleodias.com/saude/ex-fazenda-camila-moura-perde-40-kg-nao-foi-um-processo-rapido-e-nem-simples",
  },
];


type Historia = {
  nome: string;
  contexto: string;
  foto: string | null;
  iniciais: string;
  texto: string;
  fotoComDra?: string;
  fotoComDraPosition?: string;
  fotoComDraAspect?: string;
  fotoComDraFit?: "cover" | "contain";
  miniaturaPosition?: string;
};

const HISTORIAS: Historia[] = [
  {
    nome: "Karen Bacic",
    contexto: "Ex-participante de Casamento às Cegas",
    foto: pacienteKaren.url,
    iniciais: "KB",
    texto:
      "Encontrei confiança e autoestima para voltar a me sentir bem comigo mesma.",
    fotoComDra: fotoComDraCamila.url,
    fotoComDraPosition: "center 18%",
  },
  {
    nome: "Camila Moura",
    contexto: "Influenciadora digital",
    foto: pacienteCamila.url,
    iniciais: "CM",
    texto:
      "Um processo cuidadoso, conduzido com atenção médica e acolhimento em cada etapa.",
    fotoComDra: fotoComDraKaren.url,
    fotoComDraPosition: "center 15%",
  },
  {
    nome: "Rafa Godinho",
    contexto: "Diretor de marketing · ex-Mynd",
    foto: pacienteRafa.url,
    iniciais: "RG",
    texto:
      "Uma transformação de dentro para fora, construída com acompanhamento multidisciplinar e cuidado real.",
  },
  {
    nome: "Haline",
    contexto: "Paciente · relato público",
    foto: pacienteHhaline.url,
    iniciais: "H",
    texto:
      "Fui vista além do peso. Acolhida, escutada e acompanhada com seriedade.",
  },
  {
    nome: "Jessilane Alves",
    contexto: "Comunicadora · ex-BBB",
    foto: "/assets/jessilane-avatar.jpg",
    iniciais: "JA",
    texto:
      "Um acompanhamento que respeita o tempo, a rotina e a individualidade de cada pessoa.",
    fotoComDra: "/assets/jessilane-dra-manoela.jpg",
    fotoComDraPosition: "center 40%",
  },
];

const HERO_BADGES = [
  "CREMESP 0274007",
  "Emagrecimento Clínico",
  "Saúde Metabólica",
  "Suporte Multidisciplinar",
  "Acompanhamento Individualizado",
];

const DIFERENCIAIS = [
  {
    t: "Avaliação médica aprofundada",
    d: "Investigação clínica detalhada de histórico, exames, rotina e hábitos.",
  },
  {
    t: "Estratégia individualizada",
    d: "Conduta desenhada a partir do contexto e dos objetivos de cada paciente.",
  },
  {
    t: "Suporte multidisciplinar",
    d: "Atuação integrada com nutrição, psicologia e educação física quando necessário.",
  },
  {
    t: "Saúde metabólica além da balança",
    d: "Olhar para sono, composição corporal, energia, hormônios e qualidade de vida.",
  },
  {
    t: "Condutas baseadas em evidências",
    d: "Decisões clínicas fundamentadas em critérios médicos e ciência atual.",
  },
  {
    t: "Acompanhamento contínuo",
    d: "Monitoramento próximo, com ajustes ao longo de toda a jornada.",
  },
];

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      {
        title:
          "Dra. Manoela Souza — Emagrecimento clínico e saúde metabólica",
      },
      {
        name: "description",
        content:
          "Acompanhamento médico individualizado para emagrecimento clínico, saúde metabólica e qualidade de vida.",
      },
      {
        property: "og:title",
        content:
          "Dra. Manoela Souza — Emagrecimento clínico e saúde metabólica",
      },
      {
        property: "og:description",
        content:
          "Acompanhamento médico individualizado para emagrecimento clínico, saúde metabólica e qualidade de vida.",
      },
      {
        name: "twitter:title",
        content:
          "Dra. Manoela Souza — Emagrecimento clínico e saúde metabólica",
      },
      {
        name: "twitter:description",
        content:
          "Acompanhamento médico individualizado para emagrecimento clínico, saúde metabólica e qualidade de vida.",
      },
    ],
  }),
});

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.04 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.889-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.04 0C5.463 0 .11 5.353.107 11.93c0 2.096.547 4.142 1.588 5.945L0 24l6.304-1.654a11.882 11.882 0 005.732 1.459h.005c6.576 0 11.93-5.354 11.932-11.93a11.86 11.86 0 00-3.495-8.435z" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ConsultorioCarousel() {
  const slides = [clinica1, clinica2, clinica3];
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const startX = useRef<number | null>(null);
  const deltaX = useRef(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4000);
    return () => clearInterval(id);
  }, [slides.length]);

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    deltaX.current = 0;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    deltaX.current = e.touches[0].clientX - startX.current;
  };
  const onTouchEnd = () => {
    if (Math.abs(deltaX.current) > 40) {
      if (deltaX.current < 0) setIndex((i) => (i + 1) % slides.length);
      else setIndex((i) => (i - 1 + slides.length) % slides.length);
    }
    startX.current = null;
    deltaX.current = 0;
  };

  return (
    <div className="w-full">
      <div
        ref={trackRef}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.25rem] bg-[var(--surface)] sm:aspect-[4/5]"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {slides.map((img, i) => (
          <img
            key={i}
            src={img.url}
            alt={`Consultório da Dra. Manoela Souza`}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            sizes="(min-width: 1024px) 720px, 100vw"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            style={{ imageRendering: "auto" }}
          />
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ir para imagem ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-[3px] rounded-full transition-all ${
              i === index ? "w-6 bg-foreground" : "w-3 bg-foreground/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function AvatarImg({
  src,
  alt,
  iniciais,
  objectPosition,
}: {
  src: string | null;
  alt: string;
  iniciais: string;
  objectPosition?: string;
}) {
  const [errored, setErrored] = useState(false);
  if (!src || errored) {
    return (
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--olive)]/30 bg-[var(--olive)]/10 font-display text-base text-[var(--olive)]">
        {iniciais}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setErrored(true)}
      className="h-12 w-12 shrink-0 rounded-full object-cover"
      style={{ objectPosition: objectPosition ?? "center" }}
    />
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="border-b border-border/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 sm:px-10 sm:py-7">
          <span className="font-display text-2xl tracking-tight sm:text-[1.7rem]">
            Dra. Manoela Souza
          </span>
          <a
            href={WHATSAPP_URL} onClick={trackWhatsAppConversion}
            target="_blank"
            rel="noopener"
            className="hidden items-center gap-2.5 text-sm text-foreground/80 transition-colors hover:text-[var(--olive)] sm:inline-flex"
          >
            <WhatsAppIcon className="h-7 w-7" />
            WhatsApp
          </a>
        </div>
      </header>


      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-16 sm:px-10 sm:pt-24 lg:pt-32">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <div>
            <h1 className="font-display text-[2.1rem] leading-[1.12] tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem]">
              Emagrecer com{" "}
              <em className="not-italic text-[var(--olive)]">cuidado médico de verdade</em>{" "}
              e suporte multidisciplinar.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Acompanhamento clínico próximo para quem quer perder peso preservando a saúde
              e construindo resultados que se sustentam ao longo do tempo.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <a
                href={WHATSAPP_URL} onClick={trackWhatsAppConversion}
                target="_blank"
                rel="noopener"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-all hover:bg-[var(--olive)]"
              >
                Agendar consulta
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href={WHATSAPP_URL} onClick={trackWhatsAppConversion}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-border bg-background px-7 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-[var(--olive)] hover:text-[var(--olive)]"
              >
                <WhatsAppIcon className="h-7 w-7" />
                Falar no WhatsApp
              </a>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-3 gap-y-2.5">
              {HERO_BADGES.map((b) => (
                <li
                  key={b}
                  className="inline-flex items-center rounded-full border border-border/80 bg-[var(--surface)]/60 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-foreground/70"
                >
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative w-full">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.5rem] bg-[var(--surface)] shadow-[0_30px_60px_-30px_rgba(60,60,40,0.18)]">
              <img
                src={draManoelaHero.url}
                alt="Dra. Manoela Souza"
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* PARA QUEM É */}
      <section className="mx-auto max-w-3xl px-6 py-20 sm:px-0 sm:py-28">
        <h2 className="text-center font-display text-[2.5rem] font-normal italic leading-none text-foreground sm:text-[2.75rem]">
          Para quem é
        </h2>
        <div className="mx-auto mt-3 h-px w-10 bg-[var(--gold)]" />

        {(() => {
          const itens = [
            {
              icone: (
                <>
                  <circle cx="12" cy="12" r="6.9" />
                  <circle cx="12" cy="12" r="3.7" />
                  <path d="M12 7.6v8.8M7.6 12h8.8" />
                </>
              ),
              t: "Emagrecimento Consciente",
              d: "Para quem busca perder peso com acompanhamento médico de alto nível e segurança.",
            },
            {
              icone: (
                <>
                  <circle cx="12" cy="12" r="7" />
                  <rect x="9.3" y="9.3" width="5.4" height="5.4" rx="1" />
                  <path d="M12 6.6v2M12 15.4v2M6.6 12h2M15.4 12h2" />
                </>
              ),
              t: "Saúde Metabólica",
              d: "Foco na reversão de quadros de pré-diabetes e otimização do seu metabolismo.",
            },
            {
              icone: (
                <>
                  <path d="M5.2 9.1c1.7-1.45 3.4-1.45 5.1 0s3.4 1.45 5.1 0 3.4-1.45 5.1 0" />
                  <path d="M5.2 13.1c1.7-1.45 3.4-1.45 5.1 0s3.4 1.45 5.1 0 3.4-1.45 5.1 0" />
                </>
              ),
              t: "Equilíbrio Hormonal",
              d: "Ajustes precisos para mulheres que desejam recuperar sua vitalidade e bem-estar.",
            },
            {
              icone: (
                <>
                  <path d="M12 4.2 18 6.4v4.7c0 3.45-2.45 6.2-6 7.25-3.55-1.05-6-3.8-6-7.25V6.4l6-2.2Z" />
                  <path d="M12 8.4v5.2" />
                </>
              ),
              t: "Longevidade Ativa",
              d: "Prevenção e cuidados para um envelhecimento saudável e com autonomia.",
            },
            {
              icone: (
                <>
                  <circle cx="12" cy="12" r="7" />
                  <path d="M12 8.5v7M8.5 12h7" />
                </>
              ),
              t: "Protocolo Exclusivo",
              d: "Atendimento individualizado com exames detalhados e plano de ação personalizado.",
            },
            {
              icone: (
                <path d="M12 18.1S5.9 14.35 5.9 9.75a3.25 3.25 0 0 1 5.95-1.8l.15.22.15-.22a3.25 3.25 0 0 1 5.95 1.8c0 4.6-6.1 8.35-6.1 8.35Z" />
              ),
              t: "Performance e Vigor",
              d: "Para quem deseja elevar seu nível de energia e disposição para o cotidiano.",
            },
          ];
          return (
            <div className="mt-14 grid gap-y-14 sm:grid-cols-2 sm:gap-x-16 sm:gap-y-16">
              {itens.map((it) => (
                <div key={it.t} className="flex flex-col items-center text-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.65"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-[4.5rem] w-[4.5rem] text-[var(--gold)]"
                    aria-hidden="true"
                  >
                    {it.icone}
                  </svg>
                  <h3 className="mt-7 font-display text-[1.5rem] font-normal leading-tight text-foreground sm:text-[1.65rem]">
                    {it.t}
                  </h3>
                  <p className="mx-auto mt-5 max-w-[17rem] text-[1.05rem] leading-[1.75] text-muted-foreground sm:max-w-xs sm:text-lg sm:leading-[1.75]">
                    {it.d}
                  </p>
                </div>
              ))}
            </div>
          );

        })()}
      </section>

      <Divider />



      {/* SOBRE */}
      <section className="mx-auto max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
        <div className="grid items-center gap-12 md:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="relative mx-auto w-full max-w-[360px] md:max-w-[400px]">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.25rem] bg-[var(--surface)] shadow-[0_24px_50px_-28px_rgba(60,60,40,0.22)]">
              <img
                src={draManoelaEvento.url}
                alt="Dra. Manoela Souza em evento"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--olive)]">
              Sobre
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
              Dra. Manoela Souza
            </h2>
            <div className="mt-6 max-w-xl space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>
                Dra. Manoela Souza é médica com atuação voltada ao
                emagrecimento clínico, saúde metabólica e qualidade de vida.
              </p>
              <p>
                Seu acompanhamento considera histórico, rotina, exames, hábitos,
                composição corporal e objetivos individuais, com suporte
                multidisciplinar quando necessário.
              </p>
              <p>
                A proposta é construir um plano seguro, realista e possível de
                manter, respeitando a realidade de cada paciente.
              </p>
            </div>
            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-2 text-sm">
              <div>
                <dt className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  Registro
                </dt>
                <dd className="mt-1 font-medium">CREMESP 0274007</dd>
              </div>
            </dl>
            <div className="mt-10">
              <a
                href={WHATSAPP_URL} onClick={trackWhatsAppConversion}
                target="_blank"
                rel="noopener"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-all hover:bg-[var(--olive)]"
              >
                Agendar consulta
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* CONSULTÓRIO — carousel + texto ao lado */}
      <section className="mx-auto max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
        <div className="grid items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <div className="mx-auto w-full max-w-[360px] lg:max-w-none">
            <ConsultorioCarousel />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              O consultório
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
              Um ambiente pensado para acolher
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>
                Cada etapa do acompanhamento acontece em um espaço preparado para oferecer
                conforto, privacidade e tranquilidade durante o tratamento.
              </p>
              <p>
                O objetivo é que cada paciente se sinta segura, acolhida e acompanhada
                durante toda a jornada.
              </p>
            </div>
            <div className="mt-8 border-t border-border/60 pt-6">
              <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Atendimento presencial
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/85">
                {ENDERECO_CONSULTORIO}
              </p>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-[var(--olive)] transition-opacity hover:opacity-70"
              >
                Ver no Google Maps
                <ArrowIcon className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Divider />


      {/* DIFERENCIAIS */}
      <section className="bg-[var(--surface)]">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">
              O que torna este acompanhamento diferente
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Mais do que promover perda de peso, o objetivo é construir uma estratégia que
              faça sentido para a realidade de cada paciente e possa ser mantida ao longo
              do tempo.
            </p>
          </div>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 sm:gap-x-16 sm:gap-y-12">
            {DIFERENCIAIS.map((d) => (
              <div key={d.t} className="flex gap-5">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--olive)]" />
                <div>
                  <h3 className="font-display text-xl">{d.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {d.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HISTÓRIAS REAIS */}
      <section className="mx-auto max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">
            Histórias reais de transformação
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Relatos públicos compartilhados por pacientes que confiaram seu processo à
            Dra. Manoela Souza.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 sm:gap-7">
          {HISTORIAS.map((h, i) => {
            const isLast = i === HISTORIAS.length - 1;
            const isOddLast = isLast && HISTORIAS.length % 2 === 1;
            return (
            <article
              key={h.nome}
              className={`flex flex-col overflow-hidden rounded-[1.5rem] border border-border bg-[var(--surface)]/40 transition-colors hover:border-[var(--olive)]/40 ${
                isOddLast ? "sm:col-span-2 sm:mx-auto sm:max-w-xl" : ""
              }`}
            >
              {h.fotoComDra && (
                <div className={`relative ${h.fotoComDraAspect ?? "aspect-[2/1]"} w-full overflow-hidden bg-[var(--surface)]`}>
                  <img
                    src={h.fotoComDra}
                    alt={`${h.nome} com a Dra. Manoela Souza`}
                    loading="lazy"
                    decoding="async"
                    className={`h-full w-full ${h.fotoComDraFit === "contain" ? "object-contain" : "object-cover"}`}
                    style={{ objectPosition: h.fotoComDraPosition ?? "center" }}
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col gap-6 p-7 sm:p-9">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-6 w-6 text-[var(--olive)]"
                  fill="currentColor"
                >
                  <path d="M9.5 6C6 6 4 8.5 4 12v6h6v-6H7c0-2 1-3.5 3-4l-.5-2zm10 0c-3.5 0-5.5 2.5-5.5 6v6h6v-6h-3c0-2 1-3.5 3-4l-.5-2z" />
                </svg>
                <p className="font-display text-lg leading-snug text-foreground sm:text-xl">
                  “{h.texto}”
                </p>
                <div className="mt-auto flex items-center gap-4 border-t border-border/60 pt-5">
                  <AvatarImg
                    src={h.foto}
                    alt={h.nome}
                    iniciais={h.iniciais}
                    objectPosition={h.miniaturaPosition}
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{h.nome}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                      {h.contexto}
                    </p>
                  </div>
                </div>
              </div>
            </article>
            );
          })}
        </div>
      </section>

      <Divider />

      {/* PRESENÇA NA MÍDIA — editorial layout */}
      <section className="mx-auto max-w-[78rem] px-6 py-28 sm:px-10 sm:py-32">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[var(--caras)]" aria-hidden="true" />
            <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--caras)]">
              Imprensa
            </p>
          </div>
          <h2 className="mt-4 font-display text-[2.1rem] leading-tight sm:text-[2.8rem]">
            Presença na mídia
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Entrevistas, colunas e participações em matérias sobre saúde, emagrecimento
            clínico e cuidado médico individualizado.
          </p>
        </div>

        {/* Vídeos primeiro — maior autoridade visual */}
        <div className="mt-16">
          <div className="mb-7 flex items-center gap-3">
            <span className="h-px w-8 bg-[var(--caras)]" aria-hidden="true" />
            <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--caras)]">
              Entrevistas em vídeo
            </p>
            <span className="h-px flex-1 bg-border" />
          </div>
          <div className="grid gap-7 md:grid-cols-3">
            {VIDEOS.map((v) => (
              <div
                key={v.id}
                className="group overflow-hidden rounded-[1.25rem] border border-border bg-[var(--surface)] transition-colors hover:border-[var(--caras)]/40"
              >
                <div className="relative aspect-video w-full">
                  <iframe
                    src={`https://www.youtube.com/embed/${v.id}`}
                    title={v.title}
                    loading="lazy"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Layout editorial: destaque + coluna de últimas notícias */}
        <div className="mt-20 grid gap-12 lg:grid-cols-[1.45fr_1fr] lg:gap-16">
          {/* Matéria destaque */}
          <a
            href={ARTIGO_DESTAQUE.url}
            target="_blank"
            rel="noopener"
            className="group flex flex-col overflow-hidden rounded-[1.25rem] border border-border bg-[var(--surface)]/40 transition-all hover:border-[var(--caras)]/50 hover:bg-[var(--surface)]"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-foreground/95">
              <img
                src={ARTIGO_DESTAQUE.capa}
                alt="Capa da matéria na revista QUEM"
                loading="lazy"
                decoding="async"
                width={1200}
                height={675}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
              />
              <div
                aria-hidden="true"
                className="absolute left-0 right-0 top-0 h-1 bg-[var(--caras)]"
              />
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
              <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-[var(--caras)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
                Destaque
              </span>
            </div>
            <div className="flex flex-col gap-5 p-8 sm:p-10">
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-[var(--caras)]" aria-hidden="true" />
                <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--caras)]">
                  {ARTIGO_DESTAQUE.categoria}
                </p>
              </div>
              <h3 className="font-display text-[1.7rem] leading-snug text-foreground sm:text-[2rem]">
                {ARTIGO_DESTAQUE.titulo}
              </h3>
              <p className="text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                {ARTIGO_DESTAQUE.resumo}
              </p>
              <div className="mt-2 flex items-center justify-between gap-4 border-t border-border pt-5">
                <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  {ARTIGO_DESTAQUE.veiculo}
                </span>
                <span className="inline-flex items-center gap-2 text-sm text-foreground transition-colors group-hover:text-[var(--caras)]">
                  Ler matéria
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </a>

          {/* Coluna lateral — últimas notícias */}
          <aside>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-[var(--caras)]" aria-hidden="true" />
              <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--caras)]">
                Últimas notícias
              </p>
              <span className="h-px flex-1 bg-border" />
            </div>
            <ul className="divide-y divide-border border-y border-border">
              {ARTIGOS_SECUNDARIOS.map((a) => (
                <li key={a.titulo}>
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noopener"
                    className="group relative flex items-start justify-between gap-5 py-5 pl-4 transition-colors hover:bg-[var(--surface)]/60"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-1/2 h-0 w-[2px] -translate-y-1/2 bg-[var(--caras)] transition-all duration-300 group-hover:h-8"
                    />
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--caras)]">
                        {a.categoria}
                      </p>
                      <p className="mt-2 font-display text-[15px] leading-snug text-foreground sm:text-[16px]">
                        {a.titulo}
                      </p>
                      <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        {a.veiculo}
                      </p>
                    </div>
                    <ArrowIcon className="mt-1 h-4 w-4 shrink-0 text-foreground/50 transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--caras)]" />
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* BLOCO INSTITUCIONAL — COLUNA CARAS */}
      <section className="mx-auto max-w-[78rem] px-6 pb-28 sm:px-10 sm:pb-32">
        <div className="relative overflow-hidden rounded-[1.5rem] border border-border bg-[var(--surface)]/60 px-8 py-11 sm:px-12 sm:py-14">
          <div className="absolute inset-y-0 left-0 w-[3px] bg-[var(--caras)]" aria-hidden="true" />
          <div className="grid items-center gap-8 sm:grid-cols-[auto_1fr_auto]">
            <div className="relative flex h-16 w-28 items-center justify-center rounded-md bg-foreground px-4">
              <span className="font-display text-2xl font-medium tracking-[0.2em] text-background">
                CARAS
              </span>
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-1/2 h-[3px] w-10 -translate-x-1/2 bg-[var(--caras)]"
              />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-[var(--caras)]" aria-hidden="true" />
                <p className="text-[11px] uppercase tracking-[0.26em] text-[var(--caras)]">
                  Coluna mensal
                </p>
              </div>
              <h3 className="mt-3 font-display text-2xl leading-snug sm:text-[1.8rem]">
                Acompanhe a coluna da Dra. Manoela na Revista CARAS
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Conteúdos sobre emagrecimento clínico, saúde metabólica e bem-estar,
                publicados regularmente no canal de bem-estar da revista.
              </p>
            </div>
            <a
              href="https://caras.com.br/autor/dra-manoela-souza"
              target="_blank"
              rel="noopener"
              className="group inline-flex items-center gap-2 self-start rounded-full border border-foreground/80 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-[var(--caras)] hover:bg-[var(--caras)] hover:text-white sm:self-center"
            >
              Acessar coluna
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative overflow-hidden bg-foreground text-background">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, color-mix(in oklab, var(--olive) 80%, transparent), transparent 55%), radial-gradient(circle at 80% 70%, color-mix(in oklab, var(--gold) 65%, transparent), transparent 55%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 top-10 h-px w-80 rotate-[-8deg] bg-gradient-to-r from-transparent via-background/40 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 bottom-10 h-px w-80 rotate-[-8deg] bg-gradient-to-r from-transparent via-background/40 to-transparent"
        />

        <div className="relative mx-auto max-w-3xl px-6 py-28 text-center sm:px-10 sm:py-36">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--gold)]">
            Próximo passo
          </p>
          <div className="mx-auto mt-6 h-px w-16 bg-background/30" />
          <h2 className="mt-8 font-display text-[2.1rem] leading-[1.1] text-background sm:text-[3rem]">
            Comece sua jornada com{" "}
            <em className="not-italic text-[var(--gold)]">acompanhamento médico individualizado.</em>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-background/80 sm:text-lg">
            Se você busca emagrecer com segurança, suporte multidisciplinar e um
            plano possível de manter, fale com a equipe e agende sua consulta.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <a
              href={WHATSAPP_URL} onClick={trackWhatsAppConversion}
              target="_blank"
              rel="noopener"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-background px-9 py-4 text-base font-medium text-foreground shadow-[0_20px_45px_-20px_rgba(0,0,0,0.6)] transition-all hover:scale-[1.02] hover:bg-[var(--gold)] hover:text-foreground"
            >
              <WhatsAppIcon className="h-6 w-6" />
              Falar no WhatsApp
            </a>
            <a
              href={WHATSAPP_URL} onClick={trackWhatsAppConversion}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-background/40 px-9 py-4 text-base font-medium text-background transition-colors hover:border-background hover:bg-background/5"
            >
              Agendar consulta
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          <p className="mt-10 text-[11px] uppercase tracking-[0.22em] text-background/55">
            Atendimento particular · CREMESP 0274007
          </p>
        </div>
      </section>


      {/* FOOTER */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10">
          <div className="grid gap-10 sm:grid-cols-[1fr_auto]">
            <div>
              <p className="font-display text-lg">Dra. Manoela Souza</p>
              <p className="mt-2 text-sm text-muted-foreground">CREMESP 0274007</p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                Médica com atuação em emagrecimento clínico, saúde metabólica
                e qualidade de vida.
              </p>
              <p className="mt-5 text-xs uppercase tracking-[0.2em] text-muted-foreground/80">
                Atendimento presencial
              </p>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                {ENDERECO_CONSULTORIO}
              </p>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-[var(--olive)] transition-opacity hover:opacity-70"
              >
                Ver no Google Maps
                <ArrowIcon className="h-3.5 w-3.5" />
              </a>
            </div>
            <a
              href={WHATSAPP_URL} onClick={trackWhatsAppConversion}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2.5 self-start text-sm text-foreground/80 transition-colors hover:text-[var(--olive)]"
            >
              <WhatsAppIcon className="h-7 w-7" />
              WhatsApp
            </a>
          </div>
          <p className="mt-10 max-w-xl text-xs leading-relaxed text-muted-foreground">
            Informações com finalidade educativa. Nenhum conteúdo substitui consulta médica.
          </p>
          <p className="mt-6 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Dra. Manoela Souza. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* Sticky WhatsApp (mobile) */}
      <a
        href={WHATSAPP_URL} onClick={trackWhatsAppConversion}
        target="_blank"
        rel="noopener"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background shadow-lg shadow-black/10 transition-transform hover:scale-105 sm:h-14 sm:w-14"
      >
        <WhatsAppIcon className="h-8 w-8" />
      </a>
    </div>
  );
}

function Divider() {
  return (
    <div className="mx-auto max-w-6xl px-6 sm:px-10">
      <div className="hairline" />
    </div>
  );
}
