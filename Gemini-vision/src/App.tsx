import { useEffect, useState } from "react";

const App = () => {
  const [image, setImage] = useState<File | null>(null);
  const [value, setValue] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const imageOptions = [
    "Does the image contain a whale?",
    "Does the image contain a car?",
    "Does the image contain a tree?",
    "Does the image contain a building?",
    "Does the image contain an animal?",
  ];

  const clear = () => {
    setImage(null);
    setValue("");
    setResponse("");
    setError("");
  };
  let randomValue = 0;
  useEffect(() => {
    randomValue = Math.floor(Math.random() * imageOptions.length);
  }, [randomValue]);
  const suprise = async () => {
    const randomImage = imageOptions[randomValue];
    setValue(randomImage);
  };
  const analyzeImg = async () => {};

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    //@ts-ignore
    formData.append("file", e.target.files[0]);
    //@ts-ignore
    setImage(e.target.files[0]);
    const options = {
      method: "POST",
      body: formData,
    };
    try {
      const res = await fetch("http://localhost:5000/upload", options);
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(image);

  return (
    <div>
      <section className="search-section">
        <div className="img-container">
          {/* //@ts-ignore*/}
          {image && <img className="image" src={URL.createObjectURL(image)} />}
        </div>
        <p className="extra-info">
          <span>
            {" "}
            <label htmlFor="files">Upload an image </label>
            <input
              type="file"
              onChange={uploadImage}
              id="files"
              accept="image/*"
              hidden
            />
          </span>
          to ask questions about.
        </p>
        <p>What do you want to know about the image?</p>
        <button className="suprise" onClick={suprise}>
          Suprise me
        </button>
        <div className="input-container">
          <input
            type="text"
            placeholder="What's in the image..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          {!response && !error && <button onClick={analyzeImg}>Ask Me</button>}
          {(response || error) && <button onClick={clear}>Clear</button>}
        </div>
        {error && <p>{error}</p>}
        {response && <p>{response}</p>}
      </section>
    </div>
  );
};

export default App;
