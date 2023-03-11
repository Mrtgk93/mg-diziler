import { useEffect, useState } from "react";
import axios from "axios";
import Preview from "./Preview";
import SmallPreview from "./SmallPreview";
import { Switch, Route } from "react-router-dom";
import Details from "./Details";

function App() {
  const [shows, setShows] = useState([]);
  const [watchList, setWatchList] = useState([]);
  const [current, setCurrent] = useState(null);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  function ilkSayfa() {
    axios
      .get("https://www.episodate.com/api/most-popular?page=" + page)
      .then((response) => setShows(response.data.tv_shows))
      .catch((error) => console.log("hata", error));
  }

  useEffect(() => {
    ilkSayfa();
  }, [page]);

  function handleAdd(diziObj) {
    if (watchList.some((dizi) => dizi.id === diziObj.id)) {
      alert("listede var");
    } else {
      setWatchList([...watchList, diziObj]);
    }
  }

  function handleRemove(id) {
    const yeniListe = watchList.filter((dizi) => dizi.id !== id);
    setWatchList(yeniListe);
  }

  function changePage(newNumber) {
    if (newNumber > 0) {
      setPage(newNumber);
    }
  }
  function handleSearchTextChange(event) {
    setSearchText(event.target.value);
  }

  function handleSearch() {
    axios
      .get("https://www.episodate.com/api/search?q=" + searchText)
      .then((response) => setShows(response.data.tv_shows))
      .catch((error) => console.log("hata", error));
  }

  function resetPage() {
    setSearchText("");
    ilkSayfa();
    setPage(1);
  }

  return (
    <Switch>
      <Route exact path="/">
        <div className="mainContent">
          <div className="diziListesi">
            <h2>Popüler Diziler</h2>
            <button onClick={() => resetPage()}>Ana Sayfa</button>
            <input
              className="input"
              value={searchText}
              placeholder="Dizi adı ile arayın !!!"
              onChange={handleSearchTextChange}
            />
            <button
              className="aramaButonu"
              disabled={searchText === ""}
              onClick={handleSearch}
            >
              Ara
            </button>
            <div className="watch-list-scroll">
              <ul>
                {shows.map((dizi) => (
                  <li
                    onClick={() => setCurrent(dizi)}
                    className={current?.id === dizi.id ? "active" : ""}
                    key={dizi.id}
                  >
                    {dizi.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="butonlar">
              <button
                onClick={() => changePage(page - 1)}
                disabled={page === 1}
              >
                önceki
              </button>{" "}
              <h3>{page}</h3>
              <button onClick={() => changePage(page + 1)}>sonraki</button>
            </div>
          </div>
          <div className="dizidetayı">
            {/* current null'sa seçim yapın lütfen yoksa previewi göster */}
            {current === null ? (
              <div className="secimYapin">Lütfen Seçim Yapın</div>
            ) : (
              <Preview showData={current} addToList={handleAdd} />
            )}
          </div>
          <div className="izlemelistesi">
            <h2>İzleyeceklerim</h2>
            <div className="watch-list-scroll">
              {watchList.map((dizi) => (
                <SmallPreview
                  key={dizi.id}
                  diziObj={dizi}
                  removeFromList={handleRemove}
                />
              ))}
            </div>
            {/* watchList state'i içerisindekileri burada listele */}
          </div>
        </div>
      </Route>
      <Route path="/dizi-detay/:showId">
        <Details />
      </Route>
    </Switch>
  );
}

export default App;
