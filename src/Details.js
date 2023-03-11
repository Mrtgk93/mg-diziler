import stiller from "./details.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Details() {
  let history = useHistory();
  let { showId } = useParams();
  const [show, setShow] = useState(null);
  useEffect(() => {
    axios
      .get("https://www.episodate.com/api/show-details?q=" + showId)
      .then((response) => setShow(response.data.tvShow))
      .catch((error) => console.log("hata", error));
  }, []);

  function handleBack() {
    history.goBack();
  }

  return (
    <div className={stiller.box}>
      {show ? (
        <div className={stiller.detay}>
          <img src={show.image_path} alt="" />
          <div className={stiller.icerik}>
            <h1>{show.name}</h1>
            <p>{show.description}</p>
            <button onClick={handleBack}>⬅︎ Geri Dön</button>
          </div>
        </div>
      ) : (
        "data yükleniyor"
      )}
    </div>
  );
}
