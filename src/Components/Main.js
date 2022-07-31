 import react, {useState, useEffect} from 'react';
import Card from './Card';

let API_key= "&api_key=b501052ebbe64d3b572e0183e38e4206";
let base_url= "https://api.themoviedb.org/3";
let url= base_url + "/discover/movie?sort_by=popularity.desc" + API_key;
let arr= ["Popular", "Threatre","Kids","Drama","Comedie"]

 const Main=()=>{

const[movieData, setMovieData]= useState([]);

const [url_set, setUrl_Set]= useState(url);

const [search, setSearch]= useState()

useEffect(()=>{
  fetch(url_set).then(res=>res.json()).then(data=>
    // console.log(data.results)
    setMovieData(data.results)
  )

},[url_set])

const moviesearch =((evt)=>{
if(evt.key=="Enter"){
  url=base_url+"/search/movie?api_key=b501052ebbe64d3b572e0183e38e4206&query="+search;
  setUrl_Set(url);
  setSearch(" ")
}
})

const getData=((movieType)=>{
  if(movieType=="Popular"){
    url =  base_url + "/discover/movie?sort_by=popularity.desc" + API_key;
  }  if(movieType=="Threatre"){
    url =  base_url + "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22" + API_key;
  } 
  if(movieType=="Kids"){
    url =  base_url + "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc"+ API_key;
  } 
  if(movieType=="Drama"){
    url =  base_url + "/discover/movie?with_genres=18&primary_release_year=2014" + API_key;
  } 
  if(movieType=="Comedie"){
    url =  base_url + "/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc" + API_key;
  } 
  setUrl_Set(url);
})

    return(
        <>
                <div className="header">

                     <nav>
                        <ul>
                                {
                                  arr.map((value)=>{
                                    return(
                                      <li><a href='#' name={value} onClick={(e)=>{getData(e.target.name)}}>{value}</a></li>
                                    )
                                  })
                                }

                        </ul>

                     </nav>
                     <form>
                        <div className='Search-btn'>
                            <input typr="text" placeholder="Enter Movie Name" className='inputText'
                            onChange={(e)=>setSearch(e.target.value)} value={search} onKeyDown={moviesearch} ></input>
                            <button><i className="fas fa-search" ></i></button>
                        </div>
                     </form>
                    </div>      

                    <div className='container'>
                        {
                          movieData.length==0? <p className='notfound'>Not Found</p>:movieData.map((res,por)=>{
                            return(
                              <Card key={por} info={res}/>
                            )
                          })
                        }
                        
                        </div> 
        </>
    )
 }

 export default Main;   