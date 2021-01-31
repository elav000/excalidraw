import { ContainerRuntimeFactoryWithDefaultDataStore } from "@fluidframework/aqueduct";
import { ExcalidrawInstantiationFactory } from "./dataObject";

export const ExcalidrawContainerRuntimeFactory = new ContainerRuntimeFactoryWithDefaultDataStore(
  ExcalidrawInstantiationFactory,
  new Map([ExcalidrawInstantiationFactory.registryEntry]),
);
