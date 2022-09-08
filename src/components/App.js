import React, {useEffect, useState} from "react";
import Header from "./Header";
import ListingsContainer from "./ListingsContainer";

function App() {
  const [listings, setListings] = useState([]);
  const [newQuery, setNewQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/listings")
      .then(res => res.json())
      .then(data => setListings(data))
  }, []);

  function handleDelete(deletedListing){
    const updatedListings = listings.filter((listing) => listing.id !== deletedListing.id);
    setListings(updatedListings);
  }

  function handleQuery(query){
    setNewQuery(query);
  }

  const listingsToDisplay = listings.filter((listing) => {
    if(newQuery === "") return true;
    return listing.description.toLowerCase().includes(newQuery.toLowerCase());
  });

  return (
    <div className="app">
      <Header onQuery={handleQuery} />
      <ListingsContainer listings={listingsToDisplay} onDelete={handleDelete} />
    </div>
  );
}

export default App;
