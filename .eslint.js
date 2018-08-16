"use strict";

module.exports = {
  rules: {
    // Possible Errors
    // http://eslint.org/docs/rules/#possible-errors
    // ---------------------------------------------
    // "for-direction": "error",
    // "getter-return": "error",
    "no-await-in-loop": "error", //off:recommended
    // "no-compare-neg-zero": "error",
    // "no-cond-assign": "error",
    // "no-console": "error",
    // "no-constant-condition": "error",
    // "no-control-regex": "error",
    // "no-debugger": "error",
    // "no-dupe-args": "error",
    // "no-dupe-keys": "error",
    // "no-duplicate-case": "error",
    // "no-empty": "error",
    // "no-empty-character-class": "error",
    // "no-ex-assign": "error",
    // "no-extra-boolean-cast": "error",
    // "no-extra-parens": "off", //prettier
    // "no-extra-semi": "error", //off:prettier
    // "no-func-assign": "error",
    // "no-inner-declarations": "error",
    // "no-invalid-regexp": "error",
    // "no-irregular-whitespace": "error",
    // "no-obj-calls": "error",
    "no-prototype-builtins": "error", //off:recommended
    // "no-regex-spaces": "error",
    // "no-sparse-arrays": "error",
    "no-template-curly-in-string": "error", //off:recommended
    // "no-unexpected-multiline": "error", //off:prettier
    // "no-unreachable": "error",
    // "no-unsafe-finally": "error",
    // "no-unsafe-negation": "error",
    // "use-isnan": "error",
    // "valid-jsdoc": "off",
    // "valid-typeof": "error",

    // Best Practices
    // http://eslint.org/docs/rules/#best-practices
    // --------------------------------------------
    "accessor-pairs": "error", //off:recommended
    "array-callback-return": "error", //off:recommended
    "block-scoped-var": "error", //off:recommended
    "class-methods-use-this": "error", //off:recommended
    "complexity": "error", //off:recommended
    // "consistent-return": "off"
    // "curly": "off", //prettier
    "default-case": "error", //off:recommended
    // "dot-location": "off", //prettier
    "dot-notation": "error", //off:recommended
    "eqeqeq": "error", //off:recommended
    "guard-for-in": "error", //off:recommended
    "max-classes-per-file": "error", //off:recommended
    "no-alert": "error", //off:recommended
    "no-caller": "error", //off:recommended
    // "no-case-declarations": "error",
    // "no-div-regex": "off", //no-useless-escape
    "no-else-return": "error", //off:recommended
    "no-empty-function": "error", //off:recommended
    // "no-mepty-pattern": "error",
    "no-eq-null": "error", //off:recommended
    "no-eval": "error", //off:recommended
    "no-extend-native": "error", //off:recommended
    "no-extra-bind": "error", //off:recommended
    // "no-extra-label": "off", //no-label
    // "no-fallthrough": "error",
    // "no-floating-decimal": "off", //prettier
    // "no-global-assign": "error",
    "no-implicit-coercion": "error", //off:recommended
    "no-implicit-globals": "error", //off:recommended
    "no-implied-eval": "error", //off:recommended
    "no-invalid-this": "error", //off:recommended
    "no-iterator": "error", //off:recommended
    "no-labels": "error", //off:recommended
    "no-lone-blocks": "error", //off:recommended
    "no-loop-func": "error", //off:recommended
    "no-magic-numbers": "error", //off:recommended
    // "no-multi-spaces": "off", //prettier
    "no-multi-str": "error", //off:recommended
    "no-new": "error", //off:recommended
    "no-new-func": "error", //off:recommended
    "no-new-wrappers": "error", //off:recommended
    // "no-octal": "error",
    "no-octal-escape": "error", //off:recommended
    "no-param-reassign": "error",
    "no-proto": "error", //off:recommended
    // "no-redeclare": "error",
    // "no-restricted-properties": "off", //OK
    "no-return-assign": "error", //off:recommended
    "no-return-await": "error", //off:recommended
    "no-script-url": "error", //off:recommended
    // "no-self-assign": "error",
    "no-self-compare": "error", //off:recommended
    "no-sequences": "error", //off:recommended
    "no-throw-literal": "error", //off:recommended
    "no-unmodified-loop-condition": "error", //off:recommended
    "no-unused-expressions": "error", //off:recommended
    // "no-unused-labels": "error",
    "no-useless-call": "error", //off:recommended
    "no-useless-concat": "error", //off:recommended
    // "no-useless-escape": "error",
    "no-useless-return": "error", //off:recommended
    "no-void": "error", //off:recommended
    "no-warning-comments": "error", //off:recommended
    "no-with": "error", //off:recommended
    "prefer-promise-reject-errors": "error", //off:recommended
    "radix": "error", //off:recommended
    "require-await": "error", //off:recommended
    "vars-on-top": "error", //off:recommended
    // "wrap-iife": "off", //prettier
    "yoda": ["error", "never", { "exceptRange": true }], //off:recommended

    // Strict Mode
    // http://eslint.org/docs/rules/#strict-mode
    // -----------------------------------------
    // "script": "off", //OK

    // Variables
    // http://eslint.org/docs/rules/#variables
    // ---------------------------------------
    "init-declarations": "error", //off:recommended
    // "no-delete-var": "error",
    // "no-label-var": "off", //no-labels
    // "no-restricted-globals": "off", //OK
    "no-shadow": ["error", { "builtinGlobals": true, "hoist": "all" }], //off:recommended
    "no-shadow-restricted-names": "error", //off:recommended
    // "no-undef": "error",
    "no-undef-init": "error", //off:recommended
    "no-undefined": "error", //off:recommended
    // "no-unused-vars": "error",
    "no-use-before-define": "error", //off:recommended

    // Node.js and CommonJS
    // http://eslint.org/docs/rules/#nodejs-and-commonjs
    // -------------------------------------------------
    "callback-return": "error",
    "global-require": "error",
    "handle-callback-err": "error",
    "no-buffer-constructor": "error",
    "no-mixed-requires": ["error", { "grouping": true, "allowCall": true }], //off:recommended
    "no-new-require": "error", //off:recommended
    "no-path-concat": "error", //off:recommended
    "no-process-env": "error", //off:recommended
    "no-process-exit": "error",
    // "no-restricted-modules": "off", //OK
    "no-sync": "error",

    // Stylistic Issues
    // http://eslint.org/docs/rules/#stylistic-issues
    // ----------------------------------------------
    // "array-bracket-newline": "off", //prettier
    // "array-bracket-spacing": "off", //prettier
    // "array-element-newline": "off", //prettier
    // "block-spacing": "off", //prettier
    // "brace-style": "off", //prettier
    "camelcase": "error", //off:recommended
    // "capitalized-comments": "off", //OK
    // "comma-dangle": "off", //prettier
    // "comma-spacing": "off", //prettier
    // "comma-style": "off", //prettier
    // "computed-property-spacing": "off", //prettier
    "consistent-this": "error", //off:recommended
    // "eol-last": "off", //prettier
    // "func-call-spacing": "off", //prettier
    "func-name-matching": ["error", { "considerPropertyDescriptor": true, "includeCommonJSModuleExports": true }], //off:recommended
    "func-names": "error", //off:recommended
    "func-style": ["error", "expression", { "allowArrowFunctions": true }], //off:recommended
    // "function-paren-newline": "off", //prettier
    // "id-blacklist": "off", //OK
    // "id-length": "off", //OK
    // "id-match": "off", //OK
    // "implicit-arrow-linebreak": "off", //prettier
    // "indent": "off", //prettier
    // "jsx-quotes": "off", //prettier
    // "key-spacing": "off", //prettier
    // "keyword-spacing": "off", //prettier
    "line-comment-position": "error", //off:recommended
    "linebreak-style": "error", //off:recommended
    // "lines-around-comment": "off", //prettier
    "lines-between-class-members": "error", //off:recommended
    // "max-depth": "off", //OK
    // "max-len": "off", //prettier
    // "max-lines": "off", //OK
    // "max-lines-per-function": "off", //OK
    "max-nested-callbacks": ["error", { "max": 0 }], //off:recommended
    // "max-params": "off", //OK
    // "max-statements": "off", //OK
    // "max-statements-per-line": "off", //OK
    "multiline-comment-style": ["error", "separate-lines"], //off:recommended
    // "multiline-ternary": "off", //prettier
    "new-cap": "error", //off:recommended
    // "new-parens": "off", //prettier
    // "newline-per-chained-call": "off", //prettier
    "no-array-constructor": "error", //off:recommended
    "no-bitwise": "error", //off:recommended
    "no-continue": "error", //off:recommended
    "no-inline-comments": "error", //off:recommended
    "no-lonely-if": "error", //off:recommended
    // "no-mixed-operators": "off", //prettier
    // "no-mixed-spaces-and-tabs": "error", //off:prettier
    "no-multi-assign": "error", //off:recommended
    // "no-multiple-empty-lines": "off", //prettier
    "no-negated-condition": "error",
    "no-nested-ternary": "error", //off:recommended
    "no-new-object": "error", //off:recommended
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }], //off:recommended
    // "no-restricted-syntax": "off", //OK
    // "no-tabs": "off", //prettier
    // "no-ternary": "off", //OK
    // "no-trailing-spaces": "off", //prettier
    "no-underscore-dangle": ["error", { "allow": ["_id", "_source"] }], //off:recommended
    "no-unneeded-ternary": "error", //off:recommended
    // "no-whitespace-before-property": "off", //prettier
    // "nonblock-statement-body-position": "off", //prettier
    // "object-curly-newline": "off", //prettier
    // "object-curly-spacing": "off", //prettier
    // "object-property-newline": "off", //prettier
    "one-var": ["error", { var: "never", let: "never", const: "never" }], //off:recommended
    // "one-var-declaration-per-line": "off", //prettier
    "operator-assignment": "error", //off:recommended
    // "operator-linebreak": "off", //prettier
    // "padded-blocks": "off", //prettier
    "padding-line-between-statements": ["error",
      { blankLine: "always", prev: "directive", next: "*" },
      { blankLine: "any", prev: "directive", next: "directive" },
      { blankLine: "always", prev: ["const", "let", "var"], next: "*"},
      { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"]},
      { blankLine: "always", prev: "*", next: "return" }
    ], //off:recommended
    "prefer-object-spread": "error", //off:recommended
    // "quote-props": "off", //prettier
    // "quotes": "off", //prettier
    // "require-jsdoc": "off",
    // "semi": "off", //prettier
    // "semi-spacing": "off", //prettier
    // "semi-style": "off", //prettier
    "sort-keys": "error", //off:recommended
    "sort-vars": "error", //off:recommended
    // "space-before-blocks": "off", //prettier
    // "space-before-function-paren": "off", //prettier
    // "space-in-parens": "off", //prettier
    // "space-infix-ops": "off", //prettier
    // "space-unary-ops": "off", //prettier
    "spaced-comment": ["error", "always"], //off:recommended
    // "switch-colon-spacing": "off", //prettier
    // "template-tag-spacing": "off", //prettier
    // "unicode-bom": "off", //prettier
    // "wrap-regex": "off", //prettier

    // ECMAScript 6
    // http://eslint.org/docs/rules/#ecmascript-6
    // ------------------------------------------
    "arrow-body-style": "error", //off:recommended
    // "arrow-parens": "off", //prettier
    // "arrow-spacing": "off", //prettier
    // "constructor-super": "error",
    // "generator-star-spacing": "off", //prettier
    // "no-class-assign": "error",
    // "no-confusing-arrow": "off", //prettier
    // "no-const-assign": "error",
    // "no-dupe-class-members": "error",
    "no-duplicate-imports": "error", //off:recommended
    // "no-new-symbol": "error",
    // "no-restricted-imports": "off", //OK
    // "no-this-before-super": "error",
    "no-useless-computed-key": "error", //off:recommended
    "no-useless-constructor": "error", //off:recommended
    "no-useless-rename": "error", //off:recommended
    "no-var": "error", //off:recommended
    "object-shorthand": "error", //off:recommended
    "prefer-arrow-callback": "error", //off:recommended
    "prefer-const": ["error", { "ignoreReadBeforeAssign": true }], //off:recommended
    "prefer-destructuring": "error", //off:recommended
    "prefer-numeric-literals": "error", //off:recommended
    "prefer-rest-params": "error", //off:recommended
    "prefer-spread": "error", //off:recommended
    "prefer-template": "error", //off:recommended
    // "require-yield": "error",
    // "rest-spread-spacing": "off", //prettier
    "sort-imports": "error", //off:recommended
    "symbol-description": "error", //off:recommended
    // "template-curly-spacing": "off", //prettier
    // "yield-star-spacing": "off", //prettier
  },
};
