import { useState } from "react";
import { Bookmark, Download, Copy, Heart, MessageCircle, X, Link as LinkIcon } from "lucide-react";
import Select from "../../components/Select";
import {
  channels,
  people,
  platforms,
  projects,
  resources,
  saveExample,
  template,
} from "./resources";
import "./resources.css";

export function SocialProfileLinks({ name, networks = platforms }: { name: string; networks?: readonly string[] }) {
  const [selected, setSelected] = useState("");
  return (
    <div className="profile-social">
      <h3>Profiluri sociale demonstrative</h3>
      <div className="social-buttons">
        {networks.map((platform) => (
          <button key={platform} onClick={() => setSelected(platform)}>
            <LinkIcon size={14} aria-hidden="true" />
            {platform}
          </button>
        ))}
      </div>
      {selected && (
        <p role="status">
          {name} / {selected}: profil fictiv, fara adresa externa.
        </p>
      )}
    </div>
  );
}

export default function ResourceHub({
  section,
  audience = "member",
}: {
  section: string;
  audience?: "member" | "supporter";
}) {
  const [saved, setSaved] = useState<string[]>([]);
  const [liked, setLiked] = useState<string[]>([]);
  const [comments, setComments] = useState<Record<string, string>>({});
  const [comment, setComment] = useState('Exemplul este clar.');
  const [kind, setKind] = useState("Toate");
  const [scope, setScope] = useState("Toate");
  const [query, setQuery] = useState("");
  const [onlySaved, setOnlySaved] = useState(false);
  const [network, setNetwork] = useState("Toate");
  const [followFilter, setFollowFilter] = useState("Toate");
  const [following, setFollowing] = useState<Record<string, string>>({});
  const [connected, setConnected] = useState<string[]>([]);
  const [visibility, setVisibility] = useState<Record<string, string>>({});
  const [affiliation, setAffiliation] = useState("Toate");
  const [detail, setDetail] = useState("");
  const [skill, setSkill] = useState("Toate");
  const [joined, setJoined] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const toggleSaved = (id: string) =>
    setSaved((v) => (v.includes(id) ? v.filter((x) => x !== id) : [...v, id]));
  const [error, setError] = useState(false);
  const content = resources.filter(
    (r) =>
      (kind === "Toate" || kind === r.type) &&
      (scope === "Toate" || scope === r.scope) &&
      (!onlySaved || saved.includes(r.id)) &&
      (r.title + r.publisher).toLowerCase().includes(query.toLowerCase()),
  );
  const visibleChannels = channels.filter(
    (c) =>
      (network === "Toate" || c.platform === network) &&
      (followFilter === "Toate" ||
        (following[c.id] || "Necunoscut") === followFilter),
  );
  const selected = resources.find((r) => r.id === detail);
  const selectResource = (id: string) => {
    setDetail(id);
    setNotice("");
  };
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setNotice("Text fictiv copiat.");
    } catch {
      setNotice("Copiere indisponibila. Poti selecta textul din detalii.");
    }
  };
  if (
    ![
      "resurse",
      "social",
      "design",
      "proiecte",
      "setari",
      "organizatie",
    ].includes(section)
  )
    return null;
  return (
    <div className="resource-hub">
      {audience === "supporter" && (
        <p>
          Acces pentru simpatizanti: resurse, proiecte si profiluri publice.{" "}
          <a href="#/inscriere">Informatii despre inscriere</a>
        </p>
      )}
      {section === "resurse" && (
        <>
          <h2>Resurse si lectura</h2>
          <p>Materiale si articole fictive / colectie demonstrativa</p>
          <div className="member-filters">
            <label>
              Cauta resurse
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            <label>
              Continut
              <Select value={kind} onChange={(e) => setKind(e.target.value)}>
                {["Toate", "Material", "Articol"].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </Select>
            </label>
            <label>
              Organizatie
              <Select value={scope} onChange={(e) => setScope(e.target.value)}>
                {["Toate", "National", "Filiala"].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </Select>
            </label>
            <label>
              <input
                type="checkbox"
                checked={onlySaved}
                onChange={(e) => setOnlySaved(e.target.checked)}
              />
              Doar salvate
            </label>
            <label>
              <input
                type="checkbox"
                checked={error}
                onChange={(e) => setError(e.target.checked)}
              />
              Scenariu indisponibil
            </label>
          </div>
          {error ? (
            <p role="alert">
              Resurse indisponibile.{" "}
              <button onClick={() => setError(false)}>Reincearca</button>
            </p>
          ) : (
            <div className="resource-grid">
              {content.map((r) => (
                <article key={r.id} className="resource-item">
                  <p className="eyebrow">
                    {r.type} / {r.platform} / {r.scope}
                  </p>
                  <h3>{r.title}</h3>
                  <p className="resource-meta">
                    {r.publisher} / {r.date}
                  </p>
                  <p>
                    <span className="resource-status">{r.status}</span>
                  </p>
                  <p>{r.text}</p>
                  <div className="resource-actions">
                    <button onClick={() => selectResource(r.id)}>
                      Vezi detalii
                    </button>
                    <button title="Apreciere simulata" aria-label={'Apreciere simulata: ' + r.title} aria-pressed={liked.includes(r.id)} disabled={r.status === 'Retras'} onClick={() => setLiked(v => v.includes(r.id) ? v.filter(x => x !== r.id) : [...v, r.id])}><Heart size={18} fill={liked.includes(r.id) ? 'currentColor' : 'none'} /></button>
                    <button title="Comentariu demonstrativ" aria-label={'Comentariu demonstrativ: ' + r.title} disabled={r.status === 'Retras'} onClick={() => selectResource(r.id)}><MessageCircle size={18} /></button>
                    <button
                      title={
                        saved.includes(r.id)
                          ? "Elimina din salvate"
                          : "Salveaza resursa"
                      }
                      aria-label={"Salveaza " + r.title}
                      aria-pressed={saved.includes(r.id)}
                      onClick={() => toggleSaved(r.id)}
                    >
                      <Bookmark
                        size={18}
                        fill={saved.includes(r.id) ? "currentColor" : "none"}
                      />
                    </button>
                  </div>
                </article>
              ))}
              {content.length === 0 && <p>Nicio resursa gasita.</p>}
            </div>
          )}
          {selected && (
            <section className="resource-detail" aria-label="Detalii resursa">
              <div className="resource-title">
                <h3>{selected.title}</h3>
                <button
                  aria-label="Inchide detaliile"
                  title="Inchide detaliile"
                  onClick={() => setDetail("")}
                >
                  <X size={18} />
                </button>
              </div>
              <p>{selected.text}</p>
              <p>Aprecierile si comentariile sunt locale, fara publicare pe platforme.</p>
              <p>
                Sursa: {selected.source}. Actualizat: {selected.date}.
              </p>
              <p>
                Responsabil: {selected.publisher}. Utilizare: exemplu de
                prezentare.
              </p>
              <div className="resource-actions">
                <button
                  disabled={selected.status === "Retras"}
                  onClick={() => copy(selected.text)}
                >
                  <Copy size={16} />
                  Copiaza textul fictiv
                </button>
                <button
                  disabled={selected.status === "Retras"}
                  onClick={() =>
                    saveExample(
                      selected.id + "-demo.txt",
                      selected.title +
                        "\n" +
                        selected.text +
                        "\n" +
                        selected.source,
                    )
                  }
                >
                  <Download size={16} />
                  Descarca exemplul
                </button>
              </div>
              <label>Comentariu fictiv<Select value={comment} onChange={e => setComment(e.target.value)}><option>Exemplul este clar.</option><option>Ar fi utila o versiune accesibila.</option></Select></label>
              <button disabled={selected.status === 'Retras'} onClick={() => setComments(v => ({ ...v, [selected.id]: comment }))}>Adauga comentariul demonstrativ</button>
              {comments[selected.id] && <p role="status">Comentariu local: {comments[selected.id]}</p>}
              <p>
                Publicatia si materialul sunt fictive. Nu exista postare sau
                articol extern.
              </p>
            </section>
          )}
        </>
      )}
      {section === "social" && (
        <>
          <h2>Director social</h2>
          <p>
            Conturi si grupuri fictive. Statusurile de urmarire sunt declarate
            de utilizator, nu verificate de platforme.
          </p>
          <div className="member-filters">
            <label>
              Platforma
              <Select
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
              >
                <option>Toate</option>
                {platforms.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </Select>
            </label>
            <label>
              Urmarire
              <Select
                value={followFilter}
                onChange={(e) => setFollowFilter(e.target.value)}
              >
                {["Toate", "Necunoscut", "Urmaresc", "Nu urmaresc"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </Select>
            </label>
          </div>
          <h3>Canale oficiale - exemple</h3>
          <div className="channel-list">
            {visibleChannels.map((c) => (
              <article key={c.id}>
                <div>
                  <h3>{c.name}</h3>
                  <p>
                    {c.platform} / {c.kind} / {c.scope}
                  </p>
                  <p className="resource-meta">
                    Sursa: catalog fictiv / Actualizat: 2026-09-09
                  </p>
                </div>
                <label>
                  Stare pentru {c.name}
                  <Select
                    value={following[c.id] || "Necunoscut"}
                    onChange={(e) =>
                      setFollowing((v) => ({ ...v, [c.id]: e.target.value }))
                    }
                  >
                    {["Necunoscut", "Urmaresc", "Nu urmaresc"].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </Select>
                  <small>Declarat de mine</small>
                </label>
              </article>
            ))}
            {visibleChannels.length === 0 && (
              <p>Niciun canal pentru aceste filtre.</p>
            )}
          </div>
          <h3>Profiluri distribuite comunitatii</h3>
          <p>
            {connected.filter((p) => visibility[p] === "Public").length
              ? connected
                  .filter((p) => visibility[p] === "Public")
                  .map((p) => p + ": @profil-model-demo")
                  .join(" / ")
              : "Niciun profil personal distribuit public."}
          </p>
          <h3>Reprezentanti publici - exemple</h3>
          <label>
            Afiliere
            <Select
              value={affiliation}
              onChange={(e) => setAffiliation(e.target.value)}
            >
              <option>Toate</option>
              {people.map((p) => (
                <option key={p.id}>{p.membership}</option>
              ))}
            </Select>
          </label>
          <div className="resource-grid">
            {people
              .filter(
                (p) => affiliation === "Toate" || p.membership === affiliation,
              )
              .map((p) => (
                <article className="resource-item" key={p.id}>
                  <h3>{p.name}</h3>
                  <dl>
                    <dt>Afiliere</dt>
                    <dd>{p.membership}</dd>
                    <dt>Functie</dt>
                    <dd>{p.office}</dd>
                    <dt>Sustinere</dt>
                    <dd>{p.endorsement}</dd>
                  </dl>
                  <p className="resource-meta">
                    Sursa: registru fictiv / Actualizat: 2026-09-09
                  </p>
                <SocialProfileLinks name={p.name} networks={p.networks} />
                </article>
              ))}
          </div>
        </>
      )}
      {(section === "setari" || section === "organizatie") && (
        <>
          <h2>
            {section === "setari"
              ? "Profilurile mele sociale"
              : "Profiluri sociale ale colegilor"}
          </h2>
          {section === "setari" ? (
            <>
              <p>Identitati demonstrative. Fara autentificare pe platforme.</p>
              <div className="channel-list">
                {platforms.map((p) => (
                  <article key={p}>
                    <div>
                      <h3>{p}</h3>
                      <p>
                        {connected.includes(p)
                          ? "@profil-model-demo"
                          : "Niciun profil adaugat"}
                      </p>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          setConnected((v) =>
                            v.includes(p)
                              ? v.filter((x) => x !== p)
                              : [...v, p],
                          );
                          setVisibility((v) => ({ ...v, [p]: "Doar eu" }));
                        }}
                      >
                        {connected.includes(p)
                          ? "Elimina profilul " + p
                          : "Adauga profil fictiv " + p}
                      </button>
                      {connected.includes(p) && (
                        <label>
                          Vizibilitate {p}
                          <Select
                            value={visibility[p] || "Doar eu"}
                            onChange={(e) =>
                              setVisibility((v) => ({
                                ...v,
                                [p]: e.target.value,
                              }))
                            }
                          >
                            <option>Doar eu</option>
                            {audience === "member" && (
                              <option>Colegilor</option>
                            )}
                            <option>Public</option>
                          </Select>
                        </label>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <>
              <article className="resource-item">
                <h3>Membru Model</h3>
                {connected.filter((p) => visibility[p] === "Colegilor")
                  .length ? (
                  connected
                    .filter((p) => visibility[p] === "Colegilor")
                    .map((p) => <p key={p}>{p}: @profil-model-demo</p>)
                ) : (
                  <p>Niciun profil social distribuit colegilor.</p>
                )}
              </article>
              <article className="resource-item">
                <h3>Coleg Fictiv A</h3>
                <p>Vizibilitate acceptata in scenariul fictiv</p>
                <SocialProfileLinks name="Coleg Fictiv A" />
              </article>
            </>
          )}
        </>
      )}
      {section === "design" && (
        <>
          <h2>Biblioteca de design</h2>
          <p>Kit demonstrativ MP / versiunea 1.0 / 2026-09-09</p>
          <h3>Culori</h3>
          <div className="design-swatches">
            {[
              ["Verde", "#075f4c"],
              ["Text", "#243431"],
              ["Fundal", "#f0f2f5"],
            ].map(([name, value]) => (
              <button
                key={name}
                title={"Copiaza " + value}
                onClick={() => copy(value)}
              >
                <span style={{ background: value }} aria-hidden="true" />
                {name} {value}
              </button>
            ))}
          </div>
          <h3>Tipografie</h3>
          <p>
            Arial / exemple de 24, 32 si 54 px in sablon. Textul ramane
            editabil.
          </p>
          <h3>Sabloane editabile</h3>
          <div className="resource-grid">
            {["Intalnire de organizare", "Biblioteca de documente"].map(
              (title) => (
                <article className="resource-item" key={title}>
                  <img
                    className="design-preview"
                    src={
                      "data:image/svg+xml;charset=utf-8," +
                      encodeURIComponent(template(title))
                    }
                    alt={"Previzualizare sablon: " + title}
                  />
                  <h3>{title}</h3>
                  <p>1080 x 1080 / SVG / v1.0 / Curent</p>
                  <p>
                    Responsabil: Echipa Design Model. Utilizare: CC0 pentru
                    grafica sintetica; fara sigle sau identitate oficiala.
                  </p>
                  <button
                    onClick={() =>
                      saveExample(
                        "sablon-demo.svg",
                        template(title),
                        "image/svg+xml",
                      )
                    }
                  >
                    <Download size={16} />
                    Descarca SVG editabil
                  </button>
                </article>
              ),
            )}
          </div>
          <details>
            <summary>Ghid de utilizare</summary>
            <p>
              Pastreaza marcajul DEMO in prezentare. Include data, organizatorul
              si o descriere alternativa a imaginii. Verifica lizibilitatea la
              dimensiunea finala.
            </p>
          </details>
          <button
            onClick={() =>
              saveExample(
                "design-tokens-demo.json",
                JSON.stringify(
                  {
                    version: "1.0",
                    license: "CC0-1.0",
                    colors: {
                      accent: "#075f4c",
                      text: "#243431",
                      background: "#f0f2f5",
                    },
                    font: "Arial",
                  },
                  null,
                  2,
                ),
                "application/json",
              )
            }
          >
            <Download size={16} />
            Descarca tokenuri JSON
          </button>
        </>
      )}
      {section === "proiecte" && (
        <>
          <h2>Proiecte colaborative</h2>
          <p>Catalog fictiv de contributii / fara conectare GitHub</p>
          <label>
            Competenta
            <Select value={skill} onChange={(e) => setSkill(e.target.value)}>
              <option>Toate</option>
              {projects.map((p) => (
                <option key={p.id}>{p.skill}</option>
              ))}
            </Select>
          </label>
          <div className="resource-grid">
            {projects
              .filter((p) => skill === "Toate" || p.skill === skill)
              .map((p) => (
                <article key={p.id} className="resource-item">
                  <h3>{p.name}</h3>
                  <p>{p.description}</p>
                  <p>
                    Responsabil: Maintainer Model / Licenta propusa: {p.license}
                  </p>
                  <p>Repository fictiv: model-demo/{p.id}</p>
                  <h4>Prima contributie</h4>
                  <p>{p.task} / Nivel introductiv</p>
                  <details>
                    <summary>Ghid de contributie</summary>
                    <ol>
                      <li>Citeste descrierea si criteriile sarcinii.</li>
                      <li>Propune o modificare mica, cu date sintetice.</li>
                      <li>Solicita revizuirea unui maintainer.</li>
                    </ol>
                    <p>
                      Criteriu: exemplu clar, fara date private. Costurile de
                      mentenanta nu sunt estimate in demo.
                    </p>
                  </details>
                  <button
                    aria-pressed={joined.includes(p.id)}
                    onClick={() =>
                      setJoined((v) =>
                        v.includes(p.id)
                          ? v.filter((x) => x !== p.id)
                          : [...v, p.id],
                      )
                    }
                  >
                    {joined.includes(p.id)
                      ? "Retrage interesul demonstrativ"
                      : "Marcheaza interesul demonstrativ"}
                  </button>
                  <button
                    onClick={() =>
                      saveExample(
                        p.id + "-contributie-demo.md",
                        "# " +
                          p.name +
                          "\n\nSarcina fictiva: " +
                          p.task +
                          "\n\nResponsabil: Maintainer Model.\nNu include date private.",
                      )
                    }
                  >
                    <Download size={16} />
                    Descarca sarcina
                  </button>
                </article>
              ))}
          </div>
        </>
      )}
      <p role="status">{notice}</p>
    </div>
  );
}
