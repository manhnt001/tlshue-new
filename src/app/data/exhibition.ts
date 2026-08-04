export * from "./panels/types";
import { ExhibitionItem } from "./panels/types";

// Load all JSON files from the json-panels directory
const jsonModules = import.meta.glob('./json-panels/*.json', { eager: true });

// Convert the loaded modules into an array of ExhibitionItem
export const exhibitionData: ExhibitionItem[] = Object.values(jsonModules).map(
  (module: any) => module.default || module
);

// Sort the data to match the expected order if necessary (optional, relying on filenames or group order is better)
// For now, we will sort them by id or let them be in the order glob returns (alphabetical)
exhibitionData.sort((a, b) => a.id.localeCompare(b.id));