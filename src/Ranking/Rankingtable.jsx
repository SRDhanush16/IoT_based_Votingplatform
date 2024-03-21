import React, { useState, useEffect } from 'react';
import placesinchennai from '../Data/Data';
import'../index.css';

function Rankingtable() {
    let [place, setPlace] = useState(placesinchennai);

    // State for the filtered places
    let [filteredPlaces, setFilteredPlaces] = useState(placesinchennai);

    // for upvote
    function handleUpvote(name) {
        const updatedPlace = place.map((p) => {
            if (p.name === name) {
                return { ...p, points: p.points + 1 };
            }
            return p;
        });
        setPlace(updatedPlace);
        sortPlacesByPoints(updatedPlace);
    }

    // for downvote
    function handleDownvote(name) {
        const updatedPlace = place.map((p) => {
            if (p.name === name && p.points > 0) {
                return { ...p, points: p.points - 1 };
            }
            return p;
        });
        setPlace(updatedPlace);
        sortPlacesByPoints(updatedPlace);
    }

    // for sorting and updating the view whenever upvote or downvote is clicked
    function sortPlacesByPoints(placeArray) {
        placeArray.sort((a, b) => b.points - a.points);
        setPlace([...placeArray]);
        // Update the filtered places as well
        setFilteredPlaces([...placeArray]);
    }

    // for searching the place we want
    let [searchplace, setSearchplace] = useState('');

    function handleSearchPlace(event) {
        setSearchplace(event.target.value.toLowerCase())
    }

    useEffect(() => {
        // Update the filtered places based on the search
        setFilteredPlaces(place.filter((val) => val.name.toLowerCase().startsWith(searchplace)))
    }, [searchplace])

    return (
        <>
            <div className="serachbox">
                <form >
                    <input placeholder='serach place' type="text" value={searchplace} onChange={handleSearchPlace} />
                </form>
            </div>
            <div className="rankingtable">
                {
                    filteredPlaces.map((val, idx) => (
                        <>
                            <div className="Cell">
                                <div className="rankcell">
                                    <h2>{idx + 1}</h2>
                                </div>
                                <div className="contentcell">
                                    <h3>{val.name}</h3>
                                    <p><b>Location : {val.location}</b></p>
                                    <p>{val.desc}</p>
                                    <h5>Points : {val.points}</h5>
                                    <div>
                                        <button onClick={() => { handleUpvote(val.name) }}> UPVOTE </button>
                                        <button onClick={() => { handleDownvote(val.name) }}> DOWNVOTE </button>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <br />
                            <br />
                        </>
                    ))
                }
            </div>
        </>
    )
}

export default Rankingtable;
