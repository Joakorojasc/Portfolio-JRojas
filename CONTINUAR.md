# Continuar

Estado y pendientes del portfolio. Para las convenciones del proyecto (paleta,
componentes, cómo bajar material) ver `AGENTS.md` — este archivo es solo la lista
de lo que quedó abierto.

Última actualización: 4 de agosto de 2026 · `main` en `9ef3fed`, todo subido.

---

## 1. Decidir el `+6M` del hero

**Dónde:** `src/lib/media.ts` → `HEADLINE_STAT`

El hero dice "+6M de views generadas entre mis clientes". Los 4 reels cargados
suman **2,28M**:

| Reel | Views |
|------|-------|
| `reel-1` | 1.1M |
| `reel-4` | 987K |
| `reel-2` | 188K |
| `reel-3` | 5K |
| **Total** | **2,28M** |

Si los 6M salen de sumar también carruseles, podcasts y trabajo de clientes que
no está en el sitio, está bien como está. Si no, conviene bajarlo al número que
se pueda sostener: el `AGENTS.md` es explícito en no inflar métricas, y es la
clase de dato que un cliente puede verificar.

Está aislado en un solo export, así que se cambia en un lugar.

---

## 2. Iconos de software del hero

**Dónde:** faltan los archivos en `public/icons/`

Los 8 chips de herramientas muestran un monograma de respaldo ("Pr", "Ae"…) en
vez del logo real. No rompe nada, pero se nota.

Hay que bajar los SVG de [simpleicons.org](https://simpleicons.org) con estos
nombres exactos (definidos en `TOOLS`, en `media.ts`):

```
premiere.svg   after-effects.svg   canva.svg   flow.svg
claude.svg     gemini.svg          veo.svg     notion.svg
```

`ToolIcon.tsx` detecta si el archivo no existe y cae al monograma solo, así que
se pueden ir agregando de a uno.

---

## 3. Textos opcionales que hoy están vacíos a propósito

Ninguno de estos rompe nada: los componentes solo dibujan el rótulo si hay dato.
Se dejaron vacíos para no inventar contenido.

| Campo | Dónde | Qué es |
|-------|-------|--------|
| `title` / `category` | `REELS` | Nombre de cada reel. Hoy la tarjeta muestra solo las reproducciones. |
| `title` | `CAROUSELS` | Nombre de cada carrusel. Hoy muestra solo los comentarios. |
| `quote` | `TESTIMONIAL` | Una frase textual de Emmanuel. El video ya es el testimonio; la cita es un plus. |

Las portadas de YouTube **no** llevan título ni canal, y es decisión tomada: se
muestran solas. No volver a agregarles rótulo.

---

## 4. Limpieza pendiente

**Ramas ya fusionadas en `main`** (no molestan, es orden):

```bash
git branch -d material-real-y-testimonio ux-carruseles-y-banda-clara ux-tamanos-y-apilado
git push origin --delete material-real-y-testimonio
```

**Carpeta descartable:** `C:\Users\Joaquin\Desktop\Edición\Portfolio-JRojas-DESCARTABLE`
es un clon viejo de junio. Se verificó que no tiene ningún commit ni cambio
propio — sus "31 archivos modificados" eran solo diferencias de fin de línea.
Se puede borrar.

---

## 5. Peso del repo

`public/reels/` (18,8 MB) + `public/testimonio/` (11,7 MB) ≈ **30 MB de video
versionados en git**. Hoy funciona bien. Si el repo se vuelve incómodo de
clonar, las salidas son mover esos archivos a un CDN o a Git LFS.

---

## Cosas que muerden al retomar

**El script `dev` está roto en cmd de Windows.** `package.json` usa
`WATCHPACK_POLLING=true next dev`, que es sintaxis Unix y cmd.exe no entiende.
Alternativas:

```bash
# desde Git Bash
WATCHPACK_POLLING=true npx next dev --hostname 127.0.0.1 --port 3000

# o arreglarlo de raíz con cross-env
npm i -D cross-env
# y en package.json: "dev": "cross-env WATCHPACK_POLLING=true next dev"
```

**No correr `next build` con el dev server levantado.** Los dos escriben sobre
`.next` y lo dejan corrupto. El síntoma es un panic de Turbopack con
`exit code: 0xc0000142` y la página devolviendo 500 — parece un error del código
y no lo es. Se arregla frenando node y borrando la caché:

```bash
rm -rf .next
```

**El puerto 3000 queda tomado por procesos huérfanos.** Si el dev falla con
`EADDRINUSE`, hay un `next dev` viejo vivo. Para encontrarlo y bajarlo:

```powershell
Get-NetTCPConnection -LocalPort 3000 -State Listen |
  ForEach-Object { Get-CimInstance Win32_Process -Filter "ProcessId = $($_.OwningProcess)" }
```

**Dos cuentas de GitHub.** El repo es de `Joakorojasc`, pero el navegador suele
tener la sesión de `asistual`, que no tiene permiso de escritura → push 403. El
remote ya lleva el usuario embebido (`https://Joakorojasc@github.com/...`) para
forzar la cuenta correcta.
