import { useState } from "react";
import { Bookmark, Copy, FileText } from "lucide-react";
import {
  Button,
  IconButton,
  Field,
  Input,
  NativeSelect as Select,
} from "@cristiannichifor/civic-ui";
import "@cristiannichifor/civic-ui/styles.css";
import "@cristiannichifor/civic-ui/themes/usr.css";
import "./public-contacts.css";
import { saveExample } from "./resources";

const offices = [
  {
    id: "consilier",
    name: "Consilier Model",
    role: "Consilier local",
    level: "Local",
    county: "Județul Model",
    locality: "Orașul Model",
    institution: "Consiliul Local Model",
    duties: "Deliberări și hotărâri locale",
    email: "cabinet.consilier@institutie.example",
    contact: "Cabinet",
    term: "2024-2028",
    status: "În exercițiu",
  },
  {
    id: "primar",
    name: "Primar Model",
    role: "Primar",
    level: "Local",
    county: "Județul Model",
    locality: "Orașul Model",
    institution: "Primăria Model",
    duties: "Administrație locală și servicii publice",
    email: "cabinet.primar@institutie.example",
    contact: "Cabinet",
    term: "2024-2028",
    status: "În exercițiu",
  },
  {
    id: "viceprimar",
    name: "Viceprimar Model",
    role: "Viceprimar",
    level: "Local",
    county: "Județul Exemplu",
    locality: "Comuna Exemplu",
    institution: "Primăria Exemplu",
    duties: "Responsabilități delegate de primar",
    email: "registratura@institutie.example",
    contact: "Registratura instituției",
    term: "2024-2028",
    status: "În exercițiu",
  },
  {
    id: "judet",
    name: "Consilier Județean Model",
    role: "Consilier județean",
    level: "Județean",
    county: "Județul Model",
    locality: "Județul Model",
    institution: "Consiliul Județean Model",
    duties: "Hotărâri și servicii de interes județean",
    email: "registratura@institutie.example",
    contact: "Registratura instituției",
    term: "2024-2028",
    status: "În exercițiu",
  },
  {
    id: "director",
    name: "Director Model",
    role: "Conducător de instituție",
    level: "Județean",
    county: "Județul Exemplu",
    locality: "Județul Exemplu",
    institution: "Instituția Publică Model",
    duties: "Coordonarea activității instituției",
    email: "",
    contact: "Contact indisponibil",
    term: "Neconfirmat",
    status: "Necesită reverificare",
  },
  {
    id: "deputat",
    name: "Deputat Model",
    role: "Deputat",
    level: "Național",
    county: "Județul Model",
    locality: "Circumscripția Model",
    institution: "Camera Deputaților - exemplu",
    duties: "Legislație și control parlamentar",
    email: "cabinet.deputat@institutie.example",
    contact: "Cabinet",
    term: "2024-2028",
    status: "În exercițiu",
  },
  {
    id: "senator",
    name: "Senator Model",
    role: "Senator",
    level: "Național",
    county: "Județul Exemplu",
    locality: "Circumscripția Exemplu",
    institution: "Senat - exemplu",
    duties: "Legislație și control parlamentar",
    email: "cabinet.senator@institutie.example",
    contact: "Cabinet",
    term: "2024-2028",
    status: "În exercițiu",
  },
  {
    id: "european",
    name: "Europarlamentar Model",
    role: "Europarlamentar",
    level: "European",
    county: "Național",
    locality: "România",
    institution: "Parlamentul European - exemplu",
    duties: "Legislație și activitate parlamentară europeană",
    email: "cabinet.european@institutie.example",
    contact: "Cabinet",
    term: "2024-2029",
    status: "În exercițiu",
  },
];

export default function PublicContacts() {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("Toate");
  const [county, setCounty] = useState("Toate");
  const [role, setRole] = useState("Toate");
  const [selected, setSelected] = useState("");
  const [saved, setSaved] = useState<string[]>([]);
  const [draft, setDraft] = useState(false);
  const [purpose, setPurpose] = useState("Solicitare de informații publice");
  const [review, setReview] = useState(false);
  const [notice, setNotice] = useState("");
  const official = offices.find((o) => o.id === selected);
  const rows = offices.filter(
    (o) =>
      (level === "Toate" || o.level === level) &&
      (county === "Toate" || o.county === county) &&
      (role === "Toate" || o.role === role) &&
      `${o.name} ${o.institution} ${o.locality}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const message = official
    ? `DRAFT FICTIV - NU TRIMITE\nDestinatar: ${official.institution}\nAdresa exemplu: ${official.email}\nSubiect: ${purpose}\n\nBună ziua,\nVă rog să îmi comunicați programul de audiențe și procedura pentru depunerea unei solicitări.\nVă mulțumesc.\n\nExemplu de prezentare, fără date personale.`
    : "";
  return (
    <div className="resource-hub public-contacts civic-scope civic-usr">
      <h2>Contacte publice</h2>
      <p>
        Instituții și titulari fictivi. Adresele .example nu sunt adrese reale.
      </p>
      <div className="contact-filters">
        <Field
          id="contact-search"
          label="Caută nume, instituție sau localitate"
        >
          {(props) => (
            <Input
              {...props}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          )}
        </Field>
        <Field id="contact-level" label="Nivel">
          {(props) => (
            <Select
              {...props}
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              {["Toate", "Local", "Județean", "Național", "European"].map(
                (v) => (
                  <option key={v}>{v}</option>
                ),
              )}
            </Select>
          )}
        </Field>
        <Field id="contact-county" label="Județ">
          {(props) => (
            <Select
              {...props}
              value={county}
              onChange={(e) => setCounty(e.target.value)}
            >
              {["Toate", "Județul Model", "Județul Exemplu", "Național"].map(
                (v) => (
                  <option key={v}>{v}</option>
                ),
              )}
            </Select>
          )}
        </Field>
        <Field id="contact-role" label="Funcție">
          {(props) => (
            <Select
              {...props}
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option>Toate</option>
              {offices.map((o) => (
                <option key={o.id}>{o.role}</option>
              ))}
            </Select>
          )}
        </Field>
      </div>
      <div className="resource-grid">
        {rows.map((o) => (
          <article key={o.id} className="resource-item">
            <h3>{o.name}</h3>
            <p>
              {o.role} / {o.locality}
            </p>
            <p>{o.institution}</p>
            <p>{o.status}</p>
            <div className="contact-actions">
              <Button
                onClick={() => {
                  setSelected(o.id);
                  setDraft(false);
                  setReview(false);
                  setNotice("");
                }}
              >
                Detalii {o.name}
              </Button>
              <IconButton
                label={"Salvează " + o.name}
                aria-pressed={saved.includes(o.id)}
                onClick={() =>
                  setSaved((v) =>
                    v.includes(o.id)
                      ? v.filter((id) => id !== o.id)
                      : [...v, o.id],
                  )
                }
              >
                <Bookmark
                  aria-hidden="true"
                  size={18}
                  fill={saved.includes(o.id) ? "currentColor" : "none"}
                />
              </IconButton>
            </div>
          </article>
        ))}
        {!rows.length && <p>Niciun contact găsit.</p>}
      </div>
      {official && (
        <section className="resource-detail" aria-label="Detalii contact">
          <h3>{official.name}</h3>
          <dl>
            <dt>Instituție</dt>
            <dd>{official.institution}</dd>
            <dt>Responsabilități</dt>
            <dd>{official.duties}</dd>
            <dt>Mandat / perioada</dt>
            <dd>{official.term}</dd>
            <dt>Contact profesional</dt>
            <dd>
              {official.email || "Nu este disponibil un contact verificat."}
            </dd>
            <dt>Tip contact</dt>
            <dd>{official.contact}</dd>
            <dt>Audiențe</dt>
            <dd>
              {official.email
                ? "Marți 10:00-12:00 - program fictiv"
                : "Program neconfirmat"}
            </dd>
            <dt>Sursă și verificare</dt>
            <dd>
              Pagină instituțională fictivă / 2026-09-09 / responsabil: Editor
              Model
            </dd>
          </dl>
          <p>
            Afilierea politică nu este necesară pentru contactarea instituției.
          </p>
          <div className="contact-actions">
            <Button
              disabled={!official.email}
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(official.email);
                  setNotice("Adresa fictivă copiată.");
                } catch {
                  setNotice("Copiere indisponibilă.");
                }
              }}
            >
              <Copy size={16} />
              Copiază adresa fictivă
            </Button>
            <Button
              disabled={!official.email}
              onClick={() => {
                setDraft(true);
                setReview(false);
              }}
            >
              <FileText size={16} />
              Pregătește solicitarea
            </Button>
            <Button
              onClick={() => {
                setSelected("");
                setDraft(false);
              }}
            >
              Închide contactul
            </Button>
          </div>
          {draft && (
            <>
              <h4>Solicitare individuală demonstrativă</h4>
              <div className="contact-purpose">
                <Field id="contact-purpose" label="Tip solicitare">
                  {(props) => (
                    <Select
                      {...props}
                      value={purpose}
                      onChange={(e) => {
                        setPurpose(e.target.value);
                        setReview(false);
                      }}
                    >
                      <option>Solicitare de informații publice</option>
                      <option>Cerere de audiență</option>
                      <option>Întrebare despre servicii publice</option>
                    </Select>
                  )}
                </Field>
              </div>
              <p>Conținut fictiv, fără destinatar real sau trimitere.</p>
              <Button onClick={() => setReview(true)}>
                Revizuiește draftul
              </Button>
              {review && (
                <>
                  <pre className="contact-draft">{message}</pre>
                  <Button
                    onClick={() => saveExample("solicitare-demo.txt", message)}
                  >
                    Descarcă draftul fictiv
                  </Button>
                </>
              )}
            </>
          )}
        </section>
      )}
      <p role="status">{notice}</p>
    </div>
  );
}
