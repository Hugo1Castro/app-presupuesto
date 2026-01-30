# App de Presupuesto - Documentación del Flujo

## Descripción General

Esta es una aplicación Angular para **gestionar un presupuesto personal**, controlando ingresos y egresos.

---

## Arquitectura General

```
AppComponent (Componente Principal)
    ├── CabeceraComponent    → Muestra resumen (presupuesto, totales, porcentaje)
    ├── FormularioComponent  → Permite agregar ingresos/egresos
    ├── IngresoComponent     → Lista y elimina ingresos
    └── EgresoComponent      → Lista y elimina egresos
```

---

## Modelos (Clases de datos)

### Modelo Ingreso
- **Archivo:** `src/app/ingreso/ingreso.model.ts`
- **Propiedades:**
  - `descripcion: string` - Descripción del ingreso
  - `valor: number` - Monto del ingreso

### Modelo Egreso
- **Archivo:** `src/app/egreso/egreso.model.ts`
- **Propiedades:**
  - `descripcion: string` - Descripción del egreso
  - `valor: number` - Monto del egreso

Ambos son simples clases con constructor que definen la estructura de los datos.

---

## Servicios (Lógica de negocio)

### IngresoService
- **Archivo:** `src/app/ingreso/ingreso.service.ts`
- **Responsabilidad:** Almacena el array `ingresos[]` y tiene método `eliminar()`
- **Datos iniciales:**
  - Salario: $4,000
  - Venta Coche: $500

### EgresoService
- **Archivo:** `src/app/egreso/egreso.service.ts`
- **Responsabilidad:** Almacena el array `egresos[]` y tiene método `eliminar()`
- **Datos iniciales:**
  - Renta Depto: $900
  - Ropa: $200

Los servicios usan `providedIn: 'root'` (singleton), lo que significa que **todos los componentes comparten la misma instancia** de datos.

---

## Componentes

### 1. AppComponent (Componente Principal)
- **Archivos:** `app.component.ts`, `app.component.html`
- **Función:** Componente raíz que orquesta toda la aplicación
- **Inyecta:** `IngresoService` y `EgresoService`
- **Métodos de cálculo:**
  - `getIngresoTotal()` - Suma todos los ingresos
  - `getEgresoTotal()` - Suma todos los egresos
  - `getPorcentajeTotal()` - Calcula el porcentaje de egresos sobre ingresos
  - `getPresupuestoTotal()` - Calcula ingresos menos egresos
- **Pasa datos a componentes hijos vía @Input**

### 2. CabeceraComponent
- **Archivos:** `cabecera/cabecera.component.ts`, `cabecera.component.html`
- **Función:** Muestra el resumen del presupuesto
- **Inputs recibidos:**
  - `presupuestoTotal` - Presupuesto disponible
  - `ingresoTotal` - Total de ingresos
  - `egresoTotal` - Total de egresos
  - `porcentajeTotal` - Porcentaje de gastos

### 3. FormularioComponent
- **Archivos:** `formulario/formulario.component.ts`, `formulario.component.html`
- **Función:** Permite agregar nuevos ingresos o egresos
- **Inyecta:** `IngresoService` y `EgresoService`
- **Propiedades:**
  - `tipo` - Tipo de operación (ingresoOperacion/egresoOperacion)
  - `descripcionInput` - Descripción ingresada por el usuario
  - `valorInput` - Valor ingresado por el usuario
- **Métodos:**
  - `tipoOperacion()` - Cambia el tipo según el select
  - `agregarValor()` - Agrega el ingreso o egreso al servicio correspondiente

### 4. IngresoComponent
- **Archivos:** `ingreso/ingreso.component.ts`, `ingreso.component.html`
- **Función:** Muestra la lista de ingresos y permite eliminarlos
- **Inyecta:** `IngresoService`
- **Métodos:**
  - `eliminarIngreso()` - Elimina un ingreso de la lista

### 5. EgresoComponent
- **Archivos:** `egreso/egreso.component.ts`, `egreso.component.html`
- **Función:** Muestra la lista de egresos con su porcentaje y permite eliminarlos
- **Inyecta:** `EgresoService`
- **Inputs recibidos:**
  - `ingresoTotal` - Para calcular el porcentaje de cada egreso
- **Métodos:**
  - `eliminarEgreso()` - Elimina un egreso de la lista
  - `calcularPorcentaje()` - Calcula el porcentaje de un egreso sobre el total de ingresos

---

## Flujo de Datos

```
┌─────────────────────────────────────────────────────────────────┐
│                        AppComponent                              │
│  • Inyecta IngresoService y EgresoService                       │
│  • Calcula: getIngresoTotal(), getEgresoTotal(),                │
│            getPorcentajeTotal(), getPresupuestoTotal()          │
│  • Pasa datos a componentes hijos vía @Input                    │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│  Cabecera     │    │  Formulario   │    │ Ingreso/Egreso│
│               │    │               │    │               │
│ @Input:       │    │ Inyecta       │    │ Inyecta       │
│ •presupuesto  │    │ servicios     │    │ servicios     │
│ •ingresoTotal │    │               │    │               │
│ •egresoTotal  │    │ agregarValor()│    │ eliminar()    │
│ •porcentaje   │    │ → push a      │    │ → splice del  │
│               │    │   servicio    │    │   servicio    │
└───────────────┘    └───────────────┘    └───────────────┘
```

---

## Flujo de Acciones

### 1. Agregar Ingreso/Egreso

1. Usuario llena el formulario (descripción + valor)
2. Selecciona tipo: `+` (ingreso) o `-` (egreso)
3. Al hacer submit → `agregarValor()`
4. Según el tipo, hace `push()` al array correspondiente del servicio
5. Como los componentes referencian el mismo array del servicio, la UI se actualiza automáticamente

### 2. Eliminar Ingreso/Egreso

1. Usuario hace clic en botón ❌ de un ítem
2. Se llama `eliminarIngreso(ingreso)` o `eliminarEgreso(egreso)`
3. El servicio busca el índice con `indexOf()` y lo elimina con `splice()`
4. La UI se actualiza automáticamente

### 3. Cálculos en Tiempo Real

- **Presupuesto Total** = Ingresos - Egresos
- **Porcentaje Total** = Egresos / Ingresos (qué porcentaje de ingresos se gasta)
- **Porcentaje por Egreso** = Valor egreso / Total ingresos

---

## Características de UI

- Usa **Bootstrap** para estilos
- Colores dinámicos: verde para ingresos, rojo para egresos (usando `ngClass`)
- Formato de moneda MXN con pipes (`currency`)
- Porcentajes con pipe (`percent`)
- Iconos de Bootstrap Icons para botones

---

## Estructura de Archivos

```
src/app/
├── app.component.ts          # Componente principal
├── app.component.html        # Template principal
├── app.component.css         # Estilos principales
├── app.config.ts             # Configuración de la app
├── app.routes.ts             # Rutas (si aplica)
│
├── cabecera/
│   ├── cabecera.component.ts
│   ├── cabecera.component.html
│   └── cabecera.component.css
│
├── formulario/
│   ├── formulario.component.ts
│   ├── formulario.component.html
│   └── formulario.component.css
│
├── ingreso/
│   ├── ingreso.component.ts
│   ├── ingreso.component.html
│   ├── ingreso.component.css
│   ├── ingreso.model.ts      # Modelo de datos
│   └── ingreso.service.ts    # Servicio
│
└── egreso/
    ├── egreso.component.ts
    ├── egreso.component.html
    ├── egreso.component.css
    ├── egreso.model.ts       # Modelo de datos
    └── egreso.service.ts     # Servicio
```

---

## Tecnologías Utilizadas

- **Angular** (Standalone Components)
- **TypeScript**
- **Bootstrap 5** (CSS Framework)
- **Bootstrap Icons** (Iconografía)
- **FormsModule** (Template-driven forms)
- **CommonModule** (Directivas comunes como ngClass, pipes)

---

*Documento generado el 30 de enero de 2026*
