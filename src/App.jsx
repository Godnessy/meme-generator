import { useState, useRef } from 'react';
import TextInput from './components/TextInput.jsx';
import MemeCanvas from './components/MemeCanvas.jsx';
import './App.css';

const apiUrl = import.meta.env.VITE_APP_INFERENCE_API_URL; 
const apiKey = import.meta.env.VITE_APP_INF_API_KEY;

function App() {
    const [topText, setTopText] = useState('');
    const [bottomText, setBottomText] = useState('');
    const [uploadedImage, setUploadedImage] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(false); // New loading state
    const canvasRef = useRef(null);
    const [showErrorModal, setShowErrorModal] = useState(false);


    const handleTextChange = (position, text) => {
        if (position === 'topText') {
            setTopText(text);
        } else if (position === 'bottomText') {
            setBottomText(text);
        }
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
    
        if (!file.type.startsWith('image/')) {
            event.preventDefault();
            event.stopPropagation();
            setShowErrorModal(true);
            return;
        }
    
        if (file) {
            const reader = new FileReader();
            reader.onload = async () => {
                const base64String = reader.result.split(',')[1];
                setLoading(true);
                try {
                    const response = await fetch(`${apiUrl}?api_key=${apiKey}`, {
                        method: 'POST',
                        body: base64String,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });
                    const result = await response.json();
                    if (result.predictions[0].class === 'Barkoni') {
                        console.log('isBarkoni');
                        setUploadedImage(file);
                    } else {
                        console.log('is NOT barkoni');
                        setShowPopup(true);
                    }
                } catch (error) {
                    console.error('Error:', error);
                } finally {
                    setLoading(false);
                }
            };
            reader.readAsDataURL(file);
        }
    };
    

    const copyToClipboard = () => {
        const canvas = canvasRef.current;
        canvas.toBlob(blob => {
            const item = new ClipboardItem({ 'image/png': blob });
            navigator.clipboard.write([item]);
        });
    };

    const downloadImage = () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        link.download = 'meme.png';
        link.href = canvas.toDataURL();
        link.click();
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Barkoni Meme Generator</h1>
            </header>
            <main className="container">
                <TextInput onTextChange={handleTextChange} />
                <MemeCanvas topText={topText} bottomText={bottomText} uploadedImage={uploadedImage} ref={canvasRef} />
                <div className="upload-container">
                    <input type="file" onChange={handleFileChange}  accept="image/*" className="button" />
                </div>
                <div className="buttons-container">
                    <button className="button" onClick={copyToClipboard}>Copy to Clipboard</button>
                    <button className="button" onClick={downloadImage}>Download Image</button>
                </div>
                {loading && (
                <div className="spinner-card">
                    <div className="spinner"></div>
                    <div className="spinner-text">Checking if Barkoni...</div>
                </div>
            )}


            </main>
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <img src="/images/not-barkoni.png" alt="Not Barkoni" />
                        <button className='close-button' onClick={() => setShowPopup(false)}>x</button>
                    </div>
                </div>
            )}
            {showErrorModal && (
            <div className="modal">
                <div className="modal-content">
                    <p>Error: Only image files allowed</p>
                    <button className='close-button' onClick={() => setShowErrorModal(false)}>x</button>
            </div>
    </div>
)}

        </div>
    );
}

export default App;
