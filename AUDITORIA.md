# Auditoría del portfolio

Estado al 8 de agosto de 2026. Complementa `ESTRATEGIA.md` (el porqué) y
`AGENTS.md` (lo técnico). Acá está lo que falta y lo que se puede mejorar.

Método: auditoría de la skill `~/.claude/skills/landing-humana/` sobre el HTML
renderizado, más revisión de contenido.

---

## A. Fugas — arreglar antes de mandar el link a nadie

Esto no son mejoras, son cosas que restan credibilidad hoy.

### A1. Texto de relleno visible en producción

Un prospecto que baja al Archivo lee literalmente "Cliente / Canal". Eso hace
más daño que cualquier detalle de diseño.

| Dónde | Qué se lee hoy | Dónde se arregla |
|---|---|---|
| YouTube | `Título del video 1` … `4`, `Cliente / Canal` ×4 | `media.ts` → `YOUTUBE` |
| Carruseles | `Slide 1` … `Slide 6` | `media.ts` → `CAROUSEL_SLIDES[].caption` |
| Reels | `Campaña de Marca`, `Lanzamiento de Producto`, `Narrativa Personal` | `media.ts` → `REELS[].title` |

Los títulos de reels además son genéricos: no dicen para quién fueron ni qué
resolvían.

### A2. Métricas sin verificar

El `+6M` del hero y las views de los reels (84K / 112K / 53K) nunca se
verificaron. Es lo primero que se lee en la página. Si alguien pregunta en una
llamada y el número no se sostiene, se cae el trato ahí mismo.

**Decisión pendiente:** verificar y dejar, o bajar a un número defendible.

### A3. Tres enlaces muertos

Instagram, LinkedIn y YouTube en el footer están en `href="#"`.

### A4. La meta description usa superlativos vacíos

Hoy: *"contenido premium … marcas de alto nivel"*. Son exactamente los
superlativos que la skill marca como señal de IA, y es lo que se ve en Google.
Reemplazar por algo concreto y verificable.

### A5. Imágenes que faltan

Todas muestran placeholder instructivo, así que no rompen nada, pero el sitio no
está listo hasta que estén:

- `public/casos/` — `barbertendence.jpg`, `hector-muerza.jpg`, `mariana.jpg`
- `public/diagramas/` — `4p.jpg`, `hook-body-cta.jpg`, `ciclo-14-dias.jpg`
- `public/lofi/` — `puerto-varas.jpg`
- `public/youtube/` — `video-1..4.jpg`
- `public/icons/` — logos de software (simpleicons.org)

**El más importante son los tres diagramas.** Son la única prueba de criterio
del sitio; sin ellos vuelve a leerse como portfolio de editor.

---

## B. Lo que sí está bien

Para no volver a tocarlo:

- Un solo `<h1>`, jerarquía de encabezados correcta.
- Cero imágenes sin `alt`.
- Cero em dashes en texto visible.
- Cero mayúsculas con tracking abierto.
- Radios variados (6 valores distintos), no el 16px uniforme de plantilla.
- Sin gradientes decorativos: los que quedan son scrims funcionales sobre
  miniaturas.
- El acento secundario tiene regla semántica escrita (ámbar = números).
- Íconos SVG de Lucide, cero emoji.

---

## C. Mejoras poco comunes

Ordenadas por lo que más empuja hacia los 2 clientes al mes.

### C1. Cupos reales en el hero
El modelo de negocio son 2 cuentas al mes. Decirlo: *"Tomo 2 cuentas por mes.
Queda 1."* Es escasez verdadera, no truco, y comunica que eliges cliente. Casi
nadie lo pone porque casi nadie tiene un límite real.

### C2. Brief de 4 preguntas que arma el mail solo
En vez de "escríbeme", cuatro campos —a quién le hablas, qué quieres que pase,
qué probaste, dónde publicas— que componen un `mailto:` prellenado. Sin backend.
Convierte un contacto tibio en un lead calificado y demuestra en vivo el "parto
preguntando más de lo que esperas" que la página promete dos secciones antes.

### C3. Antes/después deslizable en Barbertendence
Las +80 portadas de YouTube son el activo visual más fuerte y hoy serían un JPG
estático. Un slider arrastrable es el artefacto más convincente que puede
mostrar un editor, y casi ningún portfolio lo tiene interactivo.

### C4. Curva de retención sobre el reel
En el modal de reproducción, dibujar la curva encima del timeline. Es la
diferencia visible entre "edito bonito" y "edito para retención", y conecta
directo con el tablero Hook · Body · CTA.

### C5. Sección "lo que no hago"
Tres o cuatro líneas honestas (no hago bodas, no hago logos, no tomo cuentas sin
acceso a métricas). Genera confianza rápido y filtra malos clientes solo. Es
rarísimo verlo, y por eso funciona.

### C6. Hoja imprimible
Un `@media print` que convierta la página en un one-pager limpio. Barato, y
aparece justo cuando alguien te quiere pasar a un socio.

### C7. Notas de proceso sobre las piezas
Al pasar el mouse por un reel, una marginalia con *por qué* ese corte. Reutiliza
el mobiliario ya construido y convierte el Archivo de galería en evidencia de
criterio.

### C8. Estados de disponibilidad y ritmo
"Respondo en menos de 24 h. Entrego avances los martes." Operativo y concreto:
responde la pregunta que el cliente no hace en voz alta.

---

## D. Orden sugerido

1. **A1 + A2** — el relleno y las métricas. Es una fuga, no una mejora.
2. **Los tres diagramas de Miro** (A5). Sostienen el posicionamiento completo.
3. **C1 y C2** — cupos y brief. Los dos empujan directo a conseguir cliente.
4. **A3, A4** — enlaces y metadata. Diez minutos.
5. El resto de C, por gusto y tiempo disponible.
