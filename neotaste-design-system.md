# Neotaste — Base Design System Reference
> Extraído directamente del archivo Figma «Neotaste Base Design System» · Mayo 2026  
> Fuente: `BsGad7r8SrlvtJxpoe6zSQ` · Herramienta: Figma MCP (Southleft)

---

## Índice
1. [Tokens de Color — Paleta Base](#1-tokens-de-color--paleta-base)
2. [Tokens de Color — Semánticos (COLORS)](#2-tokens-de-color--semánticos-colors)
3. [Tokens de Espaciado y Radio (Size)](#3-tokens-de-espaciado-y-radio-size)
4. [Tokens de Ancho de Borde (Border Width)](#4-tokens-de-ancho-de-borde-border-width)
5. [Tipografía](#5-tipografía)
6. [Referencias de Pantalla](#6-referencias-de-pantalla)

---

## 1. Tokens de Color — Paleta Base
> Colección: `🎨 BASE:` · Modo: Mode 1 · 94 variables

### Green (brand primario)
| Token | Hex | Uso |
|---|---|---|
| `Green/50` | `#eefef4` | Fondo brand muy sutil, hover states |
| `Green/100` | `#d8ffe7` | Superficie brand suave |
| `Green/200` | `#bafad4` | Superficie brand media |
| `Green/300` | `#79fcad` | Brand accent claro |
| `Green/400*` | `#53f293` | **Brand principal** — CTA, badges activos |
| `Green/500` | `#3ee380` | Brand hover / pressed |
| `Green/600` | `#28ce6a` | Brand énfasis |
| `Green/700` | `#219750` | Brand oscuro |
| `Green/800` | `#145b32` | Brand muy oscuro |
| `Green/900` | `#11301d` | Background inverso brand, tooltips |
| `Green/950` | `#08180f` | Background inverso brand fuerte |

### Mustard (acento secundario)
| Token | Hex | Uso |
|---|---|---|
| `Mustard/50` | `#fefde8` | Fondo acento muy sutil |
| `Mustard/100` | `#fffbc2` | Chip recency sutil |
| `Mustard/200*` | `#fff592` | Acento sutil |
| `Mustard/300` | `#ffe645` | **Chip Recency Counter** — señal social principal |
| `Mustard/400` | `#fcd413` | Acento énfasis |
| `Mustard/500` | `#ecbb06` | Nivel 05 default |
| `Mustard/600` | `#cc9102` | Mustard oscuro |
| `Mustard/700` | `#a26706` | Mustard muy oscuro |
| `Mustard/800` | `#86510d` | — |
| `Mustard/900` | `#724211` | — |
| `Mustard/950` | `#432205` | — |

### Mango (nivel 03 / naranja)
| Token | Hex | Uso |
|---|---|---|
| `Mango/200*` | `#ffc86a` | Nivel 03 sutil |
| `Mango/300` | `#ffb64a` | Acento naranja claro |
| `Mango/400` | `#ff9b20` | Acento naranja |
| `Mango/500` | `#f97607` | **Nivel 03 default** — badges de categoría |
| `Mango/600` | `#dd5202` | Naranja oscuro |
| `Mango/700` | `#b73506` | — |

### Strawberry (error / alerta)
| Token | Hex | Uso |
|---|---|---|
| `Strawberry/100` | `#fee2e2` | Fondo error sutil |
| `Strawberry/300` | `#fda4a4` | Error suave |
| `Strawberry/400` | `#fa6f6f` | Error medio |
| `Strawberry/500*` | `#f24141` | **Error / destructive** — estados de error, validación |
| `Strawberry/600` | `#df2323` | Error énfasis |
| `Strawberry/700` | `#bc1919` | Error oscuro |

### Spirulina (nivel 02 / azul)
| Token | Hex | Uso |
|---|---|---|
| `Spirulina/200` | `#b8e3ff` | Nivel 02 sutil |
| `Spirulina/400*` | `#24afff` | **Nivel 02 default** — badges informativos |
| `Spirulina/500` | `#069af1` | Azul énfasis |
| `Spirulina/600` | `#007ace` | Azul oscuro |

### Grey (neutros)
| Token | Hex | Uso |
|---|---|---|
| `Grey/50` | `#fafafa` | Fondo casi blanco |
| `Grey/100` | `#f5f5f5` | Surface default |
| `Grey/200` | `#e5e5e5` | Surface medium / nivel 04 sutil |
| `Grey/300` | `#d4d4d4` | Surface strong / bordes |
| `Grey/400` | `#a3a3a3` | Nivel 04 default / placeholder |
| `Grey/500` | `#737373` | Texto terciario |
| `Grey/600` | `#525252` | Texto secundario oscuro |
| `Grey/700` | `#404040` | Inverso neutro sutil |
| `Grey/800` | `#262626` | Inverso neutro default |
| `Grey/900` | `#171717` | Casi negro |
| `Grey/950` | `#0a0a0a` | **Negro primario** — texto principal |

### Opacidades
| Token | Hex | Uso |
|---|---|---|
| `Black-Opacity/05` | `#0000000d` | Overlay muy sutil |
| `Black-Opacity/10` | `#0000001a` | Border primary / overlay default |
| `Black-Opacity/20` | `#00000033` | Overlay medio |
| `Black-Opacity/30` | `#0000004d` | Overlay medio-fuerte |
| `Black-Opacity/50` | `#00000080` | Texto disabled / overlay fuerte |
| `Black-Opacity/70` | `#000000b2` | Texto secundario |
| `Black-Opacity/100` | `#000000` | Negro puro |
| `White-Opacity/10` | `#fefefe1a` | Border inverso secundario |
| `White-Opacity/30` | `#fefefe4d` | Border inverso secundario |
| `White-Opacity/70` | `#fefefeb2` | Border inverso / texto inverso disabled |
| `White-Opacity/100` | `#fefefe` | Blanco base |
| `Green-Opacity/05` | `#53f2930d` | Brand overlay muy sutil |
| `Green-Opacity/10` | `#53f2931a` | Border brand |
| `Green-Opacity/20` | `#53f29333` | Brand overlay default |
| `Green-Opacity/30` | `#53f2934d` | Brand overlay fuerte |

---

## 2. Tokens de Color — Semánticos (COLORS)
> Colección: `🎨 COLORS:` · Modo: Light · 51 variables  
> Estos son los tokens que se usan en los componentes. Siempre referenciar estos, nunca los de la paleta base directamente.

### Background
| Token semántico | Hex resuelto | Función |
|---|---|---|
| `Background/Neutral/Base` | `#fefefe` | Fondo base de pantallas y cards |
| `Background/Neutral/Surface/Default` | `#f5f5f5` | Chips neutros, pill social, inputs |
| `Background/Neutral/Surface/Medium` | `#e5e5e5` | Divisores, surfaces de énfasis |
| `Background/Neutral/Surface/Strong` | `#d4d4d4` | Bordes de cards, separadores fuertes |
| `Background/Brand/Default` | `#53f293` | CTAs primarios, deal chips activos |
| `Background/Brand/Strong` | `#3ee380` | Hover / pressed de CTAs |
| `Background/Brand/Subtle` | `#bafad4` | Fondo brand muy suave |
| `Background/Accent/01/Subtle` | `#fffbc2` | Recency chip sutil |
| `Background/Accent/01/Default` | `#fff592` | Acento amarillo default |
| `Background/Accent/01/Strong` | `#ffe645` | **Chip Recency Counter** — señal social principal |
| `Background/Accent/02` | `#ffc86a` | Acento naranja suave |
| `Background/Accent/03` | `#24afff` | Acento azul |
| `Background/Levels/Level 01/Subtle` | `#bafad4` | Badge verde sutil |
| `Background/Levels/Level 01/Default` | `#53f293` | Badge verde activo |
| `Background/Levels/Level 02/Subtle` | `#b8e3ff` | Badge azul sutil |
| `Background/Levels/Level 02/Default` | `#069af1` | Badge azul activo |
| `Background/Levels/Level 03/Subtle` | `#ffc86a` | Badge naranja sutil |
| `Background/Levels/Level 03/Default` | `#f97607` | Badge naranja activo |
| `Background/Levels/Level 04/Subtle` | `#e5e5e5` | Badge gris sutil |
| `Background/Levels/Level 04/Default` | `#a3a3a3` | Badge gris activo |
| `Background/Levels/Level 05/Subtle` | `#fff592` | Badge amarillo sutil |
| `Background/Levels/Level 05/Default` | `#ecbb06` | Badge amarillo activo |
| `Background/Inverse/Brand/Default` | `#11301d` | Tooltip RecencyCard, fondo inverso brand |
| `Background/Inverse/Brand/Strong` | `#08180f` | Fondo inverso brand fuerte |
| `Background/Inverse/Neutral/Default` | `#262626` | Superficies oscuras neutras |
| `Background/Inverse/Neutral/Subtle` | `#404040` | Superficies oscuras sutiles |
| `Background/Overlay/Brand/Default` | `#53f29333` | Overlay brand semitransparente |
| `Background/Overlay/Brand/Strong` | `#53f2934d` | Overlay brand fuerte |
| `Background/Overlay/Black/Subtle` | `#0000000d` | Scrim sutil |
| `Background/Overlay/Black/Default` | `#0000001a` | Scrim default |
| `Background/Overlay/White/Default` | `#fefefe33` | Overlay blanco |
| `Background/Overlay/White/Subtle` | `#fefefe0d` | Overlay blanco sutil |

### Foreground (texto e iconos)
| Token semántico | Hex resuelto | Función |
|---|---|---|
| `Foreground/Primary` | `#0a0a0a` | Texto principal, iconos activos |
| `Foreground/Secondary` | `#000000b2` | Texto secundario, subheadings |
| `Foreground/Tertiary` | `#737373` | Texto terciario, metadata (rating, distancia) |
| `Foreground/Disabled` | `#00000080` | Texto y iconos deshabilitados |
| `Foreground/Brand` | `#53f293` | Texto brand (ej. cifras en tooltip) |
| `Foreground/Brand/Disabled` | `#53f29380` | Brand deshabilitado |
| `Foreground/Inverse` | `#fefefe` | Texto sobre fondos oscuros |
| `Foreground/Inverse-Disabled` | `#fefefeb2` | Texto inverso deshabilitado |
| `Foreground/Error` | `#f24141` | Mensajes de error, iconos de alerta |

### Border
| Token semántico | Hex resuelto | Función |
|---|---|---|
| `Border/primary` | `#0000001a` | Borde general de cards y containers |
| `Border/secondary` | `#0000000d` | Borde muy sutil, separadores internos |
| `Border/strong` | `#11301d` | Borde fuerte (estados activos inversos) |
| `Border/inverse primary` | `#fefefeb2` | Borde sobre fondos oscuros |
| `Border/inverse secondary` | `#fefefe4d` | Borde sutil sobre fondos oscuros |
| `Border/inverse strong` | `#fefefe` | Borde blanco puro sobre fondos oscuros |
| `Border/error` | `#f24141` | Borde de inputs en estado de error |
| `Border/brand` | `#53f29333` | Borde brand semitransparente |

---

## 3. Tokens de Espaciado y Radio (Size)
> Colección: `Size` · Modo: Mode 1 · 17 variables

### Espaciado
| Token | Valor | Uso típico |
|---|---|---|
| `Space/XS` | `4px` | Gap mínimo entre elementos inline (emojis, separadores) |
| `Space/S` | `8px` | Gap entre chips, padding interno de pills |
| `Space/M` | `12px` | Padding interno de filter chips, gap en filter row |
| `Space/L` | `16px` | Padding de cards, márgenes laterales de pantalla |
| `Space/XL` | `24px` | Gap entre secciones, espacio entre card y mapa |
| `Space/2XL` | `32px` | Separación de bloques mayores |
| `Space/3XL` | `48px` | Espacio de secciones grandes |
| `Space/4XL` | `64px` | Separación de pantalla / hero spacing |

### Radio de borde
| Token | Valor | Uso típico |
|---|---|---|
| `Radius/None` | `0px` | Sin redondeo (tablas, separadores) |
| `Radius/XS` | `4px` | Chips pequeños inline, badges de texto |
| `Radius/S` | `8px` | Inputs, elementos secundarios |
| `Radius/M` | `12px` | Componentes medianos |
| `Radius/L` | `16px` | Cards (peek card, restaurant detail), fotos de restaurante |
| `Radius/XL` | `24px` | Chips de recency, filter chips, pills sociales |
| `Radius/2XL` | `32px` | Search bar, modales grandes |
| `Radius/3XL` | `48px` | Botones grandes tipo pill |
| `Radius/4XL` | `9999px` | Círculos perfectos, elementos completamente redondeados |

---

## 4. Tokens de Ancho de Borde (Border Width)
> Colección: `Border Width` · Modo: Mode 1 · 3 variables

| Token | Valor | Uso |
|---|---|---|
| `Border Width/S` | `1px` | Borde estándar de cards, inputs, separadores |
| `Border Width/M` | `2px` | Borde de énfasis, estados activos |
| `Border Width/L` | `4px` | Borde fuerte, focus rings accesibles |

---

## 5. Tipografía
> Familia base: **Poppins** · 18 estilos definidos  
> Todos los estilos usan `textCase: ORIGINAL` y `textDecoration: NONE` salvo indicación.

### Display — Títulos de pantalla completa
| Estilo | Familia | Peso | Tamaño | Line-height | Letter-spacing |
|---|---|---|---|---|---|
| `Display/Large` | Poppins | Bold (700) | 52px | 60px | -0.3% |
| `Display/Medium` | Poppins | Bold (700) | 44px | 52px | -0.3% |
| `Display/Small` | Poppins | Bold (700) | 36px | 44px | 0 |

### Heading — Jerarquía de títulos
| Estilo | Familia | Peso | Tamaño | Line-height | Letter-spacing |
|---|---|---|---|---|---|
| `Heading/H1` | Poppins | Bold (700) | 32px | 38px | 0 |
| `Heading/H2` | Poppins | Bold (700) | 28px | 34px | 0 |
| `Heading/H3` | Poppins | Bold (700) | 24px | 30px | 0 |
| `Heading/H4` | Poppins | Bold (700) | 20px | 26px | 0 |
| `Heading/H5` | Poppins | Bold (700) | 16px | 20px | +0.25px |

### Paragraph — Cuerpo de texto
| Estilo | Familia | Peso | Tamaño | Line-height | Uso |
|---|---|---|---|---|---|
| `Paragraph/Large` | Poppins | Medium (500) | 18px | 28px | Descripción destacada |
| `Paragraph/Medium` | Poppins | Medium (500) | 16px | 24px | Texto de búsqueda, placeholders |
| `Paragraph/Small` | Poppins | Medium (500) | 14px | 20px | Cuerpo estándar, metadata |
| `Paragraph/Small/Bold` | Poppins | Bold (700) | 14px | 20px | Cuerpo con énfasis |
| `Paragraph/XSmall` | Poppins | Medium (500) | 12px | 18px | Metadata secundaria (rating, distancia, categoría) |

### Label — Etiquetas y chips
| Estilo | Familia | Peso | Tamaño | Line-height | Uso |
|---|---|---|---|---|---|
| `Label/Large` | Poppins | SemiBold (600) | 16px | 20px | Tabs activos, sección headers |
| `Label/Medium` | Poppins | SemiBold (600) | 14px | 18px | Nombre de restaurante en peek card, filter chips |
| `Label/Small` | Poppins | SemiBold (600) | 12px | 16px | Chip recency counter, deal chips, tab bar |

### Action — Botones y CTAs
| Estilo | Familia | Peso | Tamaño | Line-height | Paragraph-spacing | Uso |
|---|---|---|---|---|---|---|
| `Action/Medium` | Poppins | SemiBold (600) | 16px | 16px | 16px | CTA principal (Redeem deal, Book) |
| `Action/Small` | Poppins | SemiBold (600) | 14px | 14px | 16px | CTA secundario, botones inline |

---

## 6. Referencias de Pantalla

### 6.1 Búsqueda / Mapa (Discover)
> Frame: `1 Map view - default` · 390 × 844px

**Patrones visuales observados:**
- **Fondo**: Mapa de calles a pantalla completa como layer base.
- **Search bar**: Pill blanca (`Background/Neutral/Base`) con sombra `drop-shadow(0 2px 7px rgba(67,67,67,0.25))`, `Radius/2XL` (32px), posicionada sobre el mapa con margen `Space/L` (16px) a cada lado.
- **Filter chips**: Fila horizontal scrollable debajo del search bar. Cada chip usa `Background/Neutral/Base`, `Radius/L` (16px), `padding: Space/M Space/L` (12px 16px), `Label/Medium`. Incluye: Filters ▾, Now, Cuisine ▾, Sort ▾, Flash Deals, Loyalty.
- **Pins de restaurante**: Pins verdes (marca NeoTaste) con letra "N" distribuidos en el mapa. Los pins con actividad reciente llevan un badge de fuego 🔥 (bajo = 🔥, medio = 🔥🔥, alto = 🔥🔥🔥) en una burbuja blanca posicionada en top-right del pin.
- **Browse all deals**: Sección de lista visible en el borde inferior de la pantalla, actuando como bottom sheet parcial que invita al scroll.
- **Tab bar**: 5 items (Home, Feed, Discover activo, Bookings, Profile). Discover muestra el icono de pin de mapa con texto activo en `Foreground/Primary`.
- **Location button**: FAB circular blanco (`Radius/4XL`) con icono de dirección, posicionado bottom-right sobre el mapa.

---

### 6.2 Detalle del Restaurante
> Frame: `7 Restaurant Screen` · 390 × 2746px (scroll largo)

**Patrones visuales observados:**
- **Hero image**: Foto del restaurante a ancho completo en la parte superior, con navegación (atrás, like, share) superpuesta con iconos blancos sobre overlay oscuro.
- **Header info**: Nombre del restaurante en `Heading/H3` o `H4`, seguido de categoría, rating y distancia en `Paragraph/XSmall` con `Foreground/Tertiary`.
- **Tabs de navegación**: Overview · Followers · About — tabs horizontales con indicador de línea inferior en `Background/Brand/Default`.
- **Sección Deals**: Cards de oferta apiladas verticalmente. Cada deal card muestra: precio original/descuento, nombre del deal, restricciones. CTA "Book now" en `Background/Brand/Default` (`#53f293`), `Radius/3XL` (48px), `Action/Medium`.
- **Recency Counter**: Aparece en la sección de deals con el chip amarillo `Background/Accent/01/Strong` (`#ffe645`) mostrando "X booked this week". Mismo componente que en la peek card — consistencia deliberada.
- **Ocasión más popular**: Tag que indica el contexto de reserva más frecuente (ej. "Most booked for: date night").
- **Reviews**: Sección con rating global (4.7 ★), avatar del reviewer, texto de review, fotos adjuntas.
- **About**: Mini-mapa embebido, dirección, horarios, links de contacto.
- **Similar Restaurants**: Carrusel horizontal al pie del scroll.
- **CTA fijo**: Botón "Book now" sticky en el bottom mientras el usuario scrollea por los deals.

---

### 6.3 Bookings
> Frame: `9 bookings - upcoming` · 390 × 844px

**Patrones visuales observados:**
- **Header**: "Bookings" en `Heading/H1` o `H2`, alineado a la izquierda, sobre fondo `Background/Neutral/Base`.
- **Tabs Upcoming / History**: Tabs de texto con indicador de underline en `Background/Brand/Default`. "Upcoming" activo, "History" en `Foreground/Tertiary`.
- **Booking card**: Card de reserva activa mostrando:
  - Foto del restaurante en formato banner (ancho completo, `Radius/L` arriba).
  - Nombre del restaurante en `Label/Large` o `Heading/H4`.
  - Detalles: nombre del deal · fecha y hora · icono de chevron para ver detalles.
  - Fila de acciones: Location · Share · Cancel · Support — 4 acciones en iconos con label, distribuidos equitativamente.
  - CTA principal: "Redeem deal" a ancho completo, `Background/Brand/Default` (`#53f293`), `Radius/3XL`, `Action/Medium`.
- **Estado vacío implícito**: La pantalla está diseñada para mostrar siempre al menos la card de la reserva activa, en coherencia con el principio de never show empty state.
- **Tab bar**: Bookings activo con icono de check.

---

### 6.4 Perfil
> Frame: `profile` · 390 × 777px

**Patrones visuales observados:**
- **Header**: "Profile" en `Heading/H1`, alineado a la izquierda.
- **Avatar + nombre**: Avatar circular grande con inicial de nombre (`Radius/4XL`, `Background/Brand/Default`), nombre en `Heading/H4`, "Edit profile" en `Paragraph/XSmall` con `Foreground/Tertiary`. Chevron derecho para navegación.
- **Stats row**: 4 métricas en fila: Favourite · Saved · Deals · Level. Cada una muestra el número en `Heading/H3` y la etiqueta en `Paragraph/XSmall`. Distribución equitativa en `Background/Neutral/Surface/Default` con `Radius/L`.
- **Banner de referral**: Bloque destacado con fondo `Background/Inverse/Brand/Default` (`#11301d`), texto "Give a month, get a month" en `Foreground/Inverse`, CTA "Invite friends" en `Background/Brand/Default` (`#53f293`), `Radius/3XL`. Imagen decorativa a la derecha.
- **Lista de opciones**: Filas de navegación estándar — Friends · Membership · Help & Support · Cash Rewards · Settings. Cada fila: icono a la izquierda + label en `Label/Medium` + chevron derecho. Separadas por `Border/primary`.
- **Tab bar**: Profile activo con icono de usuario.
- **Patrón social**: La sección "Friends" es el punto de entrada al grafo social, no un tab separado — en línea con la decisión de diseño de no crear un tab social independiente.

---

## Notas de implementación

### Jerarquía de tokens
Siempre usar tokens **semánticos** (`COLORS`) en componentes, nunca los de la paleta `BASE` directamente. Los tokens BASE existen para alimentar los semánticos y para crear nuevos modos de tema (dark mode futuro).

### Escala de recency (señal social principal del sprint)
El chip de Recency Counter usa siempre `Background/Accent/01/Strong` (`#ffe645`) con texto en `Foreground/Primary` (`#0a0a0a`) y `Label/Small`. El tooltip de explicación usa `Background/Inverse/Brand/Default` (`#11301d`) con texto de cifras en `Foreground/Brand` (`#53f293`).

### Degradación de señales
- Usuario conectado (5+ amigos): Pill social (`Background/Neutral/Surface/Default`) + Chip recency (`Background/Accent/01/Strong`)
- Usuario nuevo (0 amigos): Solo chip recency si contador ≥ umbral
- Sin datos suficientes: Ninguno de los dos — el layout se adapta sin placeholder vacío

### Fuentes del sistema
Poppins está disponible en Google Fonts. Para el status bar de iOS se usa SF Pro Text (sistema, no importar).

---

*Generado el 20 de mayo de 2026 · NeoTaste × Yummy Labs Design Sprint*  
*Extraído con Figma MCP (Southleft) desde `BsGad7r8SrlvtJxpoe6zSQ`*
