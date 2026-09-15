import { Console } from "as-wasi/assembly";

export function _start(): void {
  const raw = Console.readAll();
  const inputLen: i32 = raw !== null ? raw.length : 0;

  const response = `{"success":true,"runtime":"wasm/wasi","service":"garage-lambda-wasi","status":"completed","metrics":{"engine":"wazero","cold_start_us":320},"message":"Taller Integrales 360 - Garage Lambda WASI executed successfully","received_payload_length":` + inputLen.toString() + `}`;

  Console.log(response);
}
