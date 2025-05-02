import { useState } from 'react';
import { FluentProvider, webLightTheme, Button, Input, Avatar } from '@fluentui/react-components';
import {
  Home24Regular,
  CalendarAgenda24Regular,
  BookOpen24Regular,
  PeopleTeam24Regular,
  MoneyHand24Regular,
  BookQuestionMark24Regular,
  Settings24Regular,
  Search24Regular,
  Bot24Regular
} from '@fluentui/react-icons';
import './App.css';
import DealPipelinePlotly from './DealPipelinePlotly';

const menuItems = [
  { key: 'Homefeed', label: 'Homefeed', icon: <Home24Regular /> },
  { key: 'Meetings', label: 'Meetings', icon: <CalendarAgenda24Regular /> },
  { key: 'Courses', label: 'Courses', icon: <BookOpen24Regular /> },
  { key: 'Repview', label: 'Repview', icon: <PeopleTeam24Regular /> },
  { key: 'Deals', label: 'Deals', icon: <MoneyHand24Regular /> },
  { key: 'Playbook', label: 'Playbook', icon: <BookQuestionMark24Regular /> },
  { key: 'Settings', label: 'Settings', icon: <Settings24Regular /> },
];

function Sidebar({ selected, onSelect }: { selected: string, onSelect: (key: string) => void }) {
  return (
    <aside className="flex flex-col items-center bg-white shadow h-screen w-20 py-4 gap-6">
      <div className="w-10 h-10 mb-6 flex items-center justify-center overflow-hidden">
        <img src="/logo.png" alt="App Logo" className="w-8 h-8 object-contain" />
      </div>
      {menuItems.map((item) => (
        <div
          key={item.key}
          className={`flex flex-col items-center gap-1 cursor-pointer hover:text-blue-700 ${selected === item.key ? 'text-blue-700 font-bold' : ''}`}
          onClick={() => onSelect(item.key)}
        >
          {item.icon}
          <span className="text-xs mt-1">{item.label}</span>
        </div>
      ))}
    </aside>
  );
}

function Topbar() {
  return (
    <header className="flex items-center justify-between bg-white shadow h-16 px-6 w-full">
      <div className="flex items-center gap-2">
        <Button appearance="primary" icon={<Bot24Regular />}>Ask AI</Button>
      </div>
      <div className="flex items-center gap-4">
        <Input contentBefore={<Search24Regular />} placeholder="Search..." className="w-64" />
        <Avatar name="User" size={32} />
      </div>
    </header>
  );
}

function MainContent({ selected }: { selected: string }) {
  if (selected === 'Deals') {
    return <DealPipelinePlotly />;
  }
  return (
    <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-blue-700 mb-2">Under Construction</h1>
        <p className="text-gray-600">This view is under construction.<br />Please check back soon for updates!</p>
      </div>
    </div>
  );
}

function App() {
  const [selected, setSelected] = useState('Deals');
  return (
    <FluentProvider theme={webLightTheme}>
      <div className="flex h-screen w-screen overflow-hidden">
        <Sidebar selected={selected} onSelect={setSelected} />
        <div className="flex flex-col flex-1 h-full">
          <Topbar />
          <MainContent selected={selected} />
      </div>
      </div>
    </FluentProvider>
  );
}

export default App;
