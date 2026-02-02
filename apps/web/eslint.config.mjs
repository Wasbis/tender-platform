import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import js from "@eslint/js";
import globals from "globals";

const eslintConfig = defineConfig([
  // 1. Base Javascript Rules (Standard)
  js.configs.recommended,

  // 2. Next.js Core Vitals (Wajib buat performa Next.js)
  ...nextVitals,

  // 3. Custom Rules & Configuration (Sesuai Referensi Kamu)
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect", // Biar dia auto-detect versi React
      },
    },
    // Rules override
    rules: {
      "no-undef": "error",
      "no-unused-vars": "warn", // Cuma warning kalau ada variabel nganggur

      // React specific overrides
      "react/jsx-no-undef": "error",
      "react/no-unescaped-entities": "off",
      "react/jsx-uses-vars": "error",
      "react/react-in-jsx-scope": "off", // Next.js gak butuh import React from 'react'
      "react/prop-types": "off", // Matikan validasi PropTypes (karena kita loose)
      "react/jsx-uses-react": "off",
    },
  },

  // 4. Global Ignores (Folder yang gak usah dicek)
  {
    ignores: [".next/**", "out/**", "build/**", "node_modules/**", "next-env.d.ts"],
  },
]);

export default eslintConfig;
