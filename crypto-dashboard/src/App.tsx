import Sidebar from './components/Sidebar';
import Greeting from './components/Greeting';
import CryptoGrid from './components/CryptoGrid';

export default function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-auto bg-richBg">
        <Greeting />
        <CryptoGrid />
      </div>
    </div>
  );
}
