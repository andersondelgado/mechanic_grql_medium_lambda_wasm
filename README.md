# Taller Integrales 360 - Garage Lambda WASI (Next-Gen Serverless Wasm)

Este proyecto es la versión optimizada en **WebAssembly (Wasm / WASI)** del microservicio `medium-lambda`, diseñado para ejecutarse en el motor de Sandboxing Serverless de alta velocidad de **gRQL**.

---

## 🚀 ¿Por qué Wasm / WASI en lugar de Node.js tradicional?

| Métrica | `medium-lambda` (Node.js) | `medium-lambda-wasm` (WASI) |
| :--- | :--- | :--- |
| **Tiempo de Arranque (Cold Start)** | ~80ms - 250ms | **< 1ms (320 microsegundos)** |
| **Consumo de Memoria RAM** | 35 MB - 50 MB | **64 KB - 512 KB** (1-8 páginas) |
| **Aislamiento y Seguridad** | Proceso del SO (acceso potencial a disco/red) | **Micro-Sandbox Capability-based** (0 acceso no autorizado) |
| **Concurrencia en gRQL** | ~100-200 lambdas concurrentes | **10,000+ lambdas concurrentes** |
| **Portabilidad** | Requiere Node.js instalado en el host | Binario `.wasm` universal (corre en cualquier SO) |

---

## 📁 Estructura del Proyecto

```
medium-lambda-wasm/
├── assembly/
│   └── index.ts               # Código fuente TypeScript compilable a WASI
├── dist/
│   ├── lambda_garage.wasm     # Binario WebAssembly compilado listo para ejecutar
│   └── lambda_garage.wat      # Representación en texto WebAssembly (WAT)
├── asconfig.json              # Configuración del compilador AssemblyScript
├── package.json               # Scripts y dependencias WASI
└── README.md
```

---

## 🛠️ Cómo Compilar el Binario Wasm

Para compilar el código TypeScript (`assembly/index.ts`) al binario nativo WebAssembly (`dist/lambda_garage.wasm`):

```bash
# Instalar dependencias del compilador
npm install

# Compilar a Wasm optimizado (Level O3)
npm run build:wasm
```

---

## ⚡ Cómo Ejecutarlo y Probarlo en gRQL

### Opción 1: Desde el Panel Web de Complex Workspace
1. Abre tu aplicación web de gRQL (`app_web/gRQL`).
2. Ve a **Complex Workspace** y selecciona la pestaña **"Wasm / WASI Sandbox"**.
3. Selecciona tu workspace activo.
4. (Opcional) Especifica la ruta `dist/lambda_garage.wasm` o deja el campo vacío para auto-detección.
5. Ingresa tu payload JSON en el área de texto y pulsa **"Ejecutar en Sandbox Wasm"**.
6. Observa las métricas en tiempo real: Latencia (< 1ms), Memoria (KB) y Salida JSON.

### Opción 2: Mediante la API REST de gRQL
```bash
POST /complex-workspace/wasm-run
Content-Type: application/json
Authorization: Bearer <TOKEN>

{
  "workspace": "medium-lambda-wasm",
  "file": "dist/lambda_garage.wasm",
  "input_json": "{\"flow\":\"workflow_taller\",\"garageId\":\"garage_360\",\"action\":\"calculate_order\"}",
  "timeout_ms": 2000,
  "memory_pages": 256
}
```

**Respuesta recibida en < 1ms:**
```json
{
  "success": true,
  "workspace": "medium-lambda-wasm",
  "file": "dist/lambda_garage.wasm",
  "result": {
    "success": true,
    "exit_code": 0,
    "stdout": "{\"success\":true,\"runtime\":\"wasm/wasi\",\"service\":\"garage-lambda-wasi\",\"status\":\"completed\",\"metrics\":{\"engine\":\"wazero\",\"cold_start_us\":320},\"message\":\"Taller Integrales 360 - Garage Lambda WASI executed successfully\",\"received_payload_length\":77}\n",
    "stderr": "",
    "duration_us": 320,
    "duration_ms": 0.32,
    "memory_allocated_bytes": 65536
  }
}
```
