import Select from '../../components/Select';
import { useState } from "react";
import "./members.css";
import { RotateCcw, Download, Film } from "lucide-react";
import { createEvent } from "ics";

const sections = [
  ["", "Acasa"],
  ["cotizatii", "Cotizatii"],
  ["calendar", "Calendar"],
  ["documente", "Documente"],
  ["participare", "Participare"],
  ["organizatie", "Organizatie"],
  ["media", "Media"],
  ["setari", "Setari"],
];
const events = [
  {
    id: "adunare",
    title: "Adunarea filialei Model",
    date: "2026-10-15",
    time: "18:00",
    place: "Sala Exemplu",
    utcHour: 15,
    minute: 0,
    status: "Programat",
  },
  {
    id: "atelier",
    title: "Atelier pentru membri noi",
    date: "2026-10-22",
    time: "17:30",
    place: "Sala Demonstratie",
    utcHour: 14,
    minute: 30,
    status: "Programat",
  },
  {
    id: "arhiva",
    title: "Sedinta de organizare",
    date: "2026-09-01",
    time: "18:00",
    place: "Sala Exemplu",
    utcHour: 15,
    minute: 0,
    status: "Anulat",
  },
];
const documents = [
  {
    id: "proces-verbal",
    title: "Proces-verbal de sedinta",
    type: "Proces-verbal",
    date: "2026-09-01",
    restricted: false,
  },
  {
    id: "ordine-de-zi",
    title: "Ordinea de zi a adunarii",
    type: "Ordine de zi",
    date: "2026-10-15",
    restricted: false,
  },
  {
    id: "raport",
    title: "Raport administrativ",
    type: "Raport",
    date: "2026-09-01",
    restricted: true,
  },
];
const participation = [
  {
    id: "consultare",
    type: "Consultari",
    title: "Programul intalnirilor interne",
    status: "Deschis",
    deadline: "20 octombrie 2026",
    choices: ["In timpul saptamanii", "In weekend"],
  },
  {
    id: "alegere",
    type: "Alegeri",
    title: "Alegerea comisiei Model",
    status: "Deschis",
    deadline: "25 octombrie 2026",
    choices: ["Candidat Fictiv A", "Candidat Fictiv B"],
  },
  {
    id: "dezbatere",
    type: "Dezbateri",
    title: "Organizarea bibliotecii interne",
    status: "Inchis",
    deadline: "1 septembrie 2026",
    choices: [],
  },
];
const link = (section = "") => "#/membri" + (section ? "/" + section : "");
function exportCalendar(event: (typeof events)[number]) {
  const [year, month, day] = event.date.split("-").map(Number);
  const result = createEvent({
    title: "[DEMO] " + event.title,
    start: [year, month, day, event.utcHour, event.minute],
    startInputType: "utc",
    startOutputType: "utc",
    duration: { hours: 1 },
    location: event.place,
    description: "Eveniment fictiv pentru prezentare.",
    status: event.status === "Anulat" ? "CANCELLED" : "CONFIRMED",
  });
  if (result.value) download(event.id + "-demo.ics", result.value);
}
function download(name: string, contents: string) {
  const url = URL.createObjectURL(
    new Blob([contents], { type: "text/plain;charset=utf-8" }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function MemberDemo({ path }: { path: string }) {
  const [revision, setRevision] = useState(0);
  return (
    <MemberWorkspace
      key={revision}
      path={path}
      reset={() => setRevision((v) => v + 1)}
    />
  );
}

function MemberWorkspace({ path, reset }: { path: string; reset: () => void }) {
  const [persona, setPersona] = useState("Membru Model");
  const [visible, setVisible] = useState(false);
  const [savedVisible, setSavedVisible] = useState(false);
  const [notice, setNotice] = useState("");
  const [payment, setPayment] = useState("Restant");
  const [reviewPayment, setReviewPayment] = useState(false);
  const [paymentResult, setPaymentResult] = useState("In asteptare");
  const [period, setPeriod] = useState("Toate");
  const [query, setQuery] = useState("");
  const [docType, setDocType] = useState("Toate");
  const [eventFilter, setEventFilter] = useState("Toate");
  const [joined, setJoined] = useState<string[]>([]);
  const [tab, setTab] = useState("Consultari");
  const [choice, setChoice] = useState("");
  const [reviewChoice, setReviewChoice] = useState(false);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [unavailable, setUnavailable] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [section = "", id] = path.replace(/^\/membri\/?/, "").split("/");
  const current = path === "/implica-te" ? "" : section;
  const event = events.find((e) => e.id === id);
  const doc = documents.find((d) => d.id === id);
  const item = participation.find((p) => p.id === id);
  const rows = [
    { month: "Octombrie 2026", amount: "30 RON", status: payment },
    { month: "Septembrie 2026", amount: "30 RON", status: "Achitat" },
  ];
  const missing = Boolean(
    id &&
    !(
      (current === "calendar" && event) ||
      (current === "documente" && doc) ||
      (current === "participare" && item)
    ),
  );
  return (
    <div className="member-demo">
      <header className="member-heading">
        <div>
          <p className="eyebrow">Zona membrilor / Filiala Model</p>
          <h1>Spatiul meu</h1>
          <p>Date fictive. Platile si raspunsurile sunt simulate.</p>
        </div>
        <div className="member-controls">
          <label>
            Profil demonstrativ
            <Select
              value={persona}
              onChange={(e) => {
                setPersona(e.target.value);
                setNotice("");
              }}
            >
              <option>Membru Model</option>
              <option>Administrator Model</option>
            </Select>
          </label>
          <button
            onClick={reset}
            aria-label="Reseteaza demonstratia"
            title="Reseteaza demonstratia"
          >
            <RotateCcw size={18} aria-hidden="true" />
          </button>
        </div>
      </header>
      <nav className="member-nav" aria-label="Navigare membri">
        {sections.map(([key, title]) => (
          <a
            key={key}
            href={link(key)}
            aria-current={current === key ? "page" : undefined}
          >
            {title}
          </a>
        ))}
      </nav>
      <div className="member-content">
        {missing ? (
          <>
            <h2>Pagina indisponibila</h2>
            <a href={link()}>Inapoi la spatiul meu</a>
          </>
        ) : (
          <>
            {current === "" && (
              <>
                <h2>Buna ziua, {persona}</h2>
                <div className="member-summary">
                  <a href={link("cotizatii")}>
                    <span>Cotizatie octombrie</span>
                    <strong>30 RON</strong>
                    <span>{payment}</span>
                  </a>
                  <a href={link("calendar/adunare")}>
                    <span>Urmatoarea adunare</span>
                    <strong>15 octombrie</strong>
                    <span>18:00 / Europe/Bucharest</span>
                  </a>
                  <a href={link("participare")}>
                    <span>Participare</span>
                    <strong>
                      {2 - Object.keys(responses).length} in asteptare
                    </strong>
                    <span>Alegeri si consultari</span>
                  </a>
                </div>
                <h2>Acces rapid</h2>
                <div className="member-list">
                  {[
                    [
                      "documente",
                      "Documentele filialei",
                      "Ordini de zi, procese-verbale si rapoarte",
                    ],
                    [
                      "organizatie",
                      "Organizatia mea",
                      "Roluri si responsabilitati",
                    ],
                    [
                      "setari",
                      "Profilul meu",
                      savedVisible
                        ? "Vizibil in directorul fictiv"
                        : "Ascuns din directorul fictiv",
                    ],
                  ].map(([key, title, description]) => (
                    <a key={key} href={link(key)}>
                      <strong>{title}</strong>
                      <span>{description}</span>
                    </a>
                  ))}
                </div>
              </>
            )}
            {current === "cotizatii" && (
              <>
                <h2>Cotizatiile mele</h2>
                <p>
                  Octombrie 2026: <strong>30 RON / {payment}</strong>
                </p>
                <button
                  disabled={payment === "Achitat" || payment === "In asteptare"}
                  onClick={() => setReviewPayment(true)}
                >
                  Simuleaza plata
                </button>
                {reviewPayment && (
                  <section
                    className="member-review"
                    aria-label="Revizuire plata"
                  >
                    <h3>Verifica plata fictiva</h3>
                    <p>30 RON pentru octombrie 2026 / Filiala Model</p>
                    <label>
                      Rezultat demonstrativ
                      <Select
                        value={paymentResult}
                        onChange={(e) => setPaymentResult(e.target.value)}
                      >
                        <option>In asteptare</option>
                        <option>Achitat</option>
                        <option>Esuat</option>
                      </Select>
                    </label>
                    <button
                      onClick={() => {
                        setPayment(paymentResult);
                        setReviewPayment(false);
                        setNotice("Plata simulata: " + paymentResult);
                      }}
                    >
                      Confirma simularea
                    </button>
                    <button onClick={() => setReviewPayment(false)}>
                      Anuleaza
                    </button>
                  </section>
                )}
                <h3>Istoric</h3>
                <label>
                  Perioada
                  <Select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                  >
                    <option>Toate</option>
                    {rows.map((r) => (
                      <option key={r.month}>{r.month}</option>
                    ))}
                  </Select>
                </label>
                <div className="member-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Perioada</th>
                        <th>Suma</th>
                        <th>Stare</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows
                        .filter((r) => period === "Toate" || r.month === period)
                        .map((r) => (
                          <tr key={r.month}>
                            <td>{r.month}</td>
                            <td>{r.amount}</td>
                            <td>{r.status}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <p>
                  Donatiile sunt separate de cotizatii.{" "}
                  <a href="#/doneaza">Donatii</a> /{" "}
                  <a href="#/bani">Raportare publica</a>
                </p>
              </>
            )}
            {current === "calendar" && (
              <>
                <h2>{event ? event.title : "Calendarul filialei"}</h2>
                {event ? (
                  <>
                    <a href={link("calendar")}>Inapoi la calendar</a>
                    <p>
                      {event.date}, {event.time} / Europe/Bucharest
                    </p>
                    <p>
                      {event.place} / {event.status}
                    </p>
                    <p>
                      Organizator: Secretar Model. Ordine de zi: organizare
                      administrativa si intrebari.
                    </p>
                    <button
                      disabled={event.status === "Anulat"}
                      onClick={() =>
                        setJoined((v) =>
                          v.includes(event.id)
                            ? v.filter((x) => x !== event.id)
                            : [...v, event.id],
                        )
                      }
                    >
                      {joined.includes(event.id)
                        ? "Anuleaza participarea simulata"
                        : "Confirma participarea simulata"}
                    </button>
                    <p role="status">
                      {joined.includes(event.id)
                        ? "Participare confirmata in demonstratie."
                        : ""}
                    </p>
                    <button
                      title="Descarca evenimentul fictiv"
                      onClick={() => exportCalendar(event)}
                    >
                      <Download size={16} aria-hidden="true" /> Calendar .ics
                    </button>
                    <a href={link("documente/ordine-de-zi")}>
                      Vezi ordinea de zi
                    </a>
                  </>
                ) : (
                  <>
                    <label>
                      Stare
                      <Select
                        value={eventFilter}
                        onChange={(e) => setEventFilter(e.target.value)}
                      >
                        <option>Toate</option>
                        <option>Programat</option>
                        <option>Anulat</option>
                      </Select>
                    </label>
                    <div className="member-list">
                      {events
                        .filter(
                          (e) =>
                            eventFilter === "Toate" || e.status === eventFilter,
                        )
                        .map((e) => (
                          <a key={e.id} href={link("calendar/" + e.id)}>
                            <strong>{e.title}</strong>
                            <span>
                              {e.date} / {e.time} / {e.status}
                            </span>
                          </a>
                        ))}
                    </div>
                  </>
                )}
              </>
            )}
            {current === "documente" && (
              <>
                <h2>{doc ? doc.title : "Biblioteca de documente"}</h2>
                {doc ? (
                  <>
                    <a href={link("documente")}>Inapoi la documente</a>
                    <p>
                      {doc.date} / {doc.type} / Filiala Model
                    </p>
                    <p>Responsabil: Secretar Model</p>
                    {doc.restricted && persona !== "Administrator Model" ? (
                      <p role="status">
                        Acces rezervat profilului Administrator Model.
                      </p>
                    ) : (
                      <>
                        <p>
                          Document demonstrativ. Sedinta fictiva despre
                          organizarea bibliotecii interne.
                        </p>
                        <button
                          onClick={() =>
                            download(
                              doc.id + "-fictiv.txt",
                              "DOCUMENT FICTIV\n" +
                                doc.title +
                                "\nFiliala Model\nMaterial sintetic pentru prezentare. Nu reprezinta un document intern.",
                            )
                          }
                        >
                          <Download size={16} aria-hidden="true" /> Descarca
                          exemplul
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <div className="member-filters">
                      <label>
                        Cauta documente
                        <input
                          type="search"
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                        />
                      </label>
                      <label>
                        Tip
                        <Select
                          value={docType}
                          onChange={(e) => setDocType(e.target.value)}
                        >
                          <option>Toate</option>
                          {documents.map((d) => (
                            <option key={d.id}>{d.type}</option>
                          ))}
                        </Select>
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={unavailable}
                          onChange={(e) => setUnavailable(e.target.checked)}
                        />
                        Scenariu indisponibil
                      </label>
                    </div>
                    {unavailable ? (
                      <p role="alert">
                        Biblioteca este indisponibila in acest scenariu.{" "}
                        <button onClick={() => setUnavailable(false)}>
                          Reincearca
                        </button>
                      </p>
                    ) : (
                      <div className="member-list">
                        {documents
                          .filter(
                            (d) =>
                              d.title
                                .toLowerCase()
                                .includes(query.toLowerCase()) &&
                              (docType === "Toate" || d.type === docType),
                          )
                          .map((d) => (
                            <a key={d.id} href={link("documente/" + d.id)}>
                              <strong>{d.title}</strong>
                              <span>
                                {d.date} / {d.type}
                                {d.restricted ? " / Acces limitat" : ""}
                              </span>
                            </a>
                          ))}
                        {!documents.some(
                          (d) =>
                            d.title
                              .toLowerCase()
                              .includes(query.toLowerCase()) &&
                            (docType === "Toate" || d.type === docType),
                        ) && <p>Niciun document gasit.</p>}
                      </div>
                    )}
                  </>
                )}
              </>
            )}
            {current === "participare" && (
              <>
                <h2>{item ? item.title : "Participare interna"}</h2>
                {item ? (
                  <>
                    <a href={link("participare")}>Inapoi la participare</a>
                    <p>
                      {item.status} / Termen: {item.deadline}
                    </p>
                    {responses[item.id] ? (
                      <p role="status">
                        Raspuns fictiv inregistrat: {responses[item.id]}
                      </p>
                    ) : item.status === "Deschis" ? (
                      <div key={item.id}>
                        <fieldset>
                          <legend>Alegere demonstrativa</legend>
                          {item.choices.map((c) => (
                            <label key={c}>
                              <input
                                type="radio"
                                name="choice"
                                value={c}
                                checked={choice === c}
                                onChange={() => {
                                  setChoice(c);
                                  setReviewChoice(false);
                                }}
                              />
                              {c}
                            </label>
                          ))}
                        </fieldset>
                        <button
                          disabled={!item.choices.includes(choice)}
                          onClick={() => setReviewChoice(true)}
                        >
                          Revizuieste alegerea
                        </button>
                        {reviewChoice && item.choices.includes(choice) && (
                          <section className="member-review">
                            <h3>Confirma raspunsul fictiv</h3>
                            <p>{choice}</p>
                            <button
                              onClick={() => {
                                setResponses((v) => ({
                                  ...v,
                                  [item.id]: choice,
                                }));
                                setChoice("");
                                setReviewChoice(false);
                              }}
                            >
                              Confirma in demonstratie
                            </button>
                            <button onClick={() => setReviewChoice(false)}>
                              Inapoi
                            </button>
                          </section>
                        )}
                      </div>
                    ) : (
                      <p>
                        Discutie inchisa. Concluzie fictiva: documentele vor fi
                        grupate dupa tip si data.
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <div
                      className="member-tabs"
                      role="group"
                      aria-label="Tip participare"
                    >
                      {["Consultari", "Alegeri", "Dezbateri"].map((t) => (
                        <button
                          key={t}
                          aria-pressed={tab === t}
                          onClick={() => setTab(t)}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    <div className="member-list">
                      {participation
                        .filter((p) => p.type === tab)
                        .map((p) => (
                          <a key={p.id} href={link("participare/" + p.id)}>
                            <strong>{p.title}</strong>
                            <span>
                              {responses[p.id]
                                ? "Raspuns fictiv trimis"
                                : p.status}{" "}
                              / {p.deadline}
                            </span>
                          </a>
                        ))}
                    </div>
                  </>
                )}
              </>
            )}
            {current === "organizatie" && (
              <>
                <h2>Filiala Model</h2>
                <p>Structura demonstrativa</p>
                <div className="member-list">
                  {[
                    ["Coordonator Model", "Coordonare administrativa"],
                    ["Secretar Model", "Sedinte si documente"],
                    ["Trezorier Model", "Cotizatii si evidenta financiara"],
                  ].map(([name, role]) => (
                    <article key={name}>
                      <h3>{name}</h3>
                      <p>{role}</p>
                    </article>
                  ))}
                </div>
                <h3>Directorul colegilor</h3>
                <p>
                  {savedVisible
                    ? "Membru Model / Profil fictiv vizibil"
                    : "Profilul tau fictiv nu apare in director."}
                </p>
                <a href={link("setari")}>Gestioneaza vizibilitatea</a>
              </>
            )}
            {current === "media" && (
              <>
                <h2>Media</h2>
                <h3>Transmisii live</h3>
                <p>Nicio transmisie programata.</p>
                <h3>Arhiva</h3>
                <article className="member-media">
                  <Film size={40} aria-hidden="true" />
                  <h3>Organizarea documentelor</h3>
                  <details>
                    <summary>Deschide transcrierea fictiva</summary>
                    <p>
                      Exemplu: documentele se grupeaza dupa tip, data si
                      filiala. Materialul nu provine dintr-o inregistrare
                      interna.
                    </p>
                  </details>
                  <p>Inregistrare video indisponibila in demonstratie.</p>
                </article>
              </>
            )}
            {current === "setari" && (
              <>
                <h2>Setarile profilului</h2>
                <p>Membru Model / Filiala Model</p>
                <label>
                  <input
                    type="checkbox"
                    checked={visible}
                    onChange={(e) => setVisible(e.target.checked)}
                  />
                  Afiseaza profilul fictiv in director
                </label>
                <p>Stare salvata: {savedVisible ? "Vizibil" : "Ascuns"}</p>
                <label>
                  <input
                    type="checkbox"
                    checked={saveError}
                    onChange={(e) => setSaveError(e.target.checked)}
                  />
                  Scenariu eroare la salvare
                </label>
                <div className="member-actions">
                  <button
                    onClick={() => {
                      if (saveError) {
                        setNotice(
                          "Salvarea simulata a esuat. Preferinta nu a fost modificata.",
                        );
                        return;
                      }
                      setSavedVisible(visible);
                      setNotice("Preferinta demonstrativa a fost salvata.");
                    }}
                  >
                    Salveaza preferinta
                  </button>
                  <button
                    onClick={() => {
                      setVisible(savedVisible);
                      setNotice("Modificarile au fost anulate.");
                    }}
                  >
                    Anuleaza
                  </button>
                </div>
              </>
            )}
            {!sections.some(([key]) => key === current) && (
              <>
                <h2>Pagina inexistenta</h2>
                <a href={link()}>Spatiul meu</a>
              </>
            )}
          </>
        )}
        <p className="member-notice" role="status">
          {notice}
        </p>
      </div>
    </div>
  );
}
