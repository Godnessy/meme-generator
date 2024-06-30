import { useEffect, useState, forwardRef } from 'react';
import PropTypes from 'prop-types';

const images = Array.from({ length: 20 }, (_, i) => `/images/pics/${i + 1}.jpeg`);
const isHebrew = (text) => /[\u0590-\u05FF]/.test(text);

//using forwardRef to allow parent component to directly manipulate the canvas element.
const MemeCanvas = forwardRef(({ topText, bottomText, uploadedImage }, ref) => {
    MemeCanvas.propTypes = {
        topText: PropTypes.string,
        bottomText: PropTypes.string,
        uploadedImage: PropTypes.object
    };

    const [selectedImage, setSelectedImage] = useState(images[0]);
    const [topTextPos, setTopTextPos] = useState({ x: 0, y: 0 });
    const [bottomTextPos, setBottomTextPos] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(null);

    const handleChange = (event) => {
        setSelectedImage(event.target.value);
    };

    const handleMouseDown = (e) => {
        const canvas = ref.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (Math.abs(x - topTextPos.x) < 50 && Math.abs(y - topTextPos.y) < 20) {
            setDragging('top');
        } else if (Math.abs(x - bottomTextPos.x) < 50 && Math.abs(y - bottomTextPos.y) < 20) {
            setDragging('bottom');
        }
    };

    const handleMouseUp = () => {
        setDragging(null);
    };

    const handleMouseMove = (e) => {
        if (!dragging) return;

        const canvas = ref.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (dragging === 'top') {
            setTopTextPos({ x, y });
        } else if (dragging === 'bottom') {
            setBottomTextPos({ x, y });
        }
    };

    useEffect(() => {
        const canvas = ref.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = uploadedImage ? URL.createObjectURL(uploadedImage) : selectedImage;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;

            setTopTextPos({ x: canvas.width / 2, y: 50 });
            setBottomTextPos({ x: canvas.width / 2, y: canvas.height - 50 });

            ctx.drawImage(img, 0, 0);
            ctx.font = '30px Impact, Arial, sans-serif';
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 3;
            ctx.textAlign = 'center';

            if (topText) {
                ctx.direction = isHebrew(topText) ? 'rtl' : 'ltr';
                ctx.strokeText(topText, topTextPos.x, topTextPos.y);
                ctx.fillText(topText, topTextPos.x, topTextPos.y);
            }

            if (bottomText) {
                ctx.direction = isHebrew(bottomText) ? 'rtl' : 'ltr';
                ctx.strokeText(bottomText, bottomTextPos.x, bottomTextPos.y);
                ctx.fillText(bottomText, bottomTextPos.x, bottomTextPos.y);
            }
        };
    }, [selectedImage, uploadedImage,bottomText,topText]);

    useEffect(() => {
        const canvas = ref.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = uploadedImage ? URL.createObjectURL(uploadedImage) : selectedImage;
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            ctx.font = '30px Impact, Arial, sans-serif';
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 3;
            ctx.textAlign = 'center';

            if (topText) {
                ctx.direction = isHebrew(topText) ? 'rtl' : 'ltr';
                ctx.strokeText(topText, topTextPos.x, topTextPos.y);
                ctx.fillText(topText, topTextPos.x, topTextPos.y);
            }

            if (bottomText) {
                ctx.direction = isHebrew(bottomText) ? 'rtl' : 'ltr';
                ctx.strokeText(bottomText, bottomTextPos.x, bottomTextPos.y);
                ctx.fillText(bottomText, bottomTextPos.x, bottomTextPos.y);
            }
        };
    }, [topText, bottomText, topTextPos, bottomTextPos, selectedImage, uploadedImage]);

    return (
        <div className="meme-container">
             <h2>Select pic</h2>
            <select value={selectedImage} onChange={handleChange}>
                {images.map((image, index) => {
                    const imageName = image.split('/').pop().split('.')[0]; // Extract the image name without path and format
                    return (
                        <option key={index} value={image}>
                            {imageName}
                        </option>
                    );
                })}
            </select>
            <h2 className='meme-preview-txt'>Meme Preview</h2>
            <canvas
                ref={ref}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            ></canvas>
        </div>
    );
});

MemeCanvas.displayName = 'MemeCanvas';

export default MemeCanvas;
