import { genericOpenQuestions, screenQuestions } from '../data/content';

export function Fake({
  children,
  mono = false,
  source = 'set sintetic',
  verified = '08 septembrie 2026',
}: {
  children: React.ReactNode;
  mono?: boolean;
  source?: string;
  verified?: string;
}) {
  return (
    <span className={mono ? 'fake-value fake-value--mono' : 'fake-value'}>
      <em className="fake-token">{children}</em>
      <span className="fake-meta">
        sursă: {source}; verificat: {verified}
      </span>
    </span>
  );
}

export function PlaceholderBox({ label, tall = false }: { label: string; tall?: boolean }) {
  return (
    <div className={tall ? 'placeholder placeholder--tall' : 'placeholder'} role="img" aria-label={label}>
      <span>{label}</span>
    </div>
  );
}

type QuestionScreen = keyof typeof screenQuestions;

export function OpenQuestions({ screen }: { screen: QuestionScreen | QuestionScreen[] }) {
  const screens = Array.isArray(screen) ? screen : [screen];
  return (
    <aside className="open-questions" aria-labelledby="open-questions-title">
      <h2 id="open-questions-title">Întrebări deschise</h2>
      <ul>
        {[...screens.flatMap((key) => screenQuestions[key] ?? []), ...genericOpenQuestions].map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}

export function MetricGrid({
  items,
}: {
  items: { label: string; value: string; source: string; note: string; verified?: string }[];
}) {
  return (
    <div className="metric-grid">
      {items.map((item) => (
        <article className="metric-card" key={item.label}>
          <span className="label">{item.label}</span>
          <Fake source={item.source} verified={item.verified}>
            {item.value}
          </Fake>
          <p>{item.note}</p>
        </article>
      ))}
    </div>
  );
}

export function SourceFlow({ items }: { items: string[] }) {
  return (
    <ol className="source-flow">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ol>
  );
}
