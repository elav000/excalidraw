// Most of the files in this folder taken from the examples for app-integration for @fluidframework
// https://github.com/microsoft/FluidFramework/blob/main/examples/hosts/app-integration/external-views/src/

import { getTinyliciousContainer } from "@fluidframework/get-tinylicious-container";
import { ExcalidrawContainerRuntimeFactory } from "./containerCode";
import { ExcalidrawDataObject } from "./dataObject";
import { ISharedDirectory } from "@fluidframework/map";
import { Container } from "@fluidframework/container-loader";
import { IFluidDataStoreRuntime } from "@fluidframework/datastore-definitions";

// Added interface to get at the runtime, root and container
export interface IExcalidrawFluidData {
  container: Container;
  roomId: string;
  root: ISharedDirectory;
  runtime: IFluidDataStoreRuntime;
}

// Boilerplate from example to start the container
export async function getExcalidrawData(
  roomId: string,
): Promise<IExcalidrawFluidData> {
  // TODO: Understand why it is up to me, the developer, to decide whether or not the container is new
  // getTinyliciousContainer should handle that for me
  let container;
  try {
    container = await getTinyliciousContainer(
      roomId,
      ExcalidrawContainerRuntimeFactory,
      true /* create new */,
    );
  } catch (err) {
    container = await getTinyliciousContainer(
      roomId,
      ExcalidrawContainerRuntimeFactory,
      false /* create new */,
    );
  }

  const url = "/";
  const response = await container.request({ url });

  if (response.status !== 200 || response.mimeType !== "fluid/object") {
    throw new Error(`Unable to retrieve data object at URL: "${url}"`);
  } else if (response.value === undefined) {
    throw new Error(`Empty response from URL: "${url}"`);
  }

  const excalidrawDataObject: ExcalidrawDataObject = response.value;

  return {
    container,
    roomId,
    root: excalidrawDataObject.rootSharedDirectory,
    runtime: excalidrawDataObject.dataObjectRuntime,
  };
}
