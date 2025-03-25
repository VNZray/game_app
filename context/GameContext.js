import React, { createContext, useContext, useState } from "react";

const MathDuelContext = createContext();

const MathDuelProvider = ({ children }) => {
    const [players, setPlayers] = useState([
        { name: "Player", score: 0 },
        { name: "Computer", score: 0 }
    ]);

    // Function to update a player's score
    const updateScore = (playerIndex, newScore) => {
        setPlayers((prevPlayers) =>
            prevPlayers.map((player, index) =>
                index === playerIndex ? { ...player, score: newScore } : player
            )
        );
    };

    // Reset scores when a new game starts
    const resetGame = () => {
        setPlayers([
            { name: "Player", score: 0 },
            { name: "Computer", score: 0 }
        ]);
    };

    return (
        <MathDuelContext.Provider value={{ players, updateScore, resetGame }}>
            {children}
        </MathDuelContext.Provider>
    );
};

const useMathDuel = () => useContext(MathDuelContext);

export { MathDuelProvider, useMathDuel };
