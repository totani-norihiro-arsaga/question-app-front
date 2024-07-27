import React from "react";

interface CompleteProps {
    operation:string;
}

const Complete:React.FC<CompleteProps> = ({operation}) => {
    return (
        <h1>{operation}が完了しました。</h1>
    )
}
export default Complete;