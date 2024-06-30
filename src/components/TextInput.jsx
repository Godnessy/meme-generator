import { useState } from 'react';
import PropTypes from 'prop-types';

const isHebrew = (text) => /[\u0590-\u05FF]/.test(text);

function TextInput({ onTextChange }) {
    const [topText, setTopText] = useState('');
    const [bottomText, setBottomText] = useState('');

    TextInput.propTypes = {
        onTextChange: PropTypes.func.isRequired,
    };
    

    const handleChange = (event) => {
        const { name, value } = event.target;
        onTextChange(name, value);

        if (name === 'topText') {
            setTopText(value);
        } else if (name === 'bottomText') {
            setBottomText(value);
        }
    };

    return (
        <div>
            <h2>Enter Text</h2>
            <div>
                <label>
                    Top Text:
                    <input
                        type="text"
                        maxLength="14"
                        name="topText"
                        value={topText}
                        onChange={handleChange}
                        style={{ direction: isHebrew(topText) ? 'rtl' : 'ltr', unicodeBidi: 'bidi-override' }}
                    />
                </label>
            </div>
            <div>
                <label>
                    Bottom Text:
                    <input
                        type="text"
                        maxLength="14"
                        name="bottomText"
                        value={bottomText}
                        onChange={handleChange}
                        style={{ direction: isHebrew(bottomText) ? 'rtl' : 'ltr', unicodeBidi: 'bidi-override' }}
                    />
                </label>
            </div>
        </div>
    );
}

export default TextInput;
