import React, {useState} from "react";

function Form({onAddListing, onSort}) {
    const [descript, setDescript] = useState('');
    const [img, setImg] = useState('');
    const [local, setLocal] = useState('');

    function handleSubmit(e){
        e.preventDefault();
        const listingData = {
            description: e.target.description.value,
            image: e.target.image.value,
            location: e.target.location.value,
        };
        fetch("http://localhost:6001/listings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(listingData),
        })
            .then(res => res.json())
            .then(newListing => onAddListing(newListing));
        setDescript('');
        setImg('');
        setLocal('');
    }

    function handleSelect(e){
        onSort(e.target.value)
    }

    return(
        <div className="form-box">
        <form onSubmit={handleSubmit}>
            <label>Add New Listing</label>
            <input
                type="text"
                name="description"
                placeholder="item description"
                value={descript}
                onChange={(e) => setDescript(e.target.value)}
            />
            <input
                type="text"
                name="image"
                placeholder="image url"
                value={img}
                onChange={(e) => setImg(e.target.value)}
            />
            <input
                type="text"
                name="location"
                placeholder="location"
                value={local}
                onChange={(e) => setLocal(e.target.value)} 
            />
            <button type="submit">Submit</button>
        </form>
        <form onChange={handleSelect}>
            <label>Sort Listings</label>
            <select>
                <option name="on" value={false}>None</option>
                <option name="off" value={true}>By Location</option>
            </select>
            
        </form>

        </div>
    )
};

export default Form;