import React from 'react';
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

function Header() {
    const CurrentDate = format(new Date(), 'EEEEEE, d, MMMM', { locale: ptBR });
    return (
        <header className="headerContainer">
            <img src="/cerveja.jpg" width='3%' alt="Podcastr" />
            <p className="header-message">Aprecie com moderação!</p>

            <span className="date-time">{CurrentDate}</span>
        </header>
    );
}

export default Header;