import './app.css'
import App from "./App.svelte";


// Получаем элемент по идентификатору 'app'
const targetElement = document.getElementById('app');

// Проверяем, что элемент найден
if (targetElement) {
  // Если элемент найден, создаем экземпляр компонента App
  const app = new App({
    target: targetElement,
  })


} else {
  console.error("Element with id 'app' not found");
}
// Экспортируем экземпляр компонента App
export default App;