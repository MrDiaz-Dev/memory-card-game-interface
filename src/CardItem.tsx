import { useRef } from "react";


const CardItem = (props: {
  id: number,
  isFlipped: boolean,
  setCardState: (cardID: number) => void;
}) => {

  const theOpacity = props.isFlipped ? '0' : '1' ;

  const divRef = useRef<HTMLDivElement>(null);

  let timeOutID: number;

  return (
    <div 
      className="transition-all duration-500 relative rounded-lg card-item float-left m-1 cursor-pointer w-100 h-100"
      style={{opacity:theOpacity}} 
      onClick={() => {
        // set card state
        props.setCardState(props.id)

        // hide card with timeout
        divRef.current!.style.display = 'none';
        clearTimeout(timeOutID);
        timeOutID = setTimeout(() => {
          divRef.current!.style.display = 'block';
        }, 1000);
      }}
    >
      <img src={`../public/assets/${props.id + 1}.png`} alt="" />
      {/* <p>{props.id + 1}</p> */}
      <div ref={divRef} className="absolute top-0 left-0 w-full h-full bg-blue-500"></div>

    </div>
  );
};

export default CardItem;