"use strict";

module.exports = {
  rules: {
    "flowtype/array-style-complex-type": ["error", "shorthand"],
    "flowtype/array-style-simple-type": ["error", "shorthand"],
    // "flowtype/boolean-style": ["error", "boolean"], //recommended
    "flowtype/define-flow-type": "error", //warn:recommended
    // "flowtype/delimiter-dangle": "off", //recommended //prettier
    // "flowtype/generic-spacing": ["error", "never"], //recommended //off:prettier
    "flowtype/newline-after-flow-annotation": "error",
    "flowtype/no-dupe-keys": "error",
    "flowtype/no-existential-type": "error",
    // "flowtype/no-flow-fix-me-comments": "off",
    // "flowtype/no-mutable-array": "off",
    "flowtype/no-primitive-constructor-types": "error",
    // "flowtype/no-types-missing-file-annotation": "error", //recommended
    "flowtype/no-unused-expressions": "error",
    "flowtype/no-weak-types": "off",
    // "flowtype/object-type-delimiter": "off", //prettier
    "flowtype/require-exact-type": "error",
    "flowtype/require-parameter-type": "error", //off:recommended
    "flowtype/require-return-type": ["error", "always", { "excludeArrowFunctions": true }], //off:recommended
    // "flowtype/require-types-at-top": "off",
    "flowtype/require-valid-file-annotation": ["error", "always", { "annotationStyle": "block" }], //off:recommended
    "flowtype/require-variable-type": "error",
    // "flowtype/semi": "off", //recommended //prettier
    "flowtype/sort-keys": "error",
    // "flowtype/space-after-type-colon": ["error", "always"], //recommended //off:prettier
    // "flowtype/space-before-generic-bracket": ["error", "never"], //recommended //off:prettier
    // "flowtype/space-before-type-colon": ["error", "never"], //recommended //off:prettier
    "flowtype/type-id-match": ["error", "^\\w+$"], //off:recommended
    "flowtype/type-import-style": ["error", "declaration"],
    // "flowtype/union-intersection-spacing": ["error", "always"], //recommended //off:prettier
    // "flowtype/use-flow-type": "warn", //recommended
    // "flowtype/valid-syntax": "warn", //recommended
  },
};
