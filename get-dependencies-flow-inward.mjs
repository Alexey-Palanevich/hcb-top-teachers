import path from "node:path";

/**
 * @typedef {Object} Layer
 * @property {string} name - A human-readable name of the layer (e.g., "Business Rules", "Application Use Cases")
 * @property {string} pathTo - The file system path (relative or absolute) to the root directory of this layer
 */

/**
 * Generates ESLint import restriction zones that enforce Clean Architecture's inward dependency rule.
 *
 * According to Clean Architecture, inner layers (e.g., business rules) must not depend on outer layers
 * (e.g., adapters or frameworks). This function automates the generation of restriction rules for use
 * with ESLint's `import/no-restricted-paths` rule by preventing any higher-level (outer) layers
 * from importing lower-level (inner) layers.
 *
 * Example usage:
 * ```js
 * const layers = [
 *   { name: "0-business-rules", pathTo: "./src/0-business-rules" },
 *   { name: "1-application-rules", pathTo: "./src/1-application-rules" },
 *   { name: "2-adapters", pathTo: "./src/2-adapters" },
 *   { name: "3-drivers", pathTo: "./src/3-drivers" },
 * ];
 *
 * console.log(getDependenciesFlowInward(layers));
 * [
 *   { target: '/abs/path/0-business-rules', from: '/abs/path/1-application-rules', message: '0-business-rules cannot depend on 1-application-rules' },
 *   { target: '/abs/path/0-business-rules', from: '/abs/path/2-adapters', ... },
 *   ...
 * ]
 *
 * ```
 *
 * @param {Layer[]} layers - Ordered list of layers, from innermost (most abstract) to outermost (most concrete)
 * @returns {Array<{target: string, from: string, message: string}>} - Array of zone objects for ESLint configuration
 */
export const getDependenciesFlowInward = (
  layers,
) => {
  return layers.reduce((rules, layer, layerPosition) => {
    const layerRules = layers.slice(layerPosition+1).map((outside, outsidePosition) => ({
      target: getPath(layer.pathTo),
      from: getPath(outside.pathTo),
      message: `${layer.name} cannot depend on ${outside.name}`,
    }))

    return [...rules, ...layerRules]
  }, [])

}

function getPath(pathTo) {
  if (typeof pathTo !== 'string') {
    throw new Error('Unknown path')
  }

  return pathTo.startsWith('@') ? pathTo : path.resolve(pathTo)
}