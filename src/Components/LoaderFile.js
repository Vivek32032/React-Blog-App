import Loader from "react-js-loader";

function LoaderFile(){

return (
     <div className={"row"}>
        <div className={"item"}>
           <Loader type="spinner-cub" bgColor={"#FF0000"} title={"spinner-cub"} color={'#FFFFFF'} size={150} />
        </div>
     </div>
)
}

export default LoaderFile;