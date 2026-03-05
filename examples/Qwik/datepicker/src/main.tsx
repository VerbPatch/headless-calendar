import '@builder.io/qwik/qwikloader.js';
import { render } from '@builder.io/qwik';
import { App } from './App.tsx';

render(document.getElementById('app') as HTMLElement, <App />);
