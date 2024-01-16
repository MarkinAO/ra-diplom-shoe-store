interface IErrorButton {
    onClickHandler: any
    props?: any
    errorMessage?: string
}

export default function ErrorButton({onClickHandler, errorMessage, props }: IErrorButton) {
    return(
        <>
            <div className="text-center text-danger my-2">
                Что-то пошло не так: <b>{errorMessage}</b>
                <div className="text-center">
                    <button 
                        className="btn btn-outline-primary"
                        onClick={() => onClickHandler(props)}
                    >Повторить попытку</button>
                </div>
            </div>            
        </>        
    )
}