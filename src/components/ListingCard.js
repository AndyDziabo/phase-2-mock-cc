import React, {useState} from "react";

function ListingCard({listing, onDelete}) {
  const [liked, setLiked] = useState(false);

  function handleLike(){
    setLiked(!liked);
  }

  function handleDelete(){
    fetch(`http://localhost:6001/listings/${listing.id}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(() => onDelete(listing))
  }

  return (
    <li className="card">
      <div className="image">
        <span className="price">$0</span>
        <img src={listing.image} alt={listing.name} />
      </div>
      <div className="details">
        {liked ? (
          <button className="emoji-button favorite active" onClick={handleLike}>★</button>
        ) : (
          <button className="emoji-button favorite" onClick={handleLike}>☆</button>
        )}
        <strong>{listing.description}</strong>
        <span> · {listing.location}</span>
        <button className="emoji-button delete" onClick={handleDelete}>🗑</button>
      </div>
    </li>
  );
}

export default ListingCard;
