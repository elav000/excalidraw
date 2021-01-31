import { DataObject, DataObjectFactory } from "@fluidframework/aqueduct";

export class ExcalidrawDataObject extends DataObject {
  protected async initializingFirstTime() {
    // initialize anything that needs to be initialized for firestore here (ie create root key in map)
    // this.root.set(diceValueKey, 1);
  }

  protected async hasInitialized() {
    // this.root.on("valueChanged", (changed) => {
    //   if (changed.key === diceValueKey) {
    //     // When we see the dice value change, we'll emit the diceRolled event we specified in our interface.
    //     this.emit("diceRolled");
    //   }
    // });
  }

  // public get value() {
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  //   return this.root.get(diceValueKey);
  // }

  public get rootSharedDirectory() {
    return this.root;
  }

  public get dataObjectRuntime() {
    return this.runtime;
  }
}

export const ExcalidrawInstantiationFactory = new DataObjectFactory(
  "excalidraw",
  ExcalidrawDataObject,
  [],
  {},
);
