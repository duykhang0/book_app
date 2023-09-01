import RiseLoader  from "react-spinners/RiseLoader";
const Loading = () => {
    return (
        <div style={{position:"fixed",top:"50%",left:"50%",transform: "translate(-50%,-50%)"}}>  
            <RiseLoader 
            color="#36d7b7"
            size={50}
            />
        </div>
    )
}

export default Loading;