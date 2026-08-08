# Bitácora — sesión del 8 de agosto de 2026

Registro de lo que se conversó y por qué se decidió cada cosa. `ESTRATEGIA.md`
tiene las conclusiones de negocio y `AUDITORIA.md` lo que queda pendiente; acá
está el razonamiento, incluido lo que se probó y se descartó.

---

## 1. La pregunta que abrió todo: prospección en frío y trabajar a porcentaje

**Pregunta:** ¿conviene ofrecer de entrada "te consigo clientes y me llevo un
porcentaje"?

**Respuesta: no**, y menos en servicios de contenido.

Cuatro razones:

- **Señala desesperación.** Nadie con demanda regala su trabajo por un
  porcentaje hipotético.
- **Invierte todo el riesgo.** Si el cliente no cierra los leads o cambia de
  idea, se pierde todo el trabajo hecho.
- **La atribución es imposible en contenido.** Un carrusel no tiene tracking
  limpio hasta la venta. Se termina peleando por plata con alguien que ya tiene
  el trabajo entregado.
- **Filtra al revés.** Atrae al que no quiere pagar y espanta al que sí tiene
  presupuesto, porque interpreta que si no cobras es porque no vales.

**Lo que sí funciona en frío:** el primer mensaje no vende, gana el derecho a un
segundo mensaje. Segmentar duro, probar que miraste la cuenta, **regalar una
muestra en vez de un porcentaje** (rehacer una pieza suya y mandarla sin
condiciones), y pedir algo minúsculo.

**Cuándo el porcentaje sí tiene sentido:** como bono sobre una base fija, cuando
el evento es medible sin discusión (UTM, código, checkout), y con clientes que
ya pagaron una vez.

**El error de fondo:** precio bajo o gratis no vence la objeción real, que es
desconfianza. El porcentaje intenta resolverla con dinero; se resuelve con
prueba. Por eso la muestra hecha funciona y el "no me pagas hasta que vendas"
no.

---

## 2. El giro: el curso ya tenía la respuesta

Buscando en la máquina aparecieron dos activos que cambiaron la conversación:

- `~/cerebro/conocimiento-contenido/` — 121 notas del curso *Growing Content*,
  organizadas en 12 comunidades.
- `~/cerebro/grafos/growing-content/` — el grafo (108 nodos, 136 aristas) con
  los god nodes identificados, y los 6 documentos fuente en `raw/`.

Ahí estaban, como nodos literales, `Propuesta en Miro`, `Loom para complementar
la propuesta`, `Paquete Content` y `Feedback de postulaciones`.

**Conclusión que reemplazó mi consejo genérico:** existe un módulo llamado
*"Cómo prepararse para postularse a través de la bolsa de trabajo de Growing"*.
Hay canal caliente disponible. La prospección en frío es para cuando no lo hay.

**Sobre bajar el precio:** la meta es +US$1.000 con 2 clientes, o sea US$500 por
cliente. Eso ya es precio normal de Paquete Content. No hay problema de precio
que resolver. El curso lo dice directo: *"estás sobrecapacitado, sé demasiado"*.

**La ventaja frente a otros postulantes:** el Paquete Content del curso es
escritura. La mayoría postula sólo con eso. Joaquín entrega el guion **y** la
pieza editada.

---

## 3. Sobre usar el grafo

Se evaluó generar los diagramas "desde graphify". **Se descartó:** `graph.html`
es un force-directed interactivo, impresionante para uso propio e ilegible para
un emprendedor.

**El rol correcto del grafo es decir qué dibujar.** Los god nodes son el
currículum intelectual: de ahí salieron los tres tableros de Miro (4 P's,
Hook·Body·CTA, Ciclo de 14 días).

Idea guardada para más adelante: usar el grafo como *generador* — dado el nicho
del prospecto, recorrerlo para armar las 10 ideas de contenido de la propuesta.
Ahí se tocan `contentjoako` y esto.

---

## 4. Decisiones de diseño, incluidas las que se revirtieron

Vale la pena dejarlas anotadas para no volver a proponerlas.

| Se probó | Resultado |
|---|---|
| Paleta editorial clara (papel + tinta) | **Se quedó.** |
| Acento terracota reemplazando al violeta | **Revertido.** El violeta gusta más. La señal de IA no era el violeta sino violeta claro + gradiente + fondo casi negro; en tono tinta sobre papel se lee editorial. |
| Ámbar como acento único | **Reconvertido en regla:** el ámbar es sólo para números. Un segundo color que significa algo deja de ser decoración. |
| Segunda familia tipográfica (Instrument Serif) | **Revertido.** No aportaba. El contraste lo dan el peso y el tamaño, no otra fuente. |
| Navbar de píldora flotante con blur | **Reemplazada** por cabecera de diario con folio y subrayado. Era el trío por defecto de toda IA. |
| Filetes verticales de columna | **Revertidos** por preferencia. |
| Grano de papel, folios, notas al margen | **Se quedaron.** Respuesta correcta a "faltan objetos": mobiliario de imprenta, no glows ni blobs. |
| Mayúscula fina con tracking abierto | **Eliminada** en 18 lugares. |
| Em dashes en el copy | **Eliminados.** Es el tell de LLM que más creció en 2026. |
| Voseo argentino en el copy | **Eliminado.** El sitio va en español de Chile. |

---

## 5. La skill anti-IA

Se investigó qué se está señalando hoy como "cara de IA" y se escribió una skill
propia en `~/.claude/skills/landing-humana/`. Contiene los 8 tells con su
reemplazo concreto, una auditoría ejecutable y un checklist final.

Se disparará sola cuando se hable de landings o cuando alguien diga que algo se
ve muy IA.

Al correrla contra este mismo portfolio encontró lo que después se corrigió: una
sola familia tipográfica, gradiente en el nombre, em dashes y fondos alternados.

Fuentes: 925studios *AI Slop Web Design* (2026), AIToolPick *30-Point Checklist*
(2026), Forbes *15 New Giveaway Signs* (feb 2026).

---

## 6. Los casos

Los tres salieron de lo que contó Joaquín en la conversación:

- **Barbertendence** — contratado para editar, terminó a cargo de la identidad
  visual. Se adaptó a Notion y Drive del equipo. Rebranding con +80 portadas de
  YouTube rehechas. Cero entregas fuera de plazo.
- **Héctor Muerza** — pedía motion graphics que Joaquín no dominaba. Aprendió
  After Effects con el proyecto como vara. **Se cuenta sin mencionar la IA:**
  resta mérito a lo que en realidad es la mejor historia del portfolio.
- **Mariana** — anterior a los otros dos. Varios videos sobre el millón de
  visitas.

**Observación honesta que quedó registrada:** los tres prueban oficio,
adaptabilidad y cumplimiento, pero ninguno tiene un número de negocio detrás. Por
eso la sección Método no es decorativa: es lo único que sostiene el título de
content specialist. Si esos tableros quedan vacíos, el sitio vuelve a decir
"editor bueno".

---

## 7. Lofi Chile en el portfolio

El proyecto personal (`~/Projects/LoFi Chile`, piloto Puerto Varas) entró como
sección propia, no como pasatiempo suelto.

El motivo: su regla de oro es la misma que Joaquín le vende a un cliente. Las
granjas de lofi de YouTube usan el mismo stack y se nota al segundo; el trabajo
está en la capa humana. Es prueba de criterio aplicada a algo donde nadie le
paga por tenerlo.

---

## 8. Lo que quedó pendiente

Detalle completo en `AUDITORIA.md`. En orden:

1. El texto de relleno visible (`Cliente / Canal`, `Slide 1`) y las métricas sin
   verificar. Es una fuga, no una mejora.
2. Los tres tableros de Miro.
3. Cupos reales en el hero y el brief de 4 preguntas.
4. Enlaces del footer y meta description.

**Y lo que genera plata:** armar la propuesta en Miro y el guion del Loom para
postular a la bolsa. Es lo único de toda la lista que trae un cliente.
