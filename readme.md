Barkoni Meme Generator

🌟 Project Overview - 

The Barkoni Meme Generator is a web application that allows users to create custom memes by uploading images and adding text. The app leverages YOLOv8, a state-of-the-art AI object detection model, to identify specific characters (Barkoni) in user-uploaded images. If the character Barkoni is detected, the image is accepted for meme creation; otherwise, the upload is rejected. This ensures that the memes are generated only with images containing the desired character.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

🔑 Key Features -

🧠 AI Character Detection: Utilizes YOLOv8 to detect the presence of Barkoni in uploaded images.

✍️ Custom Text: Allows users to add custom top and bottom text to the images.

🖱️ Drag-and-Drop Text Positioning: Users can position the text freely on the image canvas.

⚡ Real-Time Feedback: Provides real-time feedback if the uploaded image does not contain Barkoni.

⏳ Spinner for API Call: Displays a loading spinner while the image is being processed by the detection API.


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
🛠️ Technology Stack -

Frontend: React.js using Vite

Object Detection: YOLOv8 model hosted on Roboflow

Styling: CSS for layout and styling


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
🚀 Usage -

Upload Image: Users can upload an image using the file input.

Character Detection: The app checks if the uploaded image contains Barkoni using the YOLOv8 model.

Text Addition: If Barkoni is detected, users can add top and bottom text to the image.

Download/Copy Meme: Users can download the meme or copy it to the clipboard.


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
🛠️ Installation- 

Clone the repository:
sh
$ git clone https://github.com/godnessy/barkoni-meme-generator.git

cd barkoni-meme-generator

Install dependencies:

sh
$ npm install
Set up environment variables: Create a .env file in the root directory with the following:

env
Copy into your .env file and set the vars:
VITE_APP_INFERENCE_API_URL=https://detect.roboflow.com/your-model
VITE_APP_INF_API_KEY=your-api-key
Run the application:

sh
npm run dev
Build the application:

sh
npm run build

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
🤝 Contribution
Feel free to submit issues and enhancement requests.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
📜 License
This project is licensed under the MIT License.

