import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json' with { type: 'json' };
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

const banner = `/**
 * Headless Calendar jQuery v${pkg.version}
 * Copyright (c) 2025 VerbPatch
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 * @license GPL-3.0-or-later
 */`;

export default defineConfig({
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: 'HeadlessCalendarJQuery',
      globals: {
        jquery: 'jQuery',
        'headless-calendar': 'HeadlessCalendar',
      },
      banner,
      //compact: false,
      //generatedCode: "es2015",
    },
  ],
  external: ['jquery', 'headless-calendar'],
  plugins: [nodeResolve(), commonjs(), typescript({ tsconfig: './tsconfig.json' }), terser()],
});
