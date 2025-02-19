const Refresh=()=>{
  const handleRefresh=()=>{
    window.location.reload();
  }
  return(
         <button className="refresh" onClick={handleRefresh}>Refresh</button>
    )
}
export default Refresh;
