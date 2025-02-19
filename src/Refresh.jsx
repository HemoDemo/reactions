const Refresh=()=>{
  const function handleRefresh(){
    window.location.reload();
  }
  return(
         <button onClick={handleRefresh}>Refresh</button>
    )
}
export default Refresh;
