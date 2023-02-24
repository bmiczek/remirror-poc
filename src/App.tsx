import 'remirror/styles/all.css';
import { Editor } from './components/Editor';

function App() {
    return (
        <div className="App">
            <h1>Communication Center</h1>
            <Editor editable placeholder="Write your company update here..." />
        </div>
    );
}

export default App;
