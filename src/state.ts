import { proxy } from "valtio";

export const page = proxy({ value:  "home" as "home"|"login"|"map" })

export const homeScrollTop = proxy({ value: 0 })