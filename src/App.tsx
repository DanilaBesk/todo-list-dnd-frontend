import { ListsContainer } from './components/lists-container';
import { TitleApp } from './components/title-app';

function App() {
  return (
    <div className="bg-slate-900 min-h-screen">
      <div className="max-w-[800px] mx-auto space-y-1 flex flex-col justify-center overflow-auto no-scrollbar">
        <TitleApp />
        <ListsContainer />
      </div>
    </div>
  );
}

export default App;
