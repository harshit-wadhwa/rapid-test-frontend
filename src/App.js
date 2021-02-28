import './App.css';
import Clock from './Clock';
import EntryForm from './EntryForm';
import AddQuestion from "./AddQuestion";
import CreateTest2 from "./CreateTest2";
import CreateTest from "./CreateTest";

function App() {
    return (
        <div className="App">
            {/*<header className="App-header">
                <Clock/>
            </header>*/}
            <main className="App-main">
                <CreateTest />
                {/*<EntryForm />*/}
                {/*<AddQuestion />*/}
                {/*<CreateTest2 />*/}
            </main>
        </div>
    );
}

export default App;
