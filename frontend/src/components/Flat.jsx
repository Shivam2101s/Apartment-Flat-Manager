import "./Flat.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const Flat = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [limit,setLimit] = useState(0);

  useEffect(() => {
    getData();
  }, [page]);

  const getData = () => {
    try {
      fetch(`http://localhost:4500/flat?page=${page}`)
        .then((d) => d.json())
        .then((res) => {
          setData(res.flats);
          setLimit(res.totalPage);
          console.log(res.flats);
        });
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const sorting=(value)=>{
    try {
      fetch(`http://localhost:4500/flat/sort/${value}`)
        .then((d) => d.json())
        .then((res) => {
          setData(res.flats);
          setLimit(res.totalPage);
          console.log(res.flats);
        });
    } catch (err) {
      console.log("Error:", err);
    }
  };



  return (
    <div id="flatDivMain">
      <div id="sort_filter_div">
        <h1 id="sort_filter_div_head">Sort and Filter</h1>
        <div id="sortDiv">
          <select name="" id="sortbyFlatNumber" onChange={sorting}>
            <option value="">Sort by Flat Number</option>
            <option value="lowtoHigh">(Low To High)</option>
            <option value="HighToLow">(High to low)</option>
          </select>
         <div id="filterDiv">
           <div>
               <input type="checkBox" name="A" />   <label htmlFor="A">A-Block</label> 
           </div>
       <div>
          <input type="checkBox" name="B" />   <label htmlFor="B">B-Block</label>
       </div>
         
        <div>
        <input type="checkBox" name="C" />   <label htmlFor="C">C-Block</label>  
        </div>
         </div>  
        
        </div>
      </div>
<div id="flatList">
      <table>
        <tr>
          <th>Block</th>
          <th>Flat Number</th>
          <th>Type</th>
          <th>No. of Residents</th>
          <th>Image</th>
        </tr>
        {data.map((e, i) => (
          <tr className="flatData" key={i}>
            <td>{e.block}</td>

            <td>{e.flat_number}</td>
            <td>{e.type}</td>
            <td>{e.residents.length}</td>
            <Link className="flatListLink" to={`/flat/${e._id}`}>
              <td>
                <img className="flatImg" src={e.image} alt="NA" />
              </td>
            </Link>
          </tr>
        ))}
      </table>
      <div id="btnDiv">
        <button
          className="paginationBtn"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <button className="paginationBtn"  disabled={page === limit}  onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
    </div>
    
  );
};
