// wraps the Rankingtable to provide better view / UI

import Rankingtable from "./Rankingtable";

function Rankingspace(){

    return (
        <section className="Rankingspace">
            <div className="container" >
                <h2>TOP 10 PLACES TO VISIT IN CHENNAI</h2>
                <Rankingtable/>
            </div>   
        </section>
    )

}

export default Rankingspace;