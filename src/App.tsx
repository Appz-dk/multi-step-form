import "./App.css";
import SubscriptionForm from "./components/form/SubscriptionForm";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  return (
    <main className="App">
      <Sidebar />
      <SubscriptionForm />
    </main>
  );
}

export default App;
