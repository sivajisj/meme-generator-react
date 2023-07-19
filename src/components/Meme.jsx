import { useEffect, useState } from "react";

function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });
  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        [name]: value,
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const imageUrl = allMemes.length > 0 && allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: imageUrl,
    }));
  }

  return (
    <div>
      <form className="meme-form" onSubmit={handleSubmit}>
        <div className="meme-form__item">
          <label htmlFor="memeInput1" className="meme-form__label">
            Top Text
          </label>
          <input
            type="text"
            id="memeInput1"
            placeholder="Top Text"
            className="form-input"
            name="topText"
            value={meme.topText}
            onChange={handleChange}
          />
        </div>
        <div className="meme-form__item">
          <label htmlFor="memeInput2" className="meme-form__label">
            Bottom Text
          </label>
          <input
            type="text"
            id="memeInput2"
            placeholder="Bottom Text"
            className="form-input"
            name="bottomText"
            value={meme.bottomText}
            onChange={handleChange}
          />
        </div>

        <button className="form-button meme-form__button" type="submit">
          Get a new meme image 🖼
        </button>
      </form>

      {meme.randomImage && (
        <div className="meme-image-wrapper">
          <img src={meme.randomImage} alt="" className="meme-image" />

          {meme.topText && (
            <h3 className="meme-image__text meme-image__text-top">
              {meme.topText}
            </h3>
          )}

          {meme.bottomText && (
            <h3 className="meme-image__text meme-image__text-bottom">
              {meme.bottomText}
            </h3>
          )}
        </div>
      )}
    </div>
  );
}

export default Meme;
