import '../../Styles/imageCard.css';

const ImageCard = (props) => {
  return (
    <div className="imageCard">
      <img src={props.imgSrc} alt="img" className="imageCard-img" />
    </div>
  );
};

export default ImageCard;
