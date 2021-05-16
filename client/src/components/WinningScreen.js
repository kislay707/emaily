import React, {useMemo} from "react";
import styled from "styled-components";

function WinningScreen(props) {
    const {sum, opponentSum, position} = props;

    const winner = useMemo(() => {
        
        let winner;
        if (sum > opponentSum) {
            winner = position === 0 ? "green" : "blue";
        } else if (sum < opponentSum) {
            winner = position === 0 ? "blue" : "green";
        }
        return winner;
    }, []);

    
    return (
        <div>
            {sum !== opponentSum ? `The Winner is : ${winner}` : 'Game is tied'}
        </div>
    )

}


export default WinningScreen;