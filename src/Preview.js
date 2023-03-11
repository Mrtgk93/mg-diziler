import { Link } from "react-router-dom";

export default function Preview(props) {
  const { name, network, country, image_thumbnail_path, id } = props.showData;
  return (
    <div className="preview">
      <img
        className="preview-img"
        src={image_thumbnail_path}
        alt={name + "posteri"}
      />
      <div className="preview-data">
        <h3>{name}</h3>
        <p>
          {network}, {country}
        </p>
        <button>
          <Link className="detayLink" to={`/dizi-detay/${id}`}>
            Detay
          </Link>
        </button>
        <button
          className="ekleButton"
          onClick={() => props.addToList(props.showData)}
        >
          Listeme Ekle ✔︎
        </button>
      </div>
    </div>
  );
}
