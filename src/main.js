import './app.css';
import App from './App.svelte';
import "./Light-theme.css";
import "./Dark-theme.css";

const app = new App({
  target: document.getElementById('app'),
});

export default app;
