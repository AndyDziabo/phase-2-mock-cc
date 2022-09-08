import React, {useEffect, useState} from "react";
import Header from "./Header";
import Form from "./Form";
import ListingsContainer from "./ListingsContainer";

function App() {
  const [listings, setListings] = useState([]);
  const [newQuery, setNewQuery] = useState("");
  const [sorting, setSorting] = useState('false');
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    fetch("http://localhost:6001/listings")
      .then(res => res.json())
      .then(data => setListings(data))
  }, [trigger]);

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

  function handleAddListing(newListing){
    setListings([...listings, newListing]);
  }

  function handleSort(sort){
    if(sort === 'true'){
      const updatedListings = listings.sort(function(a,b) {
        let localA = a.location.toLowerCase();
        let localB = b.location.toLowerCase();
        if(localA < localB){
          return -1;
        }
        if(localA > localB){
          return 1;
        }
        return 0;
      });
      setListings(updatedListings);
      setSorting('true');
    }else{
      setSorting('false');
      setTrigger(trigger + 1);
    }
    
  }

  return (
    <div className="app">
      <Header onQuery={handleQuery} />
      <Form onAddListing={handleAddListing} onSort={handleSort} />
      <ListingsContainer listings={listingsToDisplay} onDelete={handleDelete} />
    </div>
  );
}

export default App;
