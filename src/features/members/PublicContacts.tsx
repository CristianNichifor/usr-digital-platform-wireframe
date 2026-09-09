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
    county: "Judetul Model",
    locality: "Orasul Model",
    institution: "Consiliul Local Model",
    duties: "Deliberari si hotarari locale",
    email: "cabinet.consilier@institutie.example",
    contact: "Cabinet",
    term: "2024-2028",
    status: "In exercitiu",
  },
  {
    id: "primar",
    name: "Primar Model",
    role: "Primar",
    level: "Local",
    county: "Judetul Model",
    locality: "Orasul Model",
    institution: "Primaria Model",
    duties: "Administratie locala si servicii publice",
    email: "cabinet.primar@institutie.example",
    contact: "Cabinet",
    term: "2024-2028",
    status: "In exercitiu",
  },
  {
    id: "viceprimar",
    name: "Viceprimar Model",
    role: "Viceprimar",
    level: "Local",
    county: "Judetul Exemplu",
    locality: "Comuna Exemplu",
    institution: "Primaria Exemplu",
    duties: "Responsabilitati delegate de primar",
    email: "registratura@institutie.example",
    contact: "Registratura institutiei",
    term: "2024-2028",
    status: "In exercitiu",
  },
  {
    id: "judet",
    name: "Consilier Judetean Model",
    role: "Consilier judetean",
    level: "Judetean",
    county: "Judetul Model",
    locality: "Judetul Model",
    institution: "Consiliul Judetean Model",
    duties: "Hotarari si servicii de interes judetean",
    email: "registratura@institutie.example",
    contact: "Registratura institutiei",
    term: "2024-2028",
    status: "In exercitiu",
  },
  {
    id: "director",
    name: "Director Model",
    role: "Conducator de institutie",
    level: "Judetean",
    county: "Judetul Exemplu",
    locality: "Judetul Exemplu",
    institution: "Institutia Publica Model",
    duties: "Coordonarea activitatii institutiei",
    email: "",
    contact: "Contact indisponibil",
    term: "Neconfirmat",
    status: "Necesita reverificare",
  },
  {
    id: "deputat",
    name: "Deputat Model",
    role: "Deputat",
    level: "National",
    county: "Judetul Model",
    locality: "Circumscriptia Model",
    institution: "Camera Deputatilor - exemplu",
    duties: "Legislatie si control parlamentar",
    email: "cabinet.deputat@institutie.example",
    contact: "Cabinet",
    term: "2024-2028",
    status: "In exercitiu",
  },
  {
    id: "senator",
    name: "Senator Model",
    role: "Senator",
    level: "National",
    county: "Judetul Exemplu",
    locality: "Circumscriptia Exemplu",
    institution: "Senat - exemplu",
    duties: "Legislatie si control parlamentar",
    email: "cabinet.senator@institutie.example",
    contact: "Cabinet",
    term: "2024-2028",
    status: "In exercitiu",
  },
  {
    id: "european",
    name: "Europarlamentar Model",
    role: "Europarlamentar",
    level: "European",
    county: "National",
    locality: "Romania",
    institution: "Parlamentul European - exemplu",
    duties: "Legislatie si activitate parlamentara europeana",
    email: "cabinet.european@institutie.example",
    contact: "Cabinet",
    term: "2024-2029",
    status: "In exercitiu",
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
  const [purpose, setPurpose] = useState("Solicitare de informatii publice");
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
    ? `DRAFT FICTIV - NU TRIMITE\nDestinatar: ${official.institution}\nAdresa exemplu: ${official.email}\nSubiect: ${purpose}\n\nBuna ziua,\nVa rog sa imi comunicati programul de audiente si procedura pentru depunerea unei solicitari.\nVa multumesc.\n\nExemplu de prezentare, fara date personale.`
    : "";
  return (
    <div className="resource-hub public-contacts civic-scope civic-usr">
      <h2>Contacte publice</h2>
      <p>
        Institutii si titulari fictivi. Adresele .example nu sunt adrese reale.
      </p>
      <div className="contact-filters">
        <Field
          id="contact-search"
          label="Cauta nume, institutie sau localitate"
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
              {["Toate", "Local", "Judetean", "National", "European"].map(
                (v) => (
                  <option key={v}>{v}</option>
                ),
              )}
            </Select>
          )}
        </Field>
        <Field id="contact-county" label="Judet">
          {(props) => (
            <Select
              {...props}
              value={county}
              onChange={(e) => setCounty(e.target.value)}
            >
              {["Toate", "Judetul Model", "Judetul Exemplu", "National"].map(
                (v) => (
                  <option key={v}>{v}</option>
                ),
              )}
            </Select>
          )}
        </Field>
        <Field id="contact-role" label="Functie">
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
                label={"Salveaza " + o.name}
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
        {!rows.length && <p>Niciun contact gasit.</p>}
      </div>
      {official && (
        <section className="resource-detail" aria-label="Detalii contact">
          <h3>{official.name}</h3>
          <dl>
            <dt>Institutie</dt>
            <dd>{official.institution}</dd>
            <dt>Responsabilitati</dt>
            <dd>{official.duties}</dd>
            <dt>Mandat / perioada</dt>
            <dd>{official.term}</dd>
            <dt>Contact profesional</dt>
            <dd>
              {official.email || "Nu este disponibil un contact verificat."}
            </dd>
            <dt>Tip contact</dt>
            <dd>{official.contact}</dd>
            <dt>Audiente</dt>
            <dd>
              {official.email
                ? "Marti 10:00-12:00 - program fictiv"
                : "Program neconfirmat"}
            </dd>
            <dt>Sursa si verificare</dt>
            <dd>
              Pagina institutionala fictiva / 2026-09-09 / responsabil: Editor
              Model
            </dd>
          </dl>
          <p>
            Afilierea politica nu este necesara pentru contactarea institutiei.
          </p>
          <div className="contact-actions">
            <Button
              disabled={!official.email}
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(official.email);
                  setNotice("Adresa fictiva copiata.");
                } catch {
                  setNotice("Copiere indisponibila.");
                }
              }}
            >
              <Copy size={16} />
              Copiaza adresa fictiva
            </Button>
            <Button
              disabled={!official.email}
              onClick={() => {
                setDraft(true);
                setReview(false);
              }}
            >
              <FileText size={16} />
              Pregateste solicitarea
            </Button>
            <Button
              onClick={() => {
                setSelected("");
                setDraft(false);
              }}
            >
              Inchide contactul
            </Button>
          </div>
          {draft && (
            <>
              <h4>Solicitare individuala demonstrativa</h4>
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
                      <option>Solicitare de informatii publice</option>
                      <option>Cerere de audienta</option>
                      <option>Intrebare despre servicii publice</option>
                    </Select>
                  )}
                </Field>
              </div>
              <p>Continut fictiv, fara destinatar real sau trimitere.</p>
              <Button onClick={() => setReview(true)}>
                Revizuieste draftul
              </Button>
              {review && (
                <>
                  <pre className="contact-draft">{message}</pre>
                  <Button
                    onClick={() => saveExample("solicitare-demo.txt", message)}
                  >
                    Descarca draftul fictiv
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
