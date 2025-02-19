const Refresh=()=>{
  const function handleRefresh(){
    window.location.reload();
  }
  return(
         <button className="refresh" onClick={handleRefresh}>Refresh</button>
    )
}
export default Refresh;
