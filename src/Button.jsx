const Button = ({children, hint, onClick, onMouseOver, onMouseOut}) => {
 
    return (
      <button className="childhood" title={hint} onClick={onClick} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
        {children}
      </button>
    );
  };
  
  export default Button;
