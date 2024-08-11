import type { Barbershop } from "@/types/barbershop";
import { randomUUID } from "crypto";

export function fetchBarbershops() {
  const barbershop: Barbershop[] = [];

  for (let i = 0; i < 9; i++) {
    barbershop.push({
      id: randomUUID(),
      name: "Estilo Clássico",
      address: "Avenida Clássica, 707",
      phones: ["(11) 99999-9999", "(11) 99999-9999"],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac augue ullamcorper, pharetra orci mollis, auctor tellus. Phasellus pharetra erat ac libero efficitur tempus. Donec pretium convallis iaculis. Etiam eu felis sollicitudin, cursus mi vitae, iaculis magna. Nam non erat neque. In hac habitasse platea dictumst. Pellentesque molestie accumsan tellus id laoreet.",
      imageUrl:
        "https://utfs.io/f/e995db6d-df96-4658-99f5-11132fd931e1-17j.png",
    });
  }

  return barbershop;
}
